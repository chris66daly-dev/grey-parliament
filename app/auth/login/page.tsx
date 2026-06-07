import { Suspense } from 'react'
import Link from 'next/link'
import LoginForm from '@/components/LoginForm'
import Nav from '@/components/Nav'

export const metadata = { title: 'Sign In — Grey Parliament' }

export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#1a1814', fontFamily: 'var(--sans)' }}>
      <Nav />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 900, color: '#c9a84c', textDecoration: 'none' }}>
              Grey Parliament
            </Link>
            <p style={{ fontSize: 15, color: '#888074', marginTop: 8, fontFamily: 'var(--sans)' }}>
              Your voice. Your vote. Counts.
            </p>
          </div>

          <div style={{ background: '#2c2c2a', borderRadius: 12, padding: '2rem' }}>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 700, color: '#f5f3ee', marginBottom: 24 }}>
              Sign in
            </h1>
            {/* Suspense required because LoginForm uses useSearchParams */}
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
