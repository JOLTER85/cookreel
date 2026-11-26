import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { SITE_ORIGIN } from '@/lib/cookreel-data';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'Privacy, Cookie & Affiliate Disclosure Policy | CookReel',
  description:
    'CookReel Privacy Policy, GDPR/EEA Cookie Consent details, Google AdSense DART cookie disclosure, and FTC Affiliate Disclosure.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy, Cookie & Affiliate Disclosure Policy | CookReel',
    description:
      'CookReel Privacy Policy, GDPR/EEA Cookie Consent details, and FTC Affiliate Disclosure.',
    url: `${SITE_ORIGIN}/privacy`,
    type: 'website',
    siteName: 'CookReel',
    images: [{ url: ogImg, width: 1200, height: 630, alt: 'CookReel Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy, Cookie & Affiliate Disclosure Policy | CookReel',
    description:
      'CookReel Privacy Policy, GDPR/EEA Cookie Consent details, and FTC Affiliate Disclosure.',
    images: [ogImg],
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <SiteHeader activePath="/privacy" />

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
            Privacy, Cookie &amp; Affiliate Policy
          </span>
        </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Last Updated: November 2026</span>
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Privacy Policy, GDPR Cookie Consent &amp; Affiliate Disclosure
            </h1>
          </div>

          <section id="affiliate-disclosure" className="space-y-2 rounded-xl bg-amber-50/70 border border-amber-200 p-5">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              1. Editorial &amp; Affiliate Link Disclosure
            </h2>
            <p>
              In compliance with Federal Trade Commission (FTC) disclosure guidelines, please note that some &ldquo;Shop Gear&rdquo; or cookware links on CookReel (<strong>www.cookreel.com</strong>) may be affiliate partner links. If you click an affiliate link and complete a purchase, CookReel may earn a small referral commission at no additional cost to you. Our editorial team selects cookware strictly based on culinary utility (such as heat retention for cast-iron searing or air-fryer circulation), never on commission rates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              2. Google AdSense &amp; DoubleClick DART Cookie Disclosure
            </h2>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to CookReel or other websites on the internet. Google&apos;s use of advertising cookies enables it and its partners to serve personalized or non-personalized ads to visitors. Users may opt out of personalized advertising at any time by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 font-semibold underline"
              >
                Google Ads Settings
              </a>{' '}
              or by selecting &ldquo;Essential Only&rdquo; in our site-wide Cookie Consent Banner.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              3. GDPR / EEA &amp; CCPA Cookie Consent Rights
            </h2>
            <p>
              Visitors from the European Economic Area (EEA), the United Kingdom, and California can control their cookie preferences using the consent banner displayed on their first visit. Essential cookies store only your local consent choice and recipe checklist state. Optional analytics and advertising cookies are only enabled if you select &ldquo;Accept All Cookies.&rdquo;
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              4. Information We Collect Directly
            </h2>
            <p>
              If you voluntarily subscribe to our weekly meal-prep email list, submit a recipe review, ask a cooking question, or send a message via our Contact form, we collect the name and email address you provide solely to respond to your inquiry or display your review. We never sell or rent subscriber email addresses to third parties.
            </p>
          </section>

          <section className="space-y-2 pt-3 border-t border-slate-200">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              5. Privacy Contact
            </h2>
            <p>
              To request deletion of a review, newsletter subscription, or contact inquiry, email our privacy officer at{' '}
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
