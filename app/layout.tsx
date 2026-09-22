import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/lenis-provider";
import { ThemeProvider } from "@/lib/theme-provider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["slnt"],
});

export const metadata: Metadata = {
  title: "Vineet Vardhan — Websites, Booking Systems & Business Software",
  description:
    "Bespoke, high-converting websites, hospitality booking engines, and custom SaaS software engineered with Next.js 14 and modern enterprise performance standards.",
  keywords: [
    "Freelance Web Developer",
    "Product Engineer",
    "Next.js Developer",
    "Hotel Website Development",
    "Booking Systems",
    "Property Management System",
    "Custom Business Software",
    "Hospitality Tech",
  ],
  authors: [{ name: "Vineet Vardhan" }],
  creator: "Vineet Vardhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vineetvardhan.dev",
    title: "Vineet Vardhan — Websites, Booking Systems & Business Software",
    description:
      "Bespoke websites and custom enterprise software that turn visitors into customers and automate business workflows.",
    siteName: "Vineet Vardhan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vineet Vardhan — Websites, Booking Systems & Business Software",
    description:
      "Bespoke websites and custom enterprise software that turn visitors into customers and automate business workflows.",
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
