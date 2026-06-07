'use client';

import { useState } from 'react';

interface Props {
  questionId: string;
  questionText: string;
  userId: string | null;
  firstName: string | null;
  constituency: string | null;
}

const EXAMPLE_QUESTIONS = [
  "What are the strongest arguments for voting Yes?",
  "What are the strongest arguments for voting No?",
  "What has this MP actually done on this issue?",
  "Explain this issue simply — what does it mean for me?",
  "What do independent experts say about this question?",
];

const ENGAGEMENT_PHRASES = [
  "Great question.",
  "I hear you.",
  "Your question matters.",
  "The Speaker has noted this.",
];

export default function AskTheSpeaker({ questionId, questionText, userId, firstName, constituency }: Props) {
  const [customQuestion, setCustomQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitPhrase, setSubmitPhrase] = useState('');
  const [activeQuestion, setActiveQuestion] = useState('');

  const askQuestion = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setActiveQuestion(q);
    setAnswer('');
    try {
      const res = await fetch('/api/speaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, questionText }),
      });
      const data = await res.json();
      setAnswer(data.answer || 'The Speaker is unavailable right now. Please try again shortly.');
    } catch {
      setAnswer('The Speaker is unavailable right now. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  };

  const submitQuestion = async () => {
    if (!customQuestion.trim() || !userId) return;
    try {
      await fetch('/api/speaker/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: questionId,
          question_text: customQuestion,
        }),
      });
      const phrase = ENGAGEMENT_PHRASES[Math.floor(Math.random() * ENGAGEMENT_PHRASES.length)];
      setSubmitPhrase(phrase);
      setSubmitted(true);
      setCustomQuestion('');
    } catch {
      console.error('Submit failed');
    }
  };

  return (
    <section style={{ marginTop: '48px', borderTop: '1px solid #e8e4dc', paddingTop: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Ask the Speaker</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 700, color: '#1a1814', marginBottom: '8px' }}>Want to understand this issue better?</h2>
        <p style={{ fontSize: '0.9rem', color: '#888074', lineHeight: 1.6 }}>The Speaker offers balanced, factual insight — never tells you how to vote. The verdict is always yours.</p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', color: '#888074', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ask a question</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {EXAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => askQuestion(q)}
              style={{ textAlign: 'left', padding: '12px 16px', background: activeQuestion === q ? '#1a1814' : '#fff', color: activeQuestion === q ? '#f5f0e8' : '#1a1814', border: '1px solid #e8e4dc', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1.4 }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ background: '#f5f0e8', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ color: '#888074', fontSize: '0.9rem', fontStyle: 'italic' }}>The Speaker is considering your question...</p>
        </div>
      )}

      {answer && !loading && (
        <div style={{ background: '#1a1814', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>The Speaker</div>
          <p style={{ color: '#f5f0e8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '12px' }}>{answer}</p>
          <p style={{ color: '#888074', fontSize: '0.8rem', fontStyle: 'italic' }}>The verdict is yours.</p>
        </div>
      )}

      {userId ? (
        <div style={{ background: '#f5f0e8', border: '1px solid #e8e4dc', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontSize: '12px', color: '#888074', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Submit your own question to the Speaker</div>
          {submitted ? (
            <div>
              <p style={{ color: '#1a1814', fontWeight: 700, marginBottom: '4px' }}>{submitPhrase}</p>
              <p style={{ color: '#888074', fontSize: '0.9rem' }}>Thank you{firstName ? ` ${firstName}` : ''}. Your question has been noted and may be answered in this week's debate.</p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: '12px', fontSize: '0.85rem', color: '#c9a84c', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Submit another question</button>
            </div>
          ) : (
            <>
              <textarea
                value={customQuestion}
                onChange={e => setCustomQuestion(e.target.value.slice(0, 280))}
                placeholder="What would you like the Speaker to address about this question?"
                style={{ width: '100%', resize: 'none', border: '1px solid #e8e4dc', borderRadius: '8px', padding: '12px', fontSize: '0.9rem', fontFamily: 'inherit', marginBottom: '8px', boxSizing: 'border-box' }}
                rows={3}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#888074' }}>{customQuestion.length}/280</span>
                <button
                  onClick={submitQuestion}
                  disabled={!customQuestion.trim()}
                  style={{ background: '#1a1814', color: '#f5f0e8', padding: '10px 24px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, opacity: customQuestion.trim() ? 1 : 0.5 }}
                >
                  Submit to the Speaker
                </button>
              </div>
              {firstName && constituency && (
                <p style={{ fontSize: '11px', color: '#888074', marginTop: '8px' }}>Your question will appear as: <strong>{firstName} from {constituency}</strong></p>
              )}
            </>
          )}
        </div>
      ) : (
        <div style={{ background: '#f5f0e8', border: '1px solid #e8e4dc', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#1a1814', marginBottom: '12px', fontSize: '0.95rem' }}>Sign up to submit your own questions to the Speaker and see your name in the debate.</p>
          <a href="/auth/signup" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1814', padding: '10px 24px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Join free</a>
        </div>
      )}
    </section>
  );
}
