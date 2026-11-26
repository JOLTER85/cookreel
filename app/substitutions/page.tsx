import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Repeat } from 'lucide-react';
import { SITE_ORIGIN } from '@/lib/cookreel-data';
import { MASTER_SUBSTITUTIONS_LIST } from '@/lib/substitutions-data';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { SubstitutionsGuideClient } from '@/components/SubstitutionsGuideClient';

const ogImg = `${SITE_ORIGIN}/images/gear_cast_iron_skillet_1795527125638.jpg`;

export const metadata: Metadata = {
  title:
    'Complete 1:1 Ingredient Substitutions Guide (Gram-for-Gram Cooking & Baking Swaps) | CookReel',
  description:
    'Interactive 1:1 ingredient substitution chart with exact gram and milliliter ratios for heavy cream, buttermilk, eggs, cake flour, fresh herbs, cooking oils, and pan sauce deglazers.',
  alternates: {
    canonical: '/substitutions',
  },
  openGraph: {
    title:
      'Complete 1:1 Ingredient Substitutions Guide (Gram-for-Gram Cooking & Baking Swaps) | CookReel',
    description:
      'Exact gram-for-gram and volume culinary ratios for swapping missing heavy cream, buttermilk, eggs, flours, herbs, and oils.',
    url: `${SITE_ORIGIN}/substitutions`,
    type: 'website',
    siteName: 'CookReel',
    images: [
      {
        url: ogImg,
        width: 1200,
        height: 630,
        alt: 'CookReel 1:1 Ingredient Substitutions Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Complete 1:1 Ingredient Substitutions Guide (Gram-for-Gram Cooking & Baking Swaps) | CookReel',
    description:
      'Exact gram-for-gram and volume culinary ratios for swapping missing heavy cream, buttermilk, eggs, flours, herbs, and oils.',
    images: [ogImg],
  },
};

export default function SubstitutionsPage() {
  const substitutionsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${SITE_ORIGIN}/substitutions#article`,
        headline:
          'Complete 1:1 Ingredient Substitutions Guide for Cooking & Baking',
        description:
          'Exact gram-for-gram culinary ratios for swapping missing heavy cream, buttermilk, eggs, cake flour, fresh herbs, cooking fats, and wine deglazers.',
        image: [ogImg],
        author: {
          '@type': 'Organization',
          name: 'CookReel Editorial Team',
          url: `${SITE_ORIGIN}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'CookReel',
          url: SITE_ORIGIN,
        },
        datePublished: '2026-11-15',
        dateModified: '2026-11-26',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_ORIGIN}/substitutions#faq`,
        mainEntity: MASTER_SUBSTITUTIONS_LIST.slice(0, 12).map((item) => ({
          '@type': 'Question',
          name: `What is the best 1:1 substitute for ${item.originalIngredient}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `For ${item.exactAmount} of ${item.originalIngredient}, use ${item.substituteRatio} (${item.metricBreakdown}). Best for ${item.bestFor}. ${item.scienceAndImpact}`,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_ORIGIN,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Substitutions Guide',
            item: `${SITE_ORIGIN}/substitutions`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(substitutionsSchema),
        }}
      />
      <SiteHeader activePath="/substitutions" />

      <main className="flex-1">
        {/* Top Hero Banner matching Q&A and Category pages */}
        <div className="bg-slate-900 text-white border-b border-slate-800 py-10">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-slate-400 mb-4"
            >
              <Link href="/" className="hover:text-amber-300 font-semibold">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-bold">
                1:1 Ingredient Substitutions Guide
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
              <Repeat className="w-3.5 h-3.5" />
              <span>
                Gram-for-Gram Culinary Reference · Dairy, Eggs, Flours, Herbs &amp; Pan Sauces
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
              Complete 1:1 Kitchen Ingredient Substitutions Guide
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Out of heavy cream, buttermilk, cake flour, fresh herbs, or dry white wine halfway through cooking? Use our interactive gram-and-milliliter substitution directory below to swap missing ingredients reliably without ruining sauce emulsions or baking textures.
            </p>
          </div>
        </div>

        <SubstitutionsGuideClient />
      </main>

      <SiteFooter />
    </div>
  );
}
