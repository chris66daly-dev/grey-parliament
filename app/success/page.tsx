import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main style={{ background: '#1a1814', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏛️</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 700, color: '#f5f3ee', marginBottom: 12 }}>
          You're in. Welcome to the benches.
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: '#2c2c2a' }}></div>
          <span style={{ fontSize: 14, color: '#888074', fontFamily: 'var(--sans)', letterSpacing: '0.1em' }}>GREY PARLIAMENT</span>
          <div style={{ flex: 1, height: 1, background: '#2c2c2a' }}></div>
        </div>
        <p style={{ fontSize: 16, color: '#c8c4bc', lineHeight: 1.7, marginBottom: 32, fontFamily: 'var(--sans)' }}>
          Your membership card is on its way. Your first verdict goes out this Sunday. Your MP has been notified that you exist and you're paying attention.
        </p>
        <div style={{ background: '#2c2c2a', borderRadius: 12, padding: '1.5rem', marginBottom: 28, fontStyle: 'italic', fontFamily: 'var(--serif)', fontSize: 18, color: '#f5f3ee', lineHeight: 1.6 }}>
          "Your welcome pack contains absolutely nothing physical — this is the internet. But your voice now counts. And that's worth considerably more than a tote bag."
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#f5f3ee', marginBottom: 12, fontFamily: 'var(--sans)' }}>
            Tell someone who deserves to be here:
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: '📘 Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://greyparliament.co.uk' },
              { label: '💬 WhatsApp', url: 'https://wa.me/?text=I%20just%20joined%20Grey%20Parliament%20%E2%80%94%20the%20independent%20political%20voice%20for%20the%20over%2050s.%20greyparliament.co.uk' },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', border: '1px solid #3a3a38', borderRadius: 8, fontSize: 14, color: '#c8c4bc', textDecoration: 'none', fontFamily: 'var(--sans)' }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: '#f5f3ee', borderRadius: 8, fontSize: 15, fontWeight: 500, color: '#1a1814', textDecoration: 'none', fontFamily: 'var(--sans)' }}>
          Cast this week's verdict →
        </Link>
      </div>
    </main>
  )
}
