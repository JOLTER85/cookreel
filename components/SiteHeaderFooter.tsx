import React from 'react';
import Link from 'next/link';
import {
  Flame,
  HelpCircle,
  Mail,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Repeat,
} from 'lucide-react';
import { SITE_ARCHITECTURE, SOCIAL_LINKS } from '@/lib/cookreel-data';

export function SiteHeader({
  activePath = '/',
  rightSlot,
}: {
  activePath?: string;
  rightSlot?: React.ReactNode;
}) {
  const substitutionsSlug =
    '/recipes/ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#FAF9F6]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-amber-800 flex items-center justify-center text-white shadow-sm group-hover:bg-amber-700 transition-colors">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
                Cook<span className="text-amber-800">Reel</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/60">
                www.cookreel.com
              </span>
            </div>
          </Link>
        </div>

        {/* Clean Main Navigation with Real Indexable URLs + Substitutions Guide */}
        <nav
          aria-label="Primary Categories"
          className="hidden xl:flex items-center gap-1 text-sm font-semibold text-slate-700"
        >
          {SITE_ARCHITECTURE.map((cat) => {
            const href = `/category/${cat.slug}`;
            const isActive = activePath === href;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
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
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activePath === substitutionsSlug
                ? 'bg-amber-800 text-white shadow-sm'
                : 'hover:text-amber-800 hover:bg-amber-50/70'
            }`}
          >
            <Repeat className="w-3.5 h-3.5 text-amber-800" />
            <span>Substitutions Guide</span>
          </Link>
          <Link
            href="/qa"
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activePath === '/qa'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'hover:text-amber-800 hover:bg-amber-50/70'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-800" />
            <span>Cooking Q&amp;A</span>
          </Link>
          <Link
            href="/about"
            className={`px-2.5 py-2 rounded-lg transition-colors ${
              activePath === '/about'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'hover:text-amber-800 hover:bg-amber-50/70'
            }`}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          {rightSlot ? (
            rightSlot
          ) : (
            <>
              <Link
                href="/qa"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:border-amber-800 text-xs font-bold text-slate-800 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-800" />
                <span>Cooking Q&amp;A</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>All Recipes</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile / Tablet Scrollable Category Bar */}
      <div className="xl:hidden border-t border-slate-200/70 bg-white px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-bold whitespace-nowrap">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg ${
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
                className={`px-3 py-1.5 rounded-lg ${
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
            className={`px-3 py-1.5 rounded-lg ${
              activePath === substitutionsSlug
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Substitutions Guide
          </Link>
          <Link
            href="/qa"
            className={`px-3 py-1.5 rounded-lg ${
              activePath === '/qa'
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cooking Q&amp;A
          </Link>
          <Link
            href="/about"
            className={`px-3 py-1.5 rounded-lg ${
              activePath === '/about'
                ? 'bg-amber-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`px-3 py-1.5 rounded-lg ${
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
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-slate-800">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-amber-700 flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                CookReel.com
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md mb-4">
              CookReel is an independent culinary publication offering step-by-step recipe guides, short-form cooking clips, 1:1 ingredient substitutions, and USDA-aligned food safety references for everyday home cooks.
            </p>
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-[11px] text-slate-400 leading-relaxed mb-4">
              <strong className="text-amber-400">
                Editorial &amp; Affiliate Disclosure:
              </strong>{' '}
              Recommended cookware and kitchen tools are independently selected by our editorial team. Some &ldquo;Shop Gear&rdquo; links may be affiliate partner links that earn CookReel a small referral commission at no extra cost to you.
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
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-amber-500 hover:text-white transition-colors"
                >
                  <span>{soc.platform}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-3">
              Recipe Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {SITE_ARCHITECTURE.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.labelEn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/videos"
                  className="hover:text-white transition-colors text-amber-300 font-semibold"
                >
                  Video Recipes Hub (/videos)
                </Link>
              </li>
              <li>
                <Link
                  href="/qa"
                  className="hover:text-white transition-colors text-amber-400 font-semibold"
                >
                  Cooking &amp; Meal-Prep Q&amp;A
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-3">
              Popular Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/recipes/15-minute-crispy-cast-iron-salmon-lemon-caper"
                  className="hover:text-white transition-colors"
                >
                  15-Min Crispy Cast-Iron Salmon
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/keto-garlic-herb-butter-ribeye-steak-high-protein"
                  className="hover:text-white transition-colors"
                >
                  Keto Garlic Butter Ribeye Steak
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/air-fryer-or-skillet-golden-lemon-herb-chicken-thighs"
                  className="hover:text-white transition-colors"
                >
                  Air Fryer Lemon Herb Chicken
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide"
                  className="hover:text-white transition-colors"
                >
                  Essential Ingredient Substitutions Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/tropical-mango-berry-swirl-vanilla-bean-cupcakes"
                  className="hover:text-white transition-colors"
                >
                  Tropical Mango &amp; Berry Cupcakes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-3">
              Editorial &amp; Legal Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us &amp; Editorial Process
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy, Cookie &amp; Affiliate Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="pt-2 text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a
                  href="mailto:editorial@cookreel.com"
                  className="hover:text-white underline"
                >
                  editorial@cookreel.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} CookReel (www.cookreel.com). All rights reserved. Written and edited by the CookReel Editorial Team.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>USDA Safe Internal Temperature Guidelines Included on Every Recipe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
