"use client"
import { useState } from "react"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase-browser"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const supabase = getSupabaseBrowser()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://greyparliament.co.uk/auth/reset-password"
    })
    if (error) { setError(error.message); setLoading(false); return }
    setSent(true)
    setLoading(false)
  }

  return (
    <main style={{ minHeight: "100vh", background: "#1a1814", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 900, color: "#c9a84c", textDecoration: "none" }}>Grey Parliament</Link>
          <p style={{ fontSize: 15, color: "#888074", marginTop: 8, fontFamily: "var(--sans)" }}>Reset your password</p>
        </div>
        {sent ? (
          <div style={{ background: "#2c2c2a", borderRadius: 12, padding: "2rem", textAlign: "center" }}>
            <p style={{ color: "#c9a84c", fontSize: 16, fontFamily: "var(--sans)", marginBottom: 8 }}>Check your inbox</p>
            <p style={{ color: "#888074", fontSize: 14, fontFamily: "var(--sans)" }}>We sent a reset link to {email}. Check your spam folder if it does not arrive within a few minutes.</p>
            <Link href="/auth/login" style={{ display: "block", marginTop: 20, color: "#c9a84c", fontFamily: "var(--sans)", fontSize: 14 }}>Back to sign in</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#c8c4bc", marginBottom: 6, fontFamily: "var(--sans)" }}>Email address</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "12px 16px", background: "#f5f3ee", border: "1px solid #c8c4bc", borderRadius: 8, fontSize: 15, fontFamily: "var(--sans)", color: "#1a1814", boxSizing: "border-box" }} />
            </div>
            {error && <p style={{ color: "#e74c3c", fontSize: 14, fontFamily: "var(--sans)", margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ padding: "14px", background: "#c9a84c", color: "#1a1814", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: loading ? "wait" : "pointer", fontFamily: "var(--sans)" }}>{loading ? "Sending..." : "Send reset link"}</button>
            <p style={{ textAlign: "center", fontSize: 13, color: "#888074", fontFamily: "var(--sans)", margin: 0 }}><Link href="/auth/login" style={{ color: "#c9a84c", textDecoration: "none" }}>Back to sign in</Link></p>
          </form>
        )}
      </div>
    </main>
  )
}