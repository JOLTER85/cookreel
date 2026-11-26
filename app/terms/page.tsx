import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';

const siteUrl = process.env.APP_URL || 'https://cookreel.com';
const ogImg = `${siteUrl}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'Terms & Conditions, USDA Safety Disclaimer & Moderation Policy | CookReel',
  description:
    'Terms of Use, USDA Food Safety & Nutritional Disclaimer, Copyright Policy, and User Submission Moderation Rules for CookReel.com.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms & Conditions & USDA Food Safety Disclaimer | CookReel',
    description:
      'Terms of Use, USDA Food Safety & Nutritional Disclaimer, and User Submission Moderation Rules for CookReel.com.',
    url: `${siteUrl}/terms`,
    type: 'website',
    siteName: 'CookReel',
    images: [{ url: ogImg, width: 1200, height: 630, alt: 'CookReel Terms' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions & USDA Food Safety Disclaimer | CookReel',
    description:
      'Terms of Use, USDA Food Safety & Nutritional Disclaimer, and User Submission Moderation Rules for CookReel.com.',
    images: [ogImg],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <SiteHeader activePath="/terms" />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-8 py-12">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 mb-6"
        >
          <Link href="/" className="hover:text-amber-800 font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">Terms &amp; Conditions</span>
        </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono uppercase tracking-widest mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Terms of Service &amp; Culinary Disclaimers</span>
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Terms &amp; Conditions, Food Safety Disclaimer &amp; Moderation Policy
            </h1>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              1. USDA Food Safety &amp; Kitchen Equipment Disclaimer
            </h2>
            <p>
              Home cooks are responsible for verifying safe internal cooking temperatures with a calibrated food thermometer in accordance with official <strong>USDA Food Safety and Inspection Service (FSIS)</strong> guidelines: <strong>74°C (165°F)</strong> for all poultry, ground poultry, and reheated leftovers; <strong>71°C (160°F)</strong> for ground beef, pork, and lamb; and <strong>63°C (145°F)</strong> for fin fish/salmon and whole cuts of beef, pork, veal, and lamb (with a 3-minute rest). Exercise caution when handling hot cast-iron skillets, sharp knives, and heating appliances.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              2. Nutritional &amp; Medical Disclaimer
            </h2>
            <p>
              Calorie, protein, and net carbohydrate figures published on CookReel are estimated calculations based on standard USDA FoodData Central ingredient values. Actual nutritional values may vary based on specific brands, portion sizes, or ingredient substitutions. Our Keto, Low-Carb, and High-Protein guides are for informational culinary purposes only and do not constitute medical or dietetic advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              3. User Submissions, Anti-Spam CAPTCHA &amp; Copyright Policy
            </h2>
            <p>
              When submitting a recipe, cooking question, or reader review on CookReel, you must complete our anti-spam verification challenge and confirm that your submission is your own original work and does not infringe on any third-party copyright. Automated spam, promotional links, plagiarized recipes, or unsafe food-handling recommendations are strictly prohibited and subject to removal by the CookReel Editorial Team.
            </p>
          </section>

          <section className="space-y-2 pt-3 border-t border-slate-200">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              4. Intellectual Property
            </h2>
            <p>
              All original recipe text, step-by-step video clips, photography, and structured guides on CookReel.com are protected by copyright. You may print individual recipe cards for personal, non-commercial home cooking use. For syndication or licensing requests, contact{' '}
              <a
                href="mailto:editorial@cookreel.com"
                className="text-amber-800 font-bold underline"
              >
                editorial@cookreel.com
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
