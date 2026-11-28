import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { SITE_ORIGIN } from '@/lib/cookreel-data';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'Privacy Policy, GDPR Cookie Consent & Data Retention | CookReel',
  description:
    'CookReel Privacy Policy: Data Controller identity, GDPR/EEA & CCPA rights, strict pre-consent blocking of non-essential cookies, Double Opt-In newsletter privacy, and data retention schedule.',
  alternates: {
    canonical: 'https://cookreel.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy, GDPR Cookie Consent & Data Retention | CookReel',
    description:
      'CookReel Privacy Policy: Data Controller identity, GDPR/EEA & CCPA rights, cookie consent controls, and data retention schedule.',
    url: `${SITE_ORIGIN}/privacy`,
    type: 'website',
    siteName: 'CookReel',
    images: [{ url: ogImg, width: 1200, height: 630, alt: 'CookReel Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy, GDPR Cookie Consent & Data Retention | CookReel',
    description:
      'CookReel Privacy Policy: Data Controller identity, GDPR/EEA & CCPA rights, and data retention schedule.',
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
            Privacy &amp; Cookie Policy
          </span>
        </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Effective Date: November 1, 2026 · Last Updated: November 28, 2026</span>
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Privacy Policy, GDPR Cookie Consent &amp; Data Protection
            </h1>
          </div>

          <section className="space-y-2 rounded-xl bg-[#FAF9F6] border border-slate-200 p-5">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              1. Data Controller Identity &amp; Contact Information
            </h2>
            <p>
              For the purposes of the General Data Protection Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;), the UK GDPR, and the California Consumer Privacy Act (&ldquo;CCPA/CPRA&rdquo;), the Data Controller responsible for personal data processed on <strong>cookreel.com</strong> is:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>
                <strong>Entity Name:</strong> CookReel Culinary Media (&ldquo;CookReel&rdquo;)
              </li>
              <li>
                <strong>Website Domain:</strong> https://cookreel.com
              </li>
              <li>
                <strong>Data Protection &amp; Privacy Contact:</strong>{' '}
                <a
                  href="mailto:editorial@cookreel.com"
                  className="text-amber-800 font-bold underline"
                >
                  editorial@cookreel.com
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              2. Strict Pre-Consent Blocking of Non-Essential Cookies (GDPR / ePrivacy)
            </h2>
            <p>
              By default, CookReel operates in <strong>Essential-Only Mode</strong> until you make an explicit choice in our Cookie Consent Banner. No non-essential analytics, advertising, or third-party tracking scripts are loaded prior to your opt-in consent:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Strictly Necessary Storage (`cookreel_cookie_consent_v1`):</strong> Stores your cookie consent state (`essential_only` or `accepted_all`) and timestamp in your browser&apos;s local storage so we do not repeatedly prompt you on every page view.
              </li>
              <li>
                <strong>Cloudflare Turnstile Anti-Spam Verification:</strong> Used on interactive submission forms (Contact, Recipe Reviews, Q&amp;A, and Recipe Submissions) solely to protect the service from automated spam bots without cross-site ad tracking.
              </li>
              <li>
                <strong>Optional Analytics &amp; Advertising Cookies:</strong> Only initialized if you explicitly click &ldquo;Accept All Cookies.&rdquo; You can revoke or modify your choice at any time using the <strong>Manage Cookie Preferences</strong> button in the site footer.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              3. Information We Collect &amp; Legal Basis for Processing
            </h2>
            <p>
              We only collect personal data that you voluntarily submit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Newsletter Subscriptions (Consent — GDPR Art. 6(1)(a)):</strong> When you enter your email address and check the explicit Privacy Policy consent box, we send a <strong>Double Opt-In</strong> confirmation request. Your email is used exclusively to send our weekly meal-prep dispatch and can be unsubscribed with one click at any time.
              </li>
              <li>
                <strong>Contact Inquiries (Legitimate Interest / Pre-Contractual — GDPR Art. 6(1)(b/f)):</strong> Name, email address, and message body submitted via `/contact` are used solely to reply to your editorial or technical inquiry.
              </li>
              <li>
                <strong>Public Recipe Reviews &amp; Q&amp;A Submissions (Consent — GDPR Art. 6(1)(a)):</strong> Your chosen display name and review/question text are published on the corresponding recipe or Q&amp;A page.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              4. Data Retention Schedule
            </h2>
            <p>
              We retain personal data only for as long as necessary to fulfill the stated purpose:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>
                <strong>Contact Form Inquiries:</strong> Deleted automatically within <strong>90 days</strong> after your inquiry is resolved.
              </li>
              <li>
                <strong>Newsletter Subscriber Emails:</strong> Retained until you click &ldquo;Unsubscribe&rdquo; or request erasure; unsubscribed addresses are purged within <strong>7 days</strong>.
              </li>
              <li>
                <strong>Published Reader Reviews &amp; Q&amp;A Questions:</strong> Retained while the recipe remains published, or deleted within <strong>48 hours</strong> of a removal request sent to <a href="mailto:editorial@cookreel.com" className="text-amber-800 underline">editorial@cookreel.com</a>.
              </li>
              <li>
                <strong>Browser Cookie Consent Choice:</strong> Stored locally in your browser for <strong>180 days</strong> or until you clear site data.
              </li>
            </ul>
          </section>

          <section id="affiliate-disclosure" className="space-y-2 rounded-xl bg-amber-50/70 border border-amber-200 p-5">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              5. Editorial Independence, Visual Media &amp; Commercial Policy
            </h2>
            <p>
              CookReel does not embed undisclosed affiliate links or simulated store pricing. All cookware recommendations in our recipe guides (such as a 12-inch seasoned cast-iron skillet or instant-read food thermometer) are non-commercial equipment notes selected by Marcus Vance and Elena Rostova for culinary performance. Should CookReel join any FTC-regulated affiliate program in the future, every commercial link will be explicitly marked with `rel=&quot;sponsored&quot;` and an immediate adjacent disclosure prior to click.
            </p>
          </section>

          <section className="space-y-2 pt-3 border-t border-slate-200">
            <h2 className="font-serif text-xl font-bold text-slate-900">
              6. Your GDPR, UK GDPR &amp; CCPA Privacy Rights
            </h2>
            <p>
              Regardless of your location, you have the right to request access to, correction of, portability of, or complete deletion (Right to Erasure) of any personal data associated with your email address or name. We never sell or share personal information for cross-context behavioral advertising. To exercise your rights, email{' '}
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
