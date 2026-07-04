import type { Metadata } from "next";
import { Marcellus, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Tea Free Sampling | AURA PREMIUM TEA",
  description: "Reserve a complimentary sample of Aura Premium Tea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${cormorant.variable} ${jost.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
