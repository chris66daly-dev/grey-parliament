'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const actions = [
  {
    id: 'vote',
    icon: '🗳️',
    label: "This Week's Vote",
    description: "Cast your verdict on this week's question. Your result goes straight to your MP.",
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
    description: "Get balanced, factual insight on this week's question. The Speaker never tells you how to vote.",
    href: '/vote',
    cta: 'Ask Now',
  },
  {
    id: 'news',
    icon: '📰',
    label: 'Latest News',
    description: 'Live political headlines from BBC Politics and The Guardian on our homepage, refreshed every 30 minutes.',
    href: '/#news',
    cta: 'Read Now',
  },
];

export default function ActionBar() {
  const [open, setOpen] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);
  const [announced, setAnnounced] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnnounced(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const expandedAction = actions.find(a => a.id === open);

  if (isMobile) {
    return (
      <>
        <style>{`
          @keyframes gp-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.18); }
            100% { transform: scale(1); }
          }
          @keyframes gp-slidein {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes gp-announce {
            0% { opacity: 0; transform: translateY(8px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-8px); }
          }
          .gp-action-btn:hover span.gp-label { color: #c9a84c !important; }
          body { padding-bottom: 80px; }
        `}</style>
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: '#1a1814',
          borderTop: '2px solid #c9a84c',
          fontFamily: 'var(--sans)',
          animation: 'gp-slidein 0.5s ease-out',
        }}>
          {!announced && (
            <div style={{
              background: '#c9a84c',
              padding: '8px 24px',
              textAlign: 'center',
              animation: 'gp-announce 3s ease forwards',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1a1814', letterSpacing: '0.1em' }}>
                YOUR PARLIAMENT IS IN SESSION
              </span>
            </div>
          )}
          {open && expandedAction && (
            <div style={{
              background: '#2a2520',
              borderTop: '1px solid #3a3530',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <p style={{ color: '#c8c4bc', fontSize: '0.85rem', lineHeight: 1.5, margin: 0, flex: 1 }}>
                {expandedAction.description}
              </p>
              <Link
                href={expandedAction.href}
                style={{
                  background: '#c9a84c',
                  color: '#1a1814',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                }}
                onClick={() => setOpen(null)}
              >
                {expandedAction.cta} →
              </Link>
              <button onClick={() => setOpen(null)} style={{ background: 'none', border: 'none', color: '#888074', cursor: 'pointer', fontSize: '1.1rem', padding: '4px' }}>✕</button>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '8px 8px 12px' }}>
            {actions.map((action, i) => (
              <button
                key={action.id}
                className="gp-action-btn"
                onClick={() => setOpen(open === action.id ? null : action.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  background: open === action.id ? '#2a2520' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                }}
              >
                <span style={{
                  fontSize: '1.5rem',
                  display: 'block',
                  animation: pulse % actions.length === i ? 'gp-pulse 0.6s ease' : 'none',
                }}>
                  {action.icon}
                </span>
                <span className="gp-label" style={{
                  fontSize: '9px',
                  color: open === action.id ? '#c9a84c' : '#888074',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes gp-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes gp-fadein {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gp-bar-enter {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gp-desktop-btn { transition: background 0.2s, border-color 0.2s; }
        .gp-desktop-btn:hover { background: #2a2520 !important; border-color: #c9a84c !important; }
        .gp-desktop-btn:hover .gp-desktop-label { color: #c9a84c !important; }
      `}</style>
      <div style={{
        background: '#12100e',
        borderBottom: '1px solid #3a3530',
        borderTop: '1px solid #3a3530',
        padding: '0 24px',
        fontFamily: 'var(--sans)',
        animation: 'gp-bar-enter 0.6s ease-out',
      }}>
        <div style={{
          maxWidth: 760,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'stretch',
          gap: 0,
        }}>
          <div style={{
            fontSize: '10px',
            color: '#c9a84c',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            paddingRight: '20px',
            borderRight: '1px solid #3a3530',
            whiteSpace: 'nowrap',
          }}>
            In Session
          </div>
          {actions.map((action, i) => (
            <button
              key={action.id}
              className="gp-desktop-btn"
              onClick={() => setOpen(open === action.id ? null : action.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: open === action.id ? '#2a2520' : 'none',
                border: 'none',
                borderLeft: i === 0 ? 'none' : '1px solid #3a3530',
                borderRight: 'none',
                borderTop: 'none',
                borderBottom: open === action.id ? '2px solid #c9a84c' : '2px solid transparent',
                cursor: 'pointer',
                padding: '14px 20px',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <span style={{
                fontSize: '1.1rem',
                animation: pulse % actions.length === i ? 'gp-pulse 0.6s ease' : 'none',
              }}>
                {action.icon}
              </span>
              <span className="gp-desktop-label" style={{
                fontSize: '12px',
                color: open === action.id ? '#c9a84c' : '#c8c4bc',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}>
                {action.label}
              </span>
            </button>
          ))}
        </div>
        {open && expandedAction && (
          <div style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '16px 0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            borderTop: '1px solid #3a3530',
            animation: 'gp-fadein 0.25s ease-out',
          }}>
            <p style={{ color: '#c8c4bc', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, flex: 1 }}>
              {expandedAction.description}
            </p>
            <Link
              href={expandedAction.href}
              style={{
                background: '#c9a84c',
                color: '#1a1814',
                padding: '10px 24px',
                borderRadius: '6px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
              }}
              onClick={() => setOpen(null)}
            >
              {expandedAction.cta} →
            </Link>
            <button onClick={() => setOpen(null)} style={{ background: 'none', border: 'none', color: '#888074', cursor: 'pointer', fontSize: '1.1rem', padding: '4px' }}>✕</button>
          </div>
        )}
      </div>
    </>
  );
}
