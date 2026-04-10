import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { createEvents, EventAttributes } from 'ics';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

function createIcsContent(appointment: any, serviceType: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const start = new Date(appointment.start_time);
    const event: EventAttributes = {
      start: [start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes()],
      duration: { minutes: serviceType.duration_minutes },
      title: `${serviceType.name} — InspecQ`,
      description: `Meeting with ${appointment.client_name}${appointment.client_company ? ` from ${appointment.client_company}` : ''}\n\n${appointment.client_message || ''}`,
      organizer: { name: 'InspecQ', email: process.env.FROM_EMAIL || 'welcome@inspecq.com' },
      attendees: [{ name: appointment.client_name, email: appointment.client_email }],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      uid: appointment.id,
    };

    createEvents([event], (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const {
      serviceTypeId, clientName, clientEmail, clientCompany,
      clientPhone, clientMessage, startTime, endTime, clientTimezone,
    } = req.body || {};

    // Validation
    if (!serviceTypeId || !clientName || !clientEmail || !startTime || !endTime) {
      return res.status(400).json({
        error: 'Missing required fields: serviceTypeId, clientName, clientEmail, startTime, endTime',
      });
    }

    // Call the atomic booking function
    const { data, error } = await supabase.rpc('book_appointment', {
      p_service_type_id: serviceTypeId,
      p_client_name: clientName,
      p_client_email: clientEmail,
      p_client_company: clientCompany || null,
      p_client_phone: clientPhone || null,
      p_client_message: clientMessage || null,
      p_start_time: startTime,
      p_end_time: endTime,
      p_client_timezone: clientTimezone || 'America/New_York',
    });

    if (error) {
      console.error('[book] rpc error:', error);
      return res.status(500).json({ error: 'Booking failed', details: error.message });
    }

    if (!data?.success) {
      return res.status(409).json({ error: data?.error || 'Slot not available' });
    }

    // Fetch full appointment for email
    const { data: appointment } = await supabase
      .from('appointments')
      .select('*, service_types(*)')
      .eq('id', data.appointment_id)
      .single();

    // Send confirmation email
    if (appointment) {
      try {
        const serviceType = appointment.service_types;
        const icsContent = await createIcsContent(appointment, serviceType);

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT || 587) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: { rejectUnauthorized: false },
        });

        const startDate = new Date(appointment.start_time);
        const formattedDate = startDate.toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          timeZone: clientTimezone || 'America/New_York',
        });
        const formattedTime = startDate.toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit',
          timeZone: clientTimezone || 'America/New_York',
        });

        const baseUrl = process.env.BASE_URL || 'https://www.inspecq.com';
        const rescheduleUrl = `${baseUrl}/appointment/reschedule/${appointment.reschedule_token}`;
        const cancelUrl = `${baseUrl}/appointment/cancel/${appointment.cancel_token}`;

        // Client confirmation email
        await transporter.sendMail({
          from: `"InspecQ" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
          to: clientEmail,
          subject: `Confirmed: ${serviceType.name} with InspecQ`,
          text: `Hi ${clientName},\n\nYour ${serviceType.name} has been confirmed.\n\nDate: ${formattedDate}\nTime: ${formattedTime}\nDuration: ${serviceType.duration_minutes} minutes\n\nNeed to change plans?\nReschedule: ${rescheduleUrl}\nCancel: ${cancelUrl}\n\nBest regards,\nThe InspecQ Team`,
          html: buildConfirmationHtml({
            clientName, serviceName: serviceType.name, formattedDate, formattedTime,
            duration: serviceType.duration_minutes, rescheduleUrl, cancelUrl,
          }),
          attachments: [{
            filename: 'appointment.ics',
            content: icsContent,
            contentType: 'text/calendar',
          }],
        });

        // Admin notification email
        await transporter.sendMail({
          from: `"InspecQ Scheduler" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
          to: process.env.FROM_EMAIL || process.env.SMTP_USER!,
          subject: `New Booking: ${serviceType.name} — ${clientName}`,
          text: `New appointment booked:\n\nClient: ${clientName}\nEmail: ${clientEmail}\nCompany: ${clientCompany || 'N/A'}\nPhone: ${clientPhone || 'N/A'}\nService: ${serviceType.name}\nDate: ${formattedDate} at ${formattedTime}\nMessage: ${clientMessage || 'None'}\n\nManage in admin panel: ${baseUrl}/admin/scheduling`,
        });

        // Mark confirmation as sent
        await supabase
          .from('appointment_notifications')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('appointment_id', data.appointment_id)
          .eq('notification_type', 'confirmation');

      } catch (emailErr: any) {
        console.error('[book] email error:', emailErr?.message);
        // Don't fail the booking if email fails
      }
    }

    return res.status(200).json({
      success: true,
      appointmentId: data.appointment_id,
      leadId: data.lead_id,
      rescheduleToken: appointment?.reschedule_token,
      cancelToken: appointment?.cancel_token,
    });
  } catch (err: any) {
    console.error('[book] error:', err?.message || err);
    return res.status(500).json({ error: 'Booking failed', details: err?.message });
  }
}

function buildConfirmationHtml(params: {
  clientName: string; serviceName: string; formattedDate: string;
  formattedTime: string; duration: number; rescheduleUrl: string; cancelUrl: string;
}): string {
  const { clientName, serviceName, formattedDate, formattedTime, duration, rescheduleUrl, cancelUrl } = params;
  return `<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { margin: 0; padding: 0; background: #f8fffe; font-family: 'Lato', Helvetica, Arial, sans-serif; }
  .container { max-width: 600px; margin: 0 auto; }
</style>
</head><body>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
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
                                    <div style="color: #008080; font-size: 24px; font-weight: 700; letter-spacing: 0.03em; margin-bottom: 4px; font-family: 'Lato', Helvetica, Arial, sans-serif;">InspecQ</div>
                                    <div style="color: #008080; font-size: 13px; font-weight: 500; font-family: 'Lato', Helvetica, Arial, sans-serif;">Built to Inspect. Powered by Quality.</div>
                                </td>
                            </tr>
                        </table>
                        <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 10px 0; color: #008081; font-family: 'Lato', Helvetica, Arial, sans-serif; line-height: 1.2;">Appointment Confirmed ✓</h1>
                        <p style="margin: 0; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; color: #2d5f5d; font-weight: 400;">Your ${serviceName} is all set.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<div style="background: #fff; padding: 40px; margin: 0 auto; max-width: 600px; box-shadow: 0 4px 12px rgba(0,128,129,0.08);">
  <p style="font-size: 18px; color: #333;">Hello <strong style="color: #008081;">${clientName}</strong>,</p>
  <p style="font-size: 16px; color: #666; line-height: 26px;">We're looking forward to meeting with you. Here are your appointment details:</p>
  
  <div style="background: #f0fdfa; border-left: 4px solid #0d9488; padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 24px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Service</td><td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 700;">${serviceName}</td></tr>
      <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Date</td><td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 700;">${formattedDate}</td></tr>
      <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Time</td><td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 700;">${formattedTime}</td></tr>
      <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Duration</td><td style="padding: 8px 0; color: #111; font-size: 14px; font-weight: 700;">${duration} minutes</td></tr>
    </table>
  </div>

  <p style="font-size: 14px; color: #999; margin: 24px 0 8px;">Need to change plans?</p>
  <p style="margin: 0;">
    <a href="${rescheduleUrl}" style="color: #0d9488; text-decoration: none; font-weight: 600;">Reschedule</a>
    <span style="color: #ccc; margin: 0 8px;">|</span>
    <a href="${cancelUrl}" style="color: #ef4444; text-decoration: none; font-weight: 600;">Cancel</a>
  </p>
</div>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
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
                  <p style="margin: 0; font-size: 11px; color: #aaa;">© ${new Date().getFullYear()} InspecQ. All rights reserved.</p>
                </td>
              </tr>
            </table>
        </td>
    </tr>
</table>
</body></html>`;
}
