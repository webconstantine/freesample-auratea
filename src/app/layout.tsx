import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AURA Tea – Pakistan's Favorite | 100% Pure | Premium Tea",
  description: "Premium unblended tea crafted for pure flavor and natural richness. Antioxidant packed and additive free, experience luxury in every sip",
  icons: {
    icon: "/DP-512x512.webp",
  },
  other: {
    "theme-color": "#f5f1eb",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
