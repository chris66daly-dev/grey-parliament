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
    </main>
  )
}
