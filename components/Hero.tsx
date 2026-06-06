import Link from 'next/link'

export default function Hero() {
  return (
    <section style={{ background: '#1a1814', padding: '6rem 1.5rem 5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--sans)' }}>
          The independent political voice of the over 50s. Verify you are 50 or over. Of sound mind and a responsible adult.
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#f5f3ee', lineHeight: 1.1, marginBottom: 24 }}>
          Grey Parliament
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#c8c4bc', lineHeight: 1.7, marginBottom: 40, fontFamily: 'var(--sans)', maxWidth: 580, margin: '0 auto 40px' }}>
          Everyone has a view. Party members, independents, first-timers. All welcome. Your affiliation is your business. Your vote is your voice.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/#join" style={{ background: '#c9a84c', color: '#1a1814', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--sans)' }}>
            Join the Parliament
          </Link>
          <Link href="/vote" style={{ border: '1px solid #3a3a38', color: '#c8c4bc', padding: '14px 32px', borderRadius: 8, fontSize: 16, textDecoration: 'none', fontFamily: 'var(--sans)' }}>
            This week's vote →
          </Link>
        </div>
      </div>
    </section>
  )
}
