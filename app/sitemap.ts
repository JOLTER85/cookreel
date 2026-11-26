import type { MetadataRoute } from 'next';
import { readDatabase, getSafeSiteUrl } from '@/lib/server-db';
import { SITE_ARCHITECTURE, COOKREEL_RECIPES } from '@/lib/cookreel-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSafeSiteUrl();
  const db = readDatabase();
  const recipes =
    Array.isArray(db?.recipes) && db.recipes.length > 0
      ? db.recipes
      : COOKREEL_RECIPES;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/qa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const categoryUrls: MetadataRoute.Sitemap = SITE_ARCHITECTURE.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const recipeUrls: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${encodeURIComponent(recipe.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...categoryUrls, ...recipeUrls];
}
