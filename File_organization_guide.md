# QA Agency File Organization Guide

Organizing an agency requires a logical structure that scales as you bring on more clients, hire more testers, and execute more marketing campaigns. By establishing a solid folder hierarchy and naming conventions now, you will save countless hours in the future.

---

<!-- ## 1. How to Organize Your Files

The best approach is to use a **Cloud Storage Solution** (like Google Drive, Microsoft OneDrive, Dropbox, or Notion for wikis) and establish a strict folder hierarchy.  -->

### A. Folder Hierarchy Strategy
Keep your top-level folders broad and limit them to 5-8 main categories. This prevents clutter.

**Proposed Top-Level Structure:**
```text
InspecQ_Workspace/
├── 01_Admin_Legal_Finance/       # Company incorporation, taxes, invoices
├── 02_Sales_Marketing/           # Social media, proposals, branding
├── 03_Operations_HR/             # Standard Operating Procedures (SOPs), team, hiring
├── 04_Client_Projects/           # ACTIVE clients (one subfolder per client)
├── 05_Archived_Projects/         # COMPLETED client projects
└── 06_Templates_Assets/          # Reusable templates (test plans, reports, logos)
```

### B. Naming Conventions
Adopt a standard naming convention so anyone can find a file instantly without opening it.
*   **Format:** `[Date/Year]_[Client/Category]_[Document Name]_v[Version]`
*   **Example 1 (Client Report):** `2026-03-09_AcmeCorp_QATestReport_v1.2.pdf`
*   **Example 2 (Invoice):** `INV_2026-03_TechStartup_QA_Services.pdf`

---

## 2. Essential Files Every QA Agency Needs

Here is a breakdown of the core files you must have for your QA agency, neatly organized by department.

### 01_Admin_Legal_Finance (The Business Core)
*   **Legal Documents:**
    *   Articles of Incorporation / LLC documents.
    *   Standard Master Services Agreement (MSA) template for new clients.
    *   Standard Non-Disclosure Agreement (NDA) template.
    *   Terms and Conditions & Privacy Policy (for your website).
*   **Finance & Accounting:**
    *   Invoice Templates.
    *   Expense tracking spreadsheets or receipts folder.
    *   Pricing Matrix/Rate Cards (Hourly rates vs. Project-based vs. Retainers).

### 02_Sales_Marketing (Growth & Outreach)
*(Note: Your current content strategy files belong here!)*
*   **Brand Assets:**
    *   Logos (SVG, PNG, JPG), brand colors, typography guidelines.
*   **Sales Collateral:**
    *   Agency Pitch Deck / Company Profile (PDF).
    *   Case Studies (Template + finalized case studies of past wins).
    *   Proposal Templates (to send when a lead requests a quote).
*   **Marketing & Content:**
    *   Social Media Strategy & Content Calendar (You already have this).
    *   Blog Post drafts and image templates.

### 03_Operations_HR (How the Agency Works)
*   **Standard Operating Procedures (SOPs):**
    *   *SOP: How to onboard a new client.*
    *   *SOP: How to write a standard test plan.*
    *   *SOP: How to log a bug effectively.*
*   **HR & Team:**
    *   Independent Contractor Agreements (if you hire freelance testers).
    *   Employee Handbook / Agency Culture guide.
    *   Interview guides/technical tests for hiring QA engineers.

### 04_Client_Projects (The Actual QA Work)
*Inside each Client folder (e.g., `Client_A/`), you should have:*
*   **01_Contracts:** Signed NDA & MSA.
*   **02_Requirements:** PRDs, user stories, documentation provided by the client.
*   **03_Test_Strategy:** 
    *   Master Test Plan.
    *   Test Cases / Scenarios (Excel or exported from tools like Jira/Zephyr).
*   **04_Test_Execution_Reports:**
    *   Daily/Weekly Status Reports.
    *   Final Release Sign-off Reports.
    *   Bug trend graphs/metrics.
*   **05_Automation_Scripts:** (If you do automation, source code might live in GitHub, but high-level architectural docs live here).

### 06_Templates_Assets (Your Cheat Codes)
Keep master copies of all internal tools here so your team doesn't start from scratch.
*   Master Test Plan Template
*   Bug Report Template
*   End-of-Sprint QA Report Template
*   Client Onboarding Questionnaire