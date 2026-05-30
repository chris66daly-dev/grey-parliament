'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function SignupForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', postcode: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = getSupabaseBrowser()

    // 1. Create Supabase auth user
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (!data.session) {
      // Email confirmation required — Supabase sent a confirmation email.
      router.push('/auth/confirm')
      return
    }

    // 2. Create profile (runs postcode lookup server-side)
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name.trim(), postcode: form.postcode.trim() }),
    })

    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <label style={labelStyle}>Full name</label>
        <input
          required
          type="text"
          value={form.name}
          onChange={set('name')}
          placeholder="Your name"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Email address</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={set('email')}
          placeholder="you@example.com"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Password</label>
        <input
          required
          type="password"
          value={form.password}
          onChange={set('password')}
          placeholder="At least 8 characters"
          minLength={8}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Postcode</label>
        <input
          required
          type="text"
          value={form.postcode}
          onChange={e => setForm(f => ({ ...f, postcode: e.target.value.toUpperCase() }))}
          placeholder="SW1A 2AA"
          maxLength={8}
          style={inputStyle}
        />
        <p style={{ fontSize: 12, color: '#888074', marginTop: 6, fontFamily: 'var(--sans)' }}>
          Used to identify your MP. We never share your postcode.
        </p>
      </div>

      {error && (
        <p style={{ color: '#e74c3c', fontSize: 14, fontFamily: 'var(--sans)', margin: 0 }}>
          {error}
        </p>
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
        {loading ? 'Joining…' : 'Join Grey Parliament'}
      </button>

      <p style={{ fontSize: 13, color: '#888074', textAlign: 'center', fontFamily: 'var(--sans)', margin: 0 }}>
        Already a member?{' '}
        <Link href="/auth/login" style={{ color: '#c9a84c', textDecoration: 'none' }}>Sign in</Link>
      </p>
    </form>
  )
}
