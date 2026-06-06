'use client'

type Plan = {
  name: string
  price: string
  period: string
  charity?: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Free Member',
    price: '£0',
    period: 'forever',
    features: ['One vote per week', 'See live results', 'Your verdict sent to your MP'],
  },
  {
    name: 'GMP — Grey Member of Parliament',
    price: '£4.99',
    period: 'per month',
    charity: 'You shape where the money goes. You choose the questions. You govern this.,
    features: ['Everything in Free', 'Downloadable GMP certificate', 'Early access to verdicts', 'Monthly briefing report'],
    featured: true,
  },
]

export default function Pricing() {
  return (
    <section id="join" style={{ background: '#1a1814', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--sans)' }}>Join the Parliament</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#f5f3ee' }}>
            Your seat at the table
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PLANS.map(plan => (
            <div key={plan.name} style={{
              background: plan.featured ? '#c9a84c' : '#2c2c2a',
              borderRadius: 12,
              padding: '2rem',
              flex: '1 1 280px',
              maxWidth: 320,
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: plan.featured ? '#1a1814' : '#f5f3ee', marginBottom: 8, fontFamily: 'var(--sans)' }}>{plan.name}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: plan.featured ? '#1a1814' : '#f5f3ee', fontFamily: 'var(--serif)', marginBottom: 4 }}>{plan.price}</div>
              <div style={{ fontSize: 13, color: plan.featured ? '#5a4010' : '#888074', marginBottom: plan.charity ? 8 : 20, fontFamily: 'var(--sans)' }}>{plan.period}</div>
              {plan.charity && (
                <div style={{ fontSize: 12, color: '#1a1814', marginBottom: 20, fontFamily: 'var(--sans)', fontStyle: 'italic' }}>{plan.charity}</div>
              )}
              <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: plan.featured ? '#1a1814' : '#c8c4bc', marginBottom: 8, fontFamily: 'var(--sans)', paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%',
                padding: '12px',
                background: plan.featured ? '#1a1814' : '#f5f3ee',
                color: plan.featured ? '#f5f3ee' : '#1a1814',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
              }}>
                {plan.price === '£0' ? 'Join free' : 'Take your seat'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
