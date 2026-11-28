import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { SITE_ORIGIN } from '@/lib/cookreel-data';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'Terms & Conditions, USDA Safety Disclaimer & DMCA Policy | CookReel',
  description:
    'Terms of Use, USDA Food Safety & Nutritional Disclaimer, DMCA Copyright Takedown Procedure, Limitation of Liability, and Governing Law for CookReel (cookreel.com).',
  alternates: {
    canonical: 'https://cookreel.com/terms',
  },
  openGraph: {
    title: 'Terms & Conditions, USDA Safety Disclaimer & DMCA Policy | CookReel',
    description:
      'Terms of Use, USDA Food Safety & Nutritional Disclaimer, DMCA Takedown Policy, and User Submission Moderation Rules for CookReel.',
    url: `${SITE_ORIGIN}/terms`,
    type: 'website',
    siteName: 'CookReel',
    images: [{ url: ogImg, width: 1200, height: 630, alt: 'CookReel Terms' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions, USDA Safety Disclaimer & DMCA Policy | CookReel',
    description:
      'Terms of Use, USDA Food Safety & Nutritional Disclaimer, and DMCA Takedown Policy for CookReel.',
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
              <span>Effective Date: November 1, 2026 · Last Updated: November 28, 2026</span>
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Terms &amp; Conditions, Food Safety Disclaimer &amp; DMCA Policy
            </h1>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              1. USDA Food Safety, Allergen &amp; Kitchen Equipment Disclaimer
            </h2>
            <p>
              Home cooks are solely responsible for verifying safe internal cooking temperatures with a calibrated food thermometer in accordance with official <strong>USDA Food Safety and Inspection Service (FSIS)</strong> guidelines: <strong>74°C (165°F)</strong> for all poultry, ground poultry, and reheated leftovers; <strong>71°C (160°F)</strong> for ground beef, pork, and lamb; and <strong>63°C (145°F)</strong> for fin fish/salmon and whole cuts of beef, pork, veal, and lamb (followed by a 3-minute rest). You are responsible for inspecting all ingredient labels for food allergens (including dairy, eggs, tree nuts, shellfish, wheat, and soy) and exercising caution with hot cast-iron skillets, sharp knives, and heating appliances.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              2. Nutritional &amp; Medical Disclaimer
            </h2>
            <p>
              Calorie, protein, and net carbohydrate figures published on <strong>cookreel.com</strong> are calculated per serving using standard USDA FoodData Central raw ingredient values. Actual nutritional values may vary based on specific brands, portion sizes, or 1:1 ingredient substitutions. Our Keto, Low-Carb, and High-Protein guides are provided strictly for informational culinary purposes and do not constitute medical, nutritional, or dietetic advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              3. User Submissions, Turnstile Verification &amp; Moderation Policy
            </h2>
            <p>
              When submitting a recipe, cooking question, or reader review on CookReel, you must complete our human session verification challenge and confirm that your submission is your own original work. By submitting content, you grant CookReel a non-exclusive, royalty-free license to display, format, and moderate the submission on <strong>cookreel.com</strong>. Automated spam, promotional links, plagiarized recipes, or unsafe food-handling recommendations are strictly prohibited and subject to removal.
            </p>
          </section>

          <section className="space-y-2 rounded-xl bg-[#FAF9F6] border border-slate-200 p-5">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              4. DMCA Copyright Notice &amp; Takedown Procedure (17 U.S.C. § 512)
            </h2>
            <p>
              CookReel respects intellectual property rights and complies with the Digital Millennium Copyright Act (&ldquo;DMCA&rdquo;). If you believe any recipe text, user submission, or visual illustration on <strong>cookreel.com</strong> infringes your copyright, please send a written DMCA Takedown Notice to our designated Copyright Agent at{' '}
              <a
                href="mailto:editorial@cookreel.com"
                className="text-amber-800 font-bold underline"
              >
                editorial@cookreel.com
              </a>{' '}
              including:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm">
              <li>Identification of the copyrighted work claimed to have been infringed;</li>
              <li>The exact URL on `https://cookreel.com` containing the allegedly infringing material;</li>
              <li>Your full legal name, mailing address, telephone number, and email address;</li>
              <li>A statement that you have a good-faith belief that use of the material is not authorized by the copyright owner, its agent, or the law;</li>
              <li>A statement made under penalty of perjury that the information in your notice is accurate and that you are the copyright owner or authorized to act on the owner&apos;s behalf, accompanied by your physical or electronic signature.</li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              5. Limitation of Liability &amp; Warranty Disclaimer
            </h2>
            <p>
              All recipes, cooking clips, substitution tables, and culinary guides on CookReel are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, either express or implied. To the fullest extent permitted by applicable law, CookReel Culinary Media and its editors (Marcus Vance and Elena Rostova) shall not be liable for any direct, indirect, incidental, or consequential damages arising from kitchen accidents, foodborne illness, allergic reactions, or reliance on nutritional estimates.
            </p>
          </section>

          <section className="space-y-2 pt-3 border-t border-slate-200">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              6. Governing Law &amp; Intellectual Property
            </h2>
            <p>
              These Terms &amp; Conditions are governed by and construed in accordance with the laws of the State of Delaware and applicable federal laws of the United States, without regard to conflict-of-law principles. You may print individual recipe cards from <strong>cookreel.com</strong> for personal, non-commercial home cooking use. For licensing or legal inquiries, contact{' '}
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
