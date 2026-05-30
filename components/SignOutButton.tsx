'use client'

import { useRouter } from 'next/navigation'
import { getSupabaseBrowser } from '@/lib/supabase-browser'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = getSupabaseBrowser()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      style={{
        background: 'none',
        border: '1px solid #3a3a38',
        color: '#888074',
        padding: '6px 14px',
        borderRadius: 6,
        fontSize: 13,
        cursor: 'pointer',
        fontFamily: 'var(--sans)',
      }}
    >
      Sign out
    </button>
  )
}
