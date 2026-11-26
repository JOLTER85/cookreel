'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] text-slate-900 px-4">
      <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-lg text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-xl bg-amber-800 text-white flex items-center justify-center">
          <Flame className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Temporarily Unable to Load Page
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We encountered a temporary loading issue while preparing this recipe view. Click below to reload or return to the CookReel homepage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
