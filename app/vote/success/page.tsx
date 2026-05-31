export default function VoteSuccess() {
  return (
    <main style={{ minHeight: "100vh", background: "#1a1814", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--sans)" }}>
      <div style={{ textAlign: "center", maxWidth: 560, padding: "2rem" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>🏛️</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 40px)", color: "#f5f3ee", marginBottom: 16 }}>Verdict Cast</h1>
        <p style={{ fontSize: 16, color: "#c8c4bc", lineHeight: 1.7, marginBottom: 8 }}>Your vote has been recorded and will be included in the official verdict sent to your MP.</p>
        <p style={{ fontSize: 14, color: "#888074", lineHeight: 1.7, marginBottom: 32 }}>80p of your £1 goes to BBC Children in Need. 20p funds the platform. Once revenues are secured, 100% goes to Children in Need.</p>
        <a href="/" style={{ background: "#c9a84c", color: "#1a1814", padding: "12px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>Back to Grey Parliament</a>
      </div>
    </main>
  )
}
