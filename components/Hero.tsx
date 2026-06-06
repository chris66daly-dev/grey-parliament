import Link from 'next/link'

export default function Hero() {
  return (
    <>
      <section style={{ background: '#1a1814', padding: '6rem 1.5rem 5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <img
              src="/grey-parliament-logo.png"
              alt="Grey Parliament Seal"
              style={{ width: '200px', height: '200px', objectFit: 'contain' }}
            />
          </div>
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--sans)' }}>
            The independent political voice of the over 50s
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

      <div style={{ width: '100%', position: 'relative', overflow: 'hidden', maxHeight: '400px' }}>
        <img
          src="/grey-parliament-banner.png"
          alt="Four Nations. One Verdict."
          style={{ width: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <section style={{ background: '#1a1814', padding: '60px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>This Week's Debate</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: '#f5f0e8', marginBottom: '32px', fontWeight: 700 }}>What are people saying?</h2>
          <div style={{ background: '#2a2520', border: '1px solid #3a3530', borderRadius: '12px', padding: '24px', marginBottom: '16px', textAlign: 'left' }}>
            <p style={{ color: '#c8c4bc', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px' }}>"The debate has barely started and already politicians are spinning this as a referendum on their leadership. We deserve straight answers."</p>
            <span style={{ fontSize: '11px', color: '#888074' }}>Verified GMP · Manchester</span>
          </div>
          <div style={{ background: '#2a2520', border: '1px solid #3a3530', borderRadius: '12px', padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
            <p style={{ color: '#c8c4bc', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px' }}>"I've voted Labour all my life. This feels like a coronation, not a by-election. Grey Parliament is the first place I've felt heard."</p>
            <span style={{ fontSize: '11px', color: '#888074' }}>Verified GMP · Leeds</span>
          </div>
          <a href="/vote" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1814', padding: '14px 32px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Join the debate →</a>
        </div>
      </section>
    </>
  )
}
