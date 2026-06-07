import { getSupabaseAdmin } from "@/lib/supabase-server"

async function getStats() {
  const client = getSupabaseAdmin()
  if (!client) return { members: 0, votes: 0, charityPence: 0 }

  const [membersResult, votesResult, charityResult] = await Promise.all([
    client.from("profiles").select("*", { count: "exact", head: true }),
    client.from("votes").select("*", { count: "exact", head: true }),
    client.from("cin_total").select("amount_pence"),
  ])

  const charityPence = (charityResult.data ?? []).reduce(
    (sum: number, row: { amount_pence: number }) => sum + (row.amount_pence ?? 0),
    0
  )

  return {
    members: membersResult.count ?? 0,
    votes: votesResult.count ?? 0,
    charityPence,
  }
}

export default async function StatsBar() {
  const { members, votes, charityPence } = await getStats()

  const charityStr = (charityPence / 100).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const stats = [
    { label: "Members", value: members.toLocaleString("en-GB") },
    { label: "Votes Cast", value: votes.toLocaleString("en-GB") },
    { label: "Donated to Charity", value: `£${charityStr}` },
  ]

  return (
    <div style={{ background: "#2c2c2a", borderBottom: "1px solid #3a3a38", padding: "14px 1.5rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
        {stats.map(({ label, value }) => (
          <div key={label} style={{ textAlign: "center", fontFamily: "var(--sans)" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#c9a84c", lineHeight: 1.1 }}>{value}</div>
            <div style={{ fontSize: 11, color: "#888074", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
