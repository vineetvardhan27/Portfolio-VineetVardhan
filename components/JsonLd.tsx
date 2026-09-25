import React from "react";

export function RootJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://vineetvardhan.dev/#person",
        name: "Vineet Vardhan",
        url: "https://vineetvardhan.dev",
        image: "https://vineetvardhan.dev/avatar.png",
        jobTitle: "Full-Stack Developer & Software Engineer",
        description:
          "Full-stack developer and software engineer specializing in high-performance Next.js websites, custom hospitality booking systems, PMS software, and business web applications.",
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
          "AI Search (AIO)",
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
        "@id": "https://vineetvardhan.dev/#website",
        url: "https://vineetvardhan.dev",
        name: "Vineet Vardhan — Full-Stack Developer & Software Engineer",
        description:
          "Bespoke websites, high-converting booking systems, and custom SaaS software engineered with Next.js 14 and enterprise performance standards.",
        inLanguage: "en-US",
        publisher: {
          "@id": "https://vineetvardhan.dev/#person",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://vineetvardhan.dev/#service",
        name: "Vineet Vardhan — Freelance Software & Web Development",
        url: "https://vineetvardhan.dev",
        image: "https://vineetvardhan.dev/avatar.png",
        telephone: "+919798504212",
        email: "vineetvardhanwork@gmail.com",
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          addressCountry: "IN",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Worldwide",
        },
        founder: {
          "@id": "https://vineetvardhan.dev/#person",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software & Web Development Services",
          itemListElement: [
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
                name: "Custom PMS & Business SaaS",
                description:
                  "Cloud property management systems, room availability matrices, POS food billing, and automated invoicing.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "High-Converting Next.js Websites",
                description:
                  "Production-grade Next.js 14 websites with sub-second speeds, top Lighthouse scores, and search optimization.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Web Applications & Portals",
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
    "@id": `https://vineetvardhan.dev/work/${slug}#case-study`,
    name: `${name} Case Study`,
    headline: tagline,
    description: summary,
    url: `https://vineetvardhan.dev/work/${slug}`,
    image: `https://vineetvardhan.dev${image}`,
    dateCreated: year,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Vineet Vardhan",
      url: "https://vineetvardhan.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Vineet Vardhan",
      url: "https://vineetvardhan.dev",
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
