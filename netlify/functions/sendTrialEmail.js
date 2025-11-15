// // netlify/functions/sendTrialEmail.js
// const nodemailer = require("nodemailer");

// exports.handler = async (event) => {
//   // Only allow POST
//   if (event.httpMethod !== "POST") {
//     return {
//       statusCode: 405,
//       body: "Method Not Allowed",
//     };
//   }

//   try {
//     const body = JSON.parse(event.body || "{}");
//     const { name, email, calendlyLink } = body;

//     if (!email) {
//       return {
//         statusCode: 400,
//         body: "Missing recipient email",
//       };
//     }

//     // Create SMTP transporter using Hostinger credentials
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST, // e.g. smtp.hostinger.com
//       port: Number(process.env.SMTP_PORT || 587),
//       secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
//       auth: {
//         user: process.env.SMTP_USER, // welcome@inspecq.com
//         pass: process.env.SMTP_PASS, // mailbox password
//       },
//     });

//     const fromEmail = process.env.FROM_EMAIL || "welcome@inspecq.com";
//     const displayName = "InspecQ";

//     const kickoffLink =
//       calendlyLink ||
//       "https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call";

//     const mailOptions = {
//       from: `"${displayName}" <${fromEmail}>`,
//       to: email,
//       subject: "Your InspecQ Trial Is Activated — Next Steps Inside",

//       // ⭐ TEXT VERSION E
//       text: `
// Hello ${name || ""},

// Thank you for choosing InspecQ. Your 7-day trial has been activated, and our team is ready to begin supporting your QA needs.

// To get started, please follow the steps below:

// 1) Book your kickoff session so we can understand your product, workflow, and quality expectations:
// ${kickoffLink}

// 2) We will review your inputs and set up your testing environment, priorities, and scope.

// 3) Our QA team will begin testing and provide detailed defect reports, performance observations, and recommendations.

// If you require assistance at any stage, simply reply to this email and our team will respond promptly.

// We look forward to contributing to your product’s success.

// Regards,
// InspecQ QA Team
// welcome@inspecq.com
// `,

//       // ⭐ HTML VERSION E
//       html: `
//         <p>Hello ${name || ""},</p>

//         <p>Thank you for choosing <strong>InspecQ</strong>. Your 7-day trial has been activated, and our team is ready to begin supporting your QA needs.</p>

//         <p>To get started, please follow the steps below:</p>

//         <ol>
//           <li><strong>Book Your Kickoff Session</strong><br>
//             This 15–20 minute call helps us understand your product, workflow, and quality expectations.<br>
//             <a href="${kickoffLink}" target="_blank" rel="noreferrer">Book your kickoff session</a>
//           </li>

//           <li><strong>We Configure Your Trial</strong><br>
//             Our team reviews your inputs and sets up your testing environment, scope, and priorities.
//           </li>

//           <li><strong>Testing Begins</strong><br>
//             You will receive structured reports that include defects, performance observations, and improvement recommendations.
//           </li>
//         </ol>

//         <p>If you require assistance at any stage, simply reply to this message and our team will respond promptly.</p>

//         <p>We look forward to contributing to your product’s success.</p>

//         <p>Regards,<br/>
//         <strong>InspecQ QA Team</strong><br/>
//         <a href="mailto:welcome@inspecq.com">welcome@inspecq.com</a></p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ ok: true }),
//     };
//   } catch (err) {
//     console.error("sendTrialEmail error:", err);
//     return {
//       statusCode: 500,
//       body: "Failed to send email",
//     };
//   }
// };

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

    const safeName = name && name.trim().length > 0 ? name.trim() : "there";

    const mailOptions = {
      from: `"${displayName}" <${fromEmail}>`,
      to: email,
      replyTo: fromEmail,
      subject: "Your InspecQ Trial Is Activated — Next Steps Inside",

      // TEXT VERSION (Version E)
      text: `
Hello ${safeName},

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

      // HTML VERSION (Branded Version E)
      html: `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>InspecQ Trial Welcome</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0; padding:0; background-color:#f4f5fb; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5fb; padding:24px 0;">
        <tr>
          <td align="center">
            <!-- Outer container -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 24px rgba(15,23,42,0.10);">
              <!-- Header -->
              <tr>
                <td style="background-color:#008080; padding:20px 28px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center">
                        <div style="color:#ecfeff; font-size:20px; font-weight:700; letter-spacing:0.03em;">
                          InspecQ
                        </div>
                        <div style="color:#ccfbf1; font-size:12px; margin-top:4px;">
                          Built to Inspect. Powered by Quality.
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>


              

              <!-- Body -->
              <tr>
                <td style="padding:24px 28px 8px 28px; color:#0f172a; font-size:16px; line-height:1.6;">
                  <p style="margin:0 0 16px 0;">Hello ${safeName},</p>

                  <p style="margin:0 0 16px 0;">
                    Thank you for choosing <strong>InspecQ</strong>. Your <strong>7-day trial</strong> has been activated, and our team is ready to begin supporting your QA needs.
                  </p>

                  <p style="margin:0 0 16px 0;">
                    Here’s what we’ll do next to get things started:
                  </p>

                  <ol style="margin:0 0 16px 20px; padding:0; color:#0f172a;">
                    <li style="margin-bottom:12px;">
                      <strong>Schedule Your Kickoff Session</strong><br />
                      This 15–20 minute call helps us understand your product, workflow, and quality expectations.<br />
                    </li>
                    <li style="margin-bottom:12px;">
                      <strong>We Configure Your Trial</strong><br />
                      Our team reviews your inputs and sets up your testing environment, scope, and priorities so we can focus on what matters most to you.
                    </li>
                    <li style="margin-bottom:4px;">
                      <strong>Testing Begins</strong><br />
                      You will receive structured reports that highlight defects, key observations, and improvement recommendations, based on the priorities we lock in together during our meeting.
                    </li>
                  </ol>
                </td>
              </tr>


              <!-- Button block -->
              <tr  align="center" >
                <td style="padding:0 28px 8px 28px;">
                  <table cellpadding="0" cellspacing="0" border="0" align="left" style="margin:8px 0 24px 0;">
                    <tr>
                      <td align="center" bgcolor="#008080" style="border-radius:999px;">
                        <a
                          href="${kickoffLink}"
                          target="_blank"
                          rel="noreferrer"
                          style="
                            display:inline-block;
                            padding:12px 24px;
                            font-size:15px;
                            font-weight:600;
                            color:#ffffff;
                            text-decoration:none;
                            border-radius:999px;
                            font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                          "
                        >
                          Schedule Your Kickoff Call
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0 28px 20px 28px; color:#475569; font-size:13px; line-height:1.6;">
                  <p style="margin:0;">
                    No credit card or payment method is required. The trial does not auto-upgrade into a paid plan.
                    Your 7-day trial is completely free, and you may cancel anytime during the trial with no obligations.
                  </p>
                </td>
              </tr>


              <!-- Footer text -->
              <tr>
                <td style="padding:0 28px 24px 28px; color:#4b5563; font-size:14px; line-height:1.6;">
                  <p style="margin:0 0 12px 0;">
                    If you require assistance at any stage, simply reply to this email and our team will respond promptly.
                  </p>

                  <p style="margin:0 0 4px 0;">
                    We look forward to contributing to your product’s success.
                  </p>

                  <p style="margin:8px 0 0 0;">
                    Best Regards,<br />
                    <strong>InspecQ Team</strong><br />
                  </p>
                </td>
              </tr>

              <!-- Subtle footer band -->
              <tr>
                <td style="background-color:#f1f5f9; padding:12px 28px; color:#9ca3af; font-size:11px; text-align:center;">
                  You are receiving this email because you requested a 7-day QA trial with InspecQ.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
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
