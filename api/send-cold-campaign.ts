import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const siteUrl = process.env.VITE_SITE_URL || 'http://localhost:5173';

const supabase = createClient(supabaseUrl, supabaseKey);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

function wrapHtml(body: string, trackingToken: string) {
    // 1x1 invisible pixel
    const trackingPixel = `<img src="${siteUrl}/api/track-open?token=${trackingToken}&type=cold" width="1" height="1" style="display:none;" />`;

    // Wrap links for click tracking
    const bodyWithTrackedLinks = body.replace(
        /<a\s+(?:[^>]*?\s+)?href="([^"]*)"([^>]*)>(.*?)<\/a>/gi,
        (match, url, rest, content) => {
            if (url.startsWith('mailto:') || url.startsWith('tel:')) return match;
            const trackingUrl = `${siteUrl}/api/track-click?token=${trackingToken}&url=${encodeURIComponent(url)}&type=cold`;
            return `<a href="${trackingUrl}"${rest}>${content}</a>`;
        }
    );

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          p { margin-bottom: 1em; }
          a { color: #0d9488; text-decoration: underline; }
        </style>
      </head>
      <body>
        ${bodyWithTrackedLinks}
        ${trackingPixel}
      </body>
    </html>
  `;
}

function processTemplate(text: string, data: Record<string, string>): string {
    return text.replace(/\{\{\s*([\w]+)\s*\}\}/g, (match, key) => data[key] || '');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { campaign_id, template_id, lead_ids } = req.body;

        if (!campaign_id || !template_id || !lead_ids || !lead_ids.length) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // 1. Mark campaign as sending
        await supabase
            .from('cold_email_campaigns')
            .update({ status: 'Sending' })
            .eq('id', campaign_id);

        // 2. Fetch template
        const { data: template, error: tmplError } = await supabase
            .from('cold_email_templates')
            .select('*')
            .eq('id', template_id)
            .single();

        if (tmplError || !template) throw new Error("Template not found");

        // 3. Fetch leads
        const { data: leads, error: leadsError } = await supabase
            .from('leads')
            .select('id, name, email, company')
            .in('id', lead_ids);

        if (leadsError || (!leads || leads.length === 0)) throw new Error("No leads found");

        let sentCount = 0;

        // 4. Send emails loop
        // Warning: For massive blasts (e.g. 10k+), this synchronous loop inside a Serverless Function will hit timeouts (10s on hobby Vercel).
        // Since this is a lightweight admin CRM, we assume batch sizes are < 50 for now. Using Promise.all is faster but risks rate limits on SMTP.
        for (const lead of leads) {
            try {
                // Generate tracking token
                const tracking_token = crypto.randomUUID();

                // Merge variables
                const vars = {
                    name: lead.name?.split(' ')[0] || 'there',
                    company: lead.company || 'your company',
                    sender_name: 'The InspecQ Team'
                };

                const subject = processTemplate(template.subject, vars);
                const rawBody = processTemplate(template.body, vars);
                const finalHtml = wrapHtml(rawBody, tracking_token);

                // Send email
                await transporter.sendMail({
                    from: process.env.FROM_EMAIL || `"InspecQ Team" <hello@inspecq.com>`,
                    to: lead.email,
                    subject: subject,
                    html: finalHtml,
                });

                // Record in DB
                await supabase.from('cold_emails').insert([{
                    campaign_id,
                    lead_id: lead.id,
                    subject,
                    body: rawBody, // Save raw body so admin can review what was generated
                    tracking_token,
                    status: 'Sent'
                }]);

                sentCount++;

                // Advance lead status if they were 'New'
                await supabase.from('leads')
                    .update({ status: 'Contacted', updated_at: new Date().toISOString() })
                    .eq('id', lead.id)
                    .eq('status', 'New'); // Only auto-update if they are still 'New'

            } catch (innerErr) {
                console.error(`Failed sending to ${lead.email}:`, innerErr);
                // We deliberately catch and continue so one bad email doesn't stop the whole blast.
            }
        }

        // 5. Update Campaign final stats
        await supabase
            .from('cold_email_campaigns')
            .update({ status: 'Completed', sent_count: sentCount })
            .eq('id', campaign_id);

        return res.status(200).json({ success: true, sent_count: sentCount, total_attempted: leads.length });

    } catch (error: any) {
        console.error("Cold campaign error:", error);

        // If crash happens globally, try to revert status
        if (req.body.campaign_id) {
            await supabase.from('cold_email_campaigns').update({ status: 'Draft' }).eq('id', req.body.campaign_id);
        }

        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
