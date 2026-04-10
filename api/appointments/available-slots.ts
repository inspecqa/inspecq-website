import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { serviceTypeId, startDate, endDate } = req.body || {};

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    // 1. Get scheduling settings
    const { data: settings } = await supabase
      .from('scheduling_settings')
      .select('*')
      .limit(1)
      .single();

    const bufferMinutes = settings?.buffer_minutes ?? 15;
    const maxAdvanceDays = settings?.max_advance_days ?? 60;
    const minAdvanceHours = settings?.min_advance_hours ?? 2;

    // 2. Get service type for duration
    let durationMinutes = 30;
    if (serviceTypeId) {
      const { data: svc } = await supabase
        .from('service_types')
        .select('duration_minutes')
        .eq('id', serviceTypeId)
        .eq('is_active', true)
        .single();
      if (svc) durationMinutes = svc.duration_minutes;
    }

    // 3. Get availability rules
    const { data: rules } = await supabase
      .from('availability_rules')
      .select('*')
      .eq('is_active', true);

    // 4. Get blocked dates in range
    const { data: overrides } = await supabase
      .from('availability_overrides')
      .select('*')
      .gte('override_date', startDate)
      .lte('override_date', endDate);

    // 5. Get existing appointments in range
    const rangeStart = new Date(startDate);
    const rangeEnd = new Date(endDate);
    rangeEnd.setDate(rangeEnd.getDate() + 1); // include full end date

    const { data: existingAppts } = await supabase
      .from('appointments')
      .select('start_time, end_time')
      .in('status', ['confirmed', 'rescheduled'])
      .gte('start_time', rangeStart.toISOString())
      .lte('start_time', rangeEnd.toISOString());

    // 6. Generate available slots
    const slots: { date: string; time: string; startTime: string; endTime: string }[] = [];
    const now = new Date();
    const minBookingTime = new Date(now.getTime() + minAdvanceHours * 60 * 60 * 1000);
    const maxBookingDate = new Date(now.getTime() + maxAdvanceDays * 24 * 60 * 60 * 1000);

    const blockedDates = new Set(
      (overrides || []).filter(o => o.is_blocked).map(o => o.override_date)
    );

    // Iterate through each day
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end && current <= maxBookingDate) {
      const dateStr = current.toISOString().split('T')[0];
      const dayOfWeek = current.getDay();

      // Skip blocked dates
      if (blockedDates.has(dateStr)) {
        current.setDate(current.getDate() + 1);
        continue;
      }

      // Find matching rules for this day
      const dayRules = (rules || []).filter(
        r => r.day_of_week === dayOfWeek &&
          (!r.service_type_id || r.service_type_id === serviceTypeId)
      );

      // Check if there's a custom override with hours
      const customOverride = (overrides || []).find(
        o => o.override_date === dateStr && !o.is_blocked && o.start_time && o.end_time
      );

      const timeWindows = customOverride
        ? [{ start_time: customOverride.start_time, end_time: customOverride.end_time }]
        : dayRules;

      for (const window of timeWindows) {
        // Parse window times
        const [startH, startM] = window.start_time.split(':').map(Number);
        const [endH, endM] = window.end_time.split(':').map(Number);

        // Generate slots at 30-min intervals
        const slotInterval = 30; // minutes between slot start times
        let slotStart = new Date(current);
        slotStart.setHours(startH, startM, 0, 0);

        const windowEnd = new Date(current);
        windowEnd.setHours(endH, endM, 0, 0);

        while (slotStart.getTime() + durationMinutes * 60 * 1000 <= windowEnd.getTime()) {
          const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

          // Check minimum advance time
          if (slotStart > minBookingTime) {
            // Check conflicts with existing appointments (including buffer)
            const hasConflict = (existingAppts || []).some(appt => {
              const apptStart = new Date(appt.start_time).getTime() - bufferMinutes * 60 * 1000;
              const apptEnd = new Date(appt.end_time).getTime() + bufferMinutes * 60 * 1000;
              return slotStart.getTime() < apptEnd && slotEnd.getTime() > apptStart;
            });

            if (!hasConflict) {
              slots.push({
                date: dateStr,
                time: slotStart.toTimeString().slice(0, 5),
                startTime: slotStart.toISOString(),
                endTime: slotEnd.toISOString(),
              });
            }
          }

          slotStart = new Date(slotStart.getTime() + slotInterval * 60 * 1000);
        }
      }

      current.setDate(current.getDate() + 1);
    }

    return res.status(200).json({
      success: true,
      slots,
      meta: {
        durationMinutes,
        bufferMinutes,
        maxAdvanceDays,
        minAdvanceHours,
        totalSlots: slots.length,
      },
    });
  } catch (err: any) {
    console.error('[available-slots] error:', err?.message || err);
    return res.status(500).json({ error: 'Failed to fetch available slots', details: err?.message });
  }
}
