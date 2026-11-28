import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Mail,
  CheckCircle2,
  Award,
  Camera,
} from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { CookReelBrandLogo } from '@/components/CookReelBrandLogo';
import { AUTHOR_PROFILES, SITE_ORIGIN } from '@/lib/cookreel-data';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'About Our Culinary Editors, Recipe Testing & Media Disclosure | CookReel',
  description:
    'Meet CookReel culinary editors Marcus Vance and Elena Rostova. Learn about our recipe testing standards, USDA food safety compliance, and transparent visual media disclosure.',
  alternates: {
    canonical: 'https://cookreel.com/about',
  },
  openGraph: {
    title: 'About Our Culinary Editors, Recipe Testing & Media Disclosure | CookReel',
    description:
      'Meet CookReel culinary editors Marcus Vance and Elena Rostova. Learn about our recipe testing standards, USDA food safety compliance, and visual media disclosure.',
    url: `${SITE_ORIGIN}/about`,
    type: 'website',
    siteName: 'CookReel',
    images: [{ url: ogImg, width: 1200, height: 630, alt: 'About CookReel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Culinary Editors, Recipe Testing & Media Disclosure | CookReel',
    description:
      'Meet CookReel culinary editors Marcus Vance and Elena Rostova and read our recipe testing standards.',
    images: [ogImg],
  },
};

export default function AboutPage() {
  const authors = Object.values(AUTHOR_PROFILES);

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
            About Our Culinary Editors &amp; Standards
          </span>
        </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-slate-200 pb-6">
            <div className="mb-5">
              <CookReelBrandLogo
                theme="light"
                size="lg"
                showDomain={true}
                showTagline={true}
              />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Practical Video Recipes, Named Culinary Editors &amp; Food Science
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              CookReel (<strong>cookreel.com</strong>) is an independent digital culinary publication focused on helping everyday home cooks prepare reliable weeknight meals using dual Metric &amp; US Customary measurements, 1:1 ingredient substitution tables, and official USDA food safety guidelines.
            </p>
          </div>

          {/* Named Culinary Authors Section (Audit Item 14) */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-800" />
              <span>Meet Our Recipe Developers &amp; Culinary Editors</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Every recipe card, calorie calculation, and Q&amp;A guide on CookReel is authored, tested, and signed by a named culinary editor with verifiable kitchen experience:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {authors.map((author) => (
                <div
                  key={author.slug}
                  id={author.slug}
                  className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-5 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-amber-800 text-white font-serif font-bold text-base flex items-center justify-center shrink-0">
                      {author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        {author.name}
                      </h3>
                      <div className="text-xs font-mono text-amber-800 font-bold">
                        {author.roleEn}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
                    {author.credentialsEn} · {author.yearsExperience}+ Years Experience
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {author.bioEn}
                  </p>
                  <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                    <strong>Specialties:</strong> {author.specialtyEn}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4-Point Editorial & USDA Testing Standard */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <span>Our 4-Point Recipe Verification Standard</span>
            </h2>
            <div className="rounded-xl bg-[#FAF9F6] border border-slate-200 p-5 space-y-3">
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dual Metric &amp; US Customary Weights:</strong> Every ingredient is weighed in grams/milliliters and paired with an interactive US Customary (ounces/cups/tablespoons) converter inside the recipe card.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>USDA FoodData Central Nutritional Math:</strong> Calorie, protein, and net carbohydrate figures are calculated per serving directly from USDA FoodData Central raw weight values—never guessed or under-reported.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>USDA Safe Minimum Internal Temperatures:</strong> All poultry recipes specify <strong>74°C (165°F)</strong>, ground meats specify <strong>71°C (160°F)</strong>, and salmon, fin fish, and whole cuts of beef or pork specify <strong>63°C (145°F)</strong> in accordance with official USDA FSIS guidelines.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Authentic Reader Reviews Only:</strong> We never fabricate star ratings or review counts. A recipe displays zero reviews until real readers submit and verify their feedback.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Transparent Visual Media & AI Illustration Disclosure (Audit Item 4) */}
          <section
            id="editorial-testing-disclosure"
            className="space-y-3 pt-4 border-t border-slate-200"
          >
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-800" />
              <span>Visual Media &amp; AI-Assisted Illustration Disclosure</span>
            </h2>
            <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-5 space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>Transparency Notice:</strong> While all 36 recipes on CookReel are formulated around kitchen-tested ingredient weights, pan-searing timings, and USDA-verified internal temperatures, our visual media library combines digital photography and <strong>AI-assisted culinary illustrations &amp; short motion technique clips</strong> designed to demonstrate plating, heat zones, and texture stages.
              </p>
              <p>
                We strictly avoid labeling AI-assisted visual clips as &ldquo;live recorded kitchen footage,&rdquo; and we only embed video players on the 6 recipes that have a dedicated matching visual clip. The remaining 30 recipes are transparently categorized as <strong>Step-by-Step Illustrated Guides</strong> with 3 distinct stage images per recipe.
              </p>
            </div>
          </section>

          {/* Editorial Independence & No Fake Affiliates (Audit Item 5) */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Editorial Independence &amp; Commercial Policy</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              All recipes and meal-prep guides on CookReel are free to read and print. Recommended cookware notes (such as a 12-inch seasoned cast-iron skillet or digital instant-read thermometer) are non-commercial equipment specifications chosen by our editors for heat retention and food safety. CookReel does not display fake affiliate buttons or simulated store pricing. Read our full{' '}
              <Link
                href="/privacy"
                className="text-amber-800 font-semibold underline"
              >
                Privacy &amp; Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Contact Our Culinary Editorial Desk
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Have a question about an ingredient substitution, found an error in a recipe measurement, or want to request a recipe test? Reach Marcus Vance and Elena Rostova directly at{' '}
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
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
