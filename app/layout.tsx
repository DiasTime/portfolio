import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { identity } from "@/lib/content";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${identity.name} — Full-Stack Engineer · AI Builder · Automation Architect`,
  description:
    "I engineer systems that run businesses: AI agents, business automation, SaaS products, lead-generation infrastructure, and commercial real estate technology — designed, built, and shipped end to end.",
  keywords: [
    "full-stack engineer",
    "AI developer",
    "automation architect",
    "product builder",
    "AI agents",
    "business automation",
    "SaaS development",
    "lead generation systems",
    "commercial real estate technology",
  ],
  openGraph: {
    title: `${identity.name} — I engineer systems that run businesses`,
    description:
      "AI agents, business automation, and software that generates revenue and scales operations. One engineer, end to end.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
