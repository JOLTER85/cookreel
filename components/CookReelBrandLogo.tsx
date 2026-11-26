import React from 'react';
import { Flame, Play } from 'lucide-react';

export function CookReelBrandLogo({
  theme = 'light',
  size = 'md',
  showDomain = true,
  showTagline = false,
}: {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showDomain?: boolean;
  showTagline?: boolean;
}) {
  const isDark = theme === 'dark';

  const badgeSizes = {
    sm: 'w-9 h-9 rounded-xl',
    md: 'w-11 h-11 rounded-xl',
    lg: 'w-13 h-13 rounded-2xl',
  }[size];

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
  }[size];

  return (
    <div className="inline-flex items-center gap-3.5 group select-none">
      {/* Bespoke Culinary + Reel Emblem Mark */}
      <div
        className={`relative ${badgeSizes} flex items-center justify-center shrink-0 bg-gradient-to-br from-amber-700 via-amber-800 to-slate-950 text-white shadow-md shadow-amber-950/20 border border-amber-400/40 group-hover:scale-[1.03] group-hover:border-amber-300 transition-all duration-200 overflow-hidden`}
      >
        {/* Subtle inner culinary brass ring */}
        <div className="absolute inset-1 rounded-lg border border-amber-300/25 pointer-events-none" />

        {/* Reel sprockets accent on left & right edge */}
        <div className="absolute left-1 top-2 bottom-2 flex flex-col justify-between opacity-35 pointer-events-none">
          <span className="w-1 h-1 rounded-full bg-amber-200" />
          <span className="w-1 h-1 rounded-full bg-amber-200" />
          <span className="w-1 h-1 rounded-full bg-amber-200" />
        </div>
        <div className="absolute right-1 top-2 bottom-2 flex flex-col justify-between opacity-35 pointer-events-none">
          <span className="w-1 h-1 rounded-full bg-amber-200" />
          <span className="w-1 h-1 rounded-full bg-amber-200" />
          <span className="w-1 h-1 rounded-full bg-amber-200" />
        </div>

        {/* Center Flame + Play Reel Fusion */}
        <div className="relative flex items-center justify-center">
          <Flame className="w-5 h-5 text-amber-300 drop-shadow-xs -mr-1" />
          <div className="w-4 h-4 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xs border border-amber-300">
            <Play className="w-2.5 h-2.5 fill-amber-800 text-amber-800 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Editorial Wordmark & Official Domain */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 leading-none">
          <span
            className={`font-serif ${titleSizes} font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Cook
            <span
              className={
                isDark
                  ? 'text-amber-400 italic font-semibold'
                  : 'text-amber-800 italic font-semibold'
              }
            >
              Reel
            </span>
          </span>

          <span
            className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold border ${
              isDark
                ? 'bg-amber-500/15 text-amber-300 border-amber-400/30'
                : 'bg-amber-900 text-amber-50 border-amber-800'
            }`}
          >
            CULINARY
          </span>
        </div>

        {showDomain && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span
              className={`font-mono text-[11px] font-semibold tracking-wider ${
                isDark ? 'text-amber-300/90' : 'text-slate-600'
              }`}
            >
              www.cookreel.com
            </span>
            {showTagline && (
              <span
                className={`hidden md:inline text-[11px] ${
                  isDark ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                · Video Recipes &amp; Guides
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
