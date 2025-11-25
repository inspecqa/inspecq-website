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
      secure: port === 465, // true for 465, false for 587 (STARTTLS)
      auth: user && pass ? { user, pass } : undefined,
      tls: {
        // accept self-signed / relax for debugging (you may remove in prod)
        rejectUnauthorized: false,
      },
    });

    // verify connection configuration
    try {
      const verified = await transporter.verify();
      console.log('[sendTrialEmail] transporter.verify success:', verified);
    } catch (verifyErr: any) {
      console.error('[sendTrialEmail] transporter.verify ERROR:', verifyErr && verifyErr.message);
      // continue to attempt send but surface verify error
    }

    const safeName = typeof name === 'string' && name.trim().length ? name.trim() : 'there';
    const kickoffLink = calendlyLink || 'https://calendly.com/mail-inspecq/inspecq-free-trial-kickoff-call';

    const mailOptions = {
      from: `"InspecQ" <${from}>`,
      to: email,
      replyTo: from,
      subject: 'Your InspecQ Trial Is Activated — Next Steps Inside',
      text: `Hello ${safeName},\n\nThank you for choosing InspecQ...`,
      html: `<p>Hello ${safeName},</p><p>Your 7-day trial has been activated.</p><p><a href="${kickoffLink}">Schedule kickoff</a></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[sendTrialEmail] sendMail info:', info);

    // return the transport info (safe-ish) for debugging — remove later
    return res.status(200).json({ ok: true, info });
  } catch (err: any) {
    console.error('[sendTrialEmail] error:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Failed to send email', details: err && err.message ? err.message : String(err) });
  }
}