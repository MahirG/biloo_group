import type { MetadataRoute } from "next";

import { insights } from "@/data/insights";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-02T00:00:00.000Z");

  const corePages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/biloo"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.99,
    },
    {
      url: absoluteUrl("/apps"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.98,
    },
    {
      url: absoluteUrl("/erp"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/mezgeb"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/iq-game"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/solutions"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/insights"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: absoluteUrl(`/solutions/${solution.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: absoluteUrl(`/insights/${insight.slug}`),
    lastModified: new Date(`${insight.publishedAt}T00:00:00.000Z`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...corePages, ...projectPages, ...solutionPages, ...insightPages];
}
