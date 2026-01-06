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

We look forward to contributing to your product's success.

Best Regards,
The InspecQ Team`,
      html: `<!DOCTYPE html>
<html>
<head>
<title>Welcome to InspecQ - Your Trial is Active</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
	/* FONTS */
    @media screen {
		@font-face {
		  font-family: 'Lato';
		  font-style: normal;
		  font-weight: 400;
		  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
		}
		
		@font-face {
		  font-family: 'Lato';
		  font-style: normal;
		  font-weight: 700;
		  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
		}
    }
    
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f8fffe; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Your 7-day trial is officially active. Let's get started with your QA journey.
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    
    <!-- HERO SECTION WITH LOGO -->
    <tr>
        <td align="center" style="padding: 0px 10px 0px 10px; background: linear-gradient(135deg, #e5fff4 0%, #b8f0e8 100%);">
            <table border="0" cellpadding="0" cellspacing="0" width="600" >
                <tr>
                    <td align="center" style="padding: 50px 40px 30px 40px;">
                        <!-- Logo and Brand -->
                        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 30px auto;">
                            <tr>
                                <td align="center" valign="middle" style="padding-right: 16px;">
                                    <a href="https://inspecq.com" target="_blank">
                                        <img alt="InspecQ" src="https://tzmp2b268dae69si.public.blob.vercel-storage.com/Logo%40300x.png" width="60" height="60" style="display: block; font-family: 'Lato', Helvetica, Arial, sans-serif;" border="0">
                                    </a>
                                </td>
                                <td align="left" valign="middle">
                                    <!-- Company Name & Tagline -->
                                    <div style="color: #008080; font-size: 24px; font-weight: 700; letter-spacing: 0.03em; margin-bottom: 4px; font-family: 'Lato', Helvetica, Arial, sans-serif;">
                                        InspecQ
                                    </div>
                                    <div style="color: #008080; font-size: 13px; font-weight: 500; font-family: 'Lato', Helvetica, Arial, sans-serif;">
                                        Built to Inspect. Powered by Quality.
                                    </div>
                                </td>
                            </tr>
                        </table>
                        
                        <h1 style="font-size: 40px; font-weight: 700; margin: 0 0 15px 0; color: #008081; font-family: 'Lato', Helvetica, Arial, sans-serif; line-height: 1.2;">Welcome to InspecQ</h1>
                        <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #2d5f5d; line-height: 28px; font-weight: 400;">Your trial is active. Let's elevate your product quality together.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    
    <!-- MAIN CONTENT -->
    <tr>
        <td bgcolor="#f8fffe" align="center" style="padding: 30px 10px 20px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="box-shadow: 0 4px 12px rgba(0,128,129,0.08);">
              
              <!-- GREETING -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 40px 40px 20px 40px; border-radius: 8px 8px 0 0;">
                  <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #333333; line-height: 28px;">Hello <strong style="color: #008081;">${safeName}</strong>,</p>
                </td>
              </tr>
              
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 30px 40px;">
                  <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #666666; line-height: 26px;">Thank you for trusting InspecQ. Your <strong style="color: #008081;">7-day trial</strong> is officially active, and we are ready to start supporting your QA needs.</p>
                </td>
              </tr>
              
              <!-- TIMELINE HEADER -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 40px 30px 40px;">
                  <h2 style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 24px; color: #111111; font-weight: 700;">Your Trial Roadmap</h2>
                </td>
              </tr>
              
              <!-- STEP 1 -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 25px 40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="50" valign="top">
                        <div style="width: 42px; height: 42px; background: linear-gradient(135deg, #e5fff4 0%, #008081 100%); border-radius: 50%; text-align: center; line-height: 42px;">
                          <span style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #ffffff;">1</span>
                        </div>
                      </td>
                      <td valign="top">
                        <h3 style="margin: 0 0 8px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #008081; font-weight: 700;">Schedule Your Kickoff Session</h3>
                        <p style="margin: 0 0 8px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; color: #999999; font-weight: 400;">30 minutes</p>
                        <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 24px;">We need a quick sync to understand your product, workflow, and quality expectations.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- CTA BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 35px 92px;">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 6px; background: linear-gradient(135deg, #00a896 0%, #008081 100%); box-shadow: 0 4px 12px rgba(0,128,129,0.25);">
                        <a href="${kickoffLink}" target="_blank" style="font-size: 16px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 14px 32px; display: inline-block; font-weight: 700; letter-spacing: 0.5px;">Schedule Now →</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- DIVIDER -->
              <tr>
                <td bgcolor="#ffffff" align="center" style="padding: 0px 40px 25px 40px;">
                  <div style="border-top: 2px solid #f0f0f0; width: 100%;"></div>
                </td>
              </tr>
              
              <!-- STEP 2 -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 25px 40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="50" valign="top">
                        <div style="width: 42px; height: 42px; background: linear-gradient(135deg, #e5fff4 0%, #008081 100%); border-radius: 50%; text-align: center; line-height: 42px;">
                          <span style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #ffffff;">2</span>
                        </div>
                      </td>
                      <td valign="top">
                        <h3 style="margin: 0 0 10px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #008081; font-weight: 700;">We Configure Your Environment</h3>
                        <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 24px;">Once we align, our team will set up the testing scope and priorities so we can focus on the critical paths that matter to you.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- DIVIDER -->
              <tr>
                <td bgcolor="#ffffff" align="center" style="padding: 0px 40px 25px 40px;">
                  <div style="border-top: 2px solid #f0f0f0; width: 100%;"></div>
                </td>
              </tr>
              
              <!-- STEP 3 -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 40px 40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td width="50" valign="top">
                        <div style="width: 42px; height: 42px; background: linear-gradient(135deg, #e5fff4 0%, #008081 100%); border-radius: 50%; text-align: center; line-height: 42px;">
                          <span style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #ffffff;">3</span>
                        </div>
                      </td>
                      <td valign="top">
                        <h3 style="margin: 0 0 10px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #008081; font-weight: 700;">Testing Begins & Reports Deliver</h3>
                        <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 24px;">You will start receiving structured reports highlighting defects, key observations, and actionable recommendations.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
            </table>
        </td>
    </tr>
    
    <!-- SUPPORT CALLOUT -->
    <tr>
        <td bgcolor="#f8fffe" align="center" style="padding: 20px 10px 30px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="box-shadow: 0 2px 8px rgba(0,128,129,0.08);">
                <tr>
                  <td align="center" style="padding: 35px 40px; border-radius: 8px; background: linear-gradient(135deg, #e5fff4 0%, #d0f5ee 100%);">
                    <h2 style="font-size: 20px; font-weight: 700; color: #008081; margin: 0 0 10px 0; font-family: 'Lato', Helvetica, Arial, sans-serif;">Questions before the call?</h2>
                    <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #2d5f5d; line-height: 24px;">Simply reply to this email. We're here to help!</p>
                  </td>
                </tr>
            </table>
        </td>
    </tr>
    
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f8fffe" align="center" style="padding: 20px 10px 20px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" >
              <tr>
                <td align="center" style="padding: 0px 40px 15px 40px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #666666; line-height: 24px;" >
                  <p style="margin: 0;">We look forward to contributing to your product's success.</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 0px 40px 20px 40px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #333333; line-height: 24px; font-weight: 700;" >
                  <p style="margin: 0;">Best Regards,<br><span style="color: #008081;">The InspecQ Team</span></p>
                </td>
              </tr>
              
              <!-- SOCIAL LINKS -->
              <tr>
                <td align="center" style="padding: 20px 40px; border-top: 1px solid #e0e0e0;">
                  <table cellpadding="0" cellspacing="0" border="0" align="center">
                    <tr>
                      <td style="padding: 0 10px;">
                        <a href="https://www.inspecq.com" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px; font-family: 'Lato', Helvetica, Arial, sans-serif;">Website</a>
                      </td>
                      <td style="color: #cbd5e1;">|</td>
                      <td style="padding: 0 10px;">
                        <a href="https://www.linkedin.com/company/qainspec/" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px; font-family: 'Lato', Helvetica, Arial, sans-serif;">LinkedIn</a>
                      </td>
                      <td style="color: #cbd5e1;">|</td>
                      <td style="padding: 0 10px;">
                        <a href="https://www.facebook.com/qainspec" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px; font-family: 'Lato', Helvetica, Arial, sans-serif;">Facebook</a>
                      </td>
                      <td style="color: #cbd5e1;">|</td>
                      <td style="padding: 0 10px;">
                        <a href="https://x.com/qainspec" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px; font-family: 'Lato', Helvetica, Arial, sans-serif;">Twitter</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- ADDRESS & COPYRIGHT -->
              <tr>
                <td align="center" style="padding: 0px 40px 20px 40px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 13px; color: #999999; line-height: 20px;" >
                  <p style="margin: 0 0 8px 0;">You are receiving this email because you requested a 7-day QA trial with <strong style="color: #008080;">InspecQ</strong>.</p>
                  <p style="margin: 0; font-size: 11px; color: #aaa;">© 2025 InspecQ. All rights reserved.</p>
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