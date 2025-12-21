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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('[sendNewsLetterWelcome] Missing Supabase credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get subscriber's unsubscribe token
    const { data: subscriber, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('unsubscribe_token')
      .eq('email', email.toLowerCase())
      .single();

    if (fetchError || !subscriber?.unsubscribe_token) {
      console.error('[sendNewsLetterWelcome] Failed to fetch unsubscribe token:', fetchError);
      // Continue anyway - don't fail the email send
    }

    const unsubscribeToken = subscriber?.unsubscribe_token || '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || 'https://www.inspecq.com';
    const unsubscribeUrl = unsubscribeToken 
      ? `${baseUrl}/api/unsubscribe/${unsubscribeToken}`
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
      
      text: `Hi there,

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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.cdnfonts.com/css/onnest" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f4f4;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #e5fff4 0%, #008081 100%); padding: 40px 30px; text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align: middle;">
                          <div style="width: 60px; height: 60px; border-radius: 8px; display: inline-block; vertical-align: middle; text-align: center; line-height: 60px;">
                            <img src="https://tzmp2b268dae69si.public.blob.vercel-storage.com/Logo%40300x.png" alt="InspecQ" style="max-width: 50px; max-height: 50px; vertical-align: middle;">
                          </div>
                        </td>
                        <td style="padding-left: 15px; vertical-align: middle;">
                          <div style="text-align: left; color: white;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">InspecQ</h1>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; font-size: 20px; color: #333; font-weight: 600;">Hi there,</p>
              <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                Thank you for subscribing to the InspecQ newsletter. We are thrilled to have you with us.
              </p>
              <p style="margin: 0 0 10px 0; color: #555; font-size: 16px; line-height: 1.6;">
                <strong>What you can expect:</strong> Every week, we'll send you resources designed to help your team ship reliable, high-quality products:
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(to right, #f8f9fa 0%, #e8f5f5 100%); border-left: 4px solid #008080; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="color: #008080; font-weight: bold; font-size: 18px; padding-right: 10px; vertical-align: top;">✓</td>
                        <td style="color: #555; font-size: 16px; padding-bottom: 10px;">Curated QA insights</td>
                      </tr>
                      <tr>
                        <td style="color: #008080; font-weight: bold; font-size: 18px; padding-right: 10px; vertical-align: top;">✓</td>
                        <td style="color: #555; font-size: 16px; padding-bottom: 10px;">Testing best practices</td>
                      </tr>
                      <tr>
                        <td style="color: #008080; font-weight: bold; font-size: 18px; padding-right: 10px; vertical-align: top;">✓</td>
                        <td style="color: #555; font-size: 16px;">Actionable strategies</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(to right, #f8f9fa 0%, #e8f5f5 100%); border-left: 4px solid #008080; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Our Mission</h2>
                    <p style="margin: 0; color: #555; font-size: 16px; line-height: 1.6;">
                      We built InspecQ with a single goal: to help teams ship with confidence. We believe in better testing, smarter processes, and maintaining a quality-first mindset at every stage of development.
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                If you ever have questions, feedback, or a specific topic you'd like us to cover, simply reply to this email. We read every response.
              </p>
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #008080 0%, #20b2aa 100%); border-radius: 5px; box-shadow: 0 4px 15px rgba(0, 128, 128, 0.3);">
                    <a href="https://www.inspecq.com/services" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                      Explore our services
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; color: #555; font-size: 16px; line-height: 1.6;">
                <strong>Warm Regards,</strong><br>
                The InspecQ Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center;">
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="https://www.linkedin.com/company/qainspec/" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px;">LinkedIn</a>
                  </td>
                  <td style="color: #777;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://www.facebook.com/qainspec" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px;">Facebook</a>
                  </td>
                  <td style="color: #777;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://x.com/qainspec" style="color: #008080; text-decoration: none; font-weight: 500; font-size: 14px;">Twitter</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 10px 0; color: #777; font-size: 14px;">© 2025 InspecQ. All rights reserved.</p>
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #999;">
                No longer want to receive these emails? <a href="${unsubscribeUrl}" style="color: #008080; text-decoration: none;">Unsubscribe</a>
              </p>
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