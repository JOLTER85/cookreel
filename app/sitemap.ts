import type { MetadataRoute } from 'next';
import {
  SITE_ARCHITECTURE,
  COOKREEL_RECIPES,
  SITE_ORIGIN,
  HERO_FEATURED_VIDEO_URL,
} from '@/lib/cookreel-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const videoRecipes = COOKREEL_RECIPES.filter((r) => Boolean(r.videoUrl));
  const heroThumb = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;
  const featuredSalmonRecipe = COOKREEL_RECIPES[0];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_ORIGIN,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'daily',
      priority: 1.0,
      images: [heroThumb],
      videos: [
        {
          title: `${featuredSalmonRecipe.titleEn} — Step-by-Step Visual Clip`,
          description: featuredSalmonRecipe.subtitleEn,
          thumbnail_loc: `${SITE_ORIGIN}${featuredSalmonRecipe.image}`,
          content_loc: `${SITE_ORIGIN}${featuredSalmonRecipe.videoUrl}`,
          duration: 12,
          publication_date: '2026-11-15T08:00:00Z',
          family_friendly: 'yes',
        },
      ],
    },
    {
      url: `${SITE_ORIGIN}/videos`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [
        heroThumb,
        ...videoRecipes.map((r) => `${SITE_ORIGIN}${r.image}`),
      ],
      videos: [
        {
          title: 'CookReel Studio — Step-by-Step Visual Cooking Technique Reel',
          description:
            'Short-form 12-second culinary technique clips demonstrating cast-iron pan searing, butter basting, pasta emulsification, and cupcake piping on CookReel.',
          thumbnail_loc: heroThumb,
          content_loc: `${SITE_ORIGIN}${HERO_FEATURED_VIDEO_URL}`,
          duration: 12,
          publication_date: '2026-11-15T08:00:00Z',
          family_friendly: 'yes',
        },
        ...videoRecipes.map((recipe) => ({
          title: `${recipe.titleEn} — Step-by-Step Visual Clip`,
          description: recipe.subtitleEn,
          thumbnail_loc: `${SITE_ORIGIN}${recipe.image}`,
          content_loc: `${SITE_ORIGIN}${recipe.videoUrl}`,
          duration: 12,
          publication_date: '2026-11-15T08:00:00Z',
          family_friendly: 'yes' as const,
        })),
      ],
    },
    {
      url: `${SITE_ORIGIN}/substitutions`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_ORIGIN}/qa`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_ORIGIN}/about`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_ORIGIN}/contact`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_ORIGIN}/privacy`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_ORIGIN}/terms`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const categoryUrls: MetadataRoute.Sitemap = SITE_ARCHITECTURE.map((cat) => ({
    url: `${SITE_ORIGIN}/category/${cat.slug}`,
    lastModified: new Date('2026-11-28T08:00:00Z'),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const recipeUrls: MetadataRoute.Sitemap = COOKREEL_RECIPES.map((recipe) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${SITE_ORIGIN}/recipes/${encodeURIComponent(recipe.slug)}`,
      lastModified: new Date('2026-11-28T08:00:00Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        `${SITE_ORIGIN}${recipe.image}`,
        ...(recipe.stepGalleryImages || []).map((img) => `${SITE_ORIGIN}${img}`),
      ],
    };

    if (recipe.videoUrl) {
      entry.videos = [
        {
          title: `${recipe.titleEn} — Step-by-Step Visual Clip`,
          description: recipe.subtitleEn,
          thumbnail_loc: `${SITE_ORIGIN}${recipe.image}`,
          content_loc: `${SITE_ORIGIN}${recipe.videoUrl}`,
          duration: 12,
          publication_date: '2026-11-15T08:00:00Z',
          family_friendly: 'yes',
        },
      ];
    }

    return entry;
  });

  return [...staticPages, ...categoryUrls, ...recipeUrls];
}
