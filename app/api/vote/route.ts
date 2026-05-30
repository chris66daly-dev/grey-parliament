import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerAuth } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerAuth()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to vote' }, { status: 401 })
  }

  const { questionId, vote, mpId, constituency } = await req.json() as {
    questionId: string
    vote: 'YES' | 'NO'
    mpId: string | null
    constituency: string | null
  }

  if (!questionId || !['YES', 'NO'].includes(vote)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Prevent duplicate votes on the same question.
  const { data: existing } = await supabase
    .from('votes')
    .select('id')
    .eq('member_id', user.id)
    .eq('question_id', questionId)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'You have already voted on this question' }, { status: 409 })
  }

  const { error } = await supabase.from('votes').insert({
    member_id: user.id,
    question_id: questionId,
    vote,
    mp_id: mpId ?? null,
    constituency: constituency ?? null,
    payment_status: 'free',
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
