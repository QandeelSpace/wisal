"use client";
import { useState } from "react";
import Link from "next/link";
import PageShell from "../components/PageShell";
import { ServiceIcon } from "../components/Icons";

function PackagesContent({ lang, theme, t }) {
  const isAr = lang === "ar";
  const [activeTab, setActiveTab] = useState("celebration");
  const pkgs = activeTab === "celebration" ? t.packages.celebration : t.packages.memorial;

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-label">04 // {isAr ? "حزم الخدمات" : "Curated Suites"}</span>
            <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              {t.packagesTitle}
            </h1>
            <p className="body-text" style={{ maxWidth: 560, fontSize: "var(--text-lg)" }}>
              {t.packagesSubtitle}
            </p>
          </div>
        </div>
        <div className="bg-calligraphy" style={{ top: "25%", right: "4%", fontSize: "clamp(5rem, 15vw, 15rem)", transform: "rotate(4deg)" }}>
          عطاء
        </div>
      </div>

      {/* Tab selector */}
      <section className="section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          {/* Tab Toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "4rem" }}>
            <div className="package-tab-toggle" style={{ display: "flex", border: "1px solid var(--border-color)", borderRadius: "8px", overflow: "hidden" }}>
              {[
                { id: "celebration", label: isAr ? "احتفالات" : "Celebrations", icon: "vip" },
                { id: "memorial", label: isAr ? "عزاء وتأبين" : "Memorial", icon: "memorial" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className="package-tab-button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "0.75rem 2rem",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    transition: "all 0.3s",
                    background: activeTab === tab.id ? "var(--gold-gradient)" : "transparent",
                    color: activeTab === tab.id ? "#0d0e10" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                  }}
                >
                  <ServiceIcon slug={tab.icon} size={14} color="currentColor" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="packages-grid">
            {pkgs.map((pkg, i) => (
              <div key={i} className={`package-card ${pkg.highlight ? "highlight" : ""}`}>
                <div>
                  <span className="package-badge">
                    {isAr ? `الحزمة 0${i + 1}` : `Collection 0${i + 1}`}
                    {pkg.highlight && (
                      <span style={{ marginLeft: "0.5rem", color: "var(--gold-light)" }}>
                        {isAr ? "✦ الأكثر طلباً" : "✦ Most Popular"}
                      </span>
                    )}
                  </span>
                  <h3 className="package-name" style={{ marginTop: "0.75rem" }}>{pkg.name}</h3>
                  <p className="package-desc" style={{ marginTop: "0.5rem" }}>{pkg.desc}</p>
                </div>

                <ul className="package-features">
                  {pkg.features.map((feat, fi) => (
                    <li key={fi}>{feat}</li>
                  ))}
                </ul>

                <div style={{ marginTop: "auto" }}>
                  <Link href="/contact" className={pkg.highlight ? "btn-primary" : "btn-outline"} style={{ width: "100%", justifyContent: "center" }}>
                    {t.requestConsultation}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section style={{ padding: "5rem 0", textAlign: "center", borderTop: "1px solid var(--border-subtle)", background: "rgba(0,0,0,0.01)" }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            {isAr ? "تحتاج إلى حزمة مخصصة؟" : "Need a Custom Package?"}
          </h2>
          <p className="body-text" style={{ maxWidth: 480, margin: "0 auto 2.5rem" }}>
            {isAr
              ? "يمكننا تصميم حزمة خاصة تلائم احتياجاتك ومتطلباتك بدقة."
              : "We can craft a bespoke package tailored precisely to your requirements and expectations."}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              {isAr ? "اطلب حزمة مخصصة" : "Request Custom Package"}
            </Link>
            <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" className="btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PackagesPage() {
  return (
    <PageShell>
      {(props) => <PackagesContent {...props} />}
    </PageShell>
  );
}
