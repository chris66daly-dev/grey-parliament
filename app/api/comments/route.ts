import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerAuth } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  const supabase = await getSupabaseServerAuth();
  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get('question_id');
  const sort = searchParams.get('sort') || 'newest';

  if (!questionId) {
    return NextResponse.json({ error: 'question_id required' }, { status: 400 });
  }

  const orderColumn = sort === 'top' ? 'upvotes' : 'created_at';
  const orderAsc = sort === 'top' ? false : false;

  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(name, tier)')
    .eq('question_id', questionId)
    .eq('is_removed', false)
    .order(orderColumn, { ascending: orderAsc });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data });
}

export async function POST(request: NextRequest) {
  const supabase = await getSupabaseServerAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, name')
    .eq('id', user.id)
    .single();

  if (!profile || profile.tier !== 'gmp') {
    return NextResponse.json({ error: 'GMP membership required to comment' }, { status: 403 });
  }

  const { question_id, content } = await request.json();

  if (!content || content.length > 280) {
    return NextResponse.json({ error: 'Comment must be 1–280 characters' }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from('comments')
    .select('id')
    .eq('question_id', question_id)
    .eq('profile_id', user.id);

  if (existing && existing.length >= 10) {
    return NextResponse.json({ error: 'Maximum 10 comments per question reached' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      question_id,
      profile_id: user.id,
      author_name: profile.name,
      content: content.trim()
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data });
}
