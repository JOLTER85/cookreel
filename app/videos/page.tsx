import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Play, Film, ArrowUpRight, Clock, Flame } from 'lucide-react';
import {
  COOKREEL_RECIPES,
  SITE_ORIGIN,
  HERO_FEATURED_VIDEO_URL,
} from '@/lib/cookreel-data';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { RecipeCard } from '@/components/RecipeCard';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'Short-Form Video Recipes & Step-by-Step Cooking Clips | CookReel TV',
  description:
    'Watch step-by-step short-form cooking videos from CookReel (formerly tv.cookreel.com)—featuring 15-minute crispy cast-iron salmon, garlic butter ribeye steak, air fryer chicken, and more.',
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
      'Official video recipe hub for CookReel.com and legacy tv.cookreel.com links.',
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

        {/* Hero Banner for /videos (Destination for tv.cookreel.com 301 Redirect) */}
        <div className="rounded-2xl bg-slate-950 text-white p-7 sm:p-10 mb-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Film className="w-3.5 h-3.5" />
              <span>CookReel Video Showcase · {videoRecipes.length} Unique Recipe Video Clips + 1 Kitchen Overview Reel</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Short-Form Step-by-Step Video Recipes
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Explore our {videoRecipes.length} dedicated 12-second visual technique clips demonstrating pan searing, butter basting, pasta emulsification, and cupcake piping—each paired with a kitchen-tested recipe guide, metric &amp; US weights, 1:1 ingredient substitutions, and USDA safe cooking temperatures.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/recipes/15-minute-crispy-cast-iron-salmon-lemon-caper"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Featured Crispy Salmon Clip</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              >
                <span>Browse All {COOKREEL_RECIPES.length} Recipe Guides</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 aspect-[16/10]">
              <video
                src={HERO_FEATURED_VIDEO_URL}
                poster="/images/hero_cookreel_studio_1795527112508.jpg"
                controls
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Transparent Visual Media & Recipe Testing Disclosure */}
        <div className="mb-10 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-slate-700 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <strong className="text-amber-950 font-bold">Editorial Testing &amp; Visual Media Disclosure: </strong>
            All {COOKREEL_RECIPES.length} recipes on CookReel feature kitchen-tested ingredient weights, cooking times, and USDA-verified internal temperatures developed by Marcus Vance and Elena Rostova. We only embed video players on the {videoRecipes.length} recipes with an exact matching visual technique clip; our remaining {illustratedRecipes.length} recipes are clearly labeled as Step-by-Step Illustrated Guides. Visual media across the site includes AI-assisted culinary illustrations created to demonstrate plating and texture.
          </div>
          <Link
            href="/about#editorial-testing-disclosure"
            className="text-amber-900 font-bold underline shrink-0 hover:text-amber-700"
          >
            Read Testing Standards →
          </Link>
        </div>

        {/* Dedicated Video Player Cards Grid */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                Visual Technique Clips ({videoRecipes.length} Unique Recipe Videos)
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Watch &amp; Cook Step-by-Step Video Guides
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoRecipes.map((recipe) => (
              <article
                key={recipe.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-slate-950">
                  <video
                    src={recipe.videoUrl}
                    poster={recipe.image}
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1.5">
                      <span className="text-amber-800 font-bold">
                        {recipe.categoryLabelEn}
                      </span>
                      <span>Clip · {recipe.videoDuration || '0:12'}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 leading-snug">
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        className="hover:text-amber-800 transition-colors"
                      >
                        {recipe.titleEn}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {recipe.subtitleEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 font-mono text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        {recipe.prepMinutes + recipe.cookMinutes}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-700" />
                        {recipe.calories} kcal
                      </span>
                    </div>
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-bold transition-colors"
                    >
                      <span>Full Recipe</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* All Remaining Illustrated Culinary Guides */}
        <section className="pt-10 border-t border-slate-200">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
              Complete Recipe Library
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              More Step-by-Step Illustrated Recipes &amp; Guides
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COOKREEL_RECIPES.filter((r) => !r.videoUrl)
              .slice(0, 6)
              .map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
