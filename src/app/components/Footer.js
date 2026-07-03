"use client";
import Link from "next/link";

export default function Footer({ lang, t }) {
  const isAr = lang === "ar";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">{t.brand}</div>
            <p className="footer-brand-desc">
              {isAr
                ? "شركة وصال — الشركة الرائدة في تنسيق الفعاليات والكونسيرج في الأردن. نرافق العائلات والشركات والمجتمعات بأناقة ورعاية ومهنية."
                : "Jordan's Premier Event Coordination & Concierge Company. Serving families, organizations, and communities with elegance, compassion, and professionalism."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-title">{t.footerStructure}</div>
            <ul className="footer-links">
              <li><Link href="/about">{t.navAbout}</Link></li>
              <li><Link href="/services">{t.navServices}</Link></li>
              <li><Link href="/packages">{t.navPackages}</Link></li>
              <li><Link href="/gallery">{t.navGallery}</Link></li>
              <li><Link href="/journal">{t.navResources}</Link></li>
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <div className="footer-col-title">{t.footerDivisions}</div>
            <ul className="footer-links">
              <li><Link href="/services/weddings">{t.divisions.weddings.title}</Link></li>
              <li><Link href="/services/corporate">{t.divisions.corporate.title}</Link></li>
              <li><Link href="/services/memorials">{t.divisions.memorials.title}</Link></li>
              <li><Link href="/services/islamic">{t.divisions.islamic.title}</Link></li>
              <li><Link href="/services/vip">{t.divisions.vip.title}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">{t.footerInquiries}</div>
            <p style={{ fontSize: "var(--text-sm)", marginBottom: "0.75rem" }}>
              {t.footerContact}
            </p>
            <a href="tel:+96265000000" className="footer-phone">
              +962 6 500 0000
            </a>
            <a
              href="https://wa.me/962790000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                fontSize: "var(--text-sm)",
                color: "var(--gold)",
                textDecoration: "none",
                marginTop: "0.5rem",
              }}
            >
              WhatsApp: +962 79 000 0000
            </a>
            <p className="footer-emergency" style={{ marginTop: "1rem" }}>
              {t.emergencySupport}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {t.footerText}</p>
          <p>{isAr ? "عمان / الأردن" : "Amman / Jordan"}</p>
        </div>
      </div>
    </footer>
  );
}
