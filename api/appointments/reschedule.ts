import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { createEvents, EventAttributes } from 'ics';

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
    const { token, newStartTime, newEndTime, clientTimezone } = req.body || {};

    if (!token || !newStartTime || !newEndTime) {
      return res.status(400).json({ error: 'token, newStartTime, and newEndTime are required' });
    }

    // Find appointment by reschedule token
    const { data: appointment, error: fetchErr } = await supabase
      .from('appointments')
      .select('*, service_types(*)')
      .eq('reschedule_token', token)
      .single();

    if (fetchErr || !appointment) {
      return res.status(404).json({ error: 'Appointment not found or invalid token' });
    }

    if (['cancelled', 'completed'].includes(appointment.status)) {
      return res.status(400).json({ error: `Cannot reschedule a ${appointment.status} appointment` });
    }

    // Check for conflicts at the new time
    const { data: settings } = await supabase
      .from('scheduling_settings')
      .select('buffer_minutes')
      .limit(1)
      .single();

    const bufferMinutes = settings?.buffer_minutes ?? 15;

    const { data: conflicts } = await supabase
      .from('appointments')
      .select('id')
      .in('status', ['confirmed', 'rescheduled'])
      .neq('id', appointment.id)
      .lte('start_time', new Date(new Date(newEndTime).getTime() + bufferMinutes * 60000).toISOString())
      .gte('end_time', new Date(new Date(newStartTime).getTime() - bufferMinutes * 60000).toISOString());

    if (conflicts && conflicts.length > 0) {
      return res.status(409).json({ error: 'The new time slot is no longer available. Please choose another time.' });
    }

    // Check blocked dates
    const newDate = new Date(newStartTime).toISOString().split('T')[0];
    const { data: blocked } = await supabase
      .from('availability_overrides')
      .select('id')
      .eq('override_date', newDate)
      .eq('is_blocked', true);

    if (blocked && blocked.length > 0) {
      return res.status(409).json({ error: 'This date is not available for booking.' });
    }

    // Update appointment
    const { error: updateErr } = await supabase
      .from('appointments')
      .update({
        start_time: newStartTime,
        end_time: newEndTime,
        client_timezone: clientTimezone || appointment.client_timezone,
        status: 'rescheduled',
      })
      .eq('id', appointment.id);

    if (updateErr) {
      return res.status(500).json({ error: 'Failed to reschedule', details: updateErr.message });
    }

    // Delete old pending reminders, create new ones
    await supabase
      .from('appointment_notifications')
      .delete()
      .eq('appointment_id', appointment.id)
      .eq('status', 'pending');

    await supabase.from('appointment_notifications').insert([
      { appointment_id: appointment.id, notification_type: 'reschedule', channel: 'email', status: 'pending', scheduled_for: new Date().toISOString() },
      { appointment_id: appointment.id, notification_type: 'reminder_24h', channel: 'email', status: 'pending', scheduled_for: new Date(new Date(newStartTime).getTime() - 24 * 3600000).toISOString() },
      { appointment_id: appointment.id, notification_type: 'reminder_1h', channel: 'email', status: 'pending', scheduled_for: new Date(new Date(newStartTime).getTime() - 3600000).toISOString() },
    ]);

    // Send reschedule notification emails
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: { rejectUnauthorized: false },
      });

      const tz = clientTimezone || appointment.client_timezone || 'America/New_York';
      const newStart = new Date(newStartTime);
      const formattedDate = newStart.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: tz,
      });
      const formattedTime = newStart.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', timeZone: tz,
      });

      const baseUrl = process.env.BASE_URL || 'https://www.inspecq.com';
      const svc = appointment.service_types;

      // Generate .ics
      let icsContent = '';
      try {
        const event: EventAttributes = {
          start: [newStart.getUTCFullYear(), newStart.getUTCMonth() + 1, newStart.getUTCDate(), newStart.getUTCHours(), newStart.getUTCMinutes()],
          duration: { minutes: svc.duration_minutes },
          title: `${svc.name} — InspecQ`,
          description: `Rescheduled meeting with ${appointment.client_name}`,
          organizer: { name: 'InspecQ', email: process.env.FROM_EMAIL || 'welcome@inspecq.com' },
          uid: appointment.id,
          status: 'CONFIRMED',
          busyStatus: 'BUSY',
        };
        icsContent = await new Promise<string>((resolve, reject) => {
          createEvents([event], (err, val) => err ? reject(err) : resolve(val));
        });
      } catch { /* ignore ics errors */ }

      await transporter.sendMail({
        from: `"InspecQ" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: appointment.client_email,
        subject: `Rescheduled: ${svc.name} with InspecQ`,
        text: `Hi ${appointment.client_name},\n\nYour ${svc.name} has been rescheduled.\n\nNew Date: ${formattedDate}\nNew Time: ${formattedTime}\nDuration: ${svc.duration_minutes} minutes\n\nReschedule again: ${baseUrl}/appointment/reschedule/${appointment.reschedule_token}\nCancel: ${baseUrl}/appointment/cancel/${appointment.cancel_token}\n\nBest regards,\nThe InspecQ Team`,
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family: 'Lato', Helvetica, Arial, sans-serif; background: #f8fffe; margin: 0; padding: 0;">
<div style="background: linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%); padding: 40px; text-align: center;">
  <h1 style="color: #1d4ed8; font-size: 28px; margin: 0;">Appointment Rescheduled</h1>
</div>
<div style="background: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
  <p style="font-size: 16px; color: #333;">Hello <strong>${appointment.client_name}</strong>,</p>
  <p style="font-size: 15px; color: #666; line-height: 24px;">Your <strong>${svc.name}</strong> has been rescheduled to a new time:</p>
  <div style="background: #f0fdfa; border-left: 4px solid #0d9488; padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 24px 0;">
    <p style="margin: 8px 0; font-size: 14px;"><strong>Date:</strong> ${formattedDate}</p>
    <p style="margin: 8px 0; font-size: 14px;"><strong>Time:</strong> ${formattedTime}</p>
    <p style="margin: 8px 0; font-size: 14px;"><strong>Duration:</strong> ${svc.duration_minutes} minutes</p>
  </div>
  <p style="font-size: 14px; color: #999; margin: 24px 0 8px;">Need to change again?</p>
  <p><a href="${baseUrl}/appointment/reschedule/${appointment.reschedule_token}" style="color: #0d9488; font-weight: 600;">Reschedule</a> <span style="color: #ccc; margin: 0 8px;">|</span> <a href="${baseUrl}/appointment/cancel/${appointment.cancel_token}" style="color: #ef4444; font-weight: 600;">Cancel</a></p>
</div>
<div style="text-align: center; padding: 20px;"><p style="color: #aaa; font-size: 11px;">© ${new Date().getFullYear()} InspecQ. All rights reserved.</p></div>
</body></html>`,
        ...(icsContent ? { attachments: [{ filename: 'appointment.ics', content: icsContent, contentType: 'text/calendar' }] } : {}),
      });

      // Admin notification
      await transporter.sendMail({
        from: `"InspecQ Scheduler" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: process.env.FROM_EMAIL || process.env.SMTP_USER!,
        subject: `Rescheduled: ${svc.name} — ${appointment.client_name}`,
        text: `Appointment rescheduled:\n\nClient: ${appointment.client_name} (${appointment.client_email})\nService: ${svc.name}\nNew time: ${formattedDate} at ${formattedTime}`,
      });
    } catch (emailErr: any) {
      console.error('[reschedule] email error:', emailErr?.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment rescheduled successfully',
    });
  } catch (err: any) {
    console.error('[reschedule] error:', err?.message || err);
    return res.status(500).json({ error: 'Reschedule failed', details: err?.message });
  }
}
