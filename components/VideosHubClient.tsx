'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  ArrowUpRight,
  Clock,
  Flame,
  ShieldCheck,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  CulinaryRecipe,
  HERO_FEATURED_VIDEO_URL,
  PrimaryCategorySlug,
  SITE_ARCHITECTURE,
} from '@/lib/cookreel-data';
import { RecipeCard } from '@/components/RecipeCard';

interface VideosHubClientProps {
  videoRecipes: CulinaryRecipe[];
  illustratedRecipes: CulinaryRecipe[];
}

export function VideosHubClient({
  videoRecipes,
  illustratedRecipes,
}: VideosHubClientProps) {
  const [activeVideoRecipe, setActiveVideoRecipe] = useState<CulinaryRecipe>(
    videoRecipes[0]
  );
  const [isMainOverviewClip, setIsMainOverviewClip] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | PrimaryCategorySlug
  >('all');
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  const currentVideoSrc = isMainOverviewClip
    ? HERO_FEATURED_VIDEO_URL
    : activeVideoRecipe?.videoUrl || HERO_FEATURED_VIDEO_URL;

  const currentPosterSrc = isMainOverviewClip
    ? '/images/hero_cookreel_studio_1795527112508.jpg'
    : activeVideoRecipe?.image || '/images/hero_cookreel_studio_1795527112508.jpg';

  const handleSelectClip = (recipe: CulinaryRecipe) => {
    setIsMainOverviewClip(false);
    setActiveVideoRecipe(recipe);
    setIsPlaying(true);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('cookreel-video-player');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSelectOverviewReel = () => {
    setIsMainOverviewClip(true);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const v = mainVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = mainVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const filteredIllustrated =
    selectedCategory === 'all'
      ? illustratedRecipes
      : illustratedRecipes.filter((r) => r.category === selectedCategory);

  return (
    <div>
      {/* Interactive Main Theater & Clip Switcher */}
      <div
        id="cookreel-video-player"
        className="rounded-2xl bg-slate-950 text-white p-5 sm:p-8 lg:p-10 mb-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-7 items-center shadow-xl"
      >
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Film className="w-3.5 h-3.5" />
            <span>
              CookReel TV Hub · {videoRecipes.length} Unique Recipe Clips + 1 Overview Reel
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
            {isMainOverviewClip
              ? 'CookReel Studio — Step-by-Step Visual Technique Reel'
              : activeVideoRecipe.titleEn}
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            {isMainOverviewClip
              ? 'Explore our short-form 12-second visual technique clips demonstrating cast-iron pan searing, garlic herb butter basting, pasta emulsification, and cupcake piping—each paired with a kitchen-tested recipe guide, metric & US weights, 1:1 ingredient substitutions, and USDA safe cooking temperatures.'
              : activeVideoRecipe.subtitleEn}
          </p>

          {!isMainOverviewClip && (
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {activeVideoRecipe.prepMinutes + activeVideoRecipe.cookMinutes} Mins Total
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {activeVideoRecipe.calories} kcal · {activeVideoRecipe.proteinGrams}g Protein
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/50 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                By {activeVideoRecipe.authorName}
              </span>
            </div>
          )}

          {/* Quick Clip Selector Pills */}
          <div className="pt-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              Select Active Video Clip to Watch Now:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {videoRecipes.map((rec, index) => {
                const isSelected =
                  !isMainOverviewClip && activeVideoRecipe.id === rec.id;
                return (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => handleSelectClip(rec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/50 hover:text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>
                      #{index + 1} {rec.titleEn.split(' ').slice(0, 3).join(' ')}
                    </span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={handleSelectOverviewReel}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isMainOverviewClip
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/50 hover:text-white'
                }`}
              >
                <Film className="w-3 h-3" />
                <span>Studio Overview Reel</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/recipes/${activeVideoRecipe.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Full Recipe Card &amp; Ingredients</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Clip</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Clip</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Active Video Player Container */}
        <div className="lg:col-span-6">
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 aspect-[16/10] shadow-2xl">
            <video
              key={currentVideoSrc}
              ref={mainVideoRef}
              src={currentVideoSrc}
              poster={currentPosterSrc}
              controls
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="px-2.5 py-1 rounded bg-slate-950/85 backdrop-blur-md text-amber-300 text-xs font-mono font-bold border border-amber-400/30">
                Visual Technique Clip · 0:12
              </span>
              <button
                type="button"
                onClick={toggleMute}
                className="pointer-events-auto p-2 rounded-lg bg-slate-950/85 hover:bg-slate-900 text-white border border-slate-700 transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Visual Media & Recipe Testing Disclosure */}
      <div className="mb-10 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-slate-700 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <strong className="text-amber-950 font-bold">
            Editorial Testing &amp; Visual Media Disclosure:{' '}
          </strong>
          All {videoRecipes.length + illustratedRecipes.length} recipes on CookReel feature kitchen-tested ingredient weights, cooking times, and USDA-verified internal temperatures developed by Marcus Vance and Elena Rostova. We only embed video players on the {videoRecipes.length} recipes with an exact matching visual technique clip; our remaining {illustratedRecipes.length} recipes are clearly labeled as Step-by-Step Illustrated Guides. Visual media across the site includes AI-assisted culinary illustrations created to demonstrate plating and texture.
        </div>
        <Link
          href="/about#editorial-testing-disclosure"
          className="text-amber-900 font-bold underline shrink-0 hover:text-amber-700"
        >
          Read Testing Standards →
        </Link>
      </div>

      {/* Dedicated 6 Unique Recipe Video Cards Grid */}
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
              Visual Technique Clips ({videoRecipes.length} Unique Recipe Videos)
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Watch &amp; Cook Step-by-Step Video Guides
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Click any card below to play its 12-second clip or open the full recipe card
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoRecipes.map((recipe) => {
            const isCurrentlyPlaying =
              !isMainOverviewClip && activeVideoRecipe.id === recipe.id;
            return (
              <article
                key={recipe.id}
                className={`rounded-xl border bg-white overflow-hidden transition-all flex flex-col ${
                  isCurrentlyPlaying
                    ? 'border-amber-800 ring-2 ring-amber-800/20 shadow-lg'
                    : 'border-slate-200 shadow-xs hover:shadow-lg'
                }`}
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
                  {isCurrentlyPlaying && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-amber-800 text-white text-[11px] font-mono font-bold flex items-center gap-1 shadow-sm pointer-events-none">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active in Main Player</span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1.5">
                      <span className="text-amber-800 font-bold">
                        {recipe.categoryLabelEn}
                      </span>
                      <span>Visual Clip · {recipe.videoDuration || '0:12'}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 leading-snug">
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        className="hover:text-amber-800 transition-colors"
                      >
                        {recipe.titleEn}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {recipe.subtitleEn}
                    </p>
                    {recipe.shortVideoConceptEn && (
                      <div className="mb-3 p-2.5 rounded-lg bg-[#FAF9F6] border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
                        <strong className="text-amber-900">Clip Technique: </strong>
                        {recipe.shortVideoConceptEn}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleSelectClip(recipe)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play in Theater</span>
                    </button>
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
            );
          })}
        </div>
      </section>

      {/* Complete 30 Step-by-Step Illustrated Guides Library */}
      <section className="pt-10 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Step-by-Step Illustrated Guides ({illustratedRecipes.length} Recipes with 3 Stage Photos Each)
              </span>
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Browse Illustrated Recipe Guides
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-800'
              }`}
            >
              All Illustrated ({illustratedRecipes.length})
            </button>
            {SITE_ARCHITECTURE.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-amber-800 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-800'
                }`}
              >
                {cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIllustrated.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
