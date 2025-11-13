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
      subject: "Welcome to your InspecQ 7-Day QA Trial 🎉",
      text: `Hi ${name || ""},

Thanks for requesting a 7-day free trial with InspecQ.

Here’s what happens next:
1. Book your quick kickoff call: ${kickoffLink}
2. We’ll review your product and agree on the scope.
3. Our team will start testing and share findings during/after the trial.

Kickoff Call:
${kickoffLink}

If you have any questions before the call, just reply to this email.

Best,
InspecQ Team
welcome@inspecq.com
`,
      html: `
        <p>Hi ${name || ""},</p>
        <p>Thanks for requesting a <strong>7-day free trial</strong> with <strong>InspecQ</strong>. We're excited to help you ship with more confidence.</p>
        <p>Here’s what happens next:</p>
        <ol>
          <li>Book a quick <strong>kickoff call</strong> so we can understand your product and priorities.</li>
          <li>We’ll confirm the scope and environments we’ll test.</li>
          <li>Our QA team will start testing and share clear findings, risks, and recommendations.</li>
        </ol>
        <p><strong>Kickoff Call:</strong></p>
        <p><a href="${kickoffLink}" target="_blank" rel="noreferrer">Book your kickoff call</a></p>
        <p>If you have any questions before the call, just hit reply and we’ll be happy to help.</p>
        <p>Best,<br/>InspecQ Team<br/><a href="mailto:welcome@inspecq.com">welcome@inspecq.com</a></p>
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