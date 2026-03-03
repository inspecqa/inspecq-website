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
    const trackingPixel = `<img src="${siteUrl}/api/track-open?token=${trackingToken}&type=cold" width="1" height="1" style="display:none;" />`;

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
        const { lead_id, template_id, subject: custom_subject, body: custom_body } = req.body;

        if (!lead_id) {
            return res.status(400).json({ error: 'Missing lead_id' });
        }
        if (!template_id && (!custom_subject || !custom_body)) {
            return res.status(400).json({ error: 'Must provide either template_id or custom subject and body' });
        }

        let subjectStr = custom_subject;
        let bodyStr = custom_body;

        // 1. Fetch template if template_id is provided and we don't have custom overrides
        if (template_id && (!subjectStr || !bodyStr)) {
            const { data: template, error: tmplError } = await supabase
                .from('cold_email_templates')
                .select('*')
                .eq('id', template_id)
                .single();

            if (tmplError || !template) throw new Error("Template not found");
            subjectStr = subjectStr || template.subject;
            bodyStr = bodyStr || template.body;
        }

        if (!subjectStr || !bodyStr) {
            return res.status(400).json({ error: 'Subject and body are required' });
        }

        // 2. Fetch lead
        const { data: lead, error: leadError } = await supabase
            .from('leads')
            .select('id, name, email, company')
            .eq('id', lead_id)
            .single();

        if (leadError || !lead) throw new Error("Lead not found");

        // 3. Find or create the standard "One-off Outreach" campaign bucket
        let { data: campaign } = await supabase
            .from('cold_email_campaigns')
            .select('*')
            .eq('name', 'Direct Single Sends')
            .single();

        if (!campaign) {
            const { data: newCampaign, error: createCampErr } = await supabase
                .from('cold_email_campaigns')
                .insert([{
                    name: 'Direct Single Sends',
                    status: 'Completed',
                    sent_count: 0,
                    target_filters: { type: 'one-off' }
                }])
                .select()
                .single();
            if (createCampErr) throw createCampErr;
            campaign = newCampaign;
        }

        // 4. Prepare email
        const tracking_token = crypto.randomUUID();
        const vars = {
            name: lead.name?.split(' ')[0] || 'there',
            company: lead.company || 'your company',
            sender_name: 'The InspecQ Team'
        };

        const subject = processTemplate(subjectStr, vars);
        const rawBody = processTemplate(bodyStr, vars);
        const finalHtml = wrapHtml(rawBody, tracking_token);

        // 5. Send email
        await transporter.sendMail({
            from: process.env.FROM_EMAIL || `"InspecQ Team" <hello@inspecq.com>`,
            to: lead.email,
            subject: subject,
            html: finalHtml,
        });

        // 6. Record in DB
        await supabase.from('cold_emails').insert([{
            campaign_id: campaign.id,
            lead_id: lead.id,
            subject,
            body: rawBody,
            tracking_token,
            status: 'Sent'
        }]);

        // 7. Increment generic campaign stats
        await supabase
            .from('cold_email_campaigns')
            .update({ sent_count: (campaign.sent_count || 0) + 1 })
            .eq('id', campaign.id);

        // 8. Advance lead status if they were 'New'
        await supabase.from('leads')
            .update({ status: 'Contacted', updated_at: new Date().toISOString() })
            .eq('id', lead.id)
            .eq('status', 'New');

        return res.status(200).json({ success: true, tracking_token });

    } catch (error: any) {
        console.error("Single sending error:", error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
