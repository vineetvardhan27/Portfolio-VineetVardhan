import React from "react";

export function RootJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        // www is the canonical domain — must match metadataBase in layout.tsx
        "@id": "https://www.vineetvardhan.dev/#person",
        name: "Vineet Vardhan",
        url: "https://www.vineetvardhan.dev",
        image: "https://www.vineetvardhan.dev/avatar.png",
        jobTitle: "Freelance Developer & AI Solutions",
        description:
          "Freelance developer building modern websites, custom booking systems, SaaS products, and AI-powered solutions for businesses worldwide.",
        worksFor: {
          "@type": "Organization",
          name: "Freelance / Self-Employed",
        },
        sameAs: [
          "https://github.com/vineetvardhan27",
          "https://www.linkedin.com/in/vineetvardhan/",
        ],
        knowsAbout: [
          "Web Development",
          "Next.js",
          "React",
          "TypeScript",
          "Property Management Systems (PMS)",
          "Software Architecture",
          "Sanity CMS",
          "Supabase",
          "PostgreSQL",
          "REST APIs",
          "Tailwind CSS",
          "Search Engine Optimization (SEO)",
          "AI Search Optimization (AIO)",
          "AI Integrations",
          "SaaS Development",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "vineetvardhanwork@gmail.com",
          telephone: "+919798504212",
          contactType: "customer service",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.vineetvardhan.dev/#website",
        url: "https://www.vineetvardhan.dev",
        name: "Vineet Vardhan | Freelance Developer & AI Solutions",
        description:
          "Need a website, SaaS product, or AI solution? Vineet Vardhan builds modern websites, custom booking systems, and business software for companies worldwide.",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://www.vineetvardhan.dev/#person",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.vineetvardhan.dev/#service",
        name: "Vineet Vardhan — Freelance Software & Web Development",
        url: "https://www.vineetvardhan.dev",
        image: "https://www.vineetvardhan.dev/avatar.png",
        telephone: "+919798504212",
        email: "vineetvardhanwork@gmail.com",
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Worldwide",
        },
        founder: {
          "@id": "https://www.vineetvardhan.dev/#person",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software & Web Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Business Websites & Landing Pages",
                description:
                  "Fast, modern business websites and landing pages built to convert visitors into clients.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Hospitality & Direct Booking Systems",
                description:
                  "Zero-commission hotel websites with live room availability, direct enquiry flows, and instant WhatsApp booking.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom PMS & SaaS Products",
                description:
                  "Cloud property management systems, room availability matrices, POS food billing, and automated invoicing.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Integrations & Automation",
                description:
                  "Practical AI-powered features and automation workflows integrated into existing business websites and web applications.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Web Applications & Dashboards",
                description:
                  "Full-stack web applications with secure authentication, relational database modeling, and third-party integrations.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ProjectJsonLd({
  name,
  tagline,
  summary,
  slug,
  image,
  technologies,
  year = "2026",
}: {
  name: string;
  tagline: string;
  summary: string;
  slug: string;
  image: string;
  technologies: string[];
  year?: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    // www canonical domain used throughout
    "@id": `https://www.vineetvardhan.dev/work/${slug}#case-study`,
    name: `${name} — Project by Vineet Vardhan`,
    headline: tagline,
    description: summary,
    url: `https://www.vineetvardhan.dev/work/${slug}`,
    image: `https://www.vineetvardhan.dev${image}`,
    dateCreated: year,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Vineet Vardhan",
      url: "https://www.vineetvardhan.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Vineet Vardhan",
      url: "https://www.vineetvardhan.dev",
    },
    keywords: technologies.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
