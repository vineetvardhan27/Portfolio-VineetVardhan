import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyCaptchaChallenge } from "@/lib/captcha";
import { buildInquiryEmailHtml } from "@/lib/email-template";

export const dynamic = "force-dynamic";

const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
    phone: z.string().trim().optional(),
    projectType: z.string().optional().default("General Inquiry"),
    budget: z.string().min(1, "Please select an estimated budget"),
    timeline: z.string().optional().default("Flexible / Exploring options"),
    message: z.string().trim().optional(),
    brief: z.string().trim().optional(),
    company: z.string().trim().optional(),
    // Bot prevention fields
    hp_website_company: z.string().optional(),
    captchaToken: z.string().optional(),
    captchaAnswer: z.union([z.string(), z.number()]).optional(),
  })
  .refine((data) => Boolean((data.message && data.message.length >= 10) || (data.brief && data.brief.length >= 10)), {
    message: "Please share at least 10 characters describing your project",
    path: ["message"],
  });

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "vineetvardhanwork@gmail.com";

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);

    // 1. Rate Limiting Check (5 submissions per 15 minutes per IP)
    const rateLimit = checkRateLimit(clientIp, {
      windowMs: 15 * 60 * 1000,
      maxRequests: 5,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many submissions from your connection. Please wait ${Math.ceil(
            rateLimit.resetSeconds / 60
          )} minute(s) before trying again, or reach out on WhatsApp.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
          },
        }
      );
    }

    const body = await req.json();

    // 2. Honeypot Check (Invisible to humans; if filled, silently discard bot request)
    if (body.hp_website_company && body.hp_website_company.trim() !== "") {
      console.warn(`[Anti-Spam] Honeypot triggered from IP: ${clientIp}`);
      // Return simulated success so bots don't adapt
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for reaching out! Your inquiry has been sent to Vineet.",
        },
        { status: 200 }
      );
    }

    // 3. CAPTCHA Security Verification
    const captchaCheck = verifyCaptchaChallenge(body.captchaToken, body.captchaAnswer);
    if (!captchaCheck.valid) {
      return NextResponse.json(
        {
          success: false,
          message: captchaCheck.error || "Security verification failed. Please try again.",
        },
        { status: 400 }
      );
    }

    // 4. Form Data Validation
    const validatedData = contactSchema.parse(body);
    const finalMessage = validatedData.message || validatedData.brief || "";

    const emailSubject = `🚀 Project Inquiry: ${validatedData.name} — ${validatedData.projectType} (${validatedData.budget})`;

    const htmlContent = buildInquiryEmailHtml({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      projectType: validatedData.projectType,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
      message: finalMessage,
      clientIp,
      recipientEmail: RECIPIENT_EMAIL,
    });

    let emailSent = false;
    let deliveryProvider = "none";
    let lastErrorDetails: any = null;

    // Option 1: Resend API
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromAddress =
          process.env.RESEND_FROM_EMAIL || "Vineet <hello@vineetvardhan.dev>";

        const { data, error } = await resend.emails.send({
          from: fromAddress,
          to: [RECIPIENT_EMAIL],
          replyTo: validatedData.email,
          subject: emailSubject,
          html: htmlContent,
        });

        if (error) {
          console.error("Resend API returned error:", error);
          lastErrorDetails = error;
        } else if (data?.id) {
          emailSent = true;
          deliveryProvider = `Resend (ID: ${data.id})`;
        }
      } catch (resendError: any) {
        console.error("Resend SDK execution error:", resendError);
        lastErrorDetails = resendError?.message || resendError;
      }
    }

    // Option 2: Nodemailer fallback if Resend not configured or failed
    if (!emailSent && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${validatedData.name} (via Portfolio)" <${process.env.EMAIL_USER}>`,
          to: RECIPIENT_EMAIL,
          replyTo: validatedData.email,
          subject: emailSubject,
          html: htmlContent,
        });
        emailSent = true;
        deliveryProvider = "Nodemailer (SMTP)";
      } catch (smtpError) {
        console.error("SMTP error:", smtpError);
      }
    }

    console.log("==========================================");
    console.log("📨 NEW CLIENT INQUIRY RECEIVED FOR:", RECIPIENT_EMAIL);
    console.log("Name:", validatedData.name);
    console.log("Email:", validatedData.email);
    console.log("Phone:", validatedData.phone || "N/A");
    console.log("Project Type:", validatedData.projectType);
    console.log("Budget:", validatedData.budget);
    console.log("Timeline:", validatedData.timeline);
    console.log("Message:", finalMessage);
    console.log("Delivery Status:", emailSent ? `Delivered via ${deliveryProvider}` : "Failed to deliver");
    console.log("==========================================");

    if (!emailSent && process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message:
            lastErrorDetails?.message ||
            "Unable to deliver message at this moment. Please connect directly via WhatsApp.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your inquiry has been sent to Vineet.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const firstErrorMessage = error.errors[0]?.message || "Validation failed";
      return NextResponse.json(
        { success: false, message: firstErrorMessage, errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Unhandled contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or reach out on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
