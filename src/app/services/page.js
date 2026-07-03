"use client";
import Link from "next/link";
import PageShell from "../components/PageShell";
import { ServiceIcon } from "../components/Icons";

const serviceImages = {
  weddings: "/images/hero_celebration.png",
  family: "/images/hero_celebration.png",
  corporate: "/images/gallery_corporate.png",
  memorials: "/images/hero_memorial.png",
  islamic: "/images/gallery_islamic.png",
  vip: "/images/gallery_corporate.png",
};

function ServicesContent({ lang, t }) {
  const isAr = lang === "ar";
  const divKeys = ["weddings", "family", "corporate", "memorials", "islamic", "vip"];

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-label">03 // {isAr ? "خدماتنا" : "Orchestration"}</span>
            <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              {t.servicesTitle}
            </h1>
            <p className="body-text" style={{ maxWidth: 560, fontSize: "var(--text-lg)" }}>
              {t.servicesSubtitle}
            </p>
          </div>
        </div>
        <div className="bg-calligraphy" style={{ top: "20%", right: "3%", fontSize: "clamp(5rem, 16vw, 16rem)", transform: "rotate(4deg)" }}>
          رعاية
        </div>
      </div>

      {/* Services Grid */}
      <section className="section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="service-preview-grid">
            {divKeys.map((key, i) => {
              const div = t.divisions[key];
              const cat = t.serviceCategories[key];
              return (
                <Link key={key} href={`/services/${key}`} className="service-card">
                  <div className="service-card-image">
                    <img
                      src={serviceImages[key]}
                      alt={div.title}
                      style={key === "memorials" ? { filter: "grayscale(0.7)" } : {}}
                    />
                  </div>
                  <div className="service-card-body">
                    <span className="service-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <ServiceIcon slug={key} size={14} color="var(--gold)" />
                      {cat.label}
                    </span>
                    <div className="service-card-title">{div.title}</div>
                    <p className="service-card-desc">{div.desc}</p>
                    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "var(--text-xs)", color: "var(--gold)", fontWeight: 600, letterSpacing: "1px" }}>
                      {isAr ? "اكتشف المزيد" : "Discover"} 
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 0", textAlign: "center", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            {isAr ? "هل لم تجد ما تبحث عنه؟" : "Not Sure Which Service Fits?"}
          </h2>
          <p className="body-text" style={{ maxWidth: 460, margin: "0 auto 2.5rem" }}>
            {isAr ? "تواصل معنا مباشرة وسيرشدك فريقنا إلى الخدمة المناسبة." : "Contact our concierge team and we'll guide you to the perfect solution."}
          </p>
          <Link href="/contact" className="btn-primary">
            {t.requestConsultation}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <PageShell>
      {(props) => <ServicesContent {...props} />}
    </PageShell>
  );
}
