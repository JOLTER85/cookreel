import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Mail } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import ContactFormClient from '@/components/ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact Us — Culinary Editorial Desk & Recipe Inquiries | CookReel',
  description:
    'Contact CookReel culinary editors Marcus Vance and Elena Rostova for recipe questions, 1:1 ingredient substitution help, editorial corrections, or GDPR/DMCA inquiries.',
  alternates: {
    canonical: 'https://cookreel.com/contact',
  },
  openGraph: {
    title: 'Contact Us — Culinary Editorial Desk & Recipe Inquiries | CookReel',
    description:
      'Get in touch with CookReel culinary editors Marcus Vance and Elena Rostova for recipe questions, ingredient substitutions, or editorial feedback.',
    url: 'https://cookreel.com/contact',
    siteName: 'CookReel',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <SiteHeader activePath="/contact" />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-8 py-12">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 mb-6"
        >
          <Link href="/" className="hover:text-amber-800 font-semibold">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">Contact Us</span>
        </nav>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-mono uppercase tracking-widest mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>CookReel Editorial Desk</span>
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">
              Contact the CookReel Culinary Team
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Have a question for Executive Culinary Director{' '}
              <strong className="text-slate-900">Marcus Vance</strong> or Food Science Editor{' '}
              <strong className="text-slate-900">Elena Rostova</strong> about a recipe step, gram-to-cup conversion, 1:1 ingredient substitution, or editorial correction? Email us directly at{' '}
              <a
                href="mailto:editorial@cookreel.com"
                className="font-bold text-amber-800 underline"
              >
                editorial@cookreel.com
              </a>{' '}
              or send a message below. We typically respond within 24–48 business hours.
            </p>
          </div>

          <ContactFormClient />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
