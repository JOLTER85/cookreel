'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import TurnstileVerificationWidget, {
  VerificationChallengeState,
} from '@/components/TurnstileVerificationWidget';

export default function ContactFormClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Recipe Question or Correction');
  const [message, setMessage] = useState('');
  const [verificationState, setVerificationState] =
    useState<VerificationChallengeState>({
      numA: 7,
      numB: 6,
      answer: '',
      verified: false,
      turnstileToken: '',
    });
  const [resetSignal, setResetSignal] = useState(0);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!verificationState.verified) {
      setStatus({
        type: 'error',
        text: 'Please complete the human verification check before sending your message.',
      });
      return;
    }

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
          captchaA: verificationState.numA,
          captchaB: verificationState.numB,
          captchaAnswer: verificationState.answer,
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
          text: `Thank you! Your message (Ref: ${data.inquiryId}) has been received by Marcus Vance & Elena Rostova at the CookReel Editorial Desk.`,
        });
        setName('');
        setEmail('');
        setMessage('');
        setResetSignal((prev) => prev + 1);
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
    <div className="space-y-5">
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
            <option value="Ingredient Substitution or Unit Conversion">
              Ingredient Substitution or Unit Conversion
            </option>
            <option value="Copyright, DMCA or Editorial Feedback">
              Copyright, DMCA or Editorial Feedback
            </option>
            <option value="Privacy & Data Protection Request (GDPR/CCPA)">
              Privacy &amp; Data Protection Request (GDPR/CCPA)
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
            placeholder="How can Marcus Vance, Elena Rostova, and the CookReel Editorial Desk help you?"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
          />
        </div>

        <TurnstileVerificationWidget
          onChange={setVerificationState}
          resetSignal={resetSignal}
        />

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
        >
          {submitting ? 'Sending Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
