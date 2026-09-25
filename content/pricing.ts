export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  price: {
    IN: string;
    INTL: string;
  };
  timeline: string;
  deliverables: string[];
  bestFor: string;
  ctaText: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "website",
    name: "Business Website",
    badge: "Most Popular",
    description:
      "A fast, modern, and mobile-first website tailored to convert visitors into inquiries and sales.",
    price: {
      IN: "₹25,000 – ₹45,000",
      INTL: "$600 – $1,200",
    },
    timeline: "1–2 weeks",
    deliverables: [
      "Custom responsive design (No generic templates)",
      "Next.js 14 high-performance architecture",
      "Direct WhatsApp & Contact Enquiry integration",
      "On-page SEO & Google Search Console setup",
      "Mobile speed optimization (90+ Lighthouse)",
      "2 weeks of dedicated post-launch support",
    ],
    bestFor: "Hotels, resorts, professional services, local businesses & consultants",
    ctaText: "Start a Website Project",
  },
  {
    id: "webapp",
    name: "Custom Web Application",
    badge: "High Impact",
    description:
      "Interactive digital tools, booking engines, client portals, and SaaS MVPs with database backends.",
    price: {
      IN: "₹55,000 – ₹1,10,000",
      INTL: "$1,500 – $3,000",
    },
    timeline: "3–4 weeks",
    deliverables: [
      "User authentication & role permissions",
      "Relational database modeling (Supabase & Postgres)",
      "Custom business workflows & dashboard UI",
      "Payment gateway integration (Stripe · Razorpay)",
      "Automated email notifications & alerts",
      "30 days of post-launch maintenance & monitoring",
    ],
    bestFor: "Startups, booking systems, customer portals & internal business tools",
    ctaText: "Build a Custom App",
  },
  {
    id: "enterprise-pms",
    name: "Full Custom PMS · ERP",
    description:
      "End-to-end multi-tenant business systems engineered to replace fragmented spreadsheets and legacy software.",
    price: {
      IN: "₹1,20,000+",
      INTL: "$3,500+",
    },
    timeline: "5–8 weeks",
    deliverables: [
      "Multi-tenant tenant isolation & multi-branch support",
      "Real-time reservation & operational matrices",
      "POS billing, invoicing, and tax calculation",
      "Inventory tracking, audit logs & staff management",
      "Deep analytics, revenue metrics & custom exports",
      "Priority SLA, dedicated training & ongoing SLA",
    ],
    bestFor: "Hotel chains, property managers, logistics & multi-location businesses",
    ctaText: "Discuss Enterprise Build",
  },
];
