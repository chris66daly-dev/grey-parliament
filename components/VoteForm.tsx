"use client"
import { useState } from "react"

const BREAKDOWN = [
  { label: "Stripe (payment processing)", amount: "21.5p", muted: true },
  { label: "Grey Parliament (platform)", amount: "18.5p", muted: false },
  { label: "BBC Children in Need", amount: "60p", highlight: true },
]

export default function VoteForm({ questionId }: { questionId: string }) {
  const [vote, setVote] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleVote() {
    if (!vote) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ questionId, vote }) })
      if (res.status === 401) { window.location.href = "/auth/login"; return }
      const data = await res.json()
      if (data.url) { window.location.href = data.url } else { setError("Something went wrong.") }
    } catch { setError("Something went wrong.") } finally { setLoading(false) }
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {["Yes", "No"].map(opt => (
          <button key={opt} onClick={() => setVote(opt)} style={{ padding: "16px 20px", border: vote === opt ? "2px solid #1a1814" : "1px solid #c8c4bc", borderRadius: 8, background: vote === opt ? "#1a1814" : "#fff", color: vote === opt ? "#f5f3ee" : "#1a1814", fontSize: 16, fontWeight: vote === opt ? 700 : 400, cursor: "pointer", textAlign: "left", fontFamily: "var(--sans)" }}>{opt}</button>
        ))}
      </div>

      <div style={{ background: "#f5f3ee", border: "1px solid #c8c4bc", borderRadius: 8, padding: "14px 16px", marginBottom: 16, fontFamily: "var(--sans)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#888074", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Where your £1 goes</div>
        {BREAKDOWN.map(({ label, amount, muted, highlight }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #e8e4dc", fontSize: 13 }}>
            <span style={{ color: muted ? "#888074" : "#1a1814" }}>{label}</span>
            <span style={{ color: highlight ? "#c9a84c" : muted ? "#888074" : "#1a1814", fontWeight: highlight ? 700 : 600 }}>{amount}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6, fontSize: 13, fontWeight: 700, color: "#1a1814" }}>
          <span>Your total</span>
          <span>£1.00</span>
        </div>
      </div>

      <button onClick={handleVote} disabled={!vote || loading} style={{ padding: "14px 28px", background: vote && !loading ? "#c9a84c" : "#888074", color: "#1a1814", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: vote && !loading ? "pointer" : "not-allowed", fontFamily: "var(--sans)", marginBottom: 12 }}>
        {loading ? "Taking you to payment..." : vote ? "Cast my verdict — £1" : "Select Yes or No"}
      </button>

      <p style={{ fontSize: 12, color: "#888074", fontFamily: "var(--sans)", lineHeight: 1.6, fontStyle: "italic" }}>
        Yes — a payment company takes more than we do. We think that&apos;s wrong too. But we&apos;d rather be honest about it than hide it in small print.
      </p>

      {error && <p style={{ color: "red", fontSize: 14, marginTop: 8 }}>{error}</p>}
    </div>
  )
}
