"use client";

import React from "react";
import Link from "next/link";

const getSegmentLabel = (segment, t) => {
  const s = segment.toLowerCase();
  if (s === "about") return t.navAbout;
  if (s === "services") return t.navServices;
  if (s === "packages") return t.navPackages;
  if (s === "gallery") return t.navGallery;
  if (s === "journal") return t.navResources;
  if (s === "contact") return t.navContact;
  
  if (t.divisions && t.divisions[s]) {
    return t.divisions[s].title;
  }
  
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export default function Breadcrumbs({ lang, t, pathname }) {
  const isAr = lang === "ar";
  
  if (!pathname || pathname === "/") return null;
  
  const segments = pathname.split("/").filter(Boolean);
  
  return (
    <nav 
      aria-label="breadcrumb" 
      style={{
        padding: "1rem 0",
        fontSize: "var(--text-xs)",
        fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)",
        fontWeight: 500,
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
        borderBottom: "1px solid var(--border-subtle)",
        marginBottom: "2rem"
      }}
    >
      <div className="container" style={{ width: "100%" }}>
        <ol 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            listStyle: "none", 
            padding: 0, 
            margin: 0, 
            flexWrap: "wrap",
            gap: "0.5rem"
          }}
        >
          {/* Home Link */}
          <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link 
              href="/" 
              style={{ 
                color: "var(--text-muted)", 
                textDecoration: "none",
                transition: "color var(--duration-fast)"
              }}
              className="breadcrumb-hover-link"
            >
              {t.navHome}
            </Link>
          </li>
          
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const url = `/${segments.slice(0, index + 1).join("/")}`;
            const label = getSegmentLabel(segment, t);
            
            return (
              <li 
                key={url} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem" 
                }}
              >
                {/* Separator */}
                <span 
                  style={{ 
                    opacity: 0.4, 
                    userSelect: "none", 
                    fontSize: "0.75rem",
                    transform: isAr ? "rotate(180deg)" : "none" 
                  }}
                >
                  /
                </span>
                
                {isLast ? (
                  <span style={{ color: "var(--gold)", fontWeight: 600 }}>
                    {label}
                  </span>
                ) : (
                  <Link 
                    href={url}
                    style={{ 
                      color: "var(--text-muted)", 
                      textDecoration: "none",
                      transition: "color var(--duration-fast)"
                    }}
                    className="breadcrumb-hover-link"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      
      {/* Dynamic hover styling inline rule */}
      <style jsx global>{`
        .breadcrumb-hover-link:hover {
          color: var(--gold) !important;
        }
      `}</style>
    </nav>
  );
}
