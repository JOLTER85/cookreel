'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flame,
  Clock,
  Play,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  Search,
  ChevronRight,
  Plus,
  X,
  Utensils,
  Zap,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import {
  COOKREEL_RECIPES,
  SITE_ARCHITECTURE,
  MEAL_PLAN_DAYS,
  COOKING_QA_KNOWLEDGE_BASE,
  CulinaryRecipe,
  PrimaryCategorySlug,
} from '@/lib/cookreel-data';
import { RecipeReview } from '@/lib/server-db';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { RecipeCard } from '@/components/RecipeCard';

export default function CookReelHomePage() {
  const [recipes, setRecipes] = useState<CulinaryRecipe[]>(COOKREEL_RECIPES);
  const [reviews, setReviews] = useState<RecipeReview[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    'all' | PrimaryCategorySlug
  >('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isHeroMuted, setIsHeroMuted] = useState<boolean>(true);
  const [activeMealDayIndex, setActiveMealDayIndex] = useState<number>(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSaved, setNewsletterSaved] = useState(false);

  // Moderated Submit Recipe Modal state with Anti-Spam CAPTCHA
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] =
    useState<PrimaryCategorySlug>('quick-easy');
  const [newSubcategoryId, setNewSubcategoryId] = useState('15-minute-meals');
  const [newCookMinutes, setNewCookMinutes] = useState('15');
  const [newIntroText, setNewIntroText] = useState('');
  const [newChefTip, setNewChefTip] = useState('');
  const [newGearName, setNewGearName] = useState(
    'Seasoned Cast-Iron Skillet (12-Inch)'
  );
  const [newGearPrice, setNewGearPrice] = useState('125');
  const [captchaA, setCaptchaA] = useState(4);
  const [captchaB, setCaptchaB] = useState(5);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [isSubmittingRecipe, setIsSubmittingRecipe] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q');
      if (qParam) {
        setTimeout(() => {
          if (active) setSearchQuery(qParam);
        }, 0);
      }
    }
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data.recipes) && data.recipes.length > 0) {
          setRecipes(data.recipes);
        }
        if (Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const filteredRecipes = recipes.filter((r) => {
    const matchesCat =
      activeCategory === 'all' || r.category === activeCategory;
    const matchesSub =
      activeSubcategory === 'all' || r.subcategoryId === activeSubcategory;
    const matchesSearch =
      !searchQuery.trim() ||
      r.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subtitleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.categoryLabelEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSub && matchesSearch;
  });

  const currentArchitecturePillar = SITE_ARCHITECTURE.find(
    (c) => c.slug === activeCategory
  );

  const handleCreateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitFeedback(null);
    setIsSubmittingRecipe(true);

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          subtitle: newSubtitle,
          authorName: newAuthor,
          category: newCategory,
          subcategoryId: newSubcategoryId,
          cookMinutes: Number(newCookMinutes) || 15,
          introText: newIntroText,
          chefTip: newChefTip,
          gearName: newGearName,
          gearPrice: Number(newGearPrice) || 125,
          captchaA,
          captchaB,
          captchaAnswer,
          websiteHoneypot,
          rightsConfirmed,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitFeedback({
          type: 'error',
          message: data.error || 'Could not submit recipe.',
        });
      } else if (data.recipe) {
        setRecipes((prev) => [data.recipe, ...prev]);
        setSubmitModalOpen(false);
        setNewTitle('');
        setNewSubtitle('');
        setNewIntroText('');
        setNewChefTip('');
        setCaptchaAnswer('');
        setRightsConfirmed(false);
      }
    } catch {
      setSubmitFeedback({
        type: 'error',
        message: 'Network error while submitting recipe.',
      });
    } finally {
      setIsSubmittingRecipe(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'subscribe',
          email: newsletterEmail,
        }),
      });
      if (res.ok) {
        setNewsletterSaved(true);
        setNewsletterEmail('');
      }
    } catch {}
  };

  const currentMealDay =
    MEAL_PLAN_DAYS[activeMealDayIndex] || MEAL_PLAN_DAYS[0];
  const featuredHeroRecipe = recipes[0] || COOKREEL_RECIPES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <SiteHeader
        activePath="/"
        rightSlot={
          <button
            type="button"
            onClick={() => setSubmitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Recipe</span>
          </button>
        }
      />

      <main className="flex-1">
        {/* HERO SECTION — Clean White Editorial Hub Overview */}
        <section className="relative overflow-hidden bg-white text-slate-900 border-b border-slate-200/90">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-6 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left Editorial Copy */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>
                    Step-by-Step Video Recipes · 1:1 Substitutions · USDA Safety
                  </span>
                </div>

                <h1 className="font-serif text-[28px] sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.12] sm:leading-[1.08] text-slate-900">
                  Practical Weeknight Recipes &amp;{' '}
                  <span className="text-amber-800">
                    Short-Form Step Visuals.
                  </span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-lg leading-relaxed max-w-2xl">
                  Explore {recipes.length} comprehensive recipe guides across Quick 15-Minute Meals, Keto &amp; High-Protein Dinners, No-Bake Desserts, and Kitchen Hacks—complete with gram measurements, 1:1 ingredient swaps, and official USDA safe internal cooking temperatures.
                </p>

                {/* Primary Hero CTAs */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                  <Link
                    href={`/recipes/${featuredHeroRecipe.slug}`}
                    className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl sm:rounded-lg bg-amber-800 hover:bg-amber-700 active:scale-[0.99] text-white font-bold text-sm flex items-center gap-2.5 shadow-md shadow-amber-900/15 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current shrink-0" />
                    <span>Open Featured Salmon Recipe</span>
                  </Link>

                  <Link
                    href="/qa"
                    className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-xl sm:rounded-lg bg-[#FAF9F6] hover:bg-amber-50/70 active:scale-[0.99] text-slate-800 border border-slate-300 hover:border-amber-800 font-semibold text-sm flex items-center gap-2 transition-all"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>Cooking &amp; Meal-Prep Q&amp;A ({COOKING_QA_KNOWLEDGE_BASE.length})</span>
                  </Link>
                </div>

                {/* 4 Pillar Quick Links to Real Category Pages */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-200">
                  {SITE_ARCHITECTURE.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="text-left p-2.5 rounded-lg bg-[#FAF9F6] hover:bg-amber-50/60 border border-slate-200/90 hover:border-amber-800/50 transition-all group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800 flex items-center justify-between">
                        <span>{cat.labelEn}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-800" />
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {cat.subcategories.map((s) => s.labelEn).join(' · ')}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Featured Recorded Video Preview Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                  <div className="relative aspect-[16/10] w-full bg-slate-100">
                    <video
                      src="/videos/crispy-salmon-skillet.mp4"
                      poster={featuredHeroRecipe.image}
                      autoPlay
                      loop
                      muted={isHeroMuted}
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    {/* Top Video Controls — Honest Recorded Label */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-white/95 backdrop-blur-md text-amber-900 text-xs font-mono font-bold flex items-center gap-1.5 border border-amber-300 shadow-xs">
                        <Play className="w-3 h-3 fill-amber-800 text-amber-800" />
                        Recorded Recipe Clip · 0:12
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsHeroMuted(!isHeroMuted)}
                        className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-900 shadow-xs backdrop-blur-md transition-colors"
                        aria-label={isHeroMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isHeroMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Bottom Overlay Info */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-200 font-semibold">
                        {featuredHeroRecipe.categoryLabelEn}
                      </span>
                      <h2 className="font-serif text-xl font-bold text-white leading-snug">
                        <Link
                          href={`/recipes/${featuredHeroRecipe.slug}`}
                          className="hover:text-amber-200 transition-colors"
                        >
                          {featuredHeroRecipe.titleEn}
                        </Link>
                      </h2>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4 text-xs text-slate-700 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-800" />
                        {featuredHeroRecipe.prepMinutes +
                          featuredHeroRecipe.cookMinutes}{' '}
                        Mins
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-800" />
                        {featuredHeroRecipe.calories} kcal
                      </span>
                      <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        USDA 63°C (145°F)
                      </span>
                    </div>

                    <Link
                      href={`/recipes/${featuredHeroRecipe.slug}`}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>View Recipe Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: 4-PILLAR SITE ARCHITECTURE & STANDALONE RECIPE DIRECTORY */}
        <section
          id="recipe-directory"
          className="py-12 border-b border-slate-200/80 bg-white"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Browse by Culinary Category</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-slate-900">
                  Explore {recipes.length} Step-by-Step Recipes &amp; Kitchen Guides
                </h2>
              </div>

              {/* Search Bar (16px on mobile to prevent iOS Safari auto-zoom) */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search salmon, keto, air fryer, substitutes..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl sm:rounded-lg border border-slate-300 bg-[#FAF9F6] text-base sm:text-xs text-slate-900 focus:outline-none focus:border-amber-800"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 4 Pillar Cards with Direct Links to /category/[slug] */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {SITE_ARCHITECTURE.map((pillar) => {
                const isSelected = activeCategory === pillar.slug;
                const count = recipes.filter(
                  (r) => r.category === pillar.slug
                ).length;
                return (
                  <div
                    key={pillar.slug}
                    className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-800 bg-amber-50/50 shadow-sm'
                        : 'border-slate-200/90 bg-[#FAF9F6] hover:border-amber-800/40 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory(
                              isSelected ? 'all' : pillar.slug
                            );
                            setActiveSubcategory('all');
                          }}
                          className="font-serif text-lg font-bold text-slate-900 hover:text-amber-800 text-left"
                        >
                          {pillar.labelEn}
                        </button>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-200/80 text-slate-700">
                          {count} Guides
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {pillar.descriptionEn}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-200/70">
                      <div className="flex flex-wrap gap-1.5">
                        {pillar.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/category/${pillar.slug}?sub=${encodeURIComponent(
                              sub.id
                            )}`}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:border-amber-800 hover:text-amber-900"
                          >
                            • {sub.labelEn}
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCategory(
                              isSelected ? 'all' : pillar.slug
                            );
                            setActiveSubcategory('all');
                          }}
                          className="text-[11px] font-bold text-slate-600 hover:text-amber-800"
                        >
                          {isSelected ? 'Show All Below' : 'Filter Grid Below'}
                        </button>
                        <Link
                          href={`/category/${pillar.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:underline"
                        >
                          <span>Category Page</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subcategory Filter Bar — Smooth Horizontal Swipe on Mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 py-3 px-3.5 sm:px-4 rounded-xl bg-[#FAF9F6] border border-slate-200/80 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveSubcategory('all');
                  }}
                  className={`px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                    activeCategory === 'all'
                      ? 'bg-amber-800 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  All Categories ({recipes.length})
                </button>

                {currentArchitecturePillar &&
                  currentArchitecturePillar.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() =>
                        setActiveSubcategory(
                          activeSubcategory === sub.id ? 'all' : sub.id
                        )
                      }
                      className={`px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        activeSubcategory === sub.id
                          ? 'bg-amber-800 text-white'
                          : 'bg-white text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      {sub.labelEn}
                    </button>
                  ))}
              </div>

              <div className="text-[11px] sm:text-xs text-slate-500 font-mono shrink-0">
                Showing {filteredRecipes.length} of {recipes.length} Standalone Recipes
              </div>
            </div>

            {/* Recipe Grid — Performance Optimized Lazy-Loaded Image Cards Linking to /recipes/[slug] */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  reviews={reviews}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: PREVIEW OF COOKING & MEAL-PREP Q&A KNOWLEDGE BASE (INCLUDES TOP 20 LAST 30 DAYS) */}
        <section className="py-14 bg-[#FAF9F6] border-b border-slate-200/80">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>
                    Top Most-Asked Culinary Questions (Last 30 Days) · 36 Total Q&amp;A Guides
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-slate-900">
                  Trending Cooking &amp; Food Preparation Questions Answered
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  Direct, science-backed answers to the 20 most-searched kitchen questions from the past 30 days—covering Air Fryer liners, high-protein cottage cheese swaps, preventing white albumin on salmon, USDA safe internal temperatures, and freezer meal prep.
                </p>
              </div>

              <Link
                href="/qa"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors self-start"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  Explore All {COOKING_QA_KNOWLEDGE_BASE.length} Q&amp;A Guides
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COOKING_QA_KNOWLEDGE_BASE.filter((q) => q.isTrendingLast30Days)
                .slice(0, 9)
                .map((qa) => (
                  <article
                    key={qa.id}
                    className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-amber-800/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-mono uppercase font-bold">
                          {qa.topicLabelEn}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold">
                          Last 30 Days
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 leading-snug">
                        <Link href="/qa" className="hover:text-amber-800">
                          {qa.questionEn}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {qa.shortAnswerEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href="/qa"
                        className="text-xs font-bold text-slate-700 hover:text-amber-800"
                      >
                        Read Full Answer →
                      </Link>
                      {qa.relatedRecipeSlug && (
                        <Link
                          href={`/recipes/${qa.relatedRecipeSlug}`}
                          className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
                        >
                          <span>Related Recipe</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: 7-DAY MEAL-PREP PLANNER & HONEST NEWSLETTER SIGNUP */}
        <section className="py-14 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-[#FAF9F6] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-2">
                    <Zap className="w-4 h-4" />
                    <span>Weekly High-Protein &amp; Quick Dinner Schedule</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                    7-Day Weeknight Meal-Prep Planner
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-5">
                    Select any day of the week to preview balanced lunch and dinner pairings with total prep time and daily calorie targets.
                  </p>

                  <div className="flex items-center sm:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1 mb-5">
                    {MEAL_PLAN_DAYS.map((d, idx) => (
                      <button
                        key={d.dayEn}
                        type="button"
                        onClick={() => setActiveMealDayIndex(idx)}
                        className={`px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                          activeMealDayIndex === idx
                            ? 'bg-amber-800 text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
                        }`}
                      >
                        {d.dayEn}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="sm:col-span-2 space-y-2">
                    <div className="text-xs font-mono uppercase text-amber-800 font-bold">
                      {currentMealDay.dayEn} Menu
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Lunch: {currentMealDay.lunchEn}
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      Dinner: {currentMealDay.dinnerEn}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FAF9F6] border border-slate-200 text-center">
                    <div className="font-mono text-sm font-bold text-amber-800">
                      {currentMealDay.totalKcal} kcal
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">
                      Active Prep: {currentMealDay.prepTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean White Newsletter Card */}
              <div className="lg:col-span-5 rounded-2xl bg-white text-slate-900 border-2 border-amber-800/20 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono uppercase tracking-widest font-bold mb-3">
                    Free Weekly Meal-Prep Dispatch
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                    Get New 15-Minute Recipes &amp; 1:1 Substitution Charts
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    Receive our weekly Sunday meal-prep checklist, printable metric shopping lists, and concise 12-second step-by-step cooking clips directly in your inbox. No spam, unsubscribe anytime.
                  </p>
                </div>

                {newsletterSaved ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      You are subscribed to the CookReel Weekly Meal-Prep Dispatch!
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF9F6] border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-amber-800"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs transition-colors"
                    >
                      Send Me the Weekly Meal-Prep Guide
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* MODERATED SUBMIT RECIPE MODAL WITH ANTI-SPAM CAPTCHA & COPYRIGHT AGREEMENT */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold">
                  Moderated Community Recipe Submission
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Submit an Original Recipe to CookReel
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitFeedback && (
              <div
                className={`mb-4 p-3 rounded-lg text-xs font-semibold ${
                  submitFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitFeedback.message}
              </div>
            )}

            <form onSubmit={handleCreateRecipe} className="space-y-3.5">
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHoneypot}
                  onChange={(e) => setWebsiteHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., 15-Minute Air Fryer Lemon Garlic Shrimp"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Pillar
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => {
                      const cat = e.target.value as PrimaryCategorySlug;
                      setNewCategory(cat);
                      const found = SITE_ARCHITECTURE.find(
                        (c) => c.slug === cat
                      );
                      if (found && found.subcategories[0]) {
                        setNewSubcategoryId(found.subcategories[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  >
                    {SITE_ARCHITECTURE.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subcategory
                  </label>
                  <select
                    value={newSubcategoryId}
                    onChange={(e) => setNewSubcategoryId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  >
                    {(
                      SITE_ARCHITECTURE.find((c) => c.slug === newCategory)
                        ?.subcategories || []
                    ).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contributor Name
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cook Time (Minutes)
                  </label>
                  <input
                    type="number"
                    value={newCookMinutes}
                    onChange={(e) => setNewCookMinutes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipe Introduction &amp; Flavor Notes
                </label>
                <textarea
                  rows={2}
                  value={newIntroText}
                  onChange={(e) => setNewIntroText(e.target.value)}
                  placeholder="Describe why this method works and when to serve it..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Technique &amp; Ingredient Substitution Tip
                </label>
                <input
                  type="text"
                  value={newChefTip}
                  onChange={(e) => setNewChefTip(e.target.value)}
                  placeholder="e.g., Pat shrimp dry before tossing with avocado oil..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Recommended Pan/Tool
                  </label>
                  <input
                    type="text"
                    value={newGearName}
                    onChange={(e) => setNewGearName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Est. Gear Price (USD)
                  </label>
                  <input
                    type="number"
                    value={newGearPrice}
                    onChange={(e) => setNewGearPrice(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              {/* Anti-Spam Math CAPTCHA + Original Copyright Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center p-3 rounded-xl bg-[#FAF9F6] border border-slate-200">
                <span className="text-xs font-bold text-slate-700">
                  Anti-Spam Verification: What is {captchaA} + {captchaB}?
                </span>
                <input
                  type="number"
                  required
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Enter sum"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs"
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rightsConfirmed}
                  onChange={(e) => setRightsConfirmed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-amber-800"
                />
                <span>
                  I confirm this recipe is 100% original content, includes safe USDA internal cooking temperatures, and agrees to CookReel&apos;s{' '}
                  <Link href="/terms" className="underline text-amber-800">
                    Terms &amp; Editorial Moderation Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmittingRecipe}
                className="w-full py-3 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
              >
                {isSubmittingRecipe
                  ? 'Verifying & Publishing...'
                  : 'Verify & Publish Recipe Guide'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
