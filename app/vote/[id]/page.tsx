import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'
import { getSupabaseServerAuth } from '@/lib/supabase-server'
import VoteForm from '@/components/VoteForm'
import HaveYourSay from '@/components/HaveYourSay'

type PollEntry = { name: string; pct: number }
type Headline = { title: string; source: string; href: string }

type Question = {
  id: string
  text: string
  department_tag: string | null
  youtube_url: string | null
  poll_json: PollEntry[] | null
  headlines_json: Headline[] | null
}

async function getQuestion(id: string): Promise<Question | null> {
  noStore()
  const client = getSupabase()
  if (!client) return null
  const { data, error } = await client
    .from('questions')
    .select('id, text, department_tag, youtube_url, poll_json, headlines_json')
    .eq('id', id)
    .eq('approved', true)
    .single()
  if (error || !data) return null
  return data as Question
}

async function getCurrentUser() {
  const supabase = getSupabaseServerAuth()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { userId: null, userTier: null }

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single()

  return {
    userId: user.id,
    userTier: (profile?.tier as string) ?? null,
  }
}

export default async function VoteQuestionPage({ params }: { params: { id: string } }) {
  const [question, { userId, userTier }] = await Promise.all([
    getQuestion(params.id),
    getCurrentUser(),
  ])

  if (!question) notFound()

  const poll = question.poll_json
  const headlines = question.headlines_json
  const youtubeUrl = question.youtube_url
  const hasMedia = youtubeUrl || (poll && poll.length > 0) || (headlines && headlines.length > 0)

  return (
    <main style={{ fontFamily: 'var(--sans)', minHeight: '100vh', background: '#f5f0e8' }}>
      <nav style={{ background: '#1a1814', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#c9a84c', fontSize: '1.4rem', fontWeight: 900, textDecoration: 'none', fontFamily: 'var(--serif)' }}>Grey Parliament</Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#f5f0e8', fontSize: '0.9rem', textDecoration: 'none' }}>Home</Link>
          <Link href="/auth/signup" style={{ color: '#c9a84c', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>Join</Link>
          <Link href="/auth/login" style={{ color: '#f5f0e8', fontSize: '0.9rem', textDecoration: 'none' }}>Sign in</Link>
        </div>
      </nav>
      <section style={{ padding: '60px 24px', maxWidth: 680, margin: '0 auto' }}>
        {question.department_tag && (<div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>{question.department_tag}</div>)}
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#1a1814', lineHeight: 1.3, marginBottom: 36 }}>{question.text}</h1>
        <VoteForm questionId={question.id} />

        <HaveYourSay
          questionId={question.id}
          userTier={userTier}
          userId={userId}
        />
      </section>
      {hasMedia && (
        <section style={{ padding: '0 24px 60px', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid #e8e4dc', paddingTop: 40 }}>
            <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Latest Coverage</div>
            {youtubeUrl && (<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden', marginBottom: 32 }}><iframe src={youtubeUrl} title="Video coverage" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} /></div>)}
            {poll && poll.length > 0 && (<div style={{ background: '#fff', border: '1px solid #c8c4bc', borderRadius: 10, padding: '20px 20px 16px', marginBottom: 24 }}><div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Latest Opinion Poll</div>{poll.map(({ name, pct }) => (<div key={name} style={{ marginBottom: 14 }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 14, color: '#1a1814' }}><span>{name}</span><span style={{ fontWeight: 700 }}>{pct}%</span></div><div style={{ height: 8, background: '#e8e4dc', borderRadius: 4, overflow: 'hidden' }}><div style={{ height: '100%', width: pct+'%', background: '#1a1814', borderRadius: 4 }} /></div></div>))}<p style={{ fontSize: 11, color: '#aaa09a', marginTop: 12, lineHeight: 1.5, marginBottom: 0 }}>Source: Survation (independent UK polling company), fieldwork 18–22 May 2026, 504 people surveyed in Makerfield. Grey Parliament is not affiliated with any polling organisation.</p></div>)}
            {headlines && headlines.length > 0 && (<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{headlines.map(({ title, source, href }) => (<a key={title} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', padding: '14px 16px', background: '#fff', border: '1px solid #c8c4bc', borderRadius: 8, textDecoration: 'none', gap: 3 }}><span style={{ fontSize: 15, fontWeight: 600, color: '#1a1814', lineHeight: 1.4 }}>{title}</span><span style={{ fontSize: 12, color: '#888074' }}>{source}</span></a>))}</div>)}
          </div>
        </section>
      )}
    </main>
  )
}
