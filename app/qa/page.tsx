import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { COOKING_QA_KNOWLEDGE_BASE, SITE_ORIGIN } from '@/lib/cookreel-data';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { QaKnowledgeBaseClient } from '@/components/QaKnowledgeBaseClient';

const ogImg = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  title: 'Cooking & Meal-Prep Q&A Knowledge Base (36 Guides) | CookReel',
  description:
    'Science-backed answers to 36 common cooking, food preparation, USDA safe internal temperature, and 1:1 ingredient substitution questions—including the top 20 most-asked questions from the last 30 days.',
  alternates: {
    canonical: '/qa',
  },
  openGraph: {
    title: 'Cooking & Meal-Prep Q&A Knowledge Base (36 Guides) | CookReel',
    description:
      'Science-backed answers to 36 common cooking, food preparation, USDA safe internal temperature, and 1:1 ingredient substitution questions—including the top 20 most-asked questions from the last 30 days.',
    url: `${SITE_ORIGIN}/qa`,
    type: 'website',
    siteName: 'CookReel',
    images: [{ url: ogImg, width: 1200, height: 630, alt: 'CookReel Q&A' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cooking & Meal-Prep Q&A Knowledge Base (36 Guides) | CookReel',
    description:
      'Science-backed answers to 36 common cooking, food preparation, and USDA safe internal temperature questions.',
    images: [ogImg],
  },
};

export default function QaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: COOKING_QA_KNOWLEDGE_BASE.map((item) => ({
      '@type': 'Question',
      name: item.questionEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.shortAnswerEn} ${item.detailedStepsEn.join(' ')}`,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader activePath="/qa" />

      <main className="flex-1">
        <div className="bg-slate-900 text-white border-b border-slate-800 py-10">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-slate-400 mb-4"
            >
              <Link href="/" className="hover:text-amber-300 font-semibold">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-white font-bold">
                Cooking &amp; Meal-Prep Q&amp;A
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>36 Culinary Guides · Includes Top 20 Most-Asked Questions (Last 30 Days)</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
              Cooking &amp; Food Preparation Q&amp;A Knowledge Base
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Practical answers to 36 everyday cooking, meal-prep storage, Air Fryer troubleshooting, baking substitutions, and official USDA safe minimum internal temperature questions—featuring the 20 most-searched culinary questions from the past 30 days.
            </p>
          </div>
        </div>

        <QaKnowledgeBaseClient />
      </main>

      <SiteFooter />
    </div>
  );
}
