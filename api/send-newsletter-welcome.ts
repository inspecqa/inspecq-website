import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = "You’re In! Thanks for Joining the InspecQ Newsletter";

    const textBody = `Hi there, ...`; // copy your existing text version
    const htmlBody = `<!DOCTYPE html>...`; // copy your existing HTML version

    await transporter.sendMail({
      from: `"InspecQ" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    res.status(200).json({ message: 'Welcome email sent' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
}