import Link from 'next/link'

export const metadata = { title: 'Check your email — Grey Parliament' }

export default function ConfirmPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#1a1814', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 440, textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 900, color: '#c9a84c', textDecoration: 'none' }}>
          Grey Parliament
        </Link>

        <div style={{ background: '#2c2c2a', borderRadius: 12, padding: '2rem', marginTop: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 700, color: '#f5f3ee', marginBottom: 12 }}>
            Check your inbox
          </h1>
          <p style={{ fontSize: 15, color: '#c8c4bc', lineHeight: 1.7, fontFamily: 'var(--sans)', marginBottom: 0 }}>
            We've sent you a confirmation link. Click it to activate your account and take your seat.
          </p>
        </div>
      </div>
    </main>
  )
}
