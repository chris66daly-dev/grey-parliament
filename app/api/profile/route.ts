import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerAuth } from '@/lib/supabase-server'
import { lookupPostcode } from '@/lib/postcode'

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerAuth()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, firstName, lastName, postcode } = await req.json() as { name: string; firstName?: string; lastName?: string; postcode: string }

  const mpData = await lookupPostcode(postcode)

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    name,
    first_name: firstName ?? name.split(' ')[0],
    last_name: lastName ?? name.split(' ').slice(1).join(' '),
    email: user.email,
    postcode: mpData?.postcode ?? postcode.trim().toUpperCase(),
    constituency: mpData?.constituency ?? null,
    mp_id: mpData?.mpId ?? null,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    mp: mpData
      ? { name: mpData.mpName, constituency: mpData.constituency, party: mpData.mpParty }
      : null,
  })
}
