import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { question, questionText } = await request.json();

  if (!question || !questionText) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: `You are the Speaker of Grey Parliament — an independent, non-partisan civic platform for the over-50s in the UK. Your role is to inform, not to influence. You provide balanced, factual, considered responses to questions about the current political question being debated. You never tell members how to vote. You never express a personal opinion. You present facts, context, and the strongest arguments on both sides. You are authoritative, calm, and respectful. Always end your response with a line break and then: "The verdict is yours." Keep responses under 200 words.`,
        messages: [
          {
            role: 'user',
            content: `This week's question being debated is: "${questionText}"\n\nA member asks: ${question}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const answer = data.content?.[0]?.text || 'The Speaker is unavailable right now.';
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: 'Speaker unavailable' }, { status: 500 });
  }
}
