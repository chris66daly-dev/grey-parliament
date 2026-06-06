"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase-browser"

export default function AccountPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pwMsg, setPwMsg] = useState(null)
  const [pwLoading, setPwLoading] = useState(false)
  const [cancelMsg, setCancelMsg] = useState(null)
  const [showCancel, setShowCancel] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseBrowser()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/auth/login"); return }
      setEmail(data.user.email || "")
    })
  }, [])

  async function handlePasswordChange(e) {
    e.preventDefault()
    if (newPassword !== confirmPassword) { setPwMsg("Passwords do not match"); return }
    if (newPassword.length < 8) { setPwMsg("Password must be at least 8 characters"); return }
    setPwLoading(true)
    const supabase = getSupabaseBrowser()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPwLoading(false)
    setPwMsg(error ? error.message : "Password updated successfully")
    if (!error) { setNewPassword(""); setConfirmPassword("") }
  }

  async function handleCancelMembership() {
    const supabase = getSupabaseBrowser()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("profiles").update({ membership_status: "cancelled" }).eq("id", user.id)
    await supabase.auth.signOut()
    router.push("/")
  }

  const inputStyle = { width: "100%", padding: "12px 16px", background: "#2c2c2a", border: "1px solid #3a3a38", borderRadius: 8, fontSize: 15, fontFamily: "var(--sans)", color: "#f5f3ee", boxSizing: "border-box" }
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#888074", marginBottom: 6, fontFamily: "var(--sans)" }
  const sectionStyle = { background: "#2c2c2a", borderRadius: 12, padding: "1.5rem", marginBottom: 24, border: "1px solid #3a3a38" }

  return (
    <main style={{ minHeight: "100vh", background: "#1a1814", padding: "40px 24px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <Link href="/" style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 900, color: "#c9a84c", textDecoration: "none" }}>Grey Parliament</Link>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700, color: "#f5f3ee", marginTop: 16, marginBottom: 4 }}>Your Account</h1>
          <p style={{ fontSize: 14, color: "#888074", fontFamily: "var(--sans)" }}>{email}</p>
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 700, color: "#f5f3ee", marginBottom: 20 }}>Change Password</h2>
          <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div><label style={labelStyle}>New password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} placeholder="At least 8 characters" /></div>
            <div><label style={labelStyle}>Confirm new password</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={inputStyle} placeholder="Repeat your new password" /></div>
            {pwMsg && <p style={{ fontSize: 13, color: pwMsg.includes("success") ? "#c9a84c" : "#e74c3c", fontFamily: "var(--sans)", margin: 0 }}>{pwMsg}</p>}
            <button type="submit" disabled={pwLoading} style={{ padding: "12px", background: "#c9a84c", color: "#1a1814", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>{pwLoading ? "Updating..." : "Update password"}</button>
          </form>
        </div>

        <div style={sectionStyle}>
          <h2 style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 700, color: "#f5f3ee", marginBottom: 8 }}>Cancel Membership</h2>
          <p style={{ fontSize: 14, color: "#888074", fontFamily: "var(--sans)", marginBottom: 16, lineHeight: 1.6 }}>We are sorry to see you go. Your data will be retained for 30 days before permanent deletion.</p>
          {!showCancel ? (
            <button onClick={() => setShowCancel(true)} style={{ padding: "12px 20px", background: "transparent", color: "#e74c3c", border: "1px solid #e74c3c", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)" }}>Cancel my membership</button>
          ) : (
            <div style={{ background: "#1a1814", borderRadius: 8, padding: "1rem", border: "1px solid #e74c3c" }}>
              <p style={{ fontSize: 14, color: "#f5f3ee", fontFamily: "var(--sans)", marginBottom: 16 }}>Are you sure? Your voice matters here.</p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={handleCancelMembership} style={{ padding: "10px 20px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)" }}>Yes, cancel</button>
                <button onClick={() => setShowCancel(false)} style={{ padding: "10px 20px", background: "#2c2c2a", color: "#f5f3ee", border: "1px solid #3a3a38", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)" }}>Keep my membership</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/" style={{ fontSize: 14, color: "#888074", fontFamily: "var(--sans)", textDecoration: "none" }}>← Back to Grey Parliament</Link>
        </div>
      </div>
    </main>
  )
}