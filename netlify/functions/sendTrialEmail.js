// netlify/functions/sendTrialEmail.js
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, calendlyLink } = body;

    if (!email) {
      return {
        statusCode: 400,
        body: "Missing recipient email",
      };
    }

    // Create SMTP transporter using Hostinger credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. smtp.hostinger.com
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER, // welcome@inspecq.com
        pass: process.env.SMTP_PASS, // mailbox password
      },
    });

    const fromEmail = process.env.FROM_EMAIL || "welcome@inspecq.com";
    const displayName = "InspecQ";

    const kickoffLink =
      calendlyLink ||
      "https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call";

    const mailOptions = {
      from: `"${displayName}" <${fromEmail}>`,
      to: email,
      subject: "Your InspecQ Trial Is Activated — Next Steps Inside",

      // ⭐ TEXT VERSION E
      text: `
Hello ${name || ""},

Thank you for choosing InspecQ. Your 7-day trial has been activated, and our team is ready to begin supporting your QA needs.

To get started, please follow the steps below:

1) Book your kickoff session so we can understand your product, workflow, and quality expectations:
${kickoffLink}

2) We will review your inputs and set up your testing environment, priorities, and scope.

3) Our QA team will begin testing and provide detailed defect reports, performance observations, and recommendations.

If you require assistance at any stage, simply reply to this email and our team will respond promptly.

We look forward to contributing to your product’s success.

Regards,
InspecQ QA Team
welcome@inspecq.com
`,

      // ⭐ HTML VERSION E
      html: `
        <p>Hello ${name || ""},</p>

        <p>Thank you for choosing <strong>InspecQ</strong>. Your 7-day trial has been activated, and our team is ready to begin supporting your QA needs.</p>

        <p>To get started, please follow the steps below:</p>

        <ol>
          <li><strong>Book Your Kickoff Session</strong><br>
            This 15–20 minute call helps us understand your product, workflow, and quality expectations.<br>
            <a href="${kickoffLink}" target="_blank" rel="noreferrer">Book your kickoff session</a>
          </li>

          <li><strong>We Configure Your Trial</strong><br>
            Our team reviews your inputs and sets up your testing environment, scope, and priorities.
          </li>

          <li><strong>Testing Begins</strong><br>
            You will receive structured reports that include defects, performance observations, and improvement recommendations.
          </li>
        </ol>

        <p>If you require assistance at any stage, simply reply to this message and our team will respond promptly.</p>

        <p>We look forward to contributing to your product’s success.</p>

        <p>Regards,<br/>
        <strong>InspecQ QA Team</strong><br/>
        <a href="mailto:welcome@inspecq.com">welcome@inspecq.com</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("sendTrialEmail error:", err);
    return {
      statusCode: 500,
      body: "Failed to send email",
    };
  }
};