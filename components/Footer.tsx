import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#1a1814', borderTop: '1px solid #2c2c2a', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, color: '#c9a84c', marginBottom: 8 }}>Grey Parliament</div>
            <div style={{ fontSize: 13, color: '#888074', fontFamily: 'var(--sans)', maxWidth: 260, lineHeight: 1.6 }}>
              The independent political voice of the over 50s. No party. No agenda. Just experience.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            <div>
              <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--sans)' }}>Links</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href="/vote" style={{ fontSize: 14, color: '#c8c4bc', textDecoration: 'none', fontFamily: 'var(--sans)' }}>This week's vote</Link>
                <Link href="/#join" style={{ fontSize: 14, color: '#c8c4bc', textDecoration: 'none', fontFamily: 'var(--sans)' }}>Join</Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #2c2c2a', paddingTop: 20, fontSize: 12, color: '#555', fontFamily: 'var(--sans)' }}>
          © {new Date().getFullYear()} Grey Parliament. Independent. Always.
        </div>
      </div>
    </footer>
  )
}
