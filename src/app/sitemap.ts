import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quiz-mint-ai.peasify.app";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // Exam pages - these would be dynamic based on your exams config
  const examRoutes = [
    "saac03",
    "sapc02",
    "google-ads-search-certification",
    "gaiq",
    "pc4h342411",
    "1z0829",
    "cka",
    "ckad",
    "az-305",
  ];

  const examPages = examRoutes.map((exam) => ({
    url: `${baseUrl}/dashboard/exam/${exam}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...examPages];
}
