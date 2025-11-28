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
      subject: 'Your InspecQ Trial Is Activated',
      text: `Hello ${safeName},

Thank you for choosing InspecQ. Your 7-day trial has been activated, and our team is ready to begin supporting your QA needs.

To get started, please follow the steps below:

1. Schedule Your Kickoff Session
This 15–20 minute call helps us understand your product, workflow, and quality expectations.

2. We Configure Your Trial
Our team reviews your inputs and sets up your testing environment, scope, and priorities so we can focus on what matters most to you.

3. Testing Begins
You will receive structured reports that highlight defects, key observations, and improvement recommendations, based on the priorities we lock in together during our meeting.

Schedule your kickoff call here: 

${kickoffLink}

If you require assistance at any stage, simply reply to this email and our team will respond promptly.

We look forward to contributing to your product’s success.

Best Regards,
InspecQ Team`,
      html: `
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f5fb; padding:24px 0">
        <tbody><tr>
          <td align="center">
            
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden">
              
              <tbody><tr>
                <td style="background-color:#008080;padding:20px 28px">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody><tr>
                      <td align="center">
                        <div style="color:#ecfeff;font-size:20px;font-weight:700;letter-spacing:0.03em">
                          <span class="il">InspecQ</span>
                        </div>
                        <div style="color:#ccfbf1;font-size:12px;margin-top:4px">
                          Built to Inspect. Powered by Quality.
                        </div>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px 8px 28px;color:#0f172a;font-size:16px;line-height:1.6"><span class="im">
                  <p style="margin:0 0 16px 0">Hello ${safeName},</p>

                  <p style="margin:0 0 16px 0">
                    Thank you for choosing <strong><span class="il">InspecQ</span></strong>. Your <strong>7-day trial</strong> has been activated, and our team is ready to begin supporting your QA needs.
                  </p>

                  <p style="margin:0 0 16px 0">
                    To get started, please follow the steps below:
                  </p>

                  </span><ol style="margin:0 0 16px 20px;padding:0;color:#0f172a"><span class="im">
                    <li style="margin-bottom:12px">
                      <strong>Schedule Your Kickoff Session</strong><br>
                      This 15–20 minute call helps us understand your product, workflow, and quality expectations.<br>
                    </li>
                    <li style="margin-bottom:12px">
                      <strong>We Configure Your Trial</strong><br>
                      Our team reviews your inputs and sets up your testing environment, scope, and priorities so we can focus on what matters most to you.
                    </li>
                    <li style="margin-bottom:4px">
                      <strong>Testing Begins</strong><br>
                      You will receive structured reports that highlight defects, key observations, and improvement recommendations, based on the priorities we lock in together during our meeting.
                    </li>
                  </span></ol>
                </td>
              </tr>
              
              <tr>
                <td style="padding:0 28px 8px 28px">
                  <table cellpadding="0" cellspacing="0" border="0" align="left" style="margin:8px 0 24px 0">
                    <tbody><tr>
                      <td align="center" bgcolor="#0f766e" style="border-radius:999px">
                        <a href="https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call" rel="noreferrer" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call&amp;source=gmail&amp;ust=1764379168984000&amp;usg=AOvVaw32W6n_Fs-clumZ4S_uD0I9">
                          Schedule Your Kickoff Call
                        </a>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>

              
              <tr>
                <td style="padding:0 28px 24px 28px;color:#4b5563;font-size:14px;line-height:1.6">
                  <p style="margin:0 0 12px 0">
                    If you require assistance at any stage, simply reply to this email and our team will respond promptly.
                  </p>

                  <p style="margin:0 0 4px 0">
                    We look forward to contributing to your product’s success.
                  </p>

                  <p style="margin:8px 0 0 0">
                    Best Regards,<br>
                    <strong><span class="il">InspecQ</span> Team</strong><br>
                  </p>
                </td>
              </tr>

              
              <tr>
                <td style="background-color:#f1f5f9;padding:12px 28px;color:#9ca3af;font-size:11px;text-align:center">
                  You are receiving this email because you requested a 7-day QA trial with <span class="il">InspecQ</span>.
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody></table>
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