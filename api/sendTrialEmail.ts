import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[sendTrialEmail] invoked');
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { name, email, calendlyLink } = req.body || {};
    console.log('[sendTrialEmail] body:', { name, email, calendlyLink });

    if (!email) {
      console.log('[sendTrialEmail] missing email');
      return res.status(400).json({ error: 'Missing recipient email' });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.FROM_EMAIL || user;

    console.log('[sendTrialEmail] smtp config (host/port/user):', { host, port, user: !!user });

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
      tls: {
        rejectUnauthorized: false,
      },
    });

    // verify connection configuration
    try {
      const verified = await transporter.verify();
      console.log('[sendTrialEmail] transporter.verify success:', verified);
    } catch (verifyErr: any) {
      console.error('[sendTrialEmail] transporter.verify ERROR:', verifyErr && verifyErr.message);
    }

    const safeName = typeof name === 'string' && name.trim().length ? name.trim() : 'there';
    const kickoffLink = calendlyLink || 'https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call';

    const mailOptions = {
      from: `"InspecQ" <${from}>`,
      to: email,
      replyTo: from,
      subject: 'Welcome to InspecQ: Your trial is active',
      text: `Hello ${safeName},

Thank you for trusting InspecQ. Your 7-day trial is officially active, and we are ready to start supporting your QA needs.

Here is the plan for your trial:

1. Schedule Your Kickoff Session (30 mins) We need a quick sync to understand your product, workflow, and quality expectations. ${kickoffLink}

2. We Configure Your Environment Once we align, our team will set up the testing scope and priorities so we can focus on the critical paths that matter to you.

3. Testing Begins & Reports Deliver You will start receiving structured reports highlighting defects, key observations, and actionable recommendations.

If you have any questions before the call, simply reply to this email.

We look forward to contributing to your product’s success.

Best Regards,
The InspecQ Team`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.cdnfonts.com/css/onnest" rel="stylesheet">
  <title>Welcome to InspecQ - Trial Started</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f5fb;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f5fb; padding: 24px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #e5fff4 0%, #008081 100%); padding: 32px 28px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0" style="display: inline-block;">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 16px;">
                          <!-- Logo -->
                          <img src="https://tzmp2b268dae69si.public.blob.vercel-storage.com/Logo%40300x.png" alt="InspecQ" style="width: 60px; height: 60px; display: block;">
                        </td>
                        <td style="vertical-align: middle; text-align: left;">
                          <!-- Company Name & Tagline -->
                          <div style="color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.03em; margin-bottom: 4px;">
                            InspecQ
                          </div>
                          <div style="color: rgba(255, 255, 255, 0.9); font-size: 13px; font-weight: 500;">
                            Built to Inspect. Powered by Quality.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Trial Badge -->
            <tr>
            <td style="padding: 0 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: -20px;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background: linear-gradient(135deg, #008080 0%, #20b2aa 100%); color: white; padding: 8px 24px; border-radius: 999px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(0, 128, 128, 0.3);">
                      🎉 7-Day Trial Active
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px 8px 28px; color: #0f172a; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #1e293b;">
                Hello ${safeName},
              </p>

              <p style="margin: 0 0 20px 0;">
                Thank you for trusting <strong style="color: #008080;">InspecQ</strong>. Your <strong>7-day trial</strong> is officially active, and we are ready to start supporting your QA needs.
              </p>

              <p style="margin: 0 0 16px 0; font-weight: 600; color: #1e293b;">
                Here is the plan for your trial:
              </p>

               <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
                <tr>
                  <td>
                    <!-- Step 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px; background: linear-gradient(to right, #f8f9fa 0%, #e8f5f5 100%); border-left: 4px solid #008080; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td>
                          <div style="display: flex; align-items: flex-start;">
                            <div style="background: #008080; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0; margin-right: 16px;">
                              1
                            </div>
                            <div style="flex: 1;">
                              <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 16px;">
                                Schedule Your Kickoff Session (15 mins)
                              </div>
                              <div style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
                                We need a quick sync to understand your product, workflow, and quality expectations.
                              </div>
                              <table cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td align="left" style="background: linear-gradient(135deg, #008080 0%, #20b2aa 100%); border-radius: 999px; box-shadow: 0 4px 12px rgba(0, 128, 128, 0.3);">
                                    <a href="[KICKOFF_LINK]" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 999px; font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
                                      📅 Book Your Kickoff Now
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>


                     <!-- Step 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px; background: #f8f9fa; border-left: 4px solid #cbd5e1; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 48px; vertical-align: top; padding-right: 0;">
                                <div style="width: 32px; height: 32px; background: #cbd5e1; border-radius: 50%; color: #475569; font-weight: 700; font-size: 16px; text-align: center; line-height: 32px;">
                                  2
                                </div>
                              </td>
                              <td style="vertical-align: top;">
                                <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 16px;">
                                  We Configure Your Environment
                                </div>
                                <div style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                                  Once we align, our team will set up the testing scope and priorities so we can focus on the critical paths that matter to you.
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  <!-- Step 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8f9fa; border-left: 4px solid #cbd5e1; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 48px; vertical-align: top; padding-right: 0;">
                                <div style="width: 32px; height: 32px; background: #cbd5e1; border-radius: 50%; color: #475569; font-weight: 700; font-size: 16px; text-align: center; line-height: 32px;">
                                  3
                                </div>
                              </td>
                              <td style="vertical-align: top;">
                                <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 16px;">
                                  Testing Begins & Reports Deliver
                                </div>
                                <div style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                                  You will start receiving structured reports highlighting defects, key observations, and actionable recommendations.
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          
          <!-- Closing Message -->
          <tr>
            <td style="padding: 16px 28px 32px 28px; color: #4b5563; font-size: 15px; line-height: 1.6;">
              <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0; color: #92400e;">
                  💡 <strong>Quick Tip:</strong> Have questions before the call? Simply reply to this email—we're here to help!
                </p>
              </div>

              <p style="margin: 0 0 12px 0;">
                We look forward to contributing to your product's success.
              </p>

              <p style="margin: 16px 0 0 0;">
                <strong style="color: #1e293b;">Best Regards,</strong><br>
                <span style="color: #008080; font-weight: 600;">The InspecQ Team</span>
              </p>
            </td>
          </tr>

          <!-- Social Links -->
          <tr>
            <td style="padding: 24px 28px; border-top: 1px solid #e5e7eb;">
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 12px;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="https://www.inspecq.com" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px;">Website</a>
                  </td>
                  <td style="color: #cbd5e1;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://www.linkedin.com/company/qainspec/" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px;">LinkedIn</a>
                  </td>
                  <td style="color: #cbd5e1;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://www.facebook.com/qainspec" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px;">Facebook</a>
                  </td>
                  <td style="color: #cbd5e1;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://x.com/qainspec" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px;">Twitter</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 20px 28px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; line-height: 1.5;">
                You are receiving this email because you requested a 7-day QA trial with <strong style="color: #008080;">InspecQ</strong>.
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                © 2025 InspecQ. All rights reserved.
              </p>
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

    const info = await transporter.sendMail(mailOptions);
    console.log('[sendTrialEmail] sendMail info:', info);

    return res.status(200).json({ ok: true, info });
  } catch (err: any) {
    console.error('[sendTrialEmail] error:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Failed to send email', details: err && err.message ? err.message : String(err) });
  }
}