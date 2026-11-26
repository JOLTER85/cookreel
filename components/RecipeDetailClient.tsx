'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Flame,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Users,
  ChevronRight,
  Timer,
  RotateCcw,
  Star,
  BookOpen,
  Repeat,
  HelpCircle,
  Printer,
  Share2,
  ShieldAlert,
  ExternalLink,
  Check,
} from 'lucide-react';
import {
  CulinaryRecipe,
  SITE_ARCHITECTURE,
  SOCIAL_LINKS,
} from '@/lib/cookreel-data';
import { RecipeReview } from '@/lib/server-db';
import { RecipeCard } from '@/components/RecipeCard';

export function RecipeDetailClient({
  recipe,
  initialReviews,
  relatedRecipes,
}: {
  recipe: CulinaryRecipe;
  initialReviews: RecipeReview[];
  relatedRecipes: CulinaryRecipe[];
}) {
  const [reviews, setReviews] = useState<RecipeReview[]>(initialReviews);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<
    Record<string, boolean>
  >({});
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(
    recipe.stepsEn[0]?.timerSeconds || 90
  );
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Anti-spam review submission state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [captchaA, setCaptchaA] = useState(4);
  const [captchaB, setCaptchaB] = useState(5);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const [reviewTermsAccepted, setReviewTermsAccepted] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

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

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleSelectStep = (idx: number, seconds: number) => {
    setActiveStepIndex(idx);
    setTimerRunning(false);
    setTimeLeft(seconds);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleIngredient = (key: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewFeedback(null);

    if (!reviewTermsAccepted) {
      setReviewFeedback({
        type: 'error',
        message:
          'Please confirm that your review reflects your honest cooking experience.',
      });
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeId: recipe.id,
          authorName: reviewAuthor || 'Home Cook',
          rating: reviewRating,
          comment: reviewComment,
          captchaA,
          captchaB,
          captchaAnswer,
          websiteHoneypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setReviewFeedback({
          type: 'error',
          message: data.error || 'Could not submit review.',
        });
      } else if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
        setReviewComment('');
        setReviewAuthor('');
        setCaptchaAnswer('');
        setReviewTermsAccepted(false);
        setCaptchaA(Math.floor(2 + Math.random() * 7));
        setCaptchaB(Math.floor(2 + Math.random() * 7));
        setReviewFeedback({
          type: 'success',
          message: 'Thank you! Your review has been verified and published below.',
        });
      }
    } catch {
      setReviewFeedback({
        type: 'error',
        message: 'Network error while submitting your review.',
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const recipeReviews = reviews.filter((r) => r.recipeId === recipe.id);
  const reviewCount = recipeReviews.length;
  const averageRating =
    reviewCount > 0
      ? (
          recipeReviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
        ).toFixed(1)
      : null;

  const categoryObj = SITE_ARCHITECTURE.find((c) => c.slug === recipe.category);
  const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    `https://www.cookreel.com/recipes/${recipe.slug}`
  )}&media=${encodeURIComponent(
    `https://www.cookreel.com${recipe.image}`
  )}&description=${encodeURIComponent(recipe.titleEn)}`;

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6"
      >
        <Link href="/" className="hover:text-amber-800 font-semibold">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          href={`/category/${recipe.category}`}
          className="hover:text-amber-800 font-semibold"
        >
          {categoryObj?.labelEn || 'Recipes'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold truncate max-w-md">
          {recipe.titleEn}
        </span>
      </nav>

      <article className="rounded-2xl border border-slate-200/90 bg-white shadow-lg overflow-hidden">
        {/* Top Article Banner */}
        <div className="bg-slate-900 text-white px-6 sm:px-10 py-8 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${recipe.category}`}
                className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest hover:bg-amber-500/30 transition-colors"
              >
                {recipe.categoryLabelEn}
              </Link>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                {recipe.wordCount}+ Words · Step-by-Step Guide
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={pinterestShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-bold transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Pin to Pinterest</span>
              </a>
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() =>
                  typeof window !== 'undefined' && window.print()
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>Print Recipe</span>
              </button>
            </div>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight mb-3">
            {recipe.titleEn}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-5">
            {recipe.subtitleEn}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
            <div>
              Written by{' '}
              <Link
                href="/about"
                className="font-bold text-amber-300 underline hover:text-amber-200"
              >
                {recipe.authorName}
              </Link>{' '}
              <span className="text-slate-400">({recipe.authorRoleEn})</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="font-mono">
              Prep: {recipe.prepMinutes}m · Cook: {recipe.cookMinutes}m · Total:{' '}
              {recipe.prepMinutes + recipe.cookMinutes}m
            </span>
            <span className="text-slate-600">•</span>
            {averageRating && reviewCount > 0 ? (
              <a
                href="#reader-reviews"
                className="inline-flex items-center gap-1 text-amber-300 font-bold hover:underline"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>
                  {averageRating} ({reviewCount} verified{' '}
                  {reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </a>
            ) : (
              <a
                href="#reader-reviews"
                className="text-slate-400 hover:text-amber-300 underline"
              >
                0 Reader Reviews — Be the first to review
              </a>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-12">
          {/* USDA Food Safety Callout Banner */}
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
              <strong className="font-bold">
                USDA Food Safety &amp; Temperature Guidance:
              </strong>{' '}
              {recipe.usdaSafetyNoteEn}
            </div>
          </div>

          {/* SECTION 1: ENGAGING INTRODUCTION & WHY THIS WORKS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                <BookOpen className="w-4 h-4" />
                <span>1. Culinary Overview &amp; Flavor Profile</span>
              </div>
              {recipe.introParagraphsEn.map((para, idx) => (
                <p
                  key={idx}
                  className="text-slate-700 text-sm sm:text-base leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5 rounded-xl bg-amber-50/60 border border-amber-200/80 p-6">
              <h2 className="font-serif text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-800" />
                <span>Why This Method Works</span>
              </h2>
              <ul className="space-y-3">
                {recipe.whyThisWorksEn.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 2: STEP-BY-STEP VISUALS (Unique Video Clip OR Step Photography) */}
          <div className="pt-8 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                <Play className="w-4 h-4" />
                <span>
                  2. Step-by-Step Visuals{' '}
                  {recipe.videoUrl
                    ? `(${recipe.videoDuration || '0:12'} Recorded Video Clip + Process Photos)`
                    : '(Step-by-Step Process Photography)'}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Visual Reference for Each Cooking Stage
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {recipe.videoUrl ? (
                <div className="lg:col-span-6 relative rounded-xl overflow-hidden bg-slate-950 aspect-[16/10] border border-slate-200">
                  <video
                    key={recipe.videoUrl}
                    src={recipe.videoUrl}
                    poster={recipe.image}
                    loop
                    muted={isVideoMuted}
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onClick={(e) => {
                      const v = e.currentTarget;
                      if (v.paused) {
                        v.play().catch(() => {});
                      } else {
                        v.pause();
                      }
                    }}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/75 text-white text-xs font-mono">
                      Recorded Recipe Clip ({recipe.videoDuration || '0:12'})
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const videoEl = e.currentTarget
                            .closest('div.relative')
                            ?.querySelector('video');
                          if (videoEl) {
                            if (videoEl.paused) {
                              videoEl.play().catch(() => {});
                            } else {
                              videoEl.pause();
                            }
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1"
                      >
                        {isVideoPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Play Clip</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className="p-2 rounded-lg bg-black/75 text-white hover:bg-black"
                        aria-label="Toggle Mute"
                      >
                        {isVideoMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <p className="font-bold">
                      Step {activeStepIndex + 1}:{' '}
                      {recipe.stepsEn[activeStepIndex]?.title}
                    </p>
                  </div>
                </div>
              ) : null}

              <div
                className={`${
                  recipe.videoUrl ? 'lg:col-span-6' : 'lg:col-span-12'
                } grid grid-cols-1 sm:grid-cols-3 gap-4`}
              >
                {recipe.stepGalleryImages.map((imgSrc, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/5] flex flex-col justify-end p-3"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${recipe.titleEn} - Stage ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="relative z-10 text-white">
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-600 text-[10px] font-mono uppercase font-bold mb-1">
                        Stage {i + 1}
                      </span>
                      <p className="text-xs font-semibold leading-snug">
                        {recipe.stepsEn[i]?.title || 'Plating & Finishing'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: CHEF TIPS & INGREDIENT SUBSTITUTIONS */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>3. Kitchen Tips for Best Results</span>
              </div>
              <div className="space-y-3">
                {recipe.chefTipsEn.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200/90 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-800 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-4">
                <Repeat className="w-4 h-4" />
                <span>1:1 Ingredient Substitutions Table</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="py-3 px-4 font-bold">
                        Original Ingredient
                      </th>
                      <th className="py-3 px-4 font-bold">
                        Recommended 1:1 Substitute
                      </th>
                      <th className="py-3 px-4 font-bold">Culinary Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {recipe.substitutions.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {sub.originalEn}
                        </td>
                        <td className="py-3 px-4 text-amber-900 font-medium">
                          {sub.substituteEn}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {sub.chefNoteEn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECTION 4: STRUCTURED RECIPE CARD */}
          <div className="pt-8 border-t border-slate-200">
            <div className="rounded-2xl border-2 border-amber-800/30 bg-[#FAF9F6] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-amber-800 text-white text-[11px] font-mono uppercase tracking-widest mb-2">
                    4. Structured Recipe Card
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    {recipe.titleEn}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Author: {recipe.authorName} · Prep: {recipe.prepMinutes}{' '}
                    mins · Cook: {recipe.cookMinutes} mins
                  </p>
                </div>

                {/* Portion Scaler */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                    <span className="text-xs text-slate-500 px-2 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-800" />
                      Yield:
                    </span>
                    {[1, 2, 4].map((mult) => (
                      <button
                        key={mult}
                        type="button"
                        onClick={() => setServingsMultiplier(mult)}
                        className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                          servingsMultiplier === mult
                            ? 'bg-amber-800 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {mult}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nutrition Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-200 text-center">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                  <div className="text-[11px] text-slate-500 uppercase font-mono">
                    Total Time
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900">
                    {recipe.prepMinutes + recipe.cookMinutes} mins
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                  <div className="text-[11px] text-slate-500 uppercase font-mono">
                    Calories
                  </div>
                  <div className="font-mono text-sm font-bold text-amber-800">
                    {recipe.calories} kcal
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                  <div className="text-[11px] text-slate-500 uppercase font-mono">
                    Protein
                  </div>
                  <div className="font-mono text-sm font-bold text-emerald-800">
                    {recipe.proteinGrams}g
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                  <div className="text-[11px] text-slate-500 uppercase font-mono">
                    Net Carbs
                  </div>
                  <div className="font-mono text-sm font-bold text-slate-900">
                    {recipe.netCarbsGrams}g
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Ingredients Checklist */}
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">
                    Measured Ingredients ({servingsMultiplier}x Batch)
                  </h3>
                  <ul className="space-y-2">
                    {recipe.ingredientsEn.map((ing, idx) => {
                      const key = `${recipe.id}-ing-${idx}`;
                      const isChecked = !!checkedIngredients[key];
                      const scaledAmount = Number(
                        (ing.amount * servingsMultiplier).toFixed(1)
                      );
                      return (
                        <li key={key}>
                          <button
                            type="button"
                            onClick={() => toggleIngredient(key)}
                            className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-lg border text-left transition-all ${
                              isChecked
                                ? 'bg-emerald-50/60 border-emerald-200 text-slate-400 line-through'
                                : 'bg-white border-slate-200/90 hover:border-amber-800/40 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                  isChecked
                                    ? 'bg-emerald-700 border-emerald-700 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isChecked && (
                                  <CheckCircle2 className="w-3 h-3" />
                                )}
                              </div>
                              <span className="text-xs sm:text-sm font-medium truncate">
                                {ing.item}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-semibold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded shrink-0">
                              {scaledAmount} {ing.unit}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Recommended Pan/Tool with Explicit FTC Affiliate Disclosure */}
                  <div className="mt-6 p-4 rounded-xl bg-white border border-amber-200">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">
                          Recommended Cookware ({recipe.gearItem.brand})
                        </div>
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {recipe.gearItem.nameEn}
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                          Est. Price: ${recipe.gearItem.priceUsd} · Partner:{' '}
                          {recipe.gearItem.affiliateStore}
                        </div>
                      </div>
                      <Link
                        href="/privacy#affiliate-disclosure"
                        className="px-3 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shop Gear</span>
                      </Link>
                    </div>
                    <p className="mt-2.5 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                      <strong>Affiliate Disclosure:</strong> Recommended kitchen
                      tools are independently selected by our editorial team. If
                      you purchase through our partner links, CookReel may earn
                      a small referral commission at no extra cost to you. See
                      our{' '}
                      <Link
                        href="/privacy#affiliate-disclosure"
                        className="underline text-amber-800 hover:text-amber-900"
                      >
                        Affiliate &amp; Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Interactive Timed Cooking Steps */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Step-by-Step Instructions &amp; Timers
                      </h3>
                      <span className="text-xs font-mono text-slate-500">
                        Click a step to load its timer
                      </span>
                    </div>

                    <div className="space-y-2.5 mb-5">
                      {recipe.stepsEn.map((step, idx) => {
                        const isCurrent = activeStepIndex === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() =>
                              handleSelectStep(idx, step.timerSeconds)
                            }
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-white border-amber-800 shadow-xs'
                                : 'bg-white/60 border-slate-200/80 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-5 h-5 rounded-full text-xs font-mono font-bold flex items-center justify-center ${
                                    isCurrent
                                      ? 'bg-amber-800 text-white'
                                      : 'bg-slate-200 text-slate-700'
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                                <span className="font-bold text-xs sm:text-sm text-slate-900">
                                  {step.title}
                                </span>
                              </div>
                              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 flex items-center gap-1">
                                <Timer className="w-3 h-3 text-amber-800" />
                                {formatTimer(step.timerSeconds)}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed pl-7">
                              {step.instruction}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Step Countdown Timer */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                        <Timer className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          Step {activeStepIndex + 1} Timer
                        </div>
                        <div className="font-mono text-2xl font-bold text-amber-300">
                          {formatTimer(timeLeft)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors"
                      >
                        {timerRunning ? 'Pause' : 'Start Timer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTimerRunning(false);
                          setTimeLeft(
                            recipe.stepsEn[activeStepIndex]?.timerSeconds || 90
                          );
                        }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        aria-label="Reset Timer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ) */}
          <div className="pt-8 border-t border-slate-200">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>5. Frequently Asked Questions (Storage &amp; Reheating)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recipe.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#FAF9F6] border border-slate-200/90 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
                      {faq.questionEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answerEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: FOLLOW & SHARE ON PINTEREST / SOCIAL CHANNELS */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/50 p-5 rounded-xl border border-amber-200/70">
            <div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                Save This Recipe on Pinterest or Follow CookReel
              </h3>
              <p className="text-xs text-slate-600">
                Pin this recipe card to your weeknight cooking board or watch our short clips on social media.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-amber-800 text-xs font-bold text-slate-800 transition-colors"
                >
                  <span>{soc.platform}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* SECTION 7: VERIFIED READER REVIEWS WITH ANTI-SPAM CAPTCHA */}
          <div
            id="reader-reviews"
            className="pt-8 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-6">
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                Reader Reviews ({reviewCount})
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                We only display authentic reviews submitted by readers. We never display fabricated review counts.
              </p>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {recipeReviews.length === 0 ? (
                  <div className="p-5 rounded-xl bg-[#FAF9F6] border border-slate-200 text-xs text-slate-600">
                    No reader reviews have been submitted for this recipe yet. Try making it and share your honest feedback using the form!
                  </div>
                ) : (
                  recipeReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200/80"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">
                          {rev.authorName}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-3 h-3 fill-current"
                            />
                          ))}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form
              onSubmit={handleSubmitReview}
              className="lg:col-span-6 p-6 rounded-xl bg-[#FAF9F6] border border-slate-200/90 space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-bold text-slate-900">
                  Leave an Honest Recipe Review
                </h4>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  CAPTCHA Protected
                </span>
              </div>

              {reviewFeedback && (
                <div
                  className={`p-3 rounded-lg text-xs font-semibold ${
                    reviewFeedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {reviewFeedback.message}
                </div>
              )}

              {/* Hidden Honeypot input against automated bots */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Leave this field blank
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteHoneypot}
                    onChange={(e) => setWebsiteHoneypot(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="Your Name"
                  className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                />
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  aria-label="Star Rating"
                  className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                >
                  <option value={5}>★★★★★ (5/5 — Tried &amp; Loved)</option>
                  <option value={4}>★★★★☆ (4/5 — Very Good)</option>
                  <option value={3}>★★★☆☆ (3/5 — Good)</option>
                  <option value={2}>★★☆☆☆ (2/5 — Needs Tweaking)</option>
                </select>
              </div>

              <textarea
                rows={3}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Did you try this recipe or use one of the ingredient substitutions? Share your results..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
              />

              {/* Anti-Spam Math CAPTCHA + Moderation Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <span>
                    Anti-Spam Check: What is {captchaA} + {captchaB}?
                  </span>
                </div>
                <input
                  type="number"
                  required
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Enter sum"
                  className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reviewTermsAccepted}
                  onChange={(e) => setReviewTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-amber-800 focus:ring-amber-800"
                />
                <span>
                  I confirm this review is my own genuine feedback and agrees with CookReel&apos;s{' '}
                  <Link href="/terms" className="underline text-amber-800">
                    Community Moderation &amp; Content Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
              >
                {isSubmittingReview
                  ? 'Verifying & Posting...'
                  : 'Post Verified Review'}
              </button>
            </form>
          </div>
        </div>
      </article>

      {/* Related Recipes in the Same Pillar */}
      {relatedRecipes.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                More from {categoryObj?.labelEn || 'CookReel'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Related Step-by-Step Recipes &amp; Guides
              </h2>
            </div>
            <Link
              href={`/category/${recipe.category}`}
              className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
            >
              <span>View All in {categoryObj?.labelEn}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRecipes.map((rel) => (
              <RecipeCard key={rel.id} recipe={rel} reviews={reviews} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
