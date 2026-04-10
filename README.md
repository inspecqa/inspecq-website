# 🌐 InspecQ — Official Website & CRM Platform

**Built to Inspect. Powered by Quality.**  

Welcome to the official repository of [InspecQ](https://inspecq.com) — a QA Agency dedicated to helping startups, software companies, and SaaS teams ship high-quality software faster and with confidence.

---

## 🚀 Live Site

👉 [Visit Website](https://inspecq.com)

---

## 📌 About InspecQ

InspecQ is a quality assurance agency that delivers precision-driven, scalable testing solutions.  
We specialize in:
- Manual & Exploratory Testing  
- Automation Testing (Web, Mobile, API)  
- API and Backend Testing 
- Performance Testing  
- CI/CD QA Integration  
- QA Strategy & Audits

---

## 🛠️ Tech Stack

This project is not just a landing page; it's a full-stack Web Application featuring a bespoke internal CRM, Proposal Engine, and Cold Emailing Platform.

**Frontend:**
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Icons:** Lucide-React
- **Routing:** React Router DOM

**Backend & Data:**
- **Database / Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **API Runtime:** Vercel Edge Functions (`/api/*`)
- **Email Delivery:** Nodemailer (via SMTP)

---

## 💎 Key Features (Protected Admin Dashboard)

Beyond the public-facing pages, the `/admin` route is a powerful, secure internal dashboard:

- **Lead Management CRM**: Dual-view (Table & Kanban) pipeline tracking with drag-and-drop statuses.
- **Smart Data Import**: Native auto-import from frontend submissions and manual bulk CSV mapping.
- **Proposal Engine**: Dynamic HTML templating engine to generate and instantly dispatch proposals.
- **Cold Email System**: Compose targeted email batches, filter audiences, and execute single-trigger outreaches.
- **Pixel Tracking**: Fully automated tracking of **Email Opens** and **Link Clicks** via 1x1 invisible GIFs and edge-function link wrapping.
- **Real-Time Activity Log**: SQL Trigger-backed activity log syncing website leads instantly.

---

## ⚙️ Local Development Setup

To run this application locally, you will need Node.js installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of your project. The application depends heavily on these variables:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_public_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_role_key

# Email/SMTP Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
FROM_EMAIL=your_sender_address

# Tracking Configuration
VITE_SITE_URL=http://localhost:5173 # For local testing
```

### 3. Database Migrations
Before the CRM can operate, you must run the provided SQL scripts located within the project folder inside your Supabase SQL Editor. This initializes the `leads`, `proposals`, `cold_email_campaigns` tables and generates the automated PostgreSQL Activity Triggers.

### 4. Run the Dev Server
```bash
npm run dev
```

---

## 🚀 Deployment

This project is highly optimized for deployment on **Vercel**. 

Because this application utilizes Vercel Edge Functions (inside the `/api` directory), Vercel is highly recommended. Ensure that you have manually populated all of the environment variables listed above within your Vercel Project Dashboard before triggering a build. 

For the production environment, make sure `VITE_SITE_URL` is set to your actual domain (e.g., `https://inspecq.com`).

---

## 👋 Connect With Us

- 🌐 Website: [https://inspecq.com](https://inspecq.com)  
- 📧 Email: contact@inspecq.com  
- 🔗 Facebook: [InspecQ Facebook Page](https://www.facebook.com/helloinspecqa)
- 🔗 LinkedIn: [InspecQ LinkedIn Page](https://linkedin.com/company/inspecq)
- 🔗 X: [InspecQ X Page](https://x.com/inspecq)

---
## 📄 License

This project is licensed under the [MIT License](./LICENSE).

> © 2026 InspecQ. Built to Inspect. Powered by Quality.