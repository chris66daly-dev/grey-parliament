"use client"
import { useState } from "react"

const BREAKDOWN = [
  { label: "😠 Stripe (payment processing)", amount: "21.5p", muted: true },
  { label: "🏛️ Grey Parliament (platform)", amount: "18.5p", muted: false },
  { label: "❤️ Charity (chosen by members)", amount: "60p", highlight: true },
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
      const freeRes = await fetch("/api/vote/free", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ questionId, vote }) })
      if (freeRes.status === 401) { window.location.href = "/auth/login"; return }
      if (freeRes.ok) { window.location.href = "/success"; return }
      const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ questionId, vote }) })
      if (res.status === 401) { window.location.href = "/auth/login"; return }
      const data = await res.json()
      if (data.url) { window.location.href = data.url } else { setError("Something went wrong.") }
    } catch { setError("Something went wrong.") } finally { setLoading(false) }
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {["Yes", "No"].map(opt => (
          <button key={opt} onClick={() => setVote(opt)} style={{ padding: "14px 28px", background: vote === opt ? "#c9a84c" : "#e8e4dc", color: "#1a1814", border: vote === opt ? "2px solid #c9a84c" : "2px solid transparent", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>
            {opt}
          </button>
        ))}
      </div>

      <div style={{ background: "#f5f3ee", border: "1px solid #c8c4bc", borderRadius: 8, padding: "14px 16px", marginBottom: 16, fontFamily: "var(--sans)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#888074", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Where your £1 goes</div>
        {BREAKDOWN.map(({ label, amount, muted, highlight }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #e8e4dc", fontSize: 13 }}>
            <span style={{ color: muted ? "#888074" : "#1a1814", animation: label.startsWith("😠") ? "rage 1.8s ease-in-out infinite" : "none" }}>{label}</span>
            <span style={{ color: highlight ? "#c9a84c" : muted ? "#888074" : "#1a1814", fontWeight: highlight ? 700 : 600 }}>{amount}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6, fontSize: 13, fontWeight: 700, color: "#1a1814" }}>
          <span>Your total</span>
          <span>£1.00</span>
        </div>
      </div>

      <style>{`
        @keyframes rage {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px) rotate(-3deg); }
          40% { transform: translateX(2px) rotate(3deg); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
      `}</style>

      {vote && !loading && (
        <div style={{ background: "#f0ece4", border: "1px solid #c9a84c", borderRadius: 8, padding: "14px 16px", marginBottom: 12, fontFamily: "var(--sans)" }}>
          <p style={{ fontSize: 14, color: "#1a1814", fontWeight: 600, margin: "0 0 10px" }}>
            Want to see what others are saying first?
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("have-your-say")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "10px 18px", background: "#1a1814", color: "#c9a84c", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}
            >
              Read the debate ↓
            </button>
            <button
              onClick={handleVote}
              disabled={loading}
              style={{ padding: "10px 18px", background: "#c9a84c", color: "#1a1814", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}
            >
              {loading ? "Taking you to payment..." : "Cast my verdict — £1"}
            </button>
          </div>
        </div>
      )}

      {!vote && (
        <button disabled style={{ padding: "14px 28px", background: "#888074", color: "#1a1814", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "not-allowed", fontFamily: "var(--sans)", marginBottom: 12, width: "100%" }}>
          Select Yes or No
        </button>
      )}

      <p style={{ fontSize: 12, color: "#888074", fontFamily: "var(--sans)", lineHeight: 1.6, fontStyle: "italic" }}>
        Yes — a payment company takes more than we do. We think that&apos;s wrong too. But we&apos;d rather be honest about it than hide it in small print.
      </p>

      {error && <p style={{ color: "red", fontSize: 14, marginTop: 8 }}>{error}</p>}
    </div>
  )
}
