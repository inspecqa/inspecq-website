// sendNewsLetterWelcome.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

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

    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';
    
    console.log('[sendNewsLetterWelcome] Supabase config check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPrefix: supabaseUrl?.substring(0, 20)
    });
    
    // Get subscriber's unsubscribe token
    let unsubscribeToken = '';
    
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { data: subscriber, error: fetchError } = await supabase
          .from('newsletter_subscribers')
          .select('unsubscribe_token')
          .eq('email', email.toLowerCase())
          .single();

        if (fetchError) {
          console.error('[sendNewsLetterWelcome] Failed to fetch unsubscribe token:', fetchError);
        } else {
          unsubscribeToken = subscriber?.unsubscribe_token || '';
        }
      } catch (err) {
        console.error('[sendNewsLetterWelcome] Error fetching token:', err);
      }
    } else {
      console.log('[sendNewsLetterWelcome] Skipping token fetch - missing Supabase credentials');
    }

    const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://www.inspecq.com';
    const unsubscribeUrl = unsubscribeToken 
      ? `${baseUrl}/api/newsletterUnsubscribe?token=${unsubscribeToken}`
      : '#';

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

    const mailOptions: any = {
      from: `"InspecQ" <${from}>`,
      to: email,
      replyTo: from,
      subject: 'You\'re In! Welcome to the InspecQ community',
      
      // Add compliance headers for one-click unsubscribe
      ...(unsubscribeToken && {
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        }
      }),
      
      text: `Hello,

Thank you for subscribing to the InspecQ newsletter. We are thrilled to have you with us.

What you can expect: Every week, we'll send you resources designed to help your team ship reliable, high-quality products:
• Curated QA insights
• Testing best practices
• Actionable strategies

Our Mission: We built InspecQ with a single goal: to help teams ship with confidence. We believe in better testing, smarter processes, and maintaining a quality-first mindset at every stage of development.

If you ever have questions, feedback, or a specific topic you'd like us to cover, simply reply to this email. We read every response.

Welcome aboard,
The InspecQ Team

---
To unsubscribe: ${unsubscribeUrl}`,

      html: `<!DOCTYPE html>
<html>
<head>
<title>Welcome to InspecQ Newsletter</title>
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
    Welcome to the InspecQ community! Get weekly QA insights and best practices.
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
                        
                        <h1 style="font-size: 40px; font-weight: 700; margin: 0 0 15px 0; color: #008081; font-family: 'Lato', Helvetica, Arial, sans-serif; line-height: 1.2;">You're In! 🎉</h1>
                        <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #2d5f5d; line-height: 28px; font-weight: 400;">Welcome to the InspecQ community</p>
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
                  <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #333333; line-height: 28px;">Hello,</p>
                </td>
              </tr>
              
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 30px 40px;">
                  <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #666666; line-height: 26px;">Thank you for subscribing to the InspecQ newsletter. We are thrilled to have you with us.</p>
                </td>
              </tr>
              
              <!-- WHAT TO EXPECT SECTION -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 40px 20px 40px;">
                  <h2 style="margin: 0 0 15px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 20px; color: #111111; font-weight: 700;">What you can expect</h2>
                  <p style="margin: 0 0 20px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 24px;">Every week, we'll send you resources designed to help your team ship reliable, high-quality products:</p>
                </td>
              </tr>
              
     <!-- BENEFITS LIST -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 30px 40px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(to right, #f8f9fa 0%, #e8f5f5 100%); border-left: 4px solid #008081; border-radius: 8px;">
                    <tr>
                      <td style="padding: 20px 20px 20px 25px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td width="30" valign="top" style="padding-bottom: 12px;">
                              <span style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #008081;">✓</span>
                            </td>
                            <td style="padding-bottom: 12px;">
                              <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #555555; line-height: 24px;">Curated QA insights</p>
                            </td>
                          </tr>
                          <tr>
                            <td width="30" valign="top" style="padding-bottom: 12px;">
                              <span style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #008081;">✓</span>
                            </td>
                            <td style="padding-bottom: 12px;">
                              <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #555555; line-height: 24px;">Testing best practices</p>
                            </td>
                          </tr>
                          <tr>
                            <td width="30" valign="top">
                              <span style="font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #008081;">✓</span>
                            </td>
                            <td>
                              <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #555555; line-height: 24px;">Actionable strategies</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
                <!-- MISSION SECTION -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 30px 40px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(to right, #f8f9fa 0%, #e8f5f5 100%); border-left: 4px solid #008081; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px 20px 20px 25px;">
                          <h3 style="margin: 0 0 12px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; color: #333333; font-weight: 700;">Our Mission</h3>
                          <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #555555; line-height: 24px;">We built InspecQ with a single goal: to help teams ship with confidence. We believe in better testing, smarter processes, and maintaining a quality-first mindset at every stage of development.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              
              <!-- FEEDBACK SECTION -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 40px 30px 40px;">
                  <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 15px; color: #666666; line-height: 24px;">If you ever have questions, feedback, or a specific topic you'd like us to cover, simply reply to this email. We read every response.</p>
                </td>
              </tr>
              
              <!-- CTA BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="center" style="padding: 0px 40px 40px 40px;">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 6px; background: linear-gradient(135deg, #00a896 0%, #008081 100%); box-shadow: 0 4px 12px rgba(0,128,129,0.25);">
                        <a href="https://www.inspecq.com/services" target="_blank" style="font-size: 16px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 14px 32px; display: inline-block; font-weight: 700; letter-spacing: 0.5px;">Explore Our Services</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
            </table>
        </td>
    </tr>
    
    <!-- CLOSING MESSAGE -->
    <tr>
        <td bgcolor="#f8fffe" align="center" style="padding: 20px 10px 30px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="box-shadow: 0 2px 8px rgba(0,128,129,0.08);">
                <tr>
                  <td align="center" style="padding: 35px 40px; border-radius: 8px; background: linear-gradient(135deg, #e5fff4 0%, #d0f5ee 100%);">
                    <p style="margin: 0 0 10px 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #2d5f5d; line-height: 24px; font-weight: 700;">Welcome aboard!</p>
                    <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #2d5f5d; line-height: 24px;"><span style="color: #008081; font-weight: 700;">The InspecQ Team</span></p>
                  </td>
                </tr>
            </table>
        </td>
    </tr>
    
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f8fffe" align="center" style="padding: 20px 10px 20px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" >
              
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
              
              <!-- COPYRIGHT & UNSUBSCRIBE -->
              <tr>
                <td align="center" style="padding: 0px 40px 20px 40px; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 13px; color: #999999; line-height: 20px;" >
                  <p style="margin: 0 0 12px 0; font-size: 11px; color: #aaa;">© 2025 InspecQ. All rights reserved.</p>
                  <p style="margin: 0; font-size: 12px;">No longer want to receive these emails? <a href="${unsubscribeUrl}" style="color: #008080; text-decoration: none; font-weight: 600;">Unsubscribe</a></p>
                </td>
              </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[sendNewsLetterWelcome] sendMail info:', info);

    return res.status(200).json({ ok: true, info });
  } catch (err: any) {
    console.error('[sendNewsLetterWelcome] error:', err && err.message ? err.message : err);
    return res.status(500).json({ 
      error: 'Failed to send welcome email', 
      details: err && err.message ? err.message : String(err) 
    });
  }
}