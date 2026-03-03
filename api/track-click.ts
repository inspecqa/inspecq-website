import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const token = req.query.token as string;
    const targetUrl = req.query.url as string;
    const userAgent = req.headers['user-agent'] || 'unknown';

    if (!token || !targetUrl) {
        return res.status(400).send('Missing parameters');
    }

    const type = req.query.type as string;

    if (type === 'cold') {
        const { data: coldEmail } = await supabase
            .from('cold_emails')
            .select('id, campaign_id, status')
            .eq('tracking_token', token)
            .single();

        if (coldEmail && (coldEmail.status === 'Sent' || coldEmail.status === 'Opened')) {
            await supabase
                .from('cold_emails')
                .update({
                    status: 'Clicked',
                    clicked_at: new Date().toISOString()
                })
                .eq('id', coldEmail.id);

            // Fetch and increment campaign click_count
            const { data: campaign } = await supabase
                .from('cold_email_campaigns')
                .select('click_count')
                .eq('id', coldEmail.campaign_id)
                .single();

            if (campaign) {
                await supabase
                    .from('cold_email_campaigns')
                    .update({ click_count: campaign.click_count + 1 })
                    .eq('id', coldEmail.campaign_id);
            }
        }
    } else {
        // Find the proposal
        const { data: proposal } = await supabase
            .from('proposals')
            .select('id, lead_id, status')
            .eq('tracking_token', token)
            .single();

        if (proposal) {
            const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

            // Log the click event
            await supabase.from('email_events').insert({
                proposal_id: proposal.id,
                event_type: 'click',
                ip_address: ip,
                user_agent: userAgent,
                link_url: targetUrl
            });

            // Update proposal status to 'Clicked' and append clicked_at timestamp if not already clicked
            if (proposal.status === 'Sent' || proposal.status === 'Opened') {
                await supabase
                    .from('proposals')
                    .update({
                        status: 'Clicked',
                        clicked_at: new Date().toISOString()
                    })
                    .eq('id', proposal.id);

                // Also update the lead status to "Negotiating" since they clicked
                await supabase
                    .from('leads')
                    .update({ status: 'Negotiating' })
                    .eq('id', proposal.lead_id);
            }
        }
    }

    // Redirect the user to the actual target URL
    // We use 302 for a temporary redirect so future clicks also go through this endpoint
    res.redirect(302, targetUrl);
}
