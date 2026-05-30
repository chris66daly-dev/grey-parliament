'use client'

import { useState } from 'react'
import PostcodeLookup from './PostcodeLookup'
import type { PostcodeResult } from '@/lib/postcode'

type Props = { questionId: string }

export default function VoteForm({ questionId }: Props) {
  const [vote, setVote] = useState<'YES' | 'NO' | null>(null)
  const [mp, setMp] = useState<PostcodeResult | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleVote(choice: 'YES' | 'NO') {
    setVote(choice)
  }

  function handleSubmit() {
    if (!vote) return
    // TODO: POST to /api/vote with { questionId, vote, mpId, constituency }
    // once auth is wired up.
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 700, color: '#1a1814', marginBottom: 8 }}>
          Verdict cast: {vote === 'YES' ? 'Yes' : 'No'}
        </div>
        {mp && (
          <div style={{ fontSize: 14, color: '#555', fontFamily: 'var(--sans)' }}>
            Your verdict will be sent to {mp.mpName}, {mp.constituency}.
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Vote buttons */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#888074', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--sans)' }}>
          Cast your verdict
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {(['YES', 'NO'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => handleVote(opt)}
              style={{
                flex: 1,
                padding: '18px',
                background: vote === opt ? '#1a1814' : '#f5f3ee',
                color: vote === opt ? '#f5f3ee' : '#1a1814',
                border: `2px solid ${vote === opt ? '#1a1814' : '#c8c4bc'}`,
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                transition: 'all 0.15s',
              }}
            >
              {opt === 'YES' ? 'Yes' : 'No'}
            </button>
          ))}
        </div>
      </div>

      {/* Postcode lookup */}
      <div style={{ borderTop: '1px solid #c8c4bc', paddingTop: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1814', marginBottom: 6, fontFamily: 'var(--sans)' }}>
          Find your MP
        </div>
        <div style={{ fontSize: 13, color: '#888074', marginBottom: 14, fontFamily: 'var(--sans)' }}>
          We send every verdict directly to your MP. Enter your postcode so we know who to contact.
        </div>
        <PostcodeLookup onResult={setMp} />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!vote}
        style={{
          width: '100%',
          padding: '16px',
          background: vote ? '#c9a84c' : '#e8e4dc',
          color: vote ? '#1a1814' : '#888074',
          border: 'none',
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 700,
          cursor: vote ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--sans)',
          transition: 'background 0.15s',
        }}
      >
        {vote ? `Submit my verdict — ${vote === 'YES' ? 'Yes' : 'No'}` : 'Select Yes or No to continue'}
      </button>
    </div>
  )
}
