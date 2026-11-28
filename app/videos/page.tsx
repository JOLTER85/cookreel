import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  COOKREEL_RECIPES,
  SITE_ORIGIN,
} from '@/lib/cookreel-data';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { VideosHubClient } from '@/components/VideosHubClient';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'Short-Form Video Recipes & Step-by-Step Cooking Clips | CookReel TV',
  description:
    'Watch step-by-step short-form cooking videos from CookReel—featuring 15-minute crispy cast-iron salmon, garlic butter ribeye steak, air fryer chicken, and more.',
  alternates: {
    canonical: 'https://cookreel.com/videos',
  },
  openGraph: {
    title: 'Short-Form Video Recipes & Step-by-Step Cooking Clips | CookReel TV',
    description:
      'Watch step-by-step short-form cooking videos from CookReel—featuring 15-minute crispy cast-iron salmon, garlic butter ribeye steak, air fryer chicken, and more.',
    url: `${SITE_ORIGIN}/videos`,
    type: 'website',
    siteName: 'CookReel',
    images: [
      {
        url: ogImg,
        width: 1200,
        height: 630,
        alt: 'CookReel Video Recipes Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Short-Form Video Recipes & Step-by-Step Cooking Clips | CookReel TV',
    description:
      'Watch step-by-step short-form cooking videos and full recipe guides on CookReel.',
    images: [ogImg],
  },
};

export default function VideosHubPage() {
  const videoRecipes = COOKREEL_RECIPES.filter((r) => Boolean(r.videoUrl));
  const illustratedRecipes = COOKREEL_RECIPES.filter((r) => !r.videoUrl);

  const videoCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_ORIGIN}/videos#collection`,
    name: 'CookReel Short-Form Video Recipes & Culinary Clips',
    description:
      'Official video recipe hub for CookReel (cookreel.com/videos).',
    url: `${SITE_ORIGIN}/videos`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: videoRecipes.map((recipe, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE_ORIGIN}/recipes/${recipe.slug}`,
        item: {
          '@type': 'VideoObject',
          name: `${recipe.titleEn} — Step-by-Step Video Clip`,
          description: recipe.subtitleEn,
          thumbnailUrl: [`${SITE_ORIGIN}${recipe.image}`],
          contentUrl: `${SITE_ORIGIN}${recipe.videoUrl}`,
          uploadDate: '2026-11-15T08:00:00Z',
          duration: 'PT12S',
        },
      })),
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoCollectionSchema),
        }}
      />
      <SiteHeader activePath="/videos" />

      <main className="flex-1 mx-auto max-w-[1440px] w-full px-4 sm:px-8 py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 mb-6"
        >
          <Link href="/" className="hover:text-amber-800 font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">
            Video Recipes Hub (CookReel TV)
          </span>
        </nav>

        <VideosHubClient
          videoRecipes={videoRecipes}
          illustratedRecipes={illustratedRecipes}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
