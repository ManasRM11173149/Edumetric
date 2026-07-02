-- ==========================================================================
-- EduMetric cross-device sync — Supabase schema
--
-- Run this once in your Supabase project:
--   Dashboard -> SQL Editor -> New query -> paste this file -> Run
-- ==========================================================================

create table if not exists public.user_state (
    user_id    uuid primary key references auth.users(id) on delete cascade,
    data       jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;

create policy "Users can read their own state"
    on public.user_state for select
    using (auth.uid() = user_id);

create policy "Users can insert their own state"
    on public.user_state for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own state"
    on public.user_state for update
    using (auth.uid() = user_id);

-- ==========================================================================
-- One more manual step (not SQL): EduMetric logs teachers in with a short
-- "User ID" instead of an email address. Under the hood it turns that ID
-- into a fake address like "yourid@edumetric.app" for Supabase Auth, which
-- can never receive a real confirmation email. So:
--
--   Dashboard -> Authentication -> Providers -> Email
--   -> turn OFF "Confirm email"
--
-- Otherwise new accounts will be stuck waiting on an email that never
-- arrives.
-- ==========================================================================
