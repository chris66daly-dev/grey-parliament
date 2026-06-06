import Link from "next/link"
import { getSupabaseServerAuth } from "@/lib/supabase-server"
import { lookupPostcode } from "@/lib/postcode"

export default async function SuccessPage() {
  let mpName = null
  let constituency = null
  try {
    const supabase = getSupabaseServerAuth()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase.from("profiles").select("postcode").eq("id", user.id).single()
      if (profile?.postcode) {
        const mp = await lookupPostcode(profile.postcode)
        if (mp) { mpName = mp.mpName; constituency = mp.constituency }
      }
    }
  } catch {}

  return (
    <main style={{ background: "#1a1814", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏛️</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, color: "#f5f3ee", marginBottom: 12 }}>You\u2019re in. Welcome to the benches.</h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "#2c2c2a" }}></div>
          <span style={{ fontSize: 14, color: "#888074", letterSpacing: "0.1em" }}>GREY PARLIAMENT</span>
          <div style={{ flex: 1, height: 1, background: "#2c2c2a" }}></div>
        </div>
        {mpName && constituency && (
          <div style={{ background: "#2c2c2a", borderRadius: 12, padding: "1.5rem", marginBottom: 28, border: "1px solid #3a3a38" }}>
            <p style={{ fontSize: 13, color: "#888074", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--sans)" }}>Your verdict has been sent to</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#c9a84c", fontFamily: "var(--serif)", marginBottom: 4 }}>{mpName}</p>
            <p style={{ fontSize: 14, color: "#c8c4bc", fontFamily: "var(--sans)" }}>{constituency}</p>
            <p style={{ fontSize: 12, color: "#888074", fontFamily: "var(--sans)", marginTop: 12, fontStyle: "italic" }}>Results are sent every Friday at 9am. Every verdict counts. Every silence is noted.</p>
          </div>
        )}
        <p style={{ fontSize: 16, color: "#c8c4bc", lineHeight: 1.7, marginBottom: 32, fontFamily: "var(--sans)" }}>Your membership card is on its way. Your first verdict goes out this Sunday. Your MP has been notified that you exist and you have something to say.</p>
        <div style={{ background: "#2c2c2a", borderRadius: 12, padding: "1.5rem", marginBottom: 28, fontStyle: "italic", fontFamily: "var(--sans)" }}>
          \u201cYour welcome pack contains absolutely nothing physical \u2013 this is the internet. But your voice now counts. And that\u2019s worth more.\u201d
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f3ee", marginBottom: 12, fontFamily: "var(--sans)" }}>Tell someone who deserves to be here:</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://greyparliament.co.uk" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", border: "1px solid #3a3a38", borderRadius: 8, color: "#f5f3ee", textDecoration: "none", fontSize: 14, fontFamily: "var(--sans)" }}>\ud83d\udc64 Facebook</a>
            <a href="https://wa.me/?text=I%20just%20joined%20Grey%20Parliament%20%E2%80%94%20the%20independent%20voice%20for%20the%20over%2050s.%20https://greyparliament.co.uk" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", border: "1px solid #3a3a38", borderRadius: 8, color: "#f5f3ee", textDecoration: "none", fontSize: 14, fontFamily: "var(--sans)" }}>\ud83d\udcac WhatsApp</a>
          </div>
        </div>
        <Link href="/" style={{ display: "inline-block", padding: "12px 28px", background: "#f5f3ee", borderRadius: 8, fontSize: 15, fontWeight: 600, color: "#1a1814", textDecoration: "none", fontFamily: "var(--sans)" }}>Cast this week\u2019s verdict \u2192</Link>
      </div>
    </main>
  )
}