-- Explicit table-level grants so RLS policies can be evaluated.
--
-- Supabase's dashboard-created tables get these automatically, but
-- migration-created tables need them set explicitly. Without these grants
-- the anon/authenticated roles receive "permission denied" before RLS
-- policies are even checked, causing queries to fail silently.

-- ── anon role (unauthenticated visitors, anon-key requests) ──────────────
grant select on public.questions   to anon;
grant select on public.mps         to anon;
grant select on public.mp_verdicts to anon;
grant select on public.reasons     to anon;

-- ── authenticated role (logged-in users, anon-key + valid JWT) ──────────
grant select, insert, update        on public.profiles      to authenticated;
grant select, insert                on public.votes         to authenticated;
grant select, insert, update        on public.reasons       to authenticated;
grant select, insert, delete        on public.reason_votes  to authenticated;
grant select                        on public.questions     to authenticated;
grant select                        on public.mps           to authenticated;
grant select                        on public.mp_verdicts   to authenticated;

-- cin_total is intentionally service-role only — no grants here.
