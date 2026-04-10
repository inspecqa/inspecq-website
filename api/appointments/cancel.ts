import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { token, reason } = req.body || {};

    if (!token) {
      return res.status(400).json({ error: 'Cancel token is required' });
    }

    // Find appointment by cancel token
    const { data: appointment, error: fetchErr } = await supabase
      .from('appointments')
      .select('*, service_types(*)')
      .eq('cancel_token', token)
      .single();

    if (fetchErr || !appointment) {
      return res.status(404).json({ error: 'Appointment not found or invalid token' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ error: 'This appointment has already been cancelled' });
    }

    if (appointment.status === 'completed') {
      return res.status(400).json({ error: 'Cannot cancel a completed appointment' });
    }

    // Update appointment status
    const { error: updateErr } = await supabase
      .from('appointments')
      .update({
        status: 'cancelled',
        cancellation_reason: reason || null,
      })
      .eq('id', appointment.id);

    if (updateErr) {
      return res.status(500).json({ error: 'Failed to cancel appointment', details: updateErr.message });
    }

    // Delete pending reminders
    await supabase
      .from('appointment_notifications')
      .delete()
      .eq('appointment_id', appointment.id)
      .eq('status', 'pending');

    // Send cancellation emails
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: { rejectUnauthorized: false },
      });

      const startDate = new Date(appointment.start_time);
      const tz = appointment.client_timezone || 'America/New_York';
      const formattedDate = startDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: tz,
      });
      const formattedTime = startDate.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', timeZone: tz,
      });
      const baseUrl = process.env.BASE_URL || 'https://www.inspecq.com';

      // Client cancellation email
      await transporter.sendMail({
        from: `"InspecQ" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: appointment.client_email,
        subject: `Cancelled: ${appointment.service_types.name} with InspecQ`,
        text: `Hi ${appointment.client_name},\n\nYour ${appointment.service_types.name} scheduled for ${formattedDate} at ${formattedTime} has been cancelled.\n\nWant to rebook? Visit: ${baseUrl}/book\n\nBest regards,\nThe InspecQ Team`,
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: 'Lato', Helvetica, Arial, sans-serif; background: #f8fffe; margin: 0; padding: 0;">
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); padding: 40px; text-align: center;">
  <h1 style="color: #dc2626; font-size: 28px; margin: 0;">Appointment Cancelled</h1>
</div>
<div style="background: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
  <p style="font-size: 16px; color: #333;">Hello <strong>${appointment.client_name}</strong>,</p>
  <p style="font-size: 15px; color: #666; line-height: 24px;">Your <strong>${appointment.service_types.name}</strong> scheduled for <strong>${formattedDate}</strong> at <strong>${formattedTime}</strong> has been cancelled.</p>
  ${reason ? `<p style="font-size: 14px; color: #999;">Reason: ${reason}</p>` : ''}
  <div style="text-align: center; margin: 30px 0;">
    <a href="${baseUrl}/book" style="background: #0d9488; color: #fff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 16px;">Book a New Appointment</a>
  </div>
</div>
<div style="text-align: center; padding: 20px;"><p style="color: #aaa; font-size: 11px;">© ${new Date().getFullYear()} InspecQ. All rights reserved.</p></div>
</body></html>`,
      });

      // Admin notification
      await transporter.sendMail({
        from: `"InspecQ Scheduler" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: process.env.FROM_EMAIL || process.env.SMTP_USER!,
        subject: `Cancelled: ${appointment.service_types.name} — ${appointment.client_name}`,
        text: `Appointment cancelled:\n\nClient: ${appointment.client_name} (${appointment.client_email})\nService: ${appointment.service_types.name}\nWas scheduled: ${formattedDate} at ${formattedTime}\nReason: ${reason || 'Not provided'}`,
      });
    } catch (emailErr: any) {
      console.error('[cancel] email error:', emailErr?.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
    });
  } catch (err: any) {
    console.error('[cancel] error:', err?.message || err);
    return res.status(500).json({ error: 'Cancellation failed', details: err?.message });
  }
}
