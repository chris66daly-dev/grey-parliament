import Link from "next/link";

export default function VotePage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "#f5f0e8" }}>
      <nav style={{ background: "#1a1a1a", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ color: "#c9a84c", fontSize: "1.4rem", fontWeight: 900, textDecoration: "none" }}>Grey Parliament</Link>
      </nav>
      <section style={{ padding: "80px 40px", maxWidth: "800px", margin: "0 auto" }}>
        <p style={{ color: "#c9a84c", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>This week</p>
        <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, marginBottom: "32px", color: "#1a1a1a", lineHeight: 1.3 }}>
          Should NHS prescription charges be abolished for all over-60s, regardless of income?
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
          {["Yes — it should be a universal right","No — means testing keeps it fair","Extend but keep some means testing","More information needed"].map((opt) => (
            <button key={opt} style={{ background: "#1a1a1a", color: "#f5f0e8", border: "none", padding: "18px 24px", fontSize: "1rem", cursor: "pointer", textAlign: "left", fontFamily: "Georgia, serif" }}>{opt}</button>
          ))}
        </div>
        <p style={{ color: "#888", fontSize: "0.9rem" }}>Age-verified members only. <Link href="/join" style={{ color: "#c9a84c" }}>Join free to vote →</Link></p>
      </section>
    </main>
  );
}
