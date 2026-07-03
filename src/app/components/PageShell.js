"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import { translations } from "../translations";

export default function PageShell({ children }) {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("celebration");
  const pathname = usePathname();

  useEffect(() => {
    // Persist lang/theme from sessionStorage
    const storedLang = sessionStorage.getItem("wisal-lang");
    const storedTheme = sessionStorage.getItem("wisal-theme");
    if (storedLang === "en" || storedLang === "ar") {
      setLang(storedLang);
      document.documentElement.lang = storedLang;
      document.documentElement.dir = storedLang === "ar" ? "rtl" : "ltr";
    }
    if (storedTheme === "celebration" || storedTheme === "memorial") {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  const handleSetLang = (l) => {
    setLang(l);
    sessionStorage.setItem("wisal-lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  const handleSetTheme = (th) => {
    setTheme(th);
    sessionStorage.setItem("wisal-theme", th);
    document.documentElement.setAttribute("data-theme", th);
  };

  const t = translations[lang];
  const showBreadcrumbs = pathname !== "/" && pathname !== "/contact";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        lang={lang}
        setLang={handleSetLang}
        theme={theme}
        setTheme={handleSetTheme}
      />
      <main style={{ flex: 1, paddingTop: pathname !== "/" ? "80px" : "0" }}>
        {showBreadcrumbs && (
          <Breadcrumbs lang={lang} t={t} pathname={pathname} />
        )}
        {typeof children === "function" ? children({ lang, theme, t }) : children}
      </main>
      <Footer lang={lang} t={t} />
      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/962790000000"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        {t.whatsappConcierge}
      </a>
    </div>
  );
}
