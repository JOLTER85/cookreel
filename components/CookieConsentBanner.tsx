'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

const CONSENT_STORAGE_KEY = 'cookreel_cookie_consent_v1';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [currentConsent, setCurrentConsent] = useState<
    'accepted_all' | 'essential_only' | null
  >(null);

  useEffect(() => {
    const initTimer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed?.choice === 'accepted_all' ||
            parsed?.choice === 'essential_only'
          ) {
            setCurrentConsent(parsed.choice);
            document.documentElement.setAttribute(
              'data-cookie-consent',
              parsed.choice
            );
            setVisible(false);
          } else {
            document.documentElement.setAttribute(
              'data-cookie-consent',
              'essential_only'
            );
            setVisible(true);
          }
        } else {
          // Strictly block non-essential scripts prior to user opt-in
          document.documentElement.setAttribute(
            'data-cookie-consent',
            'essential_only'
          );
          setVisible(true);
        }
      } catch {
        setVisible(true);
      }
    }, 0);

    const handleOpenBanner = () => {
      setVisible(true);
    };

    window.addEventListener('cookreel:open-cookie-banner', handleOpenBanner);
    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener(
        'cookreel:open-cookie-banner',
        handleOpenBanner
      );
    };
  }, []);

  const handleChoice = (choice: 'accepted_all' | 'essential_only') => {
    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          choice,
          timestamp: new Date().toISOString(),
        })
      );
      document.documentElement.setAttribute('data-cookie-consent', choice);
    } catch {
      // Ignore storage errors in private mode
    }
    setCurrentConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie & Privacy Consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="text-xs leading-relaxed text-slate-600">
            <p className="font-bold text-slate-900 text-sm mb-0.5">
              Cookie &amp; Privacy Controls (GDPR / EEA &amp; CCPA Compliance)
              {currentConsent && (
                <span className="ml-2 text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Current: {currentConsent === 'accepted_all' ? 'All Accepted' : 'Essential Only'}
                </span>
              )}
            </p>
            <p>
              Non-essential analytics and advertising cookies are strictly blocked by default until you opt in. Essential storage remembers only your consent choice and recipe checklist state. Read our{' '}
              <Link
                href="/privacy"
                className="font-semibold text-amber-800 underline hover:text-amber-900"
              >
                Privacy &amp; Cookie Policy
              </Link>{' '}
              for full details.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('essential_only')}
            className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted_all')}
            className="rounded-lg bg-amber-800 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition-colors"
          >
            Accept All Cookies
          </button>
          <button
            type="button"
            onClick={() => handleChoice('essential_only')}
            aria-label="Reject non-essential cookies and close"
            className="p-1.5 text-slate-400 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
