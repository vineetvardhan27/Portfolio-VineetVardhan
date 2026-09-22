export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  clientIp: string;
  recipientEmail: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return (name.slice(0, 2) || "CL").toUpperCase();
}

function cleanPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d+]/g, "").replace(/^\+/, "");
}

export function buildInquiryEmailHtml(data: EmailData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : "";
  const safeProjectType = escapeHtml(data.projectType);
  const safeBudget = escapeHtml(data.budget);
  const safeTimeline = escapeHtml(data.timeline);
  const safeMessage = escapeHtml(data.message);
  const initials = getInitials(data.name);

  const formattedDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const replyMailto = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(
    `Re: Project Inquiry (${data.projectType}) — Vineet Vardhan`
  )}`;

  const whatsAppNumber = data.phone ? cleanPhoneForWhatsApp(data.phone) : "";
  const whatsAppUrl = whatsAppNumber
    ? `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
        `Hi ${data.name}, thank you for reaching out through my portfolio regarding your ${data.projectType} project!`
      )}`
    : "";

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Project Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #f1f5f9;">

  <!-- Outer Full-Width Container Table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0c10; padding: 32px 12px;">
    <tr>
      <td align="center">

        <!-- Main Card Table (Max 600px) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #14161f; border: 1px solid #232738; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.5);">

          <!-- Top Gradient Accent Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #06b6d4 100%); line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 28px 28px 20px 28px; background-color: #14161f; border-bottom: 1px solid #232738;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left">
                    <span style="font-family: monospace, -apple-system, sans-serif; font-size: 11px; font-weight: 700; color: #64748b; letter-spacing: 1.5px; text-transform: uppercase;">
                      VINEET VARDHAN • PORTFOLIO
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(37, 99, 235, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.5px;">
                      🔥 NEW INQUIRY
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 14px;">
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.4px;">
                      New Client Project Inquiry
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">
                      Received directly from <a href="https://vineetvardhan.dev" target="_blank" style="color: #60a5fa; text-decoration: none; font-weight: 500;">vineetvardhan.dev</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Profile Highlight Box -->
          <tr>
            <td style="padding: 24px 28px 12px 28px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1d29; border: 1px solid #2a2e42; border-radius: 12px; padding: 16px 20px;">
                <tr>
                  <!-- Initials Avatar -->
                  <td width="48" valign="top" style="padding-right: 14px;">
                    <div style="width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #7c3aed); color: #ffffff; font-size: 16px; font-weight: 700; line-height: 46px; text-align: center; border: 2px solid rgba(255,255,255,0.1);">
                      ${initials}
                    </div>
                  </td>
                  <!-- Name & Email Details -->
                  <td valign="middle">
                    <div style="font-size: 17px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px;">
                      ${safeName}
                    </div>
                    <div style="margin-top: 4px; font-size: 13px;">
                      <a href="${replyMailto}" style="color: #60a5fa; text-decoration: none; font-weight: 500;">
                        ${safeEmail}
                      </a>
                    </div>
                    ${
                      safePhone
                        ? `
                    <div style="margin-top: 4px; font-size: 13px; color: #cbd5e1;">
                      <span style="color: #94a3b8;">Phone/WA:</span> 
                      <a href="tel:${safePhone}" style="color: #38bdf8; text-decoration: none; font-weight: 500;">${safePhone}</a>
                    </div>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 2x2 Project Specifications Grid -->
          <tr>
            <td style="padding: 12px 28px 16px 28px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <!-- Project Type Card -->
                  <td width="48%" valign="top" style="background-color: #181a24; border: 1px solid #272b3c; border-radius: 10px; padding: 14px 16px;">
                    <div style="font-family: monospace, sans-serif; font-size: 10px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                      PROJECT TYPE
                    </div>
                    <div style="margin-top: 6px;">
                      <span style="display: inline-block; background-color: rgba(37, 99, 235, 0.2); border: 1px solid #2563eb; color: #93c5fd; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 6px;">
                        ${safeProjectType}
                      </span>
                    </div>
                  </td>

                  <td width="4%">&nbsp;</td>

                  <!-- Budget Card -->
                  <td width="48%" valign="top" style="background-color: #181a24; border: 1px solid #272b3c; border-radius: 10px; padding: 14px 16px;">
                    <div style="font-family: monospace, sans-serif; font-size: 10px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                      ESTIMATED BUDGET
                    </div>
                    <div style="margin-top: 6px; font-size: 14px; font-weight: 700; color: #34d399;">
                      ${safeBudget}
                    </div>
                  </td>
                </tr>

                <tr><td colspan="3" style="height: 12px; font-size: 12px; line-height: 12px;">&nbsp;</td></tr>

                <tr>
                  <!-- Timeline Card -->
                  <td width="48%" valign="top" style="background-color: #181a24; border: 1px solid #272b3c; border-radius: 10px; padding: 14px 16px;">
                    <div style="font-family: monospace, sans-serif; font-size: 10px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                      TIMELINE
                    </div>
                    <div style="margin-top: 6px; font-size: 13px; font-weight: 600; color: #f1f5f9;">
                      ${safeTimeline}
                    </div>
                  </td>

                  <td width="4%">&nbsp;</td>

                  <!-- Verification Badge Card -->
                  <td width="48%" valign="top" style="background-color: #181a24; border: 1px solid #272b3c; border-radius: 10px; padding: 14px 16px;">
                    <div style="font-family: monospace, sans-serif; font-size: 10px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                      SECURITY CHECK
                    </div>
                    <div style="margin-top: 6px; font-size: 12px; font-weight: 600; color: #10b981;">
                      🛡️ CAPTCHA Passed
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Brief Container -->
          <tr>
            <td style="padding: 12px 28px 24px 28px;">
              <div style="font-family: monospace, sans-serif; font-size: 10px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                PROJECT OVERVIEW &amp; REQUIREMENTS
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f1017; border: 1px solid #262939; border-radius: 12px;">
                <tr>
                  <td style="padding: 18px 20px; font-size: 14px; line-height: 1.65; color: #e2e8f0; white-space: pre-wrap; word-break: break-word;">
${safeMessage}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Direct Call-to-Action Buttons -->
          <tr>
            <td style="padding: 0 28px 30px 28px; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <!-- Reply via Email Button -->
                  <td align="center" style="border-radius: 8px; background-color: #2563eb;">
                    <a href="${replyMailto}" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; border: 1px solid #3b82f6;">
                      ✉️ Reply Directly to ${safeName}
                    </a>
                  </td>
                  ${
                    whatsAppUrl
                      ? `
                  <td width="12">&nbsp;</td>
                  <!-- WhatsApp Direct Chat Button -->
                  <td align="center" style="border-radius: 8px; background-color: #15803d;">
                    <a href="${whatsAppUrl}" target="_blank" style="display: inline-block; padding: 12px 20px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; border: 1px solid #22c55e;">
                      💬 Chat on WhatsApp
                    </a>
                  </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Metadata Bar -->
          <tr>
            <td style="padding: 20px 28px; background-color: #0e0f15; border-top: 1px solid #202330; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.6;">
                Delivered to <strong style="color: #94a3b8;">${escapeHtml(
                  data.recipientEmail
                )}</strong> via Portfolio Inquiry System.<br />
                Time: <span style="color: #cbd5e1;">${formattedDate} IST</span> &bull; Client IP: <span style="color: #cbd5e1;">${escapeHtml(
    data.clientIp
  )}</span>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Main Card Table -->

      </td>
    </tr>
  </table>
  <!-- /Outer Full-Width Container Table -->

</body>
</html>
  `.trim();
}
