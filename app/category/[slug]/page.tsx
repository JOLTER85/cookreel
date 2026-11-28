import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  SITE_ARCHITECTURE,
  COOKREEL_RECIPES,
  SITE_ORIGIN,
  normalizeCategorySlug,
  LEGACY_CATEGORY_SLUG_MAP,
} from '@/lib/cookreel-data';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { CategoryClientView } from '@/components/CategoryClientView';

export const dynamicParams = true;

export function generateStaticParams() {
  return Object.keys(LEGACY_CATEGORY_SLUG_MAP).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const normalizedSlug = normalizeCategorySlug(resolvedParams?.slug || '');
  const category = SITE_ARCHITECTURE.find((c) => c.slug === normalizedSlug);

  if (!category) {
    return {
      title: 'Category Not Found | CookReel',
    };
  }

  const catRecipes = COOKREEL_RECIPES.filter(
    (r) => r.category === category.slug
  );
  const heroImg = catRecipes[0]?.image
    ? `${SITE_ORIGIN}${catRecipes[0].image}`
    : `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

  return {
    title: `${category.labelEn} Recipes & Culinary Guides | CookReel`,
    description: category.descriptionEn,
    alternates: {
      canonical: `https://cookreel.com/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.labelEn} Recipes & Culinary Guides | CookReel`,
      description: category.descriptionEn,
      url: `${SITE_ORIGIN}/category/${category.slug}`,
      type: 'website',
      siteName: 'CookReel',
      images: [
        {
          url: heroImg,
          width: 1200,
          height: 630,
          alt: `${category.labelEn} — CookReel`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.labelEn} Recipes & Culinary Guides | CookReel`,
      description: category.descriptionEn,
      images: [heroImg],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const normalizedSlug = normalizeCategorySlug(resolvedParams?.slug || '');
  const category = SITE_ARCHITECTURE.find((c) => c.slug === normalizedSlug);

  if (!category) {
    notFound();
  }

  const allCategoryRecipes = COOKREEL_RECIPES.filter(
    (r) => r.category === category.slug
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.labelEn} Recipes & Guides — CookReel`,
    description: category.descriptionEn,
    url: `${SITE_ORIGIN}/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allCategoryRecipes.map((r, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE_ORIGIN}/recipes/${r.slug}`,
        name: r.titleEn,
      })),
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <SiteHeader activePath={`/category/${category.slug}`} />
      <CategoryClientView
        category={category}
        initialRecipes={allCategoryRecipes}
      />
      <SiteFooter />
    </div>
  );
}
