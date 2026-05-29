import Link from 'next/link'

export default function Nav() {
  return (
    <nav style={{ background: '#1a1814', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link href="/" style={{ color: '#c9a84c', fontSize: '1.4rem', fontWeight: 900, textDecoration: 'none', fontFamily: 'var(--serif)' }}>
        Grey Parliament
      </Link>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link href="/vote" style={{ color: '#c8c4bc', fontSize: 14, textDecoration: 'none', fontFamily: 'var(--sans)' }}>This week's vote</Link>
        <Link href="/#join" style={{ background: '#c9a84c', color: '#1a1814', padding: '8px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--sans)' }}>Join</Link>
      </div>
    </nav>
  )
}
