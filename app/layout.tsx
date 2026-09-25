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
  metadataBase: new URL("https://vineetvardhan.dev"),
  title: {
    default: "Vineet Vardhan — Full-Stack Developer & Software Engineer",
    template: "%s | Vineet Vardhan",
  },
  description:
    "Freelance full-stack developer and software engineer specializing in high-performance Next.js websites, custom hospitality booking systems, PMS software, and tailored business web applications.",
  keywords: [
    "Vineet Vardhan",
    "Freelance Web Developer",
    "Full Stack Developer",
    "Software Engineer India",
    "Custom Software Developer",
    "Next.js Developer",
    "React Developer",
    "Custom PMS Software",
    "Hotel Booking System",
    "Hotel Website Development",
    "SaaS Developer",
    "Business Software Developer",
    "AI Developer",
    "Hospitality Tech",
  ],
  authors: [{ name: "Vineet Vardhan", url: "https://vineetvardhan.dev" }],
  creator: "Vineet Vardhan",
  publisher: "Vineet Vardhan",
  alternates: {
    canonical: "/",
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
    url: "https://vineetvardhan.dev",
    siteName: "Vineet Vardhan Portfolio",
    title: "Vineet Vardhan — Full-Stack Developer & Software Engineer",
    description:
      "Bespoke websites, high-converting booking systems, and custom SaaS software engineered with Next.js 14 and enterprise performance standards.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vineet Vardhan — Full-Stack Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vineet Vardhan — Full-Stack Developer & Software Engineer",
    description:
      "Bespoke websites, hospitality booking engines, and custom business software engineered with Next.js 14.",
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
