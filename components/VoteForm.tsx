"use client"
import { useState } from "react"
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
        {["Yes", "No"].map(opt => (<button key={opt} onClick={() => setVote(opt)} style={{ padding: "16px 20px", border: vote === opt ? "2px solid #1a1814" : "1px solid #c8c4bc", borderRadius: 8, background: vote === opt ? "#1a1814" : "#fff", color: vote === opt ? "#f5f3ee" : "#1a1814", fontSize: 16, fontWeight: vote === opt ? 700 : 400, cursor: "pointer", textAlign: "left", fontFamily: "var(--sans)" }}>{opt}</button>))}
      </div>
      <button onClick={handleVote} disabled={!vote || loading} style={{ padding: "14px 28px", background: vote && !loading ? "#c9a84c" : "#888074", color: "#1a1814", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: vote && !loading ? "pointer" : "not-allowed", fontFamily: "var(--sans)", marginBottom: 16 }}>
        {loading ? "Taking you to payment..." : vote ? "Cast my verdict — £1" : "Select Yes or No"}
      </button>
      <p style={{ fontSize: 12, color: "#888074", fontFamily: "var(--sans)", lineHeight: 1.6 }}>80p goes to BBC Children in Need. 20p funds the platform.</p>
      {error && <p style={{ color: "red", fontSize: 14, marginTop: 8 }}>{error}</p>}
    </div>
  )
}
