import Link from 'next/link'
import { getSupabaseServerAuth } from '@/lib/supabase-server'
import SignOutButton from './SignOutButton'

export default async function Nav() {
  let userEmail: string | null = null

  try {
    const supabase = getSupabaseServerAuth()
    const { data: { user } } = await supabase.auth.getUser()
    userEmail = user?.email ?? null
  } catch {
    // env vars not present locally — render unauthenticated nav
  }

  return (
    <nav style={{ background: '#1a1814', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link href="/" style={{ color: '#c9a84c', fontSize: '1.4rem', fontWeight: 900, textDecoration: 'none', fontFamily: 'var(--serif)' }}>
        Grey Parliament
      </Link>

      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <Link href="/vote" style={{ color: '#c8c4bc', fontSize: 14, textDecoration: 'none', fontFamily: 'var(--sans)' }}>
          This week's vote
        </Link>

        {userEmail ? (
          <>
            <span style={{ fontSize: 13, color: '#888074', fontFamily: 'var(--sans)' }}>
              {userEmail}
            </span>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              style={{ color: '#c8c4bc', fontSize: 14, textDecoration: 'none', fontFamily: 'var(--sans)' }}
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              style={{ background: '#c9a84c', color: '#1a1814', padding: '8px 18px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--sans)' }}
            >
              Join
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
