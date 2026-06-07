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
              style={{ width: '180px', height: '180px', objectFit: 'contain' }}
            />
          </div>
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>The Independent Political Voice of the Over 50s</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1.15, marginBottom: '24px' }}>Grey Parliament</h1>
          <p style={{ fontSize: '1.1rem', color: '#c8c4bc', lineHeight: 1.7, marginBottom: '16px', maxWidth: 540, margin: '0 auto 16px' }}>
            Everyone has a view. Party members, independents, first-timers.<br />
            All welcome. Your affiliation is your business. Your vote is your voice.
          </p>
          <p style={{ fontSize: '0.95rem', color: '#c9a84c', marginBottom: '40px', fontStyle: 'italic' }}>
            Your first vote is free. After that, £1 — and most of it goes straight to charity.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{ background: '#c9a84c', color: '#1a1814', padding: '14px 32px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>
              Join the Parliament — it's free
            </Link>
            <Link href="/vote" style={{ border: '1px solid #3a3a38', color: '#c8c4bc', padding: '14px 32px', borderRadius: '6px', textDecoration: 'none', fontSize: '1rem' }}>
              This week's vote →
            </Link>
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1814', borderTop: '1px solid #2a2520', padding: '60px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>This Week's Debate</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: '#f5f0e8', marginBottom: '8px', fontWeight: 700 }}>What are members saying?</h2>
          <p style={{ color: '#888074', fontSize: '0.85rem', marginBottom: '32px' }}>Join the debate. Cast your verdict. Your MP will hear the result.</p>
          <div style={{ background: '#2a2520', border: '1px solid #3a3530', borderRadius: '12px', padding: '24px', marginBottom: '16px', textAlign: 'left' }}>
            <p style={{ color: '#c8c4bc', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px' }}>"The debate has barely started and already politicians are spinning this as a referendum on their leadership. We deserve straight answers."</p>
            <span style={{ fontSize: '11px', color: '#888074' }}>Verified Member · Greater Manchester</span>
          </div>
          <div style={{ background: '#2a2520', border: '1px solid #3a3530', borderRadius: '12px', padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
            <p style={{ color: '#c8c4bc', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px' }}>"I've voted Labour all my life. This feels like a coronation, not a by-election. Grey Parliament is the first place I've felt heard."</p>
            <span style={{ fontSize: '11px', color: '#888074' }}>Verified Member · West Yorkshire</span>
          </div>
          <Link href="/vote" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1814', padding: '14px 32px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>
            Have your say →
          </Link>
        </div>
      </section>
    </>
  )
}
