import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Flame,
  ShieldCheck,
  BookOpen,
  Mail,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { SOCIAL_LINKS, SITE_ORIGIN } from '@/lib/cookreel-data';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'About Us & Editorial Process | CookReel',
  description:
    'Learn about the CookReel Editorial Team, our recipe development standards, USDA food safety temperature compliance, and affiliate disclosure policy.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us & Editorial Process | CookReel',
    description:
      'Learn about the CookReel Editorial Team, our recipe development standards, and USDA food safety temperature compliance.',
    url: `${SITE_ORIGIN}/about`,
    type: 'website',
    siteName: 'CookReel',
    images: [{ url: ogImg, width: 1200, height: 630, alt: 'About CookReel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us & Editorial Process | CookReel',
    description:
      'Learn about the CookReel Editorial Team and our recipe development standards.',
    images: [ogImg],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <SiteHeader activePath="/about" />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-8 py-12">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 mb-6"
        >
          <Link href="/" className="hover:text-amber-800 font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">
            About Us &amp; Editorial Process
          </span>
        </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono uppercase tracking-widest mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>About CookReel.com</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Practical Video Recipes, Honest Culinary Guides &amp; Food Science
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              CookReel is an independent digital culinary publication focused on helping everyday home cooks prepare reliable meals using concise step-by-step visuals, gram and milliliter measurements, 1:1 ingredient substitution tables, and official USDA food safety guidelines.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <span>Who Writes &amp; Edits Our Recipes</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Every article, recipe card, and Q&amp;A entry on CookReel is produced and maintained by the <strong>CookReel Editorial Team</strong>—a group of home-cooking writers, recipe developers, and food-safety editors dedicated to clear, repeatable instructions without filler stories or exaggerated claims.
            </p>
            <div className="rounded-xl bg-[#FAF9F6] border border-slate-200 p-5 space-y-3">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Our 4-Point Editorial Standard
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Complete Ingredient Consistency:</strong> Every aromatic, herb, acid, or fat mentioned in the introduction or cooking steps is explicitly listed with metric weights (grams/milliliters) in the recipe card.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>USDA Safe Minimum Internal Temperatures:</strong> All poultry recipes specify <strong>74°C (165°F)</strong>, ground meats specify <strong>71°C (160°F)</strong>, and salmon, fin fish, and whole cuts of beef or pork specify <strong>63°C (145°F)</strong> in accordance with official USDA Food Safety and Inspection Service (FSIS) guidelines.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>1:1 Ingredient Substitutions:</strong> Every recipe includes practical dietary and pantry swaps so you can adapt dishes for dairy-free, gluten-free, or low-carb cooking without guessing ratios.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Authentic Reader Reviews Only:</strong> We never fabricate star ratings or review counts. A recipe shows zero reviews until real readers submit and verify their feedback.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>How CookReel Is Funded (Affiliate &amp; Ad Transparency)</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              All recipes and meal-prep guides on CookReel are free to read and print. To cover hosting, video production, and editorial costs, we display clearly labeled affiliate partner links next to recommended cookware. If you click a &ldquo;Shop Gear&rdquo; link and make a purchase, we may earn a small referral commission at no additional cost to you. Read our full{' '}
              <Link
                href="/privacy#affiliate-disclosure"
                className="text-amber-800 font-semibold underline"
              >
                Privacy, Cookie &amp; Affiliate Disclosure Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Share &amp; Connect With CookReel
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Have a question about an ingredient substitution, found an error in a recipe measurement, or want to collaborate? Reach our editorial desk directly at{' '}
              <a
                href="mailto:editorial@cookreel.com"
                className="font-bold text-amber-800 underline"
              >
                editorial@cookreel.com
              </a>{' '}
              or use our{' '}
              <Link href="/contact" className="font-bold text-amber-800 underline">
                Contact Us form
              </Link>
              .
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-[#FAF9F6] hover:border-amber-800 text-xs font-bold text-slate-800 transition-colors"
                >
                  <span>{soc.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Editorial Team</span>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
