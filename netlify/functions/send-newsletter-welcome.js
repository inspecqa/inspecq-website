const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { email } = body;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = "You’re In! Thanks for Joining the InspecQ Newsletter";

    // Plain text fallback
    const textBody = `Hi there,

Thank you for subscribing to the InspecQ newsletter—we’re glad to have you with us.

Every week, we’ll send you practical QA insights, testing best practices, and actionable strategies that help engineering teams build reliable, high-quality products. No noise, no spam—just value.

Here’s what you can expect:

• QA Tips & Techniques:
  Clear, actionable guidance you can apply immediately.

• Automation & API Testing Playbooks:
  Framework ideas, scripts, and implementation examples.

• Performance Testing & CI/CD Practices:
  Real-world techniques for speed, scalability, and stability.

• InspecQ Updates, Tools & Templates:
  Free resources, checklists, and improvements we release.

We created InspecQ with one goal in mind:
Help teams ship with confidence — through better testing, smarter processes, and a quality-first mindset.

If you ever have questions, feedback, or want us to cover a specific topic, reply directly to this email — we’d love to hear from you.

Thanks again for joining us.
Looking forward to sharing more with you soon.

Warm regards,
InspecQ Team
https://inspecq.com
`;

    // HTML version
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${subject}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body, table, td, p { margin: 0; padding: 0; }
  body {
    background-color: #0f172a;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #e5e7eb;
  }
  a { color: #14b8a6; text-decoration: none; }
  .wrapper { width: 100%; table-layout: fixed; padding: 24px 12px; }
  .main {
    max-width: 600px; margin: 0 auto;
    background-color: #020617;
    border-radius: 12px; border: 1px solid #1f2937;
    overflow: hidden;
  }
  .header {
    background: radial-gradient(circle at top, #0f766e, #020617);
    padding: 24px; text-align: left;
  }
  .brand { font-size: 18px; font-weight: 700; letter-spacing: .08em; color: #a5f3fc; }
  .headline { font-size: 22px; font-weight: 700; color: #ecfeff; margin-top: 8px; }
  .content { padding: 24px; }
  .content p { font-size: 14px; line-height: 1.6; margin-bottom: 12px; color: #e5e7eb; }
  .content ul { padding-left: 20px; margin-bottom: 16px; }
  .content li { font-size: 14px; margin-bottom: 12px; line-height: 1.6; }
  .label { font-weight: 600; color: #67e8f9; }
  .footer {
    padding: 16px 24px;
    border-top: 1px solid #1f2937;
    font-size: 12px;
    color: #9ca3af;
  }
  .footer a { color: #67e8f9; }
</style>
</head>

<body>
<table class="wrapper" role="presentation" cellspacing="0" cellpadding="0">
  <tr>
    <td align="center">
      <table class="main" role="presentation" cellspacing="0" cellpadding="0">

        <tr>
          <td class="header">
            <div class="brand">INSPECQ</div>
            <div class="headline">You’re In! Thanks for Joining the InspecQ Newsletter</div>
          </td>
        </tr>

        <tr>
          <td class="content">
            <p>Hi there,</p>

            <p>
              Thank you for subscribing to the <strong>InspecQ newsletter</strong>—we’re glad to have you with us.
            </p>

            <p>
              Every week, we’ll send you <strong>practical QA insights</strong>, <strong>testing best practices</strong>,
              and <strong>actionable strategies</strong> that help engineering teams build reliable, high-quality products.
              No noise, no spam—just value.
            </p>

            <p>Here’s what you can expect:</p>

            <ul>
              <li><span class="label">QA Tips & Techniques:</span><br>Clear, actionable guidance you can apply immediately.</li>
              <li><span class="label">Automation & API Testing Playbooks:</span><br>Framework ideas, scripts, and implementation examples.</li>
              <li><span class="label">Performance Testing & CI/CD Practices:</span><br>Real-world techniques for speed, scalability, and stability.</li>
              <li><span class="label">InspecQ Updates, Tools & Templates:</span><br>Free resources, checklists, and improvements we release.</li>
            </ul>

            <p>
              We created InspecQ with one goal in mind:<br>
              <strong>Help teams ship with confidence — through better testing, smarter processes, and a quality-first mindset.</strong>
            </p>

            <p>
              If you ever have questions, feedback, or want us to cover a specific topic,
              just reply directly to this email — we’d love to hear from you.
            </p>

            <p>
              Thanks again for joining us.<br>
              Looking forward to sharing more with you soon.
            </p>

            <p>
              Warm regards,<br>
              <strong>InspecQ Team</strong>
            </p>
          </td>
        </tr>

        <tr>
          <td class="footer">
            <p>
              InspecQ · Quality Assurance Services<br />
              <a href="https://inspecq.com" target="_blank">https://inspecq.com</a>
            </p>
            <p style="margin-top: 8px;">
              You are receiving this email because you subscribed to the InspecQ newsletter.
              If this wasn’t you, you may safely ignore this email.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
`;

    await transporter.sendMail({
      from: `"InspecQ" <${process.env.SMTP_FROM || "contact@inspecq.com"}>`,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Welcome email sent" }),
    };
  } catch (err) {
    console.error("[sendNewsletterWelcome] Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send welcome email" }),
    };
  }
};