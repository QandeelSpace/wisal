"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translations } from "../translations";
import { ServiceIcon } from "./Icons";

export default function Header({ lang, setLang, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const serviceItems = [
    { slug: "weddings", ...t.serviceCategories.weddings },
    { slug: "family", ...t.serviceCategories.family },
    { slug: "corporate", ...t.serviceCategories.corporate },
    { slug: "memorials", ...t.serviceCategories.memorials },
    { slug: "islamic", ...t.serviceCategories.islamic },
    { slug: "vip", ...t.serviceCategories.vip },
  ];

  const isHome = pathname === "/";

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""} ${isHome ? "is-home" : ""}`}>
        {/* Full-width inner — no container constraint */}
        <div className="header-inner">

          {/* ── Logo ── */}
          <Link href="/" className="header-logo">
            <svg
              className="header-logo-mark"
              width="32"
              height="32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="var(--gold)" strokeWidth="3" />
              <circle cx="50" cy="50" r="14" stroke="var(--gold)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="4" fill="var(--gold)" />
              <line x1="50" y1="5" x2="50" y2="36" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
              <line x1="50" y1="64" x2="50" y2="95" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
              <line x1="5" y1="50" x2="36" y2="50" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
              <line x1="64" y1="50" x2="95" y2="50" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
            </svg>
            <span className="header-logo-text">{t.brand}</span>
          </Link>

          {/* ── Main Nav ── */}
          <nav className="header-nav">

            {/* Home */}
            <div className="nav-item">
              <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                {t.navHome}
              </Link>
            </div>

            {/* About */}
            <div className="nav-item">
              <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
                {t.navAbout}
              </Link>
            </div>

            {/* Services — dropdown */}
            <div className="nav-item">
              <button
                className={`nav-link ${isActive("/services") ? "active" : ""}`}
                aria-haspopup="true"
              >
                {t.navServices}
                <svg className="nav-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </button>

              <div className="nav-dropdown" role="menu">
                {serviceItems.map((svc) => (
                  <Link key={svc.slug} href={`/services/${svc.slug}`} className="dropdown-item" role="menuitem">
                    <span className="dropdown-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, flexShrink: 0 }}>
                      <ServiceIcon slug={svc.slug} size={20} color="var(--gold)" />
                    </span>
                    <span>
                      <span className="dropdown-label">{svc.label}</span>
                      <span className="dropdown-desc">{svc.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Packages */}
            <div className="nav-item">
              <Link href="/packages" className={`nav-link ${isActive("/packages") ? "active" : ""}`}>
                {t.navPackages}
              </Link>
            </div>

            {/* Gallery */}
            <div className="nav-item">
              <Link href="/gallery" className={`nav-link ${isActive("/gallery") ? "active" : ""}`}>
                {t.navGallery}
              </Link>
            </div>

          </nav>

          {/* ── Controls ── */}
          <div className="header-controls">
            {/* Theme toggle */}
            <button
              className="ctrl-btn"
              onClick={() => {
                const next = theme === "celebration" ? "memorial" : "celebration";
                setTheme(next);
                document.documentElement.setAttribute("data-theme", next);
              }}
              title={theme === "celebration" ? "Switch to Memorial Mode" : "Switch to Celebration Mode"}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem", height: 32, width: 32 }}
            >
              <ServiceIcon slug={theme === "celebration" ? "memorial" : "vip"} size={16} color="currentColor" />
            </button>

            {/* Language toggle */}
            <button
              className="ctrl-btn"
              onClick={() => {
                const next = lang === "en" ? "ar" : "en";
                setLang(next);
                document.documentElement.lang = next;
                document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
              }}
            >
              {lang === "en" ? "عربي" : "EN"}
            </button>

            {/* Contact CTA */}
            <Link href="/contact" className="ctrl-btn-wa ctrl-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              {t.navContact}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen
                  ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>)
                  : (<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>)}
              </svg>
            </button>
          </div>

        </div>

        {/* ── Mobile Nav Panel ── */}
        {mobileOpen && (
          <div id="mobile-navigation" className="mobile-nav-panel">
            {[
              { href: "/", label: t.navHome },
              { href: "/about", label: t.navAbout },
              { href: "/services", label: t.navServices },
              { href: "/packages", label: t.navPackages },
              { href: "/gallery", label: t.navGallery },
              { href: "/contact", label: t.navContact },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{
                padding: "0.875rem 0", borderBottom: "1px solid var(--border-subtle)",
                fontSize: "var(--text-base)", color: "var(--text-primary)",
                textDecoration: "none",
                fontFamily: lang === "ar" ? "var(--font-arabic)" : "var(--font-body)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                {item.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ))}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
              <button className="ctrl-btn" style={{ flex: 1, color: "var(--text-secondary)", borderColor: "var(--border-color)" }}
                onClick={() => { const n = lang === "en" ? "ar" : "en"; setLang(n); document.documentElement.lang = n; document.documentElement.dir = n === "ar" ? "rtl" : "ltr"; }}>
                {lang === "en" ? "العربية" : "English"}
              </button>
              <button className="ctrl-btn" style={{ flex: 1, color: "var(--text-secondary)", borderColor: "var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", height: 36 }}
                onClick={() => { const n = theme === "celebration" ? "memorial" : "celebration"; setTheme(n); document.documentElement.setAttribute("data-theme", n); }}>
                <ServiceIcon slug={theme === "celebration" ? "memorial" : "vip"} size={14} color="currentColor" />
                {theme === "celebration" ? (lang === "ar" ? "العزاء" : "Memorial") : (lang === "ar" ? "الاحتفالات" : "Celebration")}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
