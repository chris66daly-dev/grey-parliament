import Link from 'next/link'

export default function ThisWeeksVote() {
  return (
    <section style={{ background: '#f5f3ee', padding: '4rem 1.5rem', borderBottom: '1px solid #c8c4bc' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--sans)' }}>This week's verdict</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: '#1a1814', marginBottom: 24, lineHeight: 1.3 }}>
          Should NHS prescription charges be abolished for all over-60s, regardless of income?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {['Yes — it should be a universal right', 'No — means testing keeps it fair', 'Extend but keep some means testing', 'More information needed'].map(opt => (
            <div key={opt} style={{ background: '#fff', border: '1px solid #c8c4bc', borderRadius: 8, padding: '14px 18px', fontSize: 15, color: '#1a1814', fontFamily: 'var(--sans)' }}>
              {opt}
            </div>
          ))}
        </div>
        <Link href="/vote" style={{ display: 'inline-block', background: '#1a1814', color: '#f5f3ee', padding: '12px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--sans)' }}>
          Cast your verdict →
        </Link>
      </div>
    </section>
  )
}
