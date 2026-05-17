# Grey Parliament — Deployment Guide

## What's built
- Full Next.js 14 app with App Router
- Stripe checkout wired to both price IDs
- Webhook handler for member creation + card fulfilment trigger
- Age gate with decade-specific reactions
- Live countdown timer to Sunday midnight verdict close
- MP response tracker
- Pricing page with all three tiers
- Success page with share buttons
- Manifesto and five rules
- Vercel-ready configuration

## Deploy in 5 steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Grey Parliament — initial build"
gh repo create grey-parliament --private
git push -u origin main
```

### 2. Connect to Vercel
- Go to vercel.com
- Import your grey-parliament GitHub repo
- Framework: Next.js (auto-detected)

### 3. Add environment variables in Vercel dashboard
Copy from .env.local.example and fill in:
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY — your pk_test_ key
- STRIPE_SECRET_KEY — your sk_test_ key (never expose this)
- NEXT_PUBLIC_PRICE_SINGLE_VOTE — price_1TXoxZRMZe85TUo9lG6GJ6tK
- NEXT_PUBLIC_PRICE_MEMBERSHIP — price_1TXoZ1RMZe85TUo9pu7bHbQy
- NEXT_PUBLIC_APP_URL — https://greyparliament.co.uk

### 4. Set up Stripe webhook
- Stripe dashboard → Developers → Webhooks → Add endpoint
- URL: https://greyparliament.co.uk/api/webhook
- Events to listen for: checkout.session.completed, customer.subscription.deleted
- Copy the webhook signing secret → add as STRIPE_WEBHOOK_SECRET in Vercel

### 5. Point your domain
- Vercel dashboard → Domains → Add greyparliament.co.uk
- In your domain registrar (GoDaddy/Namecheap/IONOS):
  - Add CNAME record: www → cname.vercel-dns.com
  - Add A record: @ → 76.76.21.21

### 6. Set up Supabase (for members database)
- Go to supabase.com → New project → Grey Parliament
- Run this SQL to create members table:

```sql
create table members (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text unique,
  plan text, -- 'free', 'single_vote', 'official_member'
  stripe_customer_id text,
  birth_year int,
  constituency text,
  address jsonb,
  joined_at timestamptz default now(),
  card_sent boolean default false,
  is_rep boolean default false
);

create table votes (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id),
  question_id text,
  choice int,
  voted_at timestamptz default now()
);

create table verdicts (
  id uuid default gen_random_uuid() primary key,
  question text,
  topic text,
  result jsonb,
  total_votes int,
  sent_at timestamptz,
  mp_responses jsonb default '[]'
);
```

- Copy your Supabase URL and anon key → add to Vercel env vars

## Price IDs (already configured)
- I Want My Say (£2.99 one-off): price_1TXoxZRMZe85TUo9lG6GJ6tK
- Official Member (£4.99/month): price_1TXoZ1RMZe85TUo9pu7bHbQy

## Next steps to build
1. Member dashboard (see their votes, MP responses)
2. Admin dashboard (manage questions, send verdicts)
3. Weekly newsletter via Beehiiv API
4. Welcome card fulfilment via The Card Network API
5. MP letter auto-generation via Claude API
6. Global tracker dashboard (US midterms, AUS, CAN)
7. Constituency Representative portal

## Stack
- Next.js 14 (App Router)
- Stripe (payments + webhooks)
- Supabase (members database)
- Vercel (hosting)
- Beehiiv (newsletter) — to add
- The Card Network (card fulfilment) — to add
- Claude API (verdict letters, press releases) — to add
