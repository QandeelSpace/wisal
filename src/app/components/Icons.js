"use client";

import React from "react";

// Wedding Icon: Elegant interlocking rings
export function WeddingIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M12 9.5a2.5 2.5 0 0 1 0 5" opacity="0.4" strokeWidth="2" />
    </svg>
  );
}

// Family Icon: Stylized sparkles/stars for joy
export function FamilyIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" opacity="0.6" />
      <path d="M12 7c0 2.5 1.5 4.5 4.5 4.5-3 0-4.5 2-4.5 4.5 0-2.5-1.5-4.5-4.5-4.5 3 0 4.5-2 4.5-4.5z" fill={color} />
      <path d="M20 5c0 1 .5 1.5 1.5 1.5-1 0-1.5.5-1.5 1.5 0-1-.5-1.5-1.5-1.5 1 0 1.5-.5 1.5-1.5z" fill={color} opacity="0.8" />
    </svg>
  );
}

// Corporate Icon: Modern luxury pillars
export function CorporateIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18M3 10h18M6 10v11M10 10v11M14 10v11M18 10v11" />
      <path d="M12 2L3 7h18L12 2z" fill={color} opacity="0.15" />
      <path d="M12 2L3 7h18L12 2z" />
    </svg>
  );
}

// Memorial Icon: Stylized dove in flight
export function MemorialIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 3s-5.5 3-8 5.5S9 15.5 9 15.5l-3-1.5L2 16l4 2 2 4 2-4.5-1.5-3s7-1.5 9.5-4S22 3 22 3z" />
      <path d="M9 15.5c-.5.5-1.5 1-2.5 1s-2-.5-2.5-1.5" opacity="0.6" />
    </svg>
  );
}

// Islamic Icon: Sleek crescent moon and star
export function IslamicIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9z" fill={color} opacity="0.15" />
      <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9z" />
      <path d="M18.5 7.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z" fill={color} stroke="none" />
    </svg>
  );
}

// VIP Icon: Stylized fleur-de-lis / crown
export function VIPIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22v-8m0 0c-1.5 0-4.5.5-5.5 3.5S5 21 5 21s.5-3 2.5-4.5c1.5-1.1 3-1 4-1M12 14c1.5 0 4.5.5 5.5 3.5S19 21 19 21s-.5-3-2.5-4.5c-1.5-1.1-3-1-4-1" />
      <path d="M12 2c1 2 2.5 4.5 2.5 6.5S13.5 12 12 12s-2.5-1.5-2.5-3.5S11 4 12 2z" fill={color} opacity="0.15" />
      <path d="M12 2c1 2 2.5 4.5 2.5 6.5S13.5 12 12 12s-2.5-1.5-2.5-3.5S11 4 12 2z" />
      <path d="M8 13.5c1 0 3 .5 4 .5s3-.5 4-.5" />
    </svg>
  );
}

// Urgent Icon: Elegant shield alert
export function UrgentIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={color} opacity="0.1" />
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4M12 16h.01" strokeWidth="2" />
    </svg>
  );
}

// Planning Icon: Clipboard checklist
export function PlanningIcon({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="8" y="2" width="8" height="4" rx="1" fill={color} opacity="0.15" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h6" opacity="0.7" />
    </svg>
  );
}

// Wrapper component to get correct icon dynamically
export function ServiceIcon({ slug, size = 24, color = "var(--gold)", ...props }) {
  switch (slug) {
    case "weddings":
      return <WeddingIcon size={size} color={color} {...props} />;
    case "family":
      return <FamilyIcon size={size} color={color} {...props} />;
    case "corporate":
      return <CorporateIcon size={size} color={color} {...props} />;
    case "memorials":
    case "memorial":
      return <MemorialIcon size={size} color={color} {...props} />;
    case "islamic":
      return <IslamicIcon size={size} color={color} {...props} />;
    case "vip":
      return <VIPIcon size={size} color={color} {...props} />;
    case "urgent":
      return <UrgentIcon size={size} color={color} {...props} />;
    case "planning":
      return <PlanningIcon size={size} color={color} {...props} />;
    default:
      return null;
  }
}
