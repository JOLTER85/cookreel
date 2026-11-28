'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  HelpCircle,
  Mail,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Repeat,
  Search,
  Clock,
  ChevronRight,
} from 'lucide-react';
import {
  SITE_ARCHITECTURE,
  SOCIAL_LINKS,
  COOKREEL_RECIPES,
} from '@/lib/cookreel-data';
import { CookReelBrandLogo } from '@/components/CookReelBrandLogo';

export function SiteHeader({
  activePath = '/',
  rightSlot,
}: {
  activePath?: string;
  rightSlot?: React.ReactNode;
}) {
  const substitutionsSlug = '/substitutions';
  const router = useRouter();
  const [headerSearch, setHeaderSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const matchingRecipes =
    headerSearch.trim().length >= 1
      ? COOKREEL_RECIPES.filter((r) => {
          const q = headerSearch.trim().toLowerCase();
          return (
            r.titleEn.toLowerCase().includes(q) ||
            r.subtitleEn.toLowerCase().includes(q) ||
            r.categoryLabelEn.toLowerCase().includes(q) ||
            r.ingredientsEn.some((i) => i.item.toLowerCase().includes(q))
          );
        }).slice(0, 6)
      : [];

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = headerSearch.trim();
    if (!q) return;
    setSearchFocused(false);
    setMobileSearchOpen(false);
    if (matchingRecipes.length === 1) {
      router.push(`/recipes/${matchingRecipes[0].slug}`);
      return;
    }
    router.push(`/?q=${encodeURIComponent(q)}#recipe-directory`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#FAF9F6]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-3.5 sm:px-8 h-15 sm:h-20 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" aria-label="CookReel Home — cookreel.com">
            <CookReelBrandLogo
              theme="light"
              size="sm"
              showDomain={true}
              showTagline={false}
            />
          </Link>
        </div>

        {/* Clean Main Navigation with Real Indexable URLs + Substitutions Guide */}
        <nav
          aria-label="Primary Categories"
          className="hidden xl:flex items-center gap-0.5 text-xs font-bold text-slate-700"
        >
          {SITE_ARCHITECTURE.map((cat) => {
            const href = `/category/${cat.slug}`;
            const isActive = activePath === href;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'hover:text-amber-800 hover:bg-amber-50/70'
                }`}
              >
                <span>{cat.labelEn}</span>
              </Link>
            );
          })}
          <Link
            href={substitutionsSlug}
            className={`px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              activePath === substitutionsSlug
                ? 'bg-amber-800 text-white shadow-sm'
                : 'hover:text-amber-800 hover:bg-amber-50/70'
            }`}
          >
            <Repeat
              className={`w-3.5 h-3.5 ${
                activePath === substitutionsSlug ? 'text-white' : 'text-amber-800'
              }`}
            />
            <span>Substitutions Guide</span>
          </Link>
          <Link
            href="/qa"
            className={`px-2.5 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
              activePath === '/qa'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'hover:text-amber-800 hover:bg-amber-50/70'
            }`}
          >
            <HelpCircle
              className={`w-3.5 h-3.5 ${
                activePath === '/qa' ? 'text-white' : 'text-amber-800'
              }`}
            />
            <span>Cooking Q&amp;A</span>
          </Link>
          <Link
            href="/about"
            className={`px-2.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activePath === '/about'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'hover:text-amber-800 hover:bg-amber-50/70'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Global Recipe Search Bar + Action Slot */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Search Toggle Button (40x40px touch target on phones) */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label="Open recipe search"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 bg-white text-slate-700 hover:border-amber-800 hover:text-amber-800 active:scale-95 transition-all"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Tablet & Desktop Inline Search Bar */}
          <div className="relative hidden md:block">
            <form onSubmit={handleHeaderSearchSubmit} className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={headerSearch}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                onChange={(e) => {
                  setHeaderSearch(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search recipes (e.g. salmon, chicken)..."
                aria-label="Search recipes or ingredients"
                className="w-56 lg:w-64 pl-8 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-800 focus:ring-2 focus:ring-amber-800/15 transition-all"
              />
            </form>

            {/* Instant Recipe Search Results Dropdown */}
            {searchFocused && headerSearch.trim().length >= 1 && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white shadow-2xl z-50 overflow-hidden">
                <div className="px-3.5 py-2 bg-[#FAF9F6] border-b border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Matching Recipes ({matchingRecipes.length})</span>
                  <span>Press Enter to search</span>
                </div>
                {matchingRecipes.length === 0 ? (
                  <div className="p-4 text-xs text-slate-500">
                    No recipes found for &ldquo;{headerSearch}&rdquo;. Try searching for{' '}
                    <span className="font-semibold text-slate-700">
                      chicken, salmon, pasta, keto, or lentil
                    </span>
                    .
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {matchingRecipes.map((rec) => (
                      <li key={rec.id}>
                        <Link
                          href={`/recipes/${rec.slug}`}
                          onClick={() => setSearchFocused(false)}
                          className="px-3.5 py-2.5 hover:bg-amber-50/70 flex items-center justify-between gap-3 transition-colors group"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800 truncate">
                              {rec.titleEn}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5 font-mono">
                              <span>{rec.categoryLabelEn.split('·')[0]}</span>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-800" />
                                {rec.prepMinutes + rec.cookMinutes}m
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-800 shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {rightSlot ? (
            rightSlot
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm shrink-0 whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>All Recipes</span>
            </Link>
          )}
        </div>
      </div>

      {/* Expandable Full-Width Mobile Search Drawer (Zero iOS Zoom, Instant Results) */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-3.5 py-3 shadow-lg">
          <form onSubmit={handleHeaderSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              autoFocus
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Search salmon, chicken, 15-min pasta..."
              aria-label="Search recipes or ingredients"
              className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-300 bg-[#FAF9F6] text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-800"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold"
            >
              Search
            </button>
          </form>

          {/* Quick 1-Tap Popular Search Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5">
            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              Try:
            </span>
            {['Salmon', 'Chicken', 'Pasta', 'Keto', 'Lentil', 'Shrimp'].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setHeaderSearch(term)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-amber-50 text-slate-700 text-xs font-semibold shrink-0"
                >
                  {term}
                </button>
              )
            )}
          </div>

          {headerSearch.trim().length >= 1 && (
            <div className="mt-2.5 rounded-xl border border-slate-200 bg-[#FAF9F6] overflow-hidden">
              {matchingRecipes.length === 0 ? (
                <div className="p-3 text-xs text-slate-500">
                  No match for &ldquo;{headerSearch}&rdquo;. Try another ingredient.
                </div>
              ) : (
                <ul className="divide-y divide-slate-200/70 max-h-64 overflow-y-auto">
                  {matchingRecipes.map((rec) => (
                    <li key={rec.id}>
                      <Link
                        href={`/recipes/${rec.slug}`}
                        onClick={() => setMobileSearchOpen(false)}
                        className="px-3.5 py-2.5 flex items-center justify-between gap-2 active:bg-amber-100/60"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {rec.titleEn}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {rec.prepMinutes + rec.cookMinutes} mins · {rec.calories} kcal
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-amber-800 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile / Tablet Smooth Scrollable Category Bar */}
      <div className="xl:hidden border-t border-slate-200/70 bg-white px-3.5 py-1.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 text-xs font-bold whitespace-nowrap">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePath === '/'
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Home
          </Link>
          {SITE_ARCHITECTURE.map((cat) => {
            const href = `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activePath === href
                    ? 'bg-amber-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.labelEn}
              </Link>
            );
          })}
          <Link
            href={substitutionsSlug}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePath === substitutionsSlug
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Substitutions Guide
          </Link>
          <Link
            href="/qa"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePath === '/qa'
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cooking Q&amp;A
          </Link>
          <Link
            href="/about"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePath === '/about'
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePath === '/contact'
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const handleOpenCookiePreferences = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookreel:open-cookie-banner'));
    }
  };

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-slate-200">
          <div className="lg:col-span-2">
            <Link
              href="/"
              aria-label="CookReel Home — cookreel.com"
              className="inline-block mb-4"
            >
              <CookReelBrandLogo
                theme="light"
                size="md"
                showDomain={true}
                showTagline={true}
              />
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mb-4">
              CookReel is an independent culinary publication offering step-by-step recipe guides, visual technique clips, 1:1 ingredient substitutions, and USDA-aligned food safety references developed by Marcus Vance and Elena Rostova.
            </p>
            <div className="rounded-lg border border-slate-200 bg-[#FAF9F6] p-3 text-[11px] text-slate-700 leading-relaxed mb-4">
              <strong className="text-slate-900">
                Editorial Independence &amp; Visual Media Disclosure:
              </strong>{' '}
              Recipe ratios, gram-to-cup conversions, and USDA internal cooking temperatures are editorially verified. Cookware mentions are unsponsored equipment notes (no commercial affiliate links). Step photographs and short motion clips include AI-assisted culinary illustrations.
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target={soc.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    soc.url.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#FAF9F6] px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-amber-800 hover:text-amber-900 transition-colors"
                >
                  <span>{soc.platform}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 font-bold mb-3">
              Recipe Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {SITE_ARCHITECTURE.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-amber-800 transition-colors"
                  >
                    {cat.labelEn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/substitutions"
                  className="hover:text-amber-950 transition-colors text-amber-800 font-semibold"
                >
                  1:1 Substitutions Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="hover:text-amber-950 transition-colors text-amber-800 font-semibold"
                >
                  Video Recipes Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/qa"
                  className="hover:text-amber-950 transition-colors text-amber-900 font-semibold"
                >
                  Cooking &amp; Meal-Prep Q&amp;A
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 font-bold mb-3">
              Popular Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/recipes/15-minute-crispy-cast-iron-salmon-lemon-caper"
                  className="hover:text-amber-800 transition-colors"
                >
                  15-Min Crispy Cast-Iron Salmon
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/keto-garlic-herb-butter-ribeye-steak-high-protein"
                  className="hover:text-amber-800 transition-colors"
                >
                  Keto Garlic Butter Ribeye Steak
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/air-fryer-or-skillet-golden-lemon-herb-chicken-thighs"
                  className="hover:text-amber-800 transition-colors"
                >
                  Air Fryer Lemon Herb Chicken
                </Link>
              </li>
              <li>
                <Link
                  href="/substitutions"
                  className="hover:text-amber-800 transition-colors"
                >
                  Essential Ingredient Substitutions Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/tropical-mango-berry-swirl-vanilla-bean-cupcakes"
                  className="hover:text-amber-800 transition-colors"
                >
                  Tropical Mango &amp; Berry Cupcakes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 font-bold mb-3">
              Editorial &amp; Legal Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-800 transition-colors">
                  About Us &amp; Culinary Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-800 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-800 transition-colors">
                  Privacy &amp; Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-800 transition-colors">
                  Terms &amp; Conditions (DMCA)
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookiePreferences}
                  className="hover:text-amber-800 transition-colors underline text-left cursor-pointer"
                >
                  Manage Cookie Preferences
                </button>
              </li>
              <li className="pt-2 text-slate-600 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <a
                  href="mailto:editorial@cookreel.com"
                  className="hover:text-amber-900 underline font-medium"
                >
                  editorial@cookreel.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} CookReel. All rights reserved. Recipes developed and verified by Marcus Vance &amp; Elena Rostova.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>USDA Safe Internal Temperature Guidelines Included on Every Recipe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
