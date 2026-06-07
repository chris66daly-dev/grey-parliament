'use client';

import { useState } from 'react';
import Link from 'next/link';

const actions = [
  {
    id: 'vote',
    icon: '🗳️',
    label: 'This Week\'s Vote',
    description: 'Cast your verdict on this week\'s question. Your result goes straight to your MP.',
    href: '/vote',
    cta: 'Vote Now',
  },
  {
    id: 'say',
    icon: '💬',
    label: 'Have Your Say',
    description: 'Join the debate. Read what members are saying and add your voice.',
    href: '/vote',
    cta: 'Join the Debate',
  },
  {
    id: 'speaker',
    icon: '🏛️',
    label: 'Ask the Speaker',
    description: 'Get balanced, factual insight on this week\'s question. The Speaker never tells you how to vote.',
    href: '/vote',
    cta: 'Ask Now',
  },
  {
    id: 'news',
    icon: '📰',
    label: 'Latest News',
    description: 'Live political headlines from BBC Politics and The Guardian, refreshed every 30 minutes.',
    href: '/#news',
    cta: 'Read Now',
  },
];

export default function ActionBar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: '#1a1814',
      borderTop: '1px solid #3a3530',
      fontFamily: 'var(--sans)',
    }}>
      {open && (
        <div style={{
          background: '#2a2520',
          borderTop: '1px solid #3a3530',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          maxWidth: 760,
          margin: '0 auto',
          width: '100%',
        }}>
          <p style={{ color: '#c8c4bc', fontSize: '0.9rem', lineHeight: 1.5, margin: 0, flex: 1 }}>
            {actions.find(a => a.id === open)?.description}
          </p>
          <Link
            href={actions.find(a => a.id === open)?.href || '/'}
            style={{
              background: '#c9a84c',
              color: '#1a1814',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
            }}
            onClick={() => setOpen(null)}
          >
            {actions.find(a => a.id === open)?.cta} →
          </Link>
          <button
            onClick={() => setOpen(null)}
            style={{ background: 'none', border: 'none', color: '#888074', cursor: 'pointer', fontSize: '1.2rem', padding: '4px' }}
          >
            ✕
          </button>
        </div>
      )}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 16px',
        maxWidth: 760,
        margin: '0 auto',
      }}>
        {actions.map(action => (
          <button
            key={action.id}
            onClick={() => setOpen(open === action.id ? null : action.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 12px',
              borderRadius: '8px',
              transition: 'background 0.15s',
              background: open === action.id ? '#2a2520' : 'none',
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>{action.icon}</span>
            <span style={{ fontSize: '10px', color: open === action.id ? '#c9a84c' : '#888074', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
