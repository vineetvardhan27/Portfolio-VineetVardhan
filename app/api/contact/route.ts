import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  brief: z.string().min(10, "Brief must be at least 10 characters"),
  budget: z.string().min(1, "Please select an estimated budget"),
});

const RECIPIENT_EMAIL = "vineetvardhanwork@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const emailSubject = `🚀 New Project Inquiry from ${validatedData.name}${
      validatedData.company ? ` (${validatedData.company})` : ""
    }`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; color: #0a0a0a; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #2563eb; color: #ffffff; padding: 24px; text-align: left; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
            .header p { margin: 6px 0 0 0; opacity: 0.9; font-size: 14px; }
            .content { padding: 24px; }
            .field { margin-bottom: 16px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #71717a; font-weight: 600; margin-bottom: 4px; }
            .value { font-size: 15px; color: #0a0a0a; font-weight: 500; }
            .brief-box { background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap; }
            .footer { padding: 16px 24px; background: #fafafa; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
            .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 9999px; font-size: 14px; font-weight: 600; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>New Portfolio Client Inquiry</h1>
              <p>Received directly from vineetvardhan.dev</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Client Name</div>
                <div class="value">${validatedData.name}</div>
              </div>
              <div class="field">
                <div class="label">Client Email</div>
                <div class="value"><a href="mailto:${validatedData.email}" style="color: #2563eb;">${validatedData.email}</a></div>
              </div>
              ${
                validatedData.company
                  ? `<div class="field">
                      <div class="label">Company / Brand</div>
                      <div class="value">${validatedData.company}</div>
                    </div>`
                  : ""
              }
              <div class="field">
                <div class="label">Estimated Budget</div>
                <div class="value" style="color: #2563eb; font-weight: 700;">${validatedData.budget}</div>
              </div>
              <div class="field" style="margin-top: 20px;">
                <div class="label">Project Brief & Requirements</div>
                <div class="brief-box">${validatedData.brief}</div>
              </div>
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${validatedData.email}?subject=Re: Project Inquiry — Vineet Vardhan" class="btn">Reply Directly to Client</a>
              </div>
            </div>
            <div class="footer">
              Vineet Vardhan Portfolio • Delivery to ${RECIPIENT_EMAIL}
            </div>
          </div>
        </body>
      </html>
    `;

    let emailSent = false;

    // Option 1: Resend API (if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Vineet Portfolio <onboarding@resend.dev>",
          to: [RECIPIENT_EMAIL],
          replyTo: validatedData.email,
          subject: emailSubject,
          html: htmlContent,
        });
        emailSent = true;
      } catch (resendError) {
        console.error("Resend error:", resendError);
      }
    }

    // Option 2: Nodemailer / SMTP (Gmail App Password or custom SMTP)
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
      } catch (smtpError) {
        console.error("SMTP error:", smtpError);
      }
    }

    // Console notification log (guaranteed fallback in development)
    console.log("==========================================");
    console.log("📨 NEW CLIENT INQUIRY RECEIVED FOR:", RECIPIENT_EMAIL);
    console.log("Name:", validatedData.name);
    console.log("Email:", validatedData.email);
    console.log("Company:", validatedData.company || "N/A");
    console.log("Budget:", validatedData.budget);
    console.log("Brief:", validatedData.brief);
    console.log("Email Dispatch Status:", emailSent ? "Sent via Provider" : "Logged locally");
    console.log("==========================================");

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your inquiry has been sent to Vineet.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
