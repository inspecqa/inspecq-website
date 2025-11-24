import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { name, email, calendlyLink } = req.body;
    if (!email) return res.status(400).send('Missing recipient email');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const safeName = name?.trim() || 'there';
    const kickoffLink = calendlyLink || 'https://calendly.com/...';

    const mailOptions = {
      from: `"InspecQ" <${process.env.FROM_EMAIL}>`,
      to: email,
      replyTo: process.env.FROM_EMAIL,
      subject: 'Your InspecQ Trial Is Activated — Next Steps Inside',
      text: `Hello ${safeName}, ...`, // copy text version
      html: `<!DOCTYPE html> ...`,    // copy HTML version
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).send('Failed to send email');
  }
}