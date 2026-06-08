'use client';

import { useState } from 'react';

export default function SpeakerButton() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askSpeaker = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/speaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          questionText: 'Andy Burnham has publicly stated his ambition to lead the Labour Party. He is standing in the Makerfield by-election. Do you want Andy Burnham as your next Prime Minister?'
        }),
      });
      const data = await res.json();
      setAnswer(data.answer || 'The Speaker is unavailable right now.');
    } catch {
      setAnswer('The Speaker is unavailable right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes gp-speaker-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201, 168, 76, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(201, 168, 76, 0); }
        }
        @keyframes gp-speaker-slide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
      }}>
        {open && (
          <div style={{
            background: '#1a1814',
            border: '1px solid #c9a84c',
            borderRadius: '12px',
            padding: '16px',
            width: '300px',
            animation: 'gp-speaker-slide 0.2s ease-out',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', color: '#c9a84c', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--sans)' }}>Ask the Speaker</span>
              <button onClick={() => { setOpen(false); setAnswer(''); setQuestion(''); }} style={{ background: 'none', border: 'none', color: '#888074', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
            </div>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), askSpeaker())}
              placeholder="Ask anything about this week's question..."
              autoFocus
              rows={2}
              style={{
                width: '100%',
                background: '#2a2520',
                border: '1px solid #3a3530',
                borderRadius: '6px',
                padding: '10px',
                color: '#f5f0e8',
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                resize: 'none',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: '8px',
              }}
            />
            <button
              onClick={askSpeaker}
              disabled={loading || !question.trim()}
              style={{
                width: '100%',
                background: question.trim() && !loading ? '#c9a84c' : '#3a3530',
                color: question.trim() && !loading ? '#1a1814' : '#888074',
                border: 'none',
                borderRadius: '6px',
                padding: '8px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: question.trim() && !loading ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--sans)',
                marginBottom: answer ? '12px' : '0',
              }}
            >
              {loading ? 'The Speaker is considering...' : 'Ask →'}
            </button>
            {answer && (
              <div style={{
                background: '#2a2520',
                borderRadius: '6px',
                padding: '12px',
                fontSize: '13px',
                color: '#c8c4bc',
                lineHeight: 1.6,
                fontFamily: 'var(--sans)',
                animation: 'gp-speaker-slide 0.2s ease-out',
              }}>
                {answer}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          style={{
            background: '#1a1814',
            border: '2px solid #c9a84c',
            borderRadius: '50px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            animation: 'gp-speaker-pulse 2.5s ease-in-out infinite',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <img src="/GMP-Logo.png" alt="" style={{ height: '24px', width: 'auto', mixBlendMode: 'lighten' }} />
          <span style={{ fontSize: '12px', color: '#c9a84c', fontWeight: 700, fontFamily: 'var(--sans)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Ask the Speaker</span>
        </button>
      </div>
    </>
  );
}
