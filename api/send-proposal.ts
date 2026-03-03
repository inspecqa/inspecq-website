import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { proposal_id, to_email, subject, body, tracking_token } = req.body || {};

        if (!to_email || !subject || !body || !tracking_token) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const host = process.env.SMTP_HOST;
        const port = Number(process.env.SMTP_PORT || 587);
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        const from = process.env.FROM_EMAIL || user;
        const baseUrl = process.env.VITE_SITE_URL || 'https://inspecq.com';

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: user && pass ? { user, pass } : undefined,
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Inject tracking pixel before closing </body> or at the end
        const pixelUrl = `${baseUrl}/api/track-open?token=${tracking_token}`;
        const trackingPixel = `<img src="${pixelUrl}" width="1" height="1" style="display:none;" alt="" />`;

        let finalHtml = body;
        if (finalHtml.includes('</body>')) {
            finalHtml = finalHtml.replace('</body>', `${trackingPixel}\n</body>`);
        } else {
            finalHtml += `\n${trackingPixel}`;
        }

        // Wrap links for click tracking
        // This simple regex looks for <a href="http..."> and replaces the href with the tracking URL.
        // It captures the original URL inside the href.
        finalHtml = finalHtml.replace(/<a\s+(?:[^>]*?\s+)?href=["'](https?:\/[^"']*)["']/gi, (match: string, originalUrl: string) => {
            const encodedUrl = encodeURIComponent(originalUrl);
            const trackingUrl = `${baseUrl}/api/track-click?token=${tracking_token}&url=${encodedUrl}`;
            // replace the original URL with tracking URL in the match
            return match.replace(originalUrl, trackingUrl);
        });

        const mailOptions = {
            from: `"InspecQ Proposals" <${from}>`,
            to: to_email,
            replyTo: from,
            subject: subject,
            html: finalHtml,
        };

        const info = await transporter.sendMail(mailOptions);
        return res.status(200).json({ ok: true, messageId: info.messageId });
    } catch (err: any) {
        console.error('[send-proposal] error:', err);
        return res.status(500).json({ error: 'Failed to send proposal' });
    }
}
