const STEPS = [
  { n: 1, title: 'Join', body: 'Verify you are 50 or over. Of sound mind and a responsible adult — This Country Needs You.' },
  { n: 2, title: 'Vote', body: 'Each week a new question. One member, one vote. Results are tallied in real time.' },
  { n: 3, title: 'We send the verdict', body: 'Within 24 hours, the result goes to your MP and the relevant minister. No exceptions.' },
]

export default function HowItWorks() {
  return (
    <section style={{ background: '#fff', padding: '4rem 1.5rem', borderBottom: '1px solid #c8c4bc' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--sans)' }}>The process</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#1a1814' }}>How it works</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1a1814', color: '#f5f3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--sans)' }}>
                {s.n}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 600, color: '#1a1814', marginBottom: 6, fontFamily: 'var(--sans)' }}>{s.title}</div>
                <div style={{ fontSize: 15, color: '#555', lineHeight: 1.6, fontFamily: 'var(--sans)' }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
