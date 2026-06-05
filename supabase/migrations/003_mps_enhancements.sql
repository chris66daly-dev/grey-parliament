-- Add contact and status columns to the mps table
-- Populated via the /api/admin/populate-mps route (TheyWorkForYou API)

alter table public.mps
  add column if not exists phone          text,
  add column if not exists website        text,
  add column if not exists twitter_handle text,
  add column if not exists parliament_url text,
  add column if not exists active         boolean not null default true,
  add column if not exists last_updated   timestamptz;
