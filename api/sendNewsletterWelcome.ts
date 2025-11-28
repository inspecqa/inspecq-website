// sendNewsLetterWelcome.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[sendNewsLetterWelcome] invoked');
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { email } = req.body || {};
    console.log('[sendNewsLetterWelcome] body:', { email });

    if (!email) {
      console.log('[sendNewsLetterWelcome] missing email');
      return res.status(400).json({ error: 'Missing recipient email' });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.FROM_EMAIL || user;

    console.log('[sendNewsLetterWelcome] smtp config (host/port/user):', { host, port, user: !!user });

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
      console.log('[sendNewsLetterWelcome] transporter.verify success:', verified);
    } catch (verifyErr: any) {
      console.error('[sendNewsLetterWelcome] transporter.verify ERROR:', verifyErr && verifyErr.message);
    }

     const mailOptions = {
      from: `"InspecQ" <${from}>`,
      to: email,
      replyTo: from,
      subject:'You’re In! Thanks for Joining the InspecQ Newsletter',
      text: `Hi there,

Thank you for subscribing to the InspecQ newsletter. We’re glad to have you with us.

Every week, we’ll send you practical QA insights, testing best practices, and actionable strategies that help engineering teams build reliable, high-quality products. No noise, no spam - just value.

We created InspecQ with one goal in mind:
Help teams ship with confidence, through better testing, smarter processes, and a quality-first mindset.

If you ever have questions, feedback, or want us to cover a specific topic, reply directly to this email, we’d love to hear from you.

Thanks again for joining us.
Looking forward to sharing more with you soon.

Warm regards,
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
                  <p style="margin:0 0 16px 0">Hi there,</p>

                  <p style="margin:0 0 16px 0">
                    Thank you for subscribing to the <strong>InspecQ newsletter</strong>. We’re glad to have you with us.
                  </p>

                  <p style="margin:0 0 16px 0">
                    Every week, we’ll send you QA insights, Testing best practices, and Actionable strategies that help teams build reliable, high-quality products.
                    No noise, no spam.
                  </p>

                  </span>
                    <p style="margin:0 0 16px 0;padding:0;color:#0f172a"><span class="im">                    
                    We created InspecQ with one goal in mind:<br>
                    <strong>Help teams ship with confidence through better testing, smarter processes, and a quality-first mindset.</strong></p>
                  </span>
                </td>
              </tr>
                        
              <tr>
                <td style="padding:0 28px 24px 28px;color:#4b5563;font-size:14px;line-height:1.6">
                  <p style="margin:0 0 12px 0">
                    If you ever have questions, feedback, or want us to cover a specific topic, just reply directly to this email , we’d love to hear from you.
                  </p>

                  <p style="margin:0 0 4px 0">
                    Thanks again for joining us. Looking forward to sharing more with you soon.
                  </p>

                  <p style="margin:8px 0 0 0">
                    Warm regards,<br>
                    <strong><span class="il">InspecQ</span> Team</strong><br>
                  </p>
                </td>
              </tr>

               <tr>
                <td style="padding:0 28px 8px 28px">
                  <table cellpadding="0" cellspacing="0" border="0" align="left" style="margin:8px 0 24px 0">
                    <tbody><tr>
                      <td align="center" bgcolor="#0f766e" style="border-radius:999px">
                        <a href="https://inspecq.com" rel="noreferrer" style="display:inline-block;padding:12px 24px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call&amp;source=gmail&amp;ust=1764379168984000&amp;usg=AOvVaw32W6n_Fs-clumZ4S_uD0I9">
                          Visit InspecQ
                        </a>
                      </td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>

              
              <tr>
                <td style="background-color:#f1f5f9;padding:12px 28px;color:#9ca3af;font-size:11px;text-align:center">
                  You are receiving this email because you subscribed to the <span class="il">InspecQ newsletter</span>. If this wasn’t you, you may safely ignore this email.
                </td>
              </tr>
            </tbody></table>
          </td>
        </tr>
      </tbody></table>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[sendNewsLetterWelcome] sendMail info:', info);

    return res.status(200).json({ ok: true, info });
  } catch (err: any) {
    console.error('[sendNewsLetterWelcome] error:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Failed to send welcome email', details: err && err.message ? err.message : String(err) });
  }
}