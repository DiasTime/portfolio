import type { Metadata } from "next";
import { Instrument_Serif, Archivo, IBM_Plex_Mono } from "next/font/google";
import { identity } from "@/lib/content";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${identity.name} — Full-Stack & AI Developer | Automation Engineer | Product Builder`,
  description:
    "I build software that pays for itself: AI integrations, business automation, SaaS products, lead generation systems, and high-performance web platforms for businesses that measure results.",
  keywords: [
    "full-stack developer",
    "AI developer",
    "automation engineer",
    "product builder",
    "AI integration",
    "business automation",
    "SaaS development",
    "lead generation systems",
    "commercial real estate technology",
  ],
  openGraph: {
    title: `${identity.name} — Software that pays for itself`,
    description:
      "AI integrations, business automation, and revenue-driving digital products. Designed, engineered, and shipped end to end.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
