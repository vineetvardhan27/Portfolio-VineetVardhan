import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/lenis-provider";
import { ThemeProvider } from "@/lib/theme-provider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RootJsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFBFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0C0E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // www is the canonical hostname — matches the 301 redirect target served by Vercel
  metadataBase: new URL("https://www.vineetvardhan.dev"),
  title: {
    default: "Vineet Vardhan | Freelance Developer & AI Solutions",
    template: "%s | Vineet Vardhan",
  },
  description:
    "Need a website, SaaS product, or AI solution? I'm Vineet Vardhan, a freelance developer building modern websites, custom booking systems, and business software for companies worldwide.",
  keywords: [
    "Vineet Vardhan",
    "Freelance Web Developer",
    "Freelance Developer India",
    "Full Stack Developer",
    "Custom Software Developer",
    "Next.js Developer",
    "React Developer",
    "Custom PMS Software",
    "Hotel Booking System",
    "Hotel Website Development",
    "SaaS Developer",
    "Business Software Developer",
    "AI Solutions Developer",
    "Hospitality Tech",
    "Website Development",
    "Web Application Development",
  ],
  authors: [{ name: "Vineet Vardhan", url: "https://www.vineetvardhan.dev" }],
  creator: "Vineet Vardhan",
  publisher: "Vineet Vardhan",
  alternates: {
    // Explicit canonical always uses the www domain
    canonical: "https://www.vineetvardhan.dev",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.vineetvardhan.dev",
    siteName: "Vineet Vardhan",
    title: "Vineet Vardhan | Freelance Developer & AI Solutions",
    description:
      "Need a website, SaaS product, or AI solution? I'm Vineet Vardhan, a freelance developer building modern websites, custom booking systems, and business software for companies worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vineet Vardhan | Freelance Developer & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vineet Vardhan | Freelance Developer & AI Solutions",
    description:
      "Need a website, SaaS product, or AI solution? I'm Vineet Vardhan, a freelance developer building modern websites, custom booking systems, and business software for companies worldwide.",
    images: ["/og-image.png"],
    creator: "@vineetvardhan",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <head>
        <RootJsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-bg text-text-primary min-h-screen flex flex-col selection:bg-accent/20 selection:text-accent antialiased">
        <ThemeProvider>
          <LenisProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
