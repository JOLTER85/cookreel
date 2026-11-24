import type { MetadataRoute } from 'next';
import { readDatabase } from '@/lib/server-db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://cookreel.com';
  const db = readDatabase();

  const recipeUrls: MetadataRoute.Sitemap = db.recipes.map((recipe) => ({
    url: `${baseUrl}/?recipe=${encodeURIComponent(recipe.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...recipeUrls,
  ];
}
