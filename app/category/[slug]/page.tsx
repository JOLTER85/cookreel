import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { readDatabase } from '@/lib/server-db';
import { SITE_ARCHITECTURE } from '@/lib/cookreel-data';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { RecipeCard } from '@/components/RecipeCard';

const siteUrl = process.env.APP_URL || 'https://cookreel.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = SITE_ARCHITECTURE.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found | CookReel',
    };
  }

  const db = readDatabase();
  const catRecipes = db.recipes.filter((r) => r.category === category.slug);
  const heroImg = catRecipes[0]?.image
    ? `${siteUrl}${catRecipes[0].image}`
    : `${siteUrl}/images/hero_cookreel_studio_1795527112508.jpg`;

  return {
    title: `${category.labelEn} Recipes & Culinary Guides | CookReel`,
    description: category.descriptionEn,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.labelEn} Recipes & Culinary Guides | CookReel`,
      description: category.descriptionEn,
      url: `${siteUrl}/category/${category.slug}`,
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
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}) {
  const { slug } = await params;
  const { sub } = await searchParams;

  const category = SITE_ARCHITECTURE.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const db = readDatabase();
  const allCategoryRecipes = db.recipes.filter(
    (r) => r.category === category.slug
  );
  const activeSubcategory = category.subcategories.find((s) => s.id === sub);
  const displayedRecipes = activeSubcategory
    ? allCategoryRecipes.filter((r) => r.subcategoryId === activeSubcategory.id)
    : allCategoryRecipes;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.labelEn} Recipes & Guides — CookReel`,
    description: category.descriptionEn,
    url: `${siteUrl}/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allCategoryRecipes.map((r, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${siteUrl}/recipes/${r.slug}`,
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
          <span className="text-slate-800 font-bold">{category.labelEn}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="rounded-2xl bg-slate-900 text-white p-7 sm:p-10 mb-8 border border-slate-800">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CookReel Culinary Pillar</span>
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono">
              {allCategoryRecipes.length} Step-by-Step Recipes &amp; Guides
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            {category.labelEn}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
            {category.descriptionEn}
          </p>

          {/* Subcategory Filter Links */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
            <Link
              href={`/category/${category.slug}`}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                !activeSubcategory
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All {category.labelEn} ({allCategoryRecipes.length})
            </Link>
            {category.subcategories.map((subItem) => {
              const count = allCategoryRecipes.filter(
                (r) => r.subcategoryId === subItem.id
              ).length;
              const isSelected = activeSubcategory?.id === subItem.id;
              return (
                <Link
                  key={subItem.id}
                  href={`/category/${category.slug}?sub=${encodeURIComponent(
                    subItem.id
                  )}`}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    isSelected
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {subItem.labelEn} ({count})
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              reviews={db.reviews}
            />
          ))}
        </div>

        {/* Cross-Navigation to Other Categories */}
        <section className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Explore Other Recipe Categories</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SITE_ARCHITECTURE.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`p-5 rounded-xl border transition-all ${
                  cat.slug === category.slug
                    ? 'border-amber-800 bg-amber-50/40'
                    : 'border-slate-200 bg-white hover:border-amber-800/50'
                }`}
              >
                <h2 className="font-serif text-lg font-bold text-slate-900 mb-1">
                  {cat.labelEn}
                </h2>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {cat.descriptionEn}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
