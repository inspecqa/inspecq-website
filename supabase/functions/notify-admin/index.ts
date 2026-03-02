// @ts-nocheck
// This file runs on Deno (Supabase Edge Functions runtime), NOT Node.js.
// Deno globals and https://deno.land imports are intentional and correct.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";


// ── Env vars — set these in Supabase Dashboard → Project Settings → Edge Functions → Secrets ──
const SMTP_HOST = Deno.env.get("SMTP_HOST") ?? "smtp.hostinger.com";
const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USER = Deno.env.get("SMTP_USER") ?? "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") ?? "";
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") ?? SMTP_USER;
const FROM_NAME = Deno.env.get("FROM_NAME") ?? "InspecQ Notifications";

interface Payload {
    type: "form_submission" | "job_application" | "newsletter_subscriber" | "trial_request";
    record: Record<string, unknown>;
}

function subject(type: Payload["type"]): string {
    const map = {
        form_submission: "📬 New Contact Form Submission — InspecQ",
        job_application: "📋 New Job Application — InspecQ",
        newsletter_subscriber: "📧 New Newsletter Subscriber — InspecQ",
        trial_request: "🚀 New Free Trial Request — InspecQ",
    };
    return map[type];
}

function html(type: Payload["type"], record: Record<string, unknown>): string {
    const rows = Object.entries(record)
        .filter(([k, v]) => v !== null && v !== undefined && v !== "" && k !== "id")
        .map(([k, v]) => `<tr>
      <td style="padding:8px 14px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;white-space:nowrap">${k}</td>
      <td style="padding:8px 14px;color:#111827;border-bottom:1px solid #f3f4f6">${v}</td>
    </tr>`)
        .join("");

    return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f9fafb;font-family:sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;padding:32px;box-shadow:0 1px 4px rgba(0,0,0,.07)">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
      <div style="background:#0d9488;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center">
        <span style="color:#fff;font-size:18px;line-height:1">✓</span>
      </div>
      <div>
        <h2 style="margin:0;font-size:16px;color:#111827">${subject(type)}</h2>
        <p style="margin:0;font-size:12px;color:#9ca3af">${new Date().toLocaleString()}</p>
      </div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #f3f4f6">
      <a href="https://inspecq.com/admin/dashboard"
        style="background:#0d9488;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">
        Open Admin Panel →
      </a>
    </div>
  </div>
  <p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:12px">
    InspecQ Admin · <a href="https://inspecq.com" style="color:#0d9488">inspecq.com</a>
  </p>
</body></html>`;
}

// ── Send via SMTP using raw fetch to Supabase's built-in SMTP support ──
// Hostinger SMTP: port 465 = implicit TLS, port 587 = STARTTLS
async function sendEmail(subjectText: string, htmlBody: string): Promise<void> {
    // Build a minimal SMTP conversation via the Deno TCP API
    // We use the `denomailer` npm-compatible package available in Deno
    const { SMTPClient } = await import("https://deno.land/x/denomailer@1.6.0/mod.ts");

    const client = new SMTPClient({
        connection: {
            hostname: SMTP_HOST,
            port: SMTP_PORT,
            tls: SMTP_PORT === 465,      // true = implicit TLS (Hostinger port 465)
            auth: { username: SMTP_USER, password: SMTP_PASS },
        },
    });

    await client.send({
        from: `${FROM_NAME} <${SMTP_USER}>`,
        to: NOTIFY_EMAIL,
        subject: subjectText,
        html: htmlBody,
    });

    await client.close();
}

serve(async (req) => {
    try {
        if (req.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }

        if (!SMTP_USER || !SMTP_PASS) {
            console.warn("SMTP_USER or SMTP_PASS not set — skipping email.");
            return new Response(JSON.stringify({ ok: true, skipped: true }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        const payload: Payload = await req.json();
        await sendEmail(subject(payload.type), html(payload.type, payload.record));

        console.log(`Email sent: ${subject(payload.type)} → ${NOTIFY_EMAIL}`);
        return new Response(JSON.stringify({ ok: true }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("notify-admin error:", err);
        return new Response(JSON.stringify({ error: String(err) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});
