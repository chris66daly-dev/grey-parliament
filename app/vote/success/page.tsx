import { getSupabaseServerAuth, getSupabaseAdmin } from '@/lib/supabase-server'
import { lookupPostcode } from '@/lib/postcode'

type MPInfo = {
  name: string
  constituency: string
  email: string | null
  phone: string | null
  parliamentUrl: string | null
}

async function getMPForCurrentUser(): Promise<MPInfo | null> {
  const client = getSupabaseServerAuth()

  const { data: { user } } = await client.auth.getUser()
  if (!user) return null

  const { data: profile } = await client
    .from('profiles')
    .select('postcode, constituency')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  // Try mps table first (populated by /api/admin/populate-mps)
  const constituency = profile.constituency as string | null
  if (constituency) {
    const admin = getSupabaseAdmin()
    if (admin) {
      const { data: mp } = await admin
        .from('mps')
        .select('name, constituency, email, phone, parliament_url')
        .ilike('constituency', constituency)
        .eq('active', true)
        .limit(1)
        .maybeSingle()

      if (mp) {
        return {
          name: mp.name as string,
          constituency: mp.constituency as string,
          email: mp.email as string | null,
          phone: mp.phone as string | null,
          parliamentUrl: mp.parliament_url as string | null,
        }
      }
    }
  }

  // Fall back to live Parliament API lookup via stored postcode
  if (profile.postcode) {
    const result = await lookupPostcode(profile.postcode as string)
    if (result) {
      return {
        name: result.mpName,
        constituency: result.constituency,
        email: result.mpEmail,
        phone: null,
        parliamentUrl: null,
      }
    }
  }

  return null
}

export default async function VoteSuccess() {
  const mp = await getMPForCurrentUser()

  return (
    <main style={{ minHeight: '100vh', background: '#1a1814', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 560, width: '100%' }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>🏛️</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 40px)', color: '#f5f3ee', marginBottom: 16 }}>
          Verdict Cast
        </h1>

        {mp ? (
          <>
            <p style={{ fontSize: 16, color: '#c8c4bc', lineHeight: 1.7, marginBottom: 24 }}>
              Your verdict has been recorded. It will be sent to{' '}
              <strong style={{ color: '#f5f3ee' }}>{mp.name}</strong> on Friday at 9am.
            </p>

            <div style={{ background: '#2c2c2a', borderRadius: 12, padding: '20px 24px', marginBottom: 32, textAlign: 'left' }}>
              <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--sans)' }}>
                Your MP
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#f5f3ee', marginBottom: 4, fontFamily: 'var(--serif)' }}>
                {mp.name}
              </div>
              <div style={{ fontSize: 14, color: '#c8c4bc', marginBottom: 16 }}>
                {mp.constituency}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {mp.email && (
                  <a href={`mailto:${mp.email}`} style={{ fontSize: 14, color: '#c9a84c', textDecoration: 'none' }}>
                    {mp.email}
                  </a>
                )}
                {mp.phone && (
                  <a href={`tel:${mp.phone}`} style={{ fontSize: 14, color: '#c8c4bc', textDecoration: 'none' }}>
                    {mp.phone}
                  </a>
                )}
                {mp.parliamentUrl && (
                  <a href={mp.parliamentUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#888074', textDecoration: 'none' }}>
                    View Parliament profile →
                  </a>
                )}
              </div>
            </div>
          </>
        ) : (
          <p style={{ fontSize: 16, color: '#c8c4bc', lineHeight: 1.7, marginBottom: 32 }}>
            Your vote has been recorded and will be included in the official verdict sent to your MP on Friday at 9am.
          </p>
        )}

        <p style={{ fontSize: 13, color: '#888074', lineHeight: 1.6, marginBottom: 32 }}>
          60p of your £1 goes to BBC Children in Need. The rest funds the platform and payment processing.
        </p>

        <a href="/" style={{ background: '#c9a84c', color: '#1a1814', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
          Back to Grey Parliament
        </a>
      </div>
    </main>
  )
}
