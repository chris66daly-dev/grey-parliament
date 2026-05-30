'use client'

import { useState } from 'react'
import type { PostcodeResult } from '@/lib/postcode'

type Props = {
  onResult?: (result: PostcodeResult) => void
}

export default function PostcodeLookup({ onResult }: Props) {
  const [postcode, setPostcode] = useState('')
  const [result, setResult] = useState<PostcodeResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLookup() {
    const clean = postcode.trim()
    if (!clean) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`/api/postcode?postcode=${encodeURIComponent(clean)}`)
      if (!res.ok) {
        setError('Postcode not found. Please check and try again.')
        return
      }
      const data: PostcodeResult = await res.json()
      setResult(data)
      onResult?.(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <input
          type="text"
          value={postcode}
          onChange={e => setPostcode(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && handleLookup()}
          placeholder="Your postcode e.g. SW1A 2AA"
          maxLength={8}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #c8c4bc',
            borderRadius: 8,
            fontSize: 15,
            fontFamily: 'var(--sans)',
            background: '#fff',
            color: '#1a1814',
            outline: 'none',
          }}
        />
        <button
          onClick={handleLookup}
          disabled={loading || !postcode.trim()}
          style={{
            padding: '12px 20px',
            background: '#1a1814',
            color: '#f5f3ee',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            fontFamily: 'var(--sans)',
            whiteSpace: 'nowrap',
            opacity: !postcode.trim() ? 0.5 : 1,
          }}
        >
          {loading ? 'Looking up…' : 'Find my MP'}
        </button>
      </div>

      {error && (
        <p style={{ color: '#c0392b', fontSize: 13, fontFamily: 'var(--sans)', margin: '0 0 8px' }}>
          {error}
        </p>
      )}

      {result && (
        <div style={{
          background: '#f5f3ee',
          borderRadius: 10,
          padding: '14px 18px',
          border: '1px solid #c8c4bc',
        }}>
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--sans)' }}>
            Your MP
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1814', marginBottom: 2, fontFamily: 'var(--sans)' }}>
            {result.mpName}
          </div>
          <div style={{ fontSize: 13, color: '#555', fontFamily: 'var(--sans)' }}>
            {result.constituency}{result.mpParty ? ` · ${result.mpParty}` : ''}
          </div>
          {result.mpEmail && (
            <div style={{ fontSize: 12, color: '#888074', fontFamily: 'var(--sans)', marginTop: 4 }}>
              {result.mpEmail}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
