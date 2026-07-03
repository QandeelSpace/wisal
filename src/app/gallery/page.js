"use client";
import Link from "next/link";
import PageShell from "../components/PageShell";

const galleryItems = [
  { img: "/images/hero_celebration.png", labelEn: "Weddings & Engagements", labelAr: "حفلات الزفاف والخطوبة", metaEn: "Ritz-Carlton, Amman", metaAr: "ريتز كارلتون، عمان" },
  { img: "/images/gallery_corporate.png", labelEn: "Corporate Galas", labelAr: "مؤتمرات وحفلات الشركات", metaEn: "St. Regis, Amman", metaAr: "سانت ريجيس، عمان" },
  { img: "/images/gallery_islamic.png", labelEn: "Islamic Ceremonies", labelAr: "المناسبات الإسلامية", metaEn: "Al-Husseini Mosque", metaAr: "مسجد الحسيني" },
  { img: "/images/hero_memorial.png", labelEn: "Memorial Services", labelAr: "خدمات العزاء والتأبين", metaEn: "Amman Memorial Hall", metaAr: "قاعة التأبين، عمان", filter: "grayscale(0.8)" },
  { img: "/images/hero_celebration.png", labelEn: "Family Celebrations", labelAr: "الاحتفالات العائلية", metaEn: "Private Villa, Abdoun", metaAr: "فيلا خاصة، عبدون" },
  { img: "/images/gallery_corporate.png", labelEn: "VIP Concierge", labelAr: "خدمات الكونسيرج الفاخرة", metaEn: "Queen Alia Airport", metaAr: "مطار الملكة علياء" },
];

function GalleryContent({ lang, t }) {
  const isAr = lang === "ar";

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="section-label">05 // {isAr ? "معرض الصور" : "Visual Chronicles"}</span>
            <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              {t.galleryTitle}
            </h1>
            <p className="body-text" style={{ maxWidth: 540, fontSize: "var(--text-lg)" }}>
              {t.gallerySubtitle}
            </p>
          </div>
        </div>
        <div className="bg-calligraphy" style={{ top: "20%", right: "4%", fontSize: "clamp(5rem, 16vw, 16rem)", transform: "rotate(4deg)" }}>
          جمال
        </div>
      </div>

      {/* Gallery Masonry */}
      <section className="section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="gallery-masonry">
            {galleryItems.map((item, i) => (
              <div key={i} className="gallery-item img-corner-ornament">
                <img
                  src={item.img}
                  alt={isAr ? item.labelAr : item.labelEn}
                  style={item.filter ? { filter: item.filter } : {}}
                />
                <div className="gallery-item-overlay">
                  <div>
                    <div style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.35rem", fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)" }}>
                      {isAr ? item.metaAr : item.metaEn}
                    </div>
                    <div className="gallery-item-label">{isAr ? item.labelAr : item.labelEn}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 0", textAlign: "center", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            {isAr ? "دعنا نكتب قصتك" : "Let Us Craft Your Story"}
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">{t.requestConsultation}</Link>
            <Link href="/services" className="btn-outline">{isAr ? "استعرض خدماتنا" : "Explore Services"}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function GalleryPage() {
  return (
    <PageShell>
      {(props) => <GalleryContent {...props} />}
    </PageShell>
  );
}
