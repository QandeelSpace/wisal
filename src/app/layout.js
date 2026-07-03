/* C:\Users\ASUS\.gemini\antigravity\scratch\wisal-website\src\app\layout.js */
import { Inter, Cormorant_Garamond, Cairo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "وصال | WISAL - Premier Event Coordination & Concierge Jordan",
  description:
    "Jordan's premier event coordination company. From joyful celebrations to moments of remembrance, WISAL accompanies families, businesses, and communities with elegance, compassion, and professionalism.",
  keywords:
    "Wisal, event planning Jordan, wedding planner Amman, Islamic marriage Nikah, Islamic Janazah funeral Amman, corporate events Jordan, memorial services Jordan, bilingual event coordinator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${cairo.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
