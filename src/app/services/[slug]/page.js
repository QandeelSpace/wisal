"use client";
import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../components/PageShell";
import { ServiceIcon } from "../../components/Icons";

const serviceImages = {
  weddings: "/images/hero_celebration.png",
  family: "/images/hero_celebration.png",
  corporate: "/images/gallery_corporate.png",
  memorials: "/images/hero_memorial.png",
  islamic: "/images/gallery_islamic.png",
  vip: "/images/gallery_corporate.png",
};

const serviceNumbers = {
  weddings: "03.1",
  family: "03.2",
  corporate: "03.3",
  memorials: "03.4",
  islamic: "03.5",
  vip: "03.6",
};

const relatedServices = {
  weddings: ["family", "islamic", "vip"],
  family: ["weddings", "corporate", "vip"],
  corporate: ["vip", "family", "weddings"],
  memorials: ["islamic", "family", "memorials"],
  islamic: ["weddings", "memorials", "family"],
  vip: ["corporate", "weddings", "family"],
};

function ServiceDetailContent({ slug, lang, t }) {
  const isAr = lang === "ar";
  const div = t.divisions[slug];
  const cat = t.serviceCategories[slug];

  if (!div) {
    notFound();
    return null;
  }

  const imgFilter = slug === "memorials" ? "grayscale(0.5) brightness(0.85)" : undefined;
  const related = (relatedServices[slug] || []).filter((s) => s !== slug).slice(0, 3);

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero" style={{ paddingBottom: "var(--space-lg)" }}>
        <div className="container">
          <div style={{ marginBottom: "1rem" }}>
            <Link href="/services" className="btn-text" style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              {isAr ? "الخدمات" : "All Services"}
            </Link>
          </div>
          <span className="section-label" style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            {serviceNumbers[slug]} // <ServiceIcon slug={slug} size={14} color="var(--gold)" /> {cat?.label}
          </span>
          <h1 className="display-title" style={{ color: "var(--gold)", maxWidth: 700, marginBottom: "1.5rem" }}>
            {div.title}
          </h1>
          <p className="body-text" style={{ maxWidth: 560, fontSize: "var(--text-lg)" }}>
            {div.desc}
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              {t.requestConsultation}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
        <div className="bg-calligraphy" style={{ top: "20%", right: "3%", opacity: 0.04, pointerEvents: "none", zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ServiceIcon slug={slug} size={160} color="var(--gold)" />
        </div>
      </div>

      {/* Main Spread */}
      <section className="section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="spread">
            <div className="spread-visual">
              <div className="img-frame img-corner-ornament service-detail-image-frame">
                <img
                  src={serviceImages[slug]}
                  alt={div.title}
                  className="spread-image"
                  style={{ height: "100%", filter: imgFilter }}
                />
              </div>
            </div>
            <div className="spread-text">
              <span className="section-label">{isAr ? "ما نقدمه" : "What We Offer"}</span>
              <h2 className="section-title" style={{ fontSize: "var(--text-4xl)", color: "var(--gold)" }}>
                {isAr ? "الخدمات الشاملة" : "Comprehensive Services"}
              </h2>
              <p className="body-text">{div.desc}</p>
              <ul className="feature-list">
                {div.items.map((item, i) => (
                  <li key={i} style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary" style={{ marginTop: "1rem", alignSelf: "flex-start" }}>
                {t.requestConsultation}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why WISAL for this service */}
      <section className="section-sm" style={{ background: "rgba(0,0,0,0.01)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="container" style={{ textAlign: "center" }}>
          <span className="section-label">{isAr ? "لماذا وصال" : "Why WISAL"}</span>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>{t.whyTitle}</h2>
          <div className="service-detail-benefits">
            {t.whyItems.slice(0, 6).map((item, i) => (
              <div key={i} style={{ padding: "1.5rem", border: "1px solid var(--border-subtle)", borderRadius: "10px", textAlign: isAr ? "right" : "left" }}>
                <h3 style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-display)", fontSize: "var(--text-lg)", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="section-sm" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="container">
            <span className="section-label">{isAr ? "خدمات أخرى" : "Related Services"}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", marginBottom: "2.5rem" }}>
              {isAr ? "قد يهمك أيضاً" : "You May Also Need"}
            </h2>
            <div className="service-detail-related">
              {related.map((rSlug) => {
                const rDiv = t.divisions[rSlug];
                const rCat = t.serviceCategories[rSlug];
                return (
                  <Link key={rSlug} href={`/services/${rSlug}`} className="service-card">
                    <div className="service-card-image">
                      <img src={serviceImages[rSlug]} alt={rDiv.title} style={rSlug === "memorials" ? { filter: "grayscale(0.7)" } : {}} />
                    </div>
                    <div className="service-card-body">
                      <span className="service-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <ServiceIcon slug={rSlug} size={14} color="var(--gold)" />
                        {rCat.label}
                      </span>
                      <div className="service-card-title">{rDiv.title}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "5rem 0", textAlign: "center", borderTop: "1px solid var(--border-subtle)", background: "rgba(200,168,75,0.03)" }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            {isAr ? "هل أنت مستعد للبدء؟" : "Ready to Get Started?"}
          </h2>
          <p className="body-text" style={{ maxWidth: 440, margin: "0 auto 2.5rem" }}>
            {isAr ? "تواصل مع فريق وصال الكونسيرج لبدء التخطيط." : "Connect with our concierge team to begin planning your event."}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              {t.requestConsultation}
            </Link>
            <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" className="btn-outline">
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServiceDetailPage({ params }) {
  const { slug } = use(params);
  return (
    <PageShell>
      {(props) => <ServiceDetailContent slug={slug} {...props} />}
    </PageShell>
  );
}
