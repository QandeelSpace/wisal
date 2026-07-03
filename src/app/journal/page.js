"use client";
import Link from "next/link";
import PageShell from "../components/PageShell";

function JournalContent({ lang, t }) {
  const isAr = lang === "ar";

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-label">08 // {isAr ? "المجلة التحريرية" : "Editorial Journal"}</span>
            <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              {t.resourcesTitle}
            </h1>
            <p className="body-text" style={{ maxWidth: 560, fontSize: "var(--text-lg)" }}>
              {t.resourcesSubtitle}
            </p>
          </div>
        </div>
        <div className="bg-calligraphy" style={{ top: "25%", right: "4%", fontSize: "clamp(5rem, 15vw, 15rem)", transform: "rotate(4deg)" }}>
          علم
        </div>
      </div>

      {/* Journal List */}
      <section className="section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="journal-list">
            {t.blogs.map((post, i) => (
              <div key={i} className="journal-item" style={{ cursor: "default" }}>
                <span className="journal-item-volume" style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-display)", fontStyle: isAr ? "normal" : "italic" }}>
                  {isAr ? `العدد 0${i + 1}` : `Volume 0${i + 1}`}
                </span>
                <div style={{ flex: 1 }}>
                  <div className="journal-item-title">{post.title}</div>
                  <p className="journal-item-desc" style={{ maxWidth: "none", marginTop: "0.35rem" }}>{post.desc}</p>
                </div>
                <Link href="/contact" className="btn-text" style={{ flexShrink: 0 }}>
                  {isAr ? "اقرأ المزيد" : "Read Guide"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 0", textAlign: "center", borderTop: "1px solid var(--border-subtle)", background: "rgba(0,0,0,0.01)" }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            {isAr ? "هل تحتاج إلى استشارة متخصصة؟" : "Need Expert Guidance?"}
          </h2>
          <p className="body-text" style={{ maxWidth: 440, margin: "0 auto 2.5rem" }}>
            {isAr ? "فريق وصال الكونسيرج مستعد لمساعدتك في كل خطوة." : "Our concierge team is ready to assist you at every step."}
          </p>
          <Link href="/contact" className="btn-primary">{t.requestConsultation}</Link>
        </div>
      </section>
    </>
  );
}

export default function JournalPage() {
  return (
    <PageShell>
      {(props) => <JournalContent {...props} />}
    </PageShell>
  );
}
