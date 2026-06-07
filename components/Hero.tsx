import Link from 'next/link'

export default function Hero() {
  return (
    <>
      <section style={{ background: '#1a1814', padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <img
              src="/grey-parliament-logo.png"
              alt="Grey Parliament Seal"
              style={{ width: '220px', height: 'auto', objectFit: 'contain' }}
            />
          </div>
          <div style={{ fontSize: 11, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}>The Independent Political Voice of the Over 50s</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, color: '#f5f0e8', lineHeight: 1.1, marginBottom: '20px' }}>
            Your Country<br />Needs You.
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#c8c4bc', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 12px' }}>
            Forty years of taxes. Forty years of service. Forty years of being told your generation is the problem.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#f5f0e8', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px', fontWeight: 600 }}>
            Time to have your say. One vote. One pound. Straight to your MP.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
            <Link href="/auth/signup" style={{ background: '#c9a84c', color: '#1a1814', padding: '16px 36px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '1.05rem', letterSpacing: '0.02em' }}>
              Join Free — Cast Your First Vote
            </Link>
            <Link href="/vote" style={{ border: '1px solid #c9a84c', color: '#c9a84c', padding: '16px 36px', borderRadius: '6px', textDecoration: 'none', fontSize: '1.05rem' }}>
              This Week's Vote →
            </Link>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#888074', fontStyle: 'italic' }}>
            First vote free. After that £1 — and 60p goes straight to charity.
          </p>
        </div>
      </section>

      <section style={{ background: '#c9a84c', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ maxWidth: 680, margin: '0 auto', fontSize: '1.05rem', color: '#1a1814', fontWeight: 700, lineHeight: 1.6 }}>
          This week: <em>Andy Burnham has publicly stated his ambition to lead the Labour Party. He is standing in the Makerfield by-election. Do you want Andy Burnham as your next Prime Minister?</em>
        </p>
        <Link href="/vote" style={{ display: 'inline-block', marginTop: '12px', background: '#1a1814', color: '#c9a84c', padding: '10px 28px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
          Have Your Say & Vote →
        </Link>
      </section>

      <section style={{ background: '#1a1814', borderTop: '1px solid #2a2520', padding: '52px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>This Week's Debate</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: '#f5f0e8', fontWeight: 700, marginBottom: '8px' }}>What are members saying?</h2>
            <p style={{ color: '#888074', fontSize: '0.85rem' }}>Read the debate. Make up your own mind. Then vote.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            <div style={{ background: '#2a2520', border: '1px solid #3a3530', borderRadius: '12px', padding: '20px 24px' }}>
              <p style={{ color: '#c8c4bc', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '10px' }}>"The debate has barely started and already politicians are spinning this as a referendum on their leadership. We deserve straight answers."</p>
              <span style={{ fontSize: '11px', color: '#888074' }}>Verified Member · Greater Manchester</span>
            </div>
            <div style={{ background: '#2a2520', border: '1px solid #3a3530', borderRadius: '12px', padding: '20px 24px' }}>
              <p style={{ color: '#c8c4bc', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '10px' }}>"I've voted Labour all my life. This feels like a coronation, not a by-election. Grey Parliament is the first place I've felt heard."</p>
              <span style={{ fontSize: '11px', color: '#888074' }}>Verified Member · West Yorkshire</span>
            </div>
            <div style={{ background: '#2a2520', border: '1px solid #3a3530', borderRadius: '12px', padding: '20px 24px' }}>
              <p style={{ color: '#c8c4bc', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '10px' }}>"Reform are 3 points behind in Makerfield. That's not a fluke. Labour need to listen or they'll lose more than a by-election."</p>
              <span style={{ fontSize: '11px', color: '#888074' }}>Verified Member · Lancashire</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/vote" style={{ display: 'inline-block', background: '#c9a84c', color: '#1a1814', padding: '14px 36px', borderRadius: '6px', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>
              Join the debate →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
