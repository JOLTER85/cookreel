'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Recipe Question or Correction');
  const [message, setMessage] = useState('');
  const [captchaA, setCaptchaA] = useState(5);
  const [captchaB, setCaptchaB] = useState(4);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          subject,
          message,
          captchaA,
          captchaB,
          captchaAnswer,
          websiteHoneypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({
          type: 'error',
          text: data.error || 'Could not send your message.',
        });
      } else {
        setStatus({
          type: 'success',
          text: `Thank you! Your message (Ref: ${data.inquiryId}) has been received by the CookReel Editorial Team.`,
        });
        setName('');
        setEmail('');
        setMessage('');
        setCaptchaAnswer('');
        setCaptchaA(Math.floor(2 + Math.random() * 7));
        setCaptchaB(Math.floor(2 + Math.random() * 7));
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Network error while submitting your inquiry.',
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              Contact the CookReel Editorial Team
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Have a question about a recipe step, ingredient substitution, or partnership inquiry? Email us directly at{' '}
              <a
                href="mailto:editorial@cookreel.com"
                className="font-bold text-amber-800 underline"
              >
                editorial@cookreel.com
              </a>{' '}
              or send a message below. We typically respond within 24–48 business hours.
            </p>
          </div>

          {status && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status.type === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              )}
              <span>{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={websiteHoneypot}
                onChange={(e) => setWebsiteHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Inquiry Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
              >
                <option value="Recipe Question or Correction">
                  Recipe Question or Correction
                </option>
                <option value="Advertising & Brand Sponsorship">
                  Advertising &amp; Brand Sponsorship
                </option>
                <option value="Copyright or Editorial Feedback">
                  Copyright or Editorial Feedback
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can the CookReel Editorial Team help you?"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>
                  Anti-Spam Verification: What is {captchaA} + {captchaB}?
                </span>
              </div>
              <input
                type="number"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Enter sum"
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
            >
              {submitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
