import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-server'

// Requires TWFY_API_KEY env var — get a free key at https://www.theyworkforyou.com/api/key
// Trigger with: POST /api/admin/populate-mps
// Protected by ADMIN_SECRET header check.

const TWFY = 'https://www.theyworkforyou.com/api'

type TwfyMP = {
  person_id: string
  name: string
  constituency: string
  party: string
  member_id: string
}

type TwfyMPDetail = {
  person_id: string
  name: string
  constituency: string
  party: string
  email?: string
  twitter_username?: string
  url?: string
  office?: Array<{
    dept?: string
    phone?: string
    email?: string
    address?: string
    fax?: string
  }>
}

async function twfyFetch<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const key = process.env.TWFY_API_KEY
  if (!key) throw new Error('TWFY_API_KEY env var not set')
  const qs = new URLSearchParams({ ...params, key, output: 'js' })
  const res = await fetch(`${TWFY}/${endpoint}?${qs}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`TWFY ${endpoint} returned ${res.status}`)
  return res.json() as Promise<T>
}

export async function POST(req: Request) {
  // Simple secret check — set ADMIN_SECRET env var and pass it as x-admin-secret header
  const secret = process.env.ADMIN_SECRET
  if (secret && req.headers.get('x-admin-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = getSupabaseAdmin()
  if (!client) return NextResponse.json({ error: 'Supabase admin client unavailable' }, { status: 500 })

  try {
    // 1. Fetch all current MPs
    const allMPs = await twfyFetch<TwfyMP[]>('getMPs', { hansard_membership_id: '' })

    // TWFY returns all past & present — filter to those still in office
    const currentMPs = allMPs.filter(mp => mp.constituency && mp.name)

    // 2. Fetch detailed info for each MP (includes email, phone, twitter, website)
    //    Batched with small delay to stay within TWFY rate limits
    const rows: Record<string, unknown>[] = []
    for (const mp of currentMPs) {
      try {
        const detail = await twfyFetch<TwfyMPDetail>('getMP', { id: mp.person_id, always_return: '1' })

        const phone =
          detail.office?.find(o => o.phone && (o.dept ?? '').toLowerCase().includes('constituency'))?.phone ??
          detail.office?.find(o => o.phone)?.phone ??
          null

        const parliamentUrl = `https://www.theyworkforyou.com/mp/${mp.person_id}`

        rows.push({
          id: mp.person_id,
          name: detail.name ?? mp.name,
          constituency: detail.constituency ?? mp.constituency,
          party: detail.party ?? mp.party,
          email: detail.email ?? detail.office?.find(o => o.email)?.email ?? null,
          phone,
          website: detail.url ?? null,
          twitter_handle: detail.twitter_username ?? null,
          parliament_url: parliamentUrl,
          active: true,
          last_updated: new Date().toISOString(),
        })
      } catch {
        // skip individual failures — don't abort the whole batch
      }
    }

    // 3. Upsert all rows
    const BATCH = 50
    let upserted = 0
    for (let i = 0; i < rows.length; i += BATCH) {
      const { error } = await client.from('mps').upsert(rows.slice(i, i + BATCH), { onConflict: 'id' })
      if (error) throw error
      upserted += rows.slice(i, i + BATCH).length
    }

    return NextResponse.json({ ok: true, total: currentMPs.length, upserted })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
