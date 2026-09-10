import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Alex_Brush, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/data/weddingData";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const scriptFont = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const handwritingFont = Alex_Brush({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://weddingcard.vercel.app")
  ),
  title: weddingData.meta.title,
  description: weddingData.meta.description,
  openGraph: {
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    siteName: "Walimatulurus Umar & Nafisya",
    images: [
      {
        url: "/images/page_background.jpg",
        alt: "Walimatulurus Umar & Nafisya",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: weddingData.meta.title,
    description: weddingData.meta.description,
    images: ["/images/page_background.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: weddingData.meta.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ms"
      className={`${serifFont.variable} ${scriptFont.variable} ${handwritingFont.variable} ${sansFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#fbf9f5] text-[#2c2217] selection:bg-[#c5a059]/20 selection:text-[#5e491c] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
