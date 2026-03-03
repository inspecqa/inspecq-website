import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Setup admin client to bypass RLS for logging events safely Server-Side.
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// A transparent 1x1 GIF
const TRANSPARENT_GIF = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const token = req.query.token as string;
    const userAgent = req.headers['user-agent'] || 'unknown';

    if (!token) {
        return res.status(400).send('Missing token');
    }

    const type = req.query.type as string;

    if (type === 'cold') {
        const { data: coldEmail } = await supabase
            .from('cold_emails')
            .select('id, campaign_id, status')
            .eq('tracking_token', token)
            .single();

        if (coldEmail && coldEmail.status === 'Sent') {
            await supabase
                .from('cold_emails')
                .update({
                    status: 'Opened',
                    opened_at: new Date().toISOString()
                })
                .eq('id', coldEmail.id);

            // Fetch and increment campaign open_count
            const { data: campaign } = await supabase
                .from('cold_email_campaigns')
                .select('open_count')
                .eq('id', coldEmail.campaign_id)
                .single();

            if (campaign) {
                await supabase
                    .from('cold_email_campaigns')
                    .update({ open_count: campaign.open_count + 1 })
                    .eq('id', coldEmail.campaign_id);
            }
        }
    } else {
        // Find the proposal by token
        const { data: proposal } = await supabase
            .from('proposals')
            .select('id, lead_id, status')
            .eq('tracking_token', token)
            .single();

        if (proposal) {
            // Determine the IP. Vercel sets `x-forwarded-for`.
            const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

            // Log the event
            await supabase.from('email_events').insert({
                proposal_id: proposal.id,
                event_type: 'open',
                ip_address: ip,
                user_agent: userAgent
            });

            // Update the proposal status to 'Opened' only if it hasn't been engaged with already
            if (proposal.status === 'Sent') {
                await supabase
                    .from('proposals')
                    .update({
                        status: 'Opened',
                        opened_at: new Date().toISOString()
                    })
                    .eq('id', proposal.id);

                // Also update the lead status to "Proposal Sent" (if it hasn't progressed further)
                await supabase
                    .from('leads')
                    .update({ status: 'Proposal Sent' })
                    .eq('id', proposal.lead_id);
            }
        }
    }

    // Return the 1x1 GIF
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.status(200).send(TRANSPARENT_GIF);
}
