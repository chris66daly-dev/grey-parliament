import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'
import VoteForm from '@/components/VoteForm'

type Question = { id: string; text: string; department_tag: string | null }

async function getQuestion(id: string): Promise<Question | null> {
  noStore()
  const client = getSupabase()
  if (!client) return null

  const { data, error } = await client
    .from('questions')
    .select('id, text, department_tag')
    .eq('id', id)
    .eq('approved', true)
    .single()

  if (error || !data) return null
  return data as Question
}

// Polling figures — Survation, 26 May–1 June 2026, n=518
const POLL = [
  { name: 'Andy Burnham (Labour)', pct: 49 },
  { name: 'Reform UK', pct: 39 },
  { name: 'Restore the Conservatives', pct: 8 },
]

// TODO: replace href values with real article URLs before publishing
const HEADLINES = [
  { title: 'Makerfield by-election: What you need to know', source: 'BBC News', href: '#' },
  { title: 'Burnham holds commanding lead as Makerfield votes', source: 'Manchester Evening News', href: '#' },
  { title: 'Reform surge puts pressure on Labour in Makerfield contest', source: 'The Guardian', href: '#' },
  { title: "Pensioners' bloc could prove decisive in Makerfield vote", source: 'Sky News', href: '#' },
]

export default async function VoteQuestionPage({ params }: { params: { id: string } }) {
  const question = await getQuestion(params.id)
  if (!question) notFound()

  return (
    <main style={{ fontFamily: 'var(--sans)', minHeight: '100vh', background: '#f5f0e8' }}>
      <nav style={{ background: '#1a1814', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#c9a84c', fontSize: '1.4rem', fontWeight: 900, textDecoration: 'none', fontFamily: 'var(--serif)' }}>
          Grey Parliament
        </Link>
      </nav>

      <section style={{ padding: '60px 24px', maxWidth: 680, margin: '0 auto' }}>
        {question.department_tag && (
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--sans)' }}>
            {question.department_tag}
          </div>
        )}
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 700, color: '#1a1814', lineHeight: 1.3, marginBottom: 36 }}>
          {question.text}
        </h1>

        <VoteForm questionId={question.id} />
      </section>

      {/* Latest Coverage */}
      <section style={{ padding: '0 24px 60px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid #e8e4dc', paddingTop: 40 }}>
          <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--sans)' }}>Latest Coverage</div>

          {/* YouTube embed */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden', marginBottom: 32 }}>
            <iframe
              src="https://www.youtube.com/embed/8IIdq_nSR7s"
              title="Makerfield by-election coverage"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>

          {/* Opinion poll */}
          <div style={{ background: '#fff', border: '1px solid #c8c4bc', borderRadius: 10, padding: '20px 20px 16px', marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: '#888074', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--sans)' }}>Opinion Poll — Makerfield</div>
            {POLL.map(({ name, pct }) => (
              <div key={name} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontFamily: 'var(--sans)', fontSize: 14, color: '#1a1814' }}>
                  <span>{name}</span>
                  <span style={{ fontWeight: 700 }}>{pct}%</span>
                </div>
                <div style={{ height: 8, background: '#e8e4dc', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: '#1a1814', borderRadius: 4 }} />
                </div>
              </div>
            ))}
            <p style={{ fontSize: 11, color: '#aaa09a', fontFamily: 'var(--sans)', marginTop: 12, lineHeight: 1.5, marginBottom: 0 }}>
              Source: Survation, fieldwork 26 May–1 June 2026, n=518. Grey Parliament is not affiliated with any polling organisation.
            </p>
          </div>

          {/* Headline links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HEADLINES.map(({ title, source, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', flexDirection: 'column', padding: '14px 16px', background: '#fff', border: '1px solid #c8c4bc', borderRadius: 8, textDecoration: 'none', gap: 3 }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#1a1814', fontFamily: 'var(--sans)', lineHeight: 1.4 }}>{title}</span>
                <span style={{ fontSize: 12, color: '#888074', fontFamily: 'var(--sans)' }}>{source}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
