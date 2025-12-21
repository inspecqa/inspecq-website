// api/unsubscribe/[token].ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query;
  
  if (!token || typeof token !== 'string') {
    return res.status(400).send(getErrorPage('Invalid or missing unsubscribe token'));
  }
  
  try {
    if (req.method === 'GET') {
      // Show confirmation page
      const { data: subscriber, error } = await supabase
        .from('newsletter_subscribers')
        .select('email, subscribed')
        .eq('unsubscribe_token', token)
        .single();
      
      if (error || !subscriber) {
        return res.status(404).send(getErrorPage('Invalid unsubscribe link. This link may have expired or is incorrect.'));
      }
      
      if (!subscriber.subscribed) {
        return res.status(200).send(getAlreadyUnsubscribedPage(subscriber.email));
      }
      
      return res.status(200).send(getConfirmationPage(subscriber.email, token));
    }
    
    if (req.method === 'POST') {
      // Process unsubscribe
      const { data: subscriber, error } = await supabase
        .from('newsletter_subscribers')
        .update({
          subscribed: false,
          unsubscribed_at: new Date().toISOString()
        })
        .eq('unsubscribe_token', token)
        .eq('subscribed', true)
        .select()
        .single();
      
      if (error || !subscriber) {
        return res.status(404).send(getErrorPage('Already unsubscribed or invalid link.'));
      }
      
      return res.status(200).send(getSuccessPage(subscriber.email));
    }
    
    return res.status(405).send(getErrorPage('Method not allowed'));
    
  } catch (error: any) {
    console.error('Unsubscribe error:', error);
    return res.status(500).send(getErrorPage('An unexpected error occurred. Please try again later.'));
  }
}

// HTML Templates
function getConfirmationPage(email: string, token: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe - InspecQ</title>
  <link href="https://fonts.cdnfonts.com/css/onnest" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 40px 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 500px;
      width: 100%;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo img {
      max-width: 120px;
      height: auto;
    }
    h1 {
      color: #333;
      font-size: 26px;
      margin: 0 0 20px 0;
      text-align: center;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .email {
      background: linear-gradient(to right, #f8f9fa 0%, #e8f5f5 100%);
      padding: 12px;
      border-radius: 6px;
      font-weight: 600;
      color: #008080;
      text-align: center;
      margin: 20px 0;
      word-break: break-all;
    }
    form {
      margin-top: 30px;
    }
    button {
      width: 100%;
      padding: 14px 24px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'Onnest', sans-serif;
      margin-bottom: 12px;
    }
    .btn-unsubscribe {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
    }
    .btn-unsubscribe:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
    }
    .btn-cancel {
      background: #f3f4f6;
      color: #374151;
    }
    .btn-cancel:hover {
      background: #e5e7eb;
    }
    .emoji {
      font-size: 48px;
      text-align: center;
      margin-bottom: 20px;
    }
    .note {
      font-size: 14px;
      color: #777;
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://tzmp2b268dae69si.public.blob.vercel-storage.com/Logo%40300x.png" alt="InspecQ">
    </div>
    <div class="emoji">😔</div>
    <h1>Unsubscribe from InspecQ Newsletter</h1>
    
    <p>We're sorry to see you go! Are you sure you want to unsubscribe?</p>
    
    <div class="email">${email}</div>
    
    <div class="note">
      You'll no longer receive our weekly QA insights, testing best practices, and actionable strategies.
    </div>
    
    <form method="POST" action="/api/unsubscribe/${token}">
      <button type="submit" class="btn-unsubscribe">Yes, Unsubscribe Me</button>
      <button type="button" class="btn-cancel" onclick="window.location.href='https://www.inspecq.com'">
        Keep Me Subscribed
      </button>
    </form>
  </div>
</body>
</html>`;
}

function getSuccessPage(email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed - InspecQ</title>
  <link href="https://fonts.cdnfonts.com/css/onnest" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 40px 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 500px;
      width: 100%;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .logo {
      margin-bottom: 30px;
    }
    .logo img {
      max-width: 120px;
      height: auto;
    }
    h1 {
      color: #333;
      font-size: 26px;
      margin: 0 0 20px 0;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .emoji {
      font-size: 64px;
      margin-bottom: 20px;
    }
    button {
      background: linear-gradient(135deg, #008080 0%, #20b2aa 100%);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 20px;
      font-family: 'Onnest', sans-serif;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 128, 128, 0.4);
    }
    .resubscribe {
      margin-top: 30px;
      padding-top: 30px;
      border-top: 1px solid #e5e7eb;
    }
    .resubscribe a {
      color: #008080;
      text-decoration: none;
      font-weight: 600;
    }
    .resubscribe a:hover {
      text-decoration: underline;
    }
    .email {
      font-weight: 600;
      color: #008080;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://tzmp2b268dae69si.public.blob.vercel-storage.com/Logo%40300x.png" alt="InspecQ">
    </div>
    <div class="emoji">✓</div>
    <h1>You've Been Unsubscribed</h1>
    
    <p>Your email <span class="email">${email}</span> has been successfully removed from our newsletter list.</p>
    
    <p>You won't receive any more emails from InspecQ.</p>
    
    <div class="resubscribe">
      <p style="font-size: 14px;">
        Changed your mind? You can always <a href="https://www.inspecq.com">resubscribe on our website</a>.
      </p>
    </div>
    
    <button onclick="window.location.href='https://www.inspecq.com'">
      Return to Homepage
    </button>
  </div>
</body>
</html>`;
}

function getAlreadyUnsubscribedPage(email: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Already Unsubscribed - InspecQ</title>
  <link href="https://fonts.cdnfonts.com/css/onnest" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 40px 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 500px;
      width: 100%;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .logo {
      margin-bottom: 30px;
    }
    .logo img {
      max-width: 120px;
      height: auto;
    }
    h1 {
      color: #333;
      font-size: 26px;
      margin: 0 0 20px 0;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .emoji {
      font-size: 64px;
      margin-bottom: 20px;
    }
    button {
      background: linear-gradient(135deg, #008080 0%, #20b2aa 100%);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 20px;
      font-family: 'Onnest', sans-serif;
    }
    .email {
      font-weight: 600;
      color: #008080;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://tzmp2b268dae69si.public.blob.vercel-storage.com/Logo%40300x.png" alt="InspecQ">
    </div>
    <div class="emoji">ℹ️</div>
    <h1>Already Unsubscribed</h1>
    
    <p>The email <span class="email">${email}</span> has already been unsubscribed from our newsletter.</p>
    
    <p>You won't receive any further emails from us.</p>
    
    <button onclick="window.location.href='https://www.inspecq.com'">
      Return to Homepage
    </button>
  </div>
</body>
</html>`;
}

function getErrorPage(message: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error - InspecQ</title>
  <link href="https://fonts.cdnfonts.com/css/onnest" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Onnest', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 40px 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 500px;
      width: 100%;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .logo {
      margin-bottom: 30px;
    }
    .logo img {
      max-width: 120px;
      height: auto;
    }
    h1 {
      color: #dc2626;
      font-size: 26px;
      margin: 0 0 20px 0;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .emoji {
      font-size: 64px;
      margin-bottom: 20px;
    }
    button {
      background: linear-gradient(135deg, #008080 0%, #20b2aa 100%);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 30px;
      font-family: 'Onnest', sans-serif;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://tzmp2b268dae69si.public.blob.vercel-storage.com/Logo%40300x.png" alt="InspecQ">
    </div>
    <div class="emoji">⚠️</div>
    <h1>Error</h1>
    <p>${message}</p>
    <button onclick="window.location.href='https://www.inspecq.com'">
      Return to Homepage
    </button>
  </div>
</body>
</html>`;
}