import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Flame,
  Play,
  ArrowUpRight,
  Star,
  BookOpen,
} from 'lucide-react';
import { CulinaryRecipe } from '@/lib/cookreel-data';
import { RecipeReview } from '@/lib/server-db';

export function RecipeCard({
  recipe,
  reviews = [],
}: {
  recipe: CulinaryRecipe;
  reviews?: RecipeReview[];
}) {
  const recipeReviews = reviews.filter((r) => r.recipeId === recipe.id);
  const reviewCount = recipeReviews.length;
  const averageRating =
    reviewCount > 0
      ? (
          recipeReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
        ).toFixed(1)
      : null;

  return (
    <article className="group rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-800/50 active:scale-[0.995] transition-all flex flex-col">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="relative aspect-[16/10] bg-slate-900 overflow-hidden block"
      >
        <Image
          src={recipe.image}
          alt={recipe.titleEn}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider truncate">
            {recipe.categoryLabelEn}
          </span>
          {recipe.videoUrl ? (
            <span className="px-2.5 py-1 rounded bg-amber-600/95 text-white text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 shrink-0">
              <Play className="w-3 h-3 fill-current" />
              Video · {recipe.videoDuration || '0:12'}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded bg-slate-900/80 text-amber-200 text-[11px] sm:text-xs font-mono font-semibold flex items-center gap-1 shrink-0">
              <BookOpen className="w-3 h-3" />
              Illustrated Guide
            </span>
          )}
        </div>

        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2.5 sm:gap-3 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {recipe.prepMinutes + recipe.cookMinutes}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {recipe.calories} kcal
            </span>
            <span className="text-emerald-300 font-bold">
              {recipe.proteinGrams}g P
            </span>
          </div>
          {averageRating && reviewCount > 0 ? (
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {averageRating} ({reviewCount})
            </span>
          ) : null}
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
            <Link
              href="/about"
              className="font-semibold text-amber-800 hover:underline"
            >
              {recipe.authorName}
            </Link>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {recipe.stepsEn.length} Steps · {recipe.substitutions.length} Swaps
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2 leading-snug">
            <Link href={`/recipes/${recipe.slug}`}>{recipe.titleEn}</Link>
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {recipe.subtitleEn}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[11px] text-slate-500 truncate max-w-[175px] sm:max-w-[190px]">
              Pan/Tool:{' '}
              <strong className="text-slate-700">{recipe.gearItem.nameEn}</strong>
            </div>
            <Link
              href={`/recipes/${recipe.slug}`}
              className="min-h-[38px] inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-800 active:bg-amber-900 text-amber-900 hover:text-white active:text-white text-xs font-bold transition-colors shrink-0"
            >
              <span>Read Full Recipe</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Affiliate Disclosure: Gear links inside recipe cards may earn a commission at no extra cost ({' '}
            <Link href="/privacy#affiliate-disclosure" className="underline hover:text-amber-800">
              details
            </Link>
            ).
          </p>
        </div>
      </div>
    </article>
  );
}
