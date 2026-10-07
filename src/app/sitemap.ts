import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${LAST_UPDATED}T00:00:00Z`);
  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/login`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE.url}/register`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
