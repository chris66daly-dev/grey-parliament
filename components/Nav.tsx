import Link from 'next/link'
import { getSupabaseServerAuth } from '@/lib/supabase-server'
import SignOutButton from './SignOutButton'

export default async function Nav() {
  let userEmail: string | null = null
  let userTier: string | null = null
  let firstName: string | null = null

  try {
    const supabase = getSupabaseServerAuth()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      userEmail = user.email ?? null
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier, first_name')
        .eq('id', user.id)
        .single()
      userTier = profile?.tier ?? null
      firstName = profile?.first_name ?? null
    }
  } catch {
    // env vars not present locally
  }

  return (
    <nav style={{
      background: '#1a1814',
      padding: '12px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #2a2520',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c9a84c', fontSize: '1.3rem', fontWeight: 900, textDecoration: 'none', fontFamily: 'var(--serif)' }}>
        <img src="/GMP-Logo.png" alt="" style={{ height: '36px', width: 'auto', objectFit: 'contain', mixBlendMode: 'lighten' }} />
        Grey Parliament
      </Link>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: '#c8c4bc', fontSize: 13, textDecoration: 'none', padding: '6px 10px', borderRadius: '4px' }}>
          Home
        </Link>
        <Link href="/vote" style={{ color: '#c8c4bc', fontSize: 13, textDecoration: 'none', padding: '6px 10px', borderRadius: '4px' }}>
          This Week's Vote
        </Link>
        <Link href="/#how-it-works" style={{ color: '#c8c4bc', fontSize: 13, textDecoration: 'none', padding: '6px 10px', borderRadius: '4px' }}>
          How It Works
        </Link>

        {userEmail ? (
          <>
            {userTier === 'gmp' && (
              <span style={{ fontSize: 11, background: '#c9a84c', color: '#1a1814', padding: '3px 8px', borderRadius: '4px', fontWeight: 700, letterSpacing: '0.05em' }}>
                GMP
              </span>
            )}
            <span style={{ fontSize: 13, color: '#888074' }}>
              {firstName || userEmail}
            </span>
            <Link href="/account" style={{ color: '#888074', fontSize: 13, textDecoration: 'none', padding: '6px 10px' }}>
              My Account
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/auth/login" style={{ color: '#c8c4bc', fontSize: 13, textDecoration: 'none', padding: '6px 10px', borderRadius: '4px' }}>
              Sign In
            </Link>
            <Link href="/auth/signup" style={{ background: '#c9a84c', color: '#1a1814', padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              Join Free
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
