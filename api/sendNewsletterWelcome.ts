import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const port = Number(process.env.SMTP_PORT || 587);
    const secure = port === 465; // true for 465, false for other ports

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = "You’re In! Thanks for Joining the InspecQ Newsletter";

    const textBody = `Hi there,

Thank you for subscribing to the InspecQ newsletter. We’re glad to have you with us.

Every week, we’ll send you practical QA insights, testing best practices, and actionable strategies that help engineering teams build reliable, high-quality products. No noise, no spam - just value.

We created InspecQ with one goal in mind:
Help teams ship with confidence, through better testing, smarter processes, and a quality-first mindset.

If you ever have questions, feedback, or want us to cover a specific topic, reply directly to this email, we’d love to hear from you.

Thanks again for joining us.
Looking forward to sharing more with you soon.

Warm regards,
InspecQ Team
`;

    const htmlBody = `<!DOCTYPE html>
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
              Thank you for subscribing to the <strong>InspecQ newsletter</strong>—We’re glad to have you with us.
            </p>

            <p>
              Every week, we’ll send you <strong>practical QA insights</strong>, <strong>testing best practices</strong>,
              and <strong>actionable strategies</strong> that help engineering teams build reliable, high-quality products.
              No noise, no spam.
            </p>

            <p>
              We created InspecQ with one goal in mind:<br>
              <strong>Help teams ship with confidence - through better testing, smarter processes, and a quality-first mindset.</strong>
            </p>

            <p>
              If you ever have questions, feedback, or want us to cover a specific topic,
              just reply directly to this email — we’d love to hear from you.
            </p>

            <p>
              Thanks again for joining us.<br />
              Looking forward to sharing more with you soon.
            </p>

            <p>
              Warm regards,<br />
              <strong>InspecQ Team</strong>
            </p>
          </td>
        </tr>

        <tr>
          <td class="footer">
            <p>
              InspecQ · Quality Assurance Services<br />
              <a href="https://inspecq.com" target="_blank" rel="noopener">https://inspecq.com</a>
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
</html>`;

    await transporter.sendMail({
      from: `"InspecQ" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    res.status(200).json({ message: 'Welcome email sent' });
  } catch (err: any) {
    console.error(err);
    // Return a safe generic message while logging the error server-side
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
}