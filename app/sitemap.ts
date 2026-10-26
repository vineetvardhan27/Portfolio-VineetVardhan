import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  // www is the canonical domain — must match metadataBase in layout.tsx and robots.ts
  const baseUrl = "https://www.vineetvardhan.dev";

  // Use a static ISO date representing the last significant content update.
  // Using new Date().toISOString() on every build causes Googlebot to see a
  // fresh lastmod on every deploy, which is misleading and wastes crawl budget.
  // Update this date manually whenever the homepage content is meaningfully changed.
  const homepageLastModified = "2026-10-26T00:00:00.000Z";
  const projectsLastModified = "2026-10-26T00:00:00.000Z";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: homepageLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: projectsLastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
