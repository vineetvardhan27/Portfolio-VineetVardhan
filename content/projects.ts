export interface Project {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  liveUrl?: string;
  image: string;
  metrics?: { label: string; value: string }[];
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
  features: string[];
  screenshots?: { caption: string; url: string }[];
  client?: string;
  year?: string;
  role?: string;
}

export const projects: Project[] = [
  {
    slug: "hotel-greenery-view",
    name: "Hotel Greenery View",
    category: "Hospitality & Direct Booking",
    year: "2026",
    tagline: "Bespoke Next.js Website with Sanity CMS, SEO & AI Search Optimization",
    summary:
      "Built the entire UI in Next.js with Sanity CMS, SEO-friendly architecture, and AI-friendly knowledge structure for high ranking in LLMs and direct room bookings.",
    liveUrl: "https://www.hotelgreeneryview.com/",
    image: "/images/hotel-greenery.png",
    metrics: [
      { label: "Direct Inquiries", value: "+65%" },
      { label: "AI Search Visibility", value: "Top LLM Rank" },
      { label: "Page Load Speed", value: "< 0.8s" },
    ],
    challenge:
      "Hotel Greenery View relied heavily on high-commission OTA platforms and needed an ultra-fast, modern website. They required effortless content management for seasonal rates and rooms, plus cutting-edge search discoverability across both Google and modern AI search engines (ChatGPT, Perplexity, Gemini).",
    solution:
      "Built the entire user interface from scratch in Next.js 14 paired with Sanity CMS for intuitive room and rate management. Engineered semantic structured data, JSON-LD schemas, and AI-optimized content models alongside direct WhatsApp and structured inquiry flows.",
    result:
      "Achieved top discoverability in both Google and AI search engines, resulting in a 65%+ increase in direct booking inquiries and saving substantial third-party OTA commissions.",
    technologies: [
      "Next.js 14",
      "Sanity CMS",
      "SEO & AI Search (AIO)",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    features: [
      "Built entire custom UI from scratch in Next.js 14",
      "Sanity CMS integration for real-time room, rate, and amenity updates",
      "SEO-friendly architecture with rich metadata and structured schemas",
      "AI-friendly website structure optimized for high ranking in LLMs",
      "Zero-commission direct inquiry & instant WhatsApp booking engine",
    ],
  },
  {
    slug: "grove-pms",
    name: "Grove PMS",
    category: "Custom Hospitality ERP · PMS",
    year: "2026",
    tagline: "Custom Property Management System Tailored for Hotel Operations",
    summary:
      "Built a custom Property Management System (PMS) in Next.js & Supabase tailored around actual hotel staff workflows—handling room booking, inventory, billing, food orders, and operational dashboards from one unified platform.",
    liveUrl: "https://grovepms.vercel.app/",
    image: "/images/grove-pms.png",
    metrics: [
      { label: "Time Saved", value: "4.5 hrs daily" },
      { label: "Operations", value: "100% Unified" },
      { label: "Billing Accuracy", value: "99.9%" },
    ],
    challenge:
      "Off-the-shelf PMS products are rigid, expensive, and force hotel staff to conform to unnatural workflows. The hotel needed a custom-built solution modeled around their exact operational steps—from room check-in and housekeeping status to restaurant food billing and supply inventory.",
    solution:
      "Architected and engineered Grove PMS from the ground up using Next.js 14 and Supabase. Designed the entire system around the hotel's actual workflow: interactive room availability grids, POS food & beverage billing, automated invoice generation, inventory tracking, and operational staff dashboards.",
    result:
      "Replaced disjointed registers and spreadsheets with a single intuitive cloud hub, saving over 4.5 hours daily for hotel staff and eliminating billing errors across shifts.",
    technologies: [
      "Next.js 14 (App Router)",
      "Supabase (PostgreSQL & RLS)",
      "TypeScript",
      "Tailwind CSS",
      "Food Billing & POS",
      "Zod",
    ],
    features: [
      "Room and reservation lifecycle management with visual status grids",
      "Integrated food & restaurant billing (POS) with room charge transfers",
      "Real-time inventory and amenity stock management",
      "Automated tax-compliant billing and invoice generation",
      "Operational dashboards designed for daily front-desk and manager use",
      "Streamlined guest check-in and checkout workflows",
      "Tailored to the hotel's actual operational flow rather than off-the-shelf software",
    ],
  },
  {
    slug: "anugra-travels",
    name: "Anugra Travels",
    category: "Travel & Tour Platform",
    year: "2026",
    tagline: "SEO-Friendly Travel Platform with Sanity CMS & EmailOctopus",
    summary:
      "Built the entire travel website with SEO-friendly architecture, Sanity CMS dynamic package management, and EmailOctopus newsletter lead capture integration.",
    liveUrl: "https://www.anugratravels.com/",
    image: "/images/anugra-travels.png",
    metrics: [
      { label: "SEO Visibility", value: "Top Tier" },
      { label: "Newsletter Growth", value: "EmailOctopus" },
      { label: "Content Control", value: "Sanity CMS" },
    ],
    challenge:
      "Anugra Travels needed a fast, SEO-dominant website where their team could easily publish and update custom tour packages, while building a loyal audience through automated newsletter capture.",
    solution:
      "Developed the entire web platform with strict technical SEO foundations, integrated Sanity CMS for effortless tour and destination management, and embedded EmailOctopus newsletter capture for automated subscriber nurture flows.",
    result:
      "Elevated organic search traffic for travel packages, streamlined client content management via Sanity, and accelerated email subscriber acquisition via EmailOctopus.",
    technologies: [
      "Next.js · HTML5",
      "Sanity CMS",
      "EmailOctopus API",
      "Technical SEO",
      "Tailwind CSS",
      "JavaScript",
    ],
    features: [
      "Built entire website with SEO-friendly structure & semantic markup",
      "Sanity CMS integration for dynamic tour packages, blogs, and destinations",
      "EmailOctopus newsletter subscription service for automated lead capture",
      "Interactive destination showcase and responsive tour catalog",
      "Fast page load performance with mobile-first optimization",
    ],
  },
];
