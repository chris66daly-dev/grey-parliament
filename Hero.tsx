const RULES = [
  { n: 1, title: 'No political party affiliation. Ever.', body: 'Constitutionally independent. No party, politician, or donor may sponsor, endorse, or influence any vote or verdict. Breaching this rule dissolves any partnership immediately.' },
  { n: 2, title: 'Members must be 50 or over. No exceptions.', body: 'The platform exists exclusively for people who have earned their seat at the table. Any account found to belong to an under-50 is permanently removed.' },
  { n: 3, title: 'One member, one vote. Always.', body: 'No premium members get extra votes. No corporate accounts. No bots. Every verified member carries exactly the same weight.' },
  { n: 4, title: 'Every verdict is sent. No exceptions.', body: 'When a vote closes, the result is sent to the relevant MP and minister within 24 hours — regardless of the result, regardless of who it inconveniences.' },
  { n: 5, title: 'No advertiser may influence questions or verdicts.', body: 'Advertising funds the platform. Advertisers have no access to voting data and no right to suppress any verdict. Commercial and editorial are permanently separated.' },
]

export default function Manifesto() {
  return (
    <section style={{ background: '#e8e4dc', padding: '4rem 1.5rem', borderBottom: '1px solid #c8c4bc' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--sans)' }}>The founding principles</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#1a1814', marginBottom: 16 }}>
            The Five Rules
          </h2>
          <div style={{ borderLeft: '3px solid #1a1814', paddingLeft: 20, textAlign: 'left', marginBottom: 32, background: '#f5f3ee', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.25rem 1.25rem 20px' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontStyle: 'italic', color: '#1a1814', lineHeight: 1.7, marginBottom: 8 }}>
              "We built this country. We staffed its hospitals, taught its children, laid its roads, and paid into its systems for forty years. We were promised a society that would look after us in return. We are still waiting."
            </p>
            <p style={{ fontSize: 12, color: '#888074', fontFamily: 'var(--sans)' }}>— The founding statement of Grey Parliament</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RULES.map(r => (
            <div key={r.n} style={{ background: '#f5f3ee', borderRadius: 10, padding: '1.25rem', border: '1px solid #c8c4bc', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #c8c4bc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: '#888074', flexShrink: 0, fontFamily: 'var(--sans)' }}>
                {r.n}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#1a1814', marginBottom: 4, fontFamily: 'var(--sans)' }}>{r.title}</div>
                <div style={{ fontSize: 13, color: '#888074', lineHeight: 1.6, fontFamily: 'var(--sans)' }}>{r.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, background: '#1a1814', borderRadius: 10, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: '#f5f3ee', marginBottom: 8 }}>
            Led by us. For us. And our kids.
          </div>
          <div style={{ fontSize: 14, color: '#888074', fontFamily: 'var(--sans)', lineHeight: 1.7 }}>
            When we vote on the NHS we are voting for our children's NHS. When we vote on housing we are voting for the homes our grandchildren will live in. This is not a platform for selfish old people shouting at clouds. This is the most experienced generation in British history using that experience for something that outlasts them.
          </div>
        </div>
      </div>
    </section>
  )
}
