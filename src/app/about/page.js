"use client";
import Link from "next/link";
import PageShell from "../components/PageShell";

function AboutContent({ lang, t }) {
  const isAr = lang === "ar";

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-label">01 // {isAr ? "تراثنا" : "The Heritage"}</span>
            <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              {t.aboutSubtitle}
            </h1>
            <p className="body-text" style={{ maxWidth: 620, fontSize: "var(--text-lg)" }}>
              {t.aboutText}
            </p>
          </div>
        </div>
        <div className="bg-calligraphy" style={{ top: "30%", right: "5%", fontSize: "clamp(6rem, 18vw, 18rem)", transform: "rotate(5deg)" }}>
          وصال
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="spread">
            <div className="spread-visual">
              <div className="img-frame" style={{ height: "560px" }}>
                <img src="/images/gallery_corporate.png" alt="WISAL Coordination" className="spread-image" style={{ height: "100%" }} />
              </div>
            </div>
            <div className="spread-text">
              <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                <div>
                  <span className="section-label">{isAr ? "رسالتنا" : "Mission"}</span>
                  <h2 className="section-title" style={{ fontSize: "var(--text-4xl)", marginBottom: "1rem" }}>
                    {t.missionTitle}
                  </h2>
                  <p className="body-text">{t.missionText}</p>
                </div>
                <div className="gold-divider" />
                <div>
                  <span className="section-label">{isAr ? "رؤيتنا" : "Vision"}</span>
                  <h2 className="section-title" style={{ fontSize: "var(--text-4xl)", marginBottom: "1rem" }}>
                    {t.visionTitle}
                  </h2>
                  <p className="body-text">{t.visionText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "rgba(0,0,0,0.01)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="spread reverse">
            <div className="spread-visual">
              <div className="img-frame img-corner-ornament" style={{ height: "500px" }}>
                <img src="/images/hero_celebration.png" alt="WISAL Values" className="spread-image" style={{ height: "100%" }} />
              </div>
            </div>
            <div className="spread-text">
              <span className="section-label">02 // {isAr ? "قيمنا" : "Our Standards"}</span>
              <h2 className="section-title" style={{ marginBottom: "2rem" }}>{t.valuesTitle}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {t.values.map((val, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1rem",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "8px",
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)",
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontSize: "0.5rem" }}>◆</span>
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why WISAL */}
      <section className="section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-label">06 // {isAr ? "لماذا نختار وصال" : "Distinction"}</span>
            <h2 className="section-title">{t.whyTitle}</h2>
            <p className="body-text" style={{ maxWidth: 520, margin: "1rem auto 0" }}>{t.whySubtitle}</p>
          </div>
          <div className="why-grid">
            {t.whyItems.map((item, i) => (
              <div key={i} className="why-item">
                <span className="why-num">Coordinate 0{i + 1}</span>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Network */}
      <section className="section-sm" style={{ borderTop: "1px solid var(--border-subtle)", background: "rgba(0,0,0,0.01)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-label">{isAr ? "شركاء النجاح" : "Shaper Network"}</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", color: "var(--gold)", marginBottom: "1.5rem" }}>{t.partnersTitle}</h2>
          <p className="body-text" style={{ maxWidth: 640, margin: "0 auto 3rem" }}>{t.partnersDesc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", justifyContent: "center", opacity: 0.6 }}>
            {["Ritz-Carlton Amman", "Four Seasons Jordan", "St. Regis Amman", "Royal Concierge Association", "Jordanian Floral Guild"].map((name) => (
              <span key={name} style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontStyle: "italic", color: "var(--text-secondary)" }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 0", textAlign: "center", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            {isAr ? "ابدأ رحلتك معنا" : "Begin Your Journey"}
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              {t.requestConsultation}
            </Link>
            <Link href="/services" className="btn-outline">
              {isAr ? "استعرض خدماتنا" : "Explore Services"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      {(props) => <AboutContent {...props} />}
    </PageShell>
  );
}
