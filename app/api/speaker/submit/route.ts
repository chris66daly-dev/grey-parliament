import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerAuth } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, constituency')
    .eq('id', user.id)
    .single();

  const { question_id, question_text } = await request.json();

  if (!question_text || question_text.length > 280) {
    return NextResponse.json({ error: 'Invalid question' }, { status: 400 });
  }

  const { error } = await supabase
    .from('speaker_questions')
    .insert({
      profile_id: user.id,
      question_id,
      first_name: profile?.first_name || 'Member',
      constituency: profile?.constituency || 'UK',
      question_text: question_text.trim(),
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
