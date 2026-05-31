import Link from "next/link"
import { unstable_noStore as noStore } from "next/cache"
import { getSupabaseAdmin } from "@/lib/supabase-server"

async function getActiveQuestion() {
  noStore()
  const client = getSupabaseAdmin()
  if (!client) return null
  const { data, error } = await client.from("questions").select("id, text").eq("approved", true).order("created_at", { ascending: false }).limit(1).single()
  if (error || !data) return null
  return data as { id: string; text: string }
}

export default async function ThisWeeksVote() {
  const question = await getActiveQuestion()
  const questionText = question?.text ?? "No active vote this week — check back soon."
  return (
    <section style={{ background: "#f5f3ee", padding: "4rem 1.5rem", borderBottom: "1px solid #c8c4bc" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 11, color: "#888074", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--sans)" }}>This weeks verdict</div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 700, color: "#1a1814", marginBottom: 24, lineHeight: 1.3 }}>{questionText}</h2>
        {question && <Link href={"/vote/"+question.id} style={{ display: "inline-block", background: "#1a1814", color: "#f5f3ee", padding: "12px 24px", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "var(--sans)" }}>Cast your verdict</Link>}
      </div>
    </section>
  )
}
