'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import {
  CategoryArchitecture,
  CulinaryRecipe,
  SITE_ARCHITECTURE,
} from '@/lib/cookreel-data';
import { RecipeReview } from '@/lib/server-db';
import { RecipeCard } from '@/components/RecipeCard';

export function CategoryClientView({
  category,
  initialRecipes,
}: {
  category: CategoryArchitecture;
  initialRecipes: CulinaryRecipe[];
}) {
  const [selectedSubId, setSelectedSubId] = useState<string>('all');
  const [reviews, setReviews] = useState<RecipeReview[]>([]);

  useEffect(() => {
    let active = true;
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data?.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const displayedRecipes =
    selectedSubId === 'all'
      ? initialRecipes
      : initialRecipes.filter((r) => r.subcategoryId === selectedSubId);

  return (
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
            {initialRecipes.length} Step-by-Step Recipes &amp; Guides
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          {category.labelEn}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
          {category.descriptionEn}
        </p>

        {/* Subcategory Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedSubId('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              selectedSubId === 'all'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All {category.labelEn} ({initialRecipes.length})
          </button>
          {category.subcategories.map((subItem) => {
            const count = initialRecipes.filter(
              (r) => r.subcategoryId === subItem.id
            ).length;
            const isSelected = selectedSubId === subItem.id;
            return (
              <button
                key={subItem.id}
                type="button"
                onClick={() => setSelectedSubId(subItem.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  isSelected
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {subItem.labelEn} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Unique 180+ Word Category Editorial Guide & Featured Recipe Links (Audit Item 12) */}
      {category.editorialGuideParagraphsEn &&
        category.editorialGuideParagraphsEn.length > 0 && (
          <section className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 mb-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                <BookOpen className="w-4 h-4" />
                <span>{category.labelEn} — Culinary Technique &amp; Ingredient Guide</span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Curated by Marcus Vance &amp; Elena Rostova · Updated Nov 28, 2026
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              {category.editorialGuideParagraphsEn.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {category.featuredRecipeSlugs &&
              category.featuredRecipeSlugs.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                    Featured Pillar Recipes in {category.labelEn}:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {category.featuredRecipeSlugs.map((slug) => {
                      const featuredRecipe = initialRecipes.find(
                        (r) => r.slug === slug
                      );
                      if (!featuredRecipe) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/recipes/${featuredRecipe.slug}`}
                          className="p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200/80 hover:border-amber-800/60 transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">
                              Editor&apos;s Pick · {featuredRecipe.prepMinutes + featuredRecipe.cookMinutes} Mins
                            </span>
                            <h3 className="font-serif text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors mt-0.5 line-clamp-2">
                              {featuredRecipe.titleEn}
                            </h3>
                          </div>
                          <span className="text-[11px] font-semibold text-amber-800 mt-2 inline-flex items-center gap-1">
                            View Recipe Guide →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
          </section>
        )}

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} reviews={reviews} />
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
  );
}
