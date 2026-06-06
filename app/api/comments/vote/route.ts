import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerAuth } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  const supabase = await getSupabaseServerAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();

  if (!profile || profile.tier !== 'gmp') {
    return NextResponse.json({ error: 'GMP membership required to vote on comments' }, { status: 403 });
  }

  const { comment_id, vote_type } = await request.json();

  if (!['up', 'down', 'out'].includes(vote_type)) {
    return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from('comment_votes')
    .select('id, vote_type')
    .eq('comment_id', comment_id)
    .eq('profile_id', user.id)
    .single();

  if (existing) {
    if (existing.vote_type === vote_type) {
      return NextResponse.json({ error: 'Already voted' }, { status: 400 });
    }
    await supabase
      .from('comment_votes')
      .update({ vote_type })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('comment_votes')
      .insert({ comment_id, profile_id: user.id, vote_type });
  }

  const { data: votes } = await supabase
    .from('comment_votes')
    .select('vote_type')
    .eq('comment_id', comment_id);

  const upvotes = votes?.filter(v => v.vote_type === 'up').length || 0;
  const downvotes = votes?.filter(v => v.vote_type === 'down').length || 0;
  const out_votes = votes?.filter(v => v.vote_type === 'out').length || 0;
  const total_votes = votes?.length || 0;
  const is_removed = total_votes >= 20 && (out_votes / total_votes) >= 0.5;

  await supabase
    .from('comments')
    .update({ upvotes, downvotes, out_votes, total_votes, is_removed })
    .eq('id', comment_id);

  return NextResponse.json({ success: true, is_removed });
}
