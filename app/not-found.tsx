import React from 'react';
import Link from 'next/link';
import { Flame, Home, BookOpen } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <SiteHeader activePath="/" />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Recipe or Category Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The recipe or category link you followed may have been renamed. Browse all 18 step-by-step recipes and culinary guides below.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>All Recipes</span>
            </Link>
            <Link
              href="/qa"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Cooking Q&amp;A</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
