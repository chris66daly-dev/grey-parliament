'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: '#f5f3ee',
  border: '1px solid #c8c4bc',
  borderRadius: 8,
  fontSize: 15,
  fontFamily: 'var(--sans)',
  color: '#1a1814',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#c8c4bc',
  marginBottom: 6,
  fontFamily: 'var(--sans)',
}

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = getSupabaseBrowser()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <label style={labelStyle}>Email address</label>
        <input
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Your password"
          style={inputStyle}
        />
      </div>

      {error && (
        <div>
          <p style={{ color: '#e74c3c', fontSize: 14, fontFamily: 'var(--sans)', margin: '0 0 8px' }}>
            {error}
          </p>
          <Link href="/auth/forgot-password" style={{ color: '#c9a84c', fontSize: 13, fontFamily: 'var(--sans)', textDecoration: 'none' }}>
            Forgot your password? Reset it here →
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '14px',
          background: '#c9a84c',
          color: '#1a1814',
          border: 'none',
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? 'wait' : 'pointer',
          fontFamily: 'var(--sans)',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <p style={{ fontSize: 13, color: '#888074', textAlign: 'center', fontFamily: 'var(--sans)', margin: 0 }}>
        Not a member yet?{' '}
        <Link href="/auth/signup" style={{ color: '#c9a84c', textDecoration: 'none' }}>Join free</Link>
        {' · '}
        <Link href="/auth/forgot-password" style={{ color: '#888074', textDecoration: 'none' }}>Forgot password?</Link>
      </p>
    </form>
  )
}
