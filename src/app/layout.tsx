import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Geist } from "next/font/google";
import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  combineSchemas,
} from "@/lib/jsonld";
import "./globals.css";

const FloatingContactButton = dynamic(
  () => import("@/components/ui").then((mod) => ({ default: mod.FloatingContactButton }))
);
const CookieBanner = dynamic(
  () => import("@/components/ui").then((mod) => ({ default: mod.CookieBanner }))
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HYSCO | Hyper електросамокати - найпотужніші в Україні",
    template: "%s | HYSCO",
  },
  description:
    "Hyper електросамокати від $1600 до $4300. Потужність до 15000W, швидкість до 120 км/год. Teverun, Inmotion, Nami, Kaabo, Mars. Доставка по Україні.",
  keywords: [
    "електросамокат",
    "hyper самокат",
    "потужний електросамокат",
    "Teverun",
    "Inmotion RS",
    "Nami Burn-E",
    "Kaabo Wolf King",
    "купити електросамокат Україна",
    "HYSCO",
  ],
  authors: [{ name: "HYSCO" }],
  creator: "HYSCO",
  publisher: "HYSCO",
  metadataBase: new URL("https://hysco.com.ua"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://hysco.com.ua",
    siteName: "HYSCO",
    title: "HYSCO | Hyper електросамокати - найпотужніші в Україні",
    description:
      "Hyper електросамокати від $1600 до $4300. Потужність до 15000W, швидкість до 120 км/год.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HYSCO - Hyper електросамокати",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HYSCO | Hyper електросамокати",
    description: "Потужність до 15000W, швидкість до 120 км/год.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const globalJsonLd = combineSchemas(
  generateOrganizationSchema(),
  generateWebSiteSchema(),
  generateLocalBusinessSchema()
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <a href="#main-content" className="skip-to-content">
          Перейти до основного вмісту
        </a>
        <PageWrapper>{children}</PageWrapper>
        <FloatingContactButton />
        <CookieBanner />
      </body>
    </html>
  );
}
