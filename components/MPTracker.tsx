export default function MPTracker() {
  return (
    <section style={{ background: '#f5f3ee', padding: '4rem 1.5rem', borderBottom: '1px solid #c8c4bc' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--sans)' }}>Accountability</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#1a1814', marginBottom: 16 }}>
          MP Tracker
        </h2>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, fontFamily: 'var(--sans)', maxWidth: 560, margin: '0 auto' }}>
          See how your MP has responded to our verdicts. Every response is recorded. Every silence is noted.
        </p>
      </div>
    </section>
  )
}
