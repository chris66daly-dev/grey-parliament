-- Grey Parliament: initial schema
-- Run via: supabase db push  (remote)
--       or: supabase db reset (local)

-- ─────────────────────────────────────────────
-- 1. profiles
-- ─────────────────────────────────────────────
create table public.profiles (
  id                      uuid primary key references auth.users on delete cascade,
  postcode                text,
  constituency            text,
  mp_id                   text,
  tier                    text not null default 'free_voter',
  name                    text,
  email                   text,
  include_name_on_verdict boolean not null default true,
  created_at              timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 2. mps
-- ─────────────────────────────────────────────
create table public.mps (
  id            text primary key,
  name          text not null,
  constituency  text,
  party         text,
  email         text,
  photo_url     text,
  salary        integer not null default 91346,
  since_year    integer,
  response_rate integer not null default 0,
  rating        text not null default 'F',
  created_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 3. questions
-- ─────────────────────────────────────────────
create table public.questions (
  id                uuid primary key default gen_random_uuid(),
  text              text not null,
  week_start        date,
  approved          boolean not null default false,
  approved_at       timestamptz,
  department_tag    text,
  controversy_level text,
  source_headlines  text,
  created_at        timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 4. votes
-- ─────────────────────────────────────────────
create table public.votes (
  id             uuid primary key default gen_random_uuid(),
  member_id      uuid references public.profiles on delete set null,
  question_id    uuid references public.questions on delete cascade,
  vote           text not null check (vote in ('YES', 'NO')),
  mp_id          text references public.mps on delete set null,
  constituency   text,
  payment_status text not null default 'pending',
  created_at     timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 5. reasons
-- ─────────────────────────────────────────────
create table public.reasons (
  id               uuid primary key default gen_random_uuid(),
  vote_id          uuid references public.votes on delete cascade,
  member_id        uuid references public.profiles on delete set null,
  text             text not null,
  likes            integer not null default 0,
  dislikes         integer not null default 0,
  flags            integer not null default 0,
  total_reactions  integer not null default 0,
  status           text not null default 'visible',
  removed_by       text,
  created_at       timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 6. reason_votes
-- ─────────────────────────────────────────────
create table public.reason_votes (
  id         uuid primary key default gen_random_uuid(),
  reason_id  uuid references public.reasons on delete cascade,
  member_id  uuid references public.profiles on delete cascade,
  vote_type  text not null check (vote_type in ('like', 'dislike', 'flag')),
  created_at timestamptz not null default now(),
  unique (reason_id, member_id)
);

-- ─────────────────────────────────────────────
-- 7. mp_verdicts
-- ─────────────────────────────────────────────
create table public.mp_verdicts (
  id             uuid primary key default gen_random_uuid(),
  mp_id          text references public.mps on delete cascade,
  question_id    uuid references public.questions on delete cascade,
  yes_count      integer,
  no_count       integer,
  total_count    integer,
  sent_at        timestamptz,
  response_text  text,
  response_type  text,
  response_at    timestamptz,
  created_at     timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- 8. cin_total (card issuance / fulfilment ledger)
-- ─────────────────────────────────────────────
create table public.cin_total (
  id             uuid primary key default gen_random_uuid(),
  amount_pence   integer not null,
  vote_id        uuid references public.votes on delete set null,
  transferred    boolean not null default false,
  transfer_date  date,
  created_at     timestamptz not null default now()
);

-- ═════════════════════════════════════════════
-- Row Level Security
-- ═════════════════════════════════════════════

alter table public.profiles    enable row level security;
alter table public.mps         enable row level security;
alter table public.questions   enable row level security;
alter table public.votes       enable row level security;
alter table public.reasons     enable row level security;
alter table public.reason_votes enable row level security;
alter table public.mp_verdicts enable row level security;
alter table public.cin_total   enable row level security;

-- ─────────────────────────────────────────────
-- profiles: owner only
-- ─────────────────────────────────────────────
create policy "profiles: owner can select"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: owner can insert"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: owner can update"
  on public.profiles for update
  using (auth.uid() = id);

-- ─────────────────────────────────────────────
-- mps: publicly readable
-- ─────────────────────────────────────────────
create policy "mps: public read"
  on public.mps for select
  using (true);

-- ─────────────────────────────────────────────
-- questions: publicly readable (approved only for anon)
-- ─────────────────────────────────────────────
create policy "questions: public read approved"
  on public.questions for select
  using (approved = true);

-- ─────────────────────────────────────────────
-- votes: owner or service-role admin
-- ─────────────────────────────────────────────
create policy "votes: owner can select"
  on public.votes for select
  using (auth.uid() = member_id);

create policy "votes: owner can insert"
  on public.votes for insert
  with check (auth.uid() = member_id);

-- ─────────────────────────────────────────────
-- reasons: publicly readable; owner can insert/update
-- ─────────────────────────────────────────────
create policy "reasons: public read"
  on public.reasons for select
  using (status = 'visible');

create policy "reasons: owner can insert"
  on public.reasons for insert
  with check (auth.uid() = member_id);

create policy "reasons: owner can update"
  on public.reasons for update
  using (auth.uid() = member_id);

-- ─────────────────────────────────────────────
-- reason_votes: owner manages their own reactions
-- ─────────────────────────────────────────────
create policy "reason_votes: owner can select"
  on public.reason_votes for select
  using (auth.uid() = member_id);

create policy "reason_votes: owner can insert"
  on public.reason_votes for insert
  with check (auth.uid() = member_id);

create policy "reason_votes: owner can delete"
  on public.reason_votes for delete
  using (auth.uid() = member_id);

-- ─────────────────────────────────────────────
-- mp_verdicts: publicly readable
-- ─────────────────────────────────────────────
create policy "mp_verdicts: public read"
  on public.mp_verdicts for select
  using (true);

-- ─────────────────────────────────────────────
-- cin_total: service role only (no user-facing policy)
-- ─────────────────────────────────────────────
-- No select/insert policies — accessible only via service_role key
-- in server-side API routes.
