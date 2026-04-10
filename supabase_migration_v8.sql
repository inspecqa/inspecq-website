-- ============================================================
-- InspecQ — QA Scorecard Migration (v8)
-- Run in Supabase SQL Editor
-- ============================================================

create table if not exists scorecard_leads (
  id               uuid primary key default gen_random_uuid(),
  email            text not null,
  score            int not null,
  band             text not null,
  category_scores  jsonb not null,
  answers          jsonb not null,
  created_at       timestamptz not null default now()
);

create index idx_scorecard_leads_created_at on scorecard_leads (created_at desc);

alter table scorecard_leads enable row level security;

-- Allow authenticated admins to select, update, delete
create policy "admin_all_scorecard_leads" on scorecard_leads 
  for all using (auth.role() = 'authenticated');

-- Allow public anonymous users to submit their results
create policy "public_insert_scorecard_leads" on scorecard_leads 
  for insert with check (true);
