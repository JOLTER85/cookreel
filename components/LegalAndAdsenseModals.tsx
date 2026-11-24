'use client';

import React, { useState } from 'react';
import { X, Check, Send, FileText } from 'lucide-react';

export type LegalModalType = null | 'about' | 'contact' | 'privacy' | 'terms';

interface LegalAndAdsenseModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export default function LegalAndAdsenseModals({
  activeModal,
  onClose,
}: LegalAndAdsenseModalsProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmittedId, setContactSubmittedId] = useState<string | null>(
    null
  );
  const [isSendingContact, setIsSendingContact] = useState(false);

  if (!activeModal) return null;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      return;
    }
    setIsSendingContact(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: contactName.trim(),
          email: contactEmail.trim(),
          subject: contactSubject.trim() || 'Editorial & Recipe Inquiry',
          message: contactMessage.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setContactSubmittedId(data.inquiryId || 'INQ-2026');
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      }
    } finally {
      setIsSendingContact(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div
        dir="ltr"
        className="bg-white rounded-xl max-w-3xl w-full max-h-[88vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-800" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              {activeModal === 'about' &&
                'About Us — CookReel.com Editorial & Test Kitchen'}
              {activeModal === 'contact' &&
                'Contact Us — Editorial, Press & Partnerships'}
              {activeModal === 'privacy' &&
                'Privacy Policy & Cookie Disclosure'}
              {activeModal === 'terms' &&
                'Terms & Conditions and Culinary Disclosure'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs md:text-sm text-slate-700 leading-relaxed">
          {/* 1. ABOUT US PAGE */}
          {activeModal === 'about' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-amber-800">
                ESTABLISHED 2016 · SHORT-FORM CULINARY VIDEO & TEST KITCHEN
              </p>
              <h4 className="text-lg font-bold text-slate-900">
                Our Mission: Simplifying Home Cooking Through Short-Form Video &
                Food Science
              </h4>
              <p>
                CookReel.com was founded on a simple culinary conviction: great
                cooking should be visual, dependable, and accessible on a busy
                schedule. Originally featured by Trend Hunter as a pioneer in
                video-based recipes, our platform pairs concise step-by-step
                video reels with thorough culinary guides.
              </p>
              <h5 className="text-sm font-bold text-slate-900 pt-2">
                Our Test Kitchen & Editorial Standards
              </h5>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  100% Kitchen-Tested: Every recipe across our 4 core
                  departments (Quick & Easy, Healthy & Diet, Desserts & Baking,
                  and Kitchen Hacks) is tested at least three times with
                  gram-accurate measurements.
                </li>
                <li>
                  Original Visual Media: All step-by-step photography and HD MP4
                  video reels are produced in-house in our culinary studio.
                </li>
                <li>
                  Verified Ingredient Substitutions: Every article includes a
                  dedicated substitution chart and storage guide so readers
                  never waste groceries.
                </li>
              </ul>
            </div>
          )}

          {/* 2. CONTACT US PAGE */}
          {activeModal === 'contact' && (
            <div className="space-y-5">
              <p>
                We welcome recipe questions from home cooks, press inquiries,
                and culinary brand sponsorship requests. Our editorial team
                responds within 24 business hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-[#FAF9F6] border border-slate-200 text-xs font-mono">
                <div>
                  <div className="text-slate-500">Editorial & Recipes</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    editorial@cookreel.com
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Partnerships & Media</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    partners@cookreel.com
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Test Kitchen Studio</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    CookReel Culinary Media
                  </div>
                </div>
              </div>

              {contactSubmittedId ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>
                      Message Received (Reference #{contactSubmittedId})
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Your message has been logged with our editorial team. We
                    will reply shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name:
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address:
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject:
                    </label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="Recipe Question / Partnership / General Inquiry..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message:
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSendingContact}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {isSendingContact ? 'Sending...' : 'Send Message'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 3. PRIVACY POLICY */}
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-slate-500">
                EFFECTIVE DATE: NOVEMBER 24, 2026
              </p>
              <h4 className="text-base font-bold text-slate-900">
                1. Overview & Visitor Data Protection
              </h4>
              <p>
                At CookReel.com, accessible from https://cookreel.com, the
                privacy of our visitors is one of our highest priorities. This
                Privacy Policy document outlines the types of information
                collected and recorded by CookReel.com and how we use it.
              </p>
              <h4 className="text-base font-bold text-slate-900">
                2. Cookies & Third-Party Advertising Disclosure
              </h4>
              <p>
                Third-party vendors, including Google, use cookies (such as
                DoubleClick DART cookies) to serve ads based on a user&apos;s
                prior visits to https://cookreel.com and other websites on the
                internet. Visitors may opt out of personalized advertising by
                visiting Google&apos;s Ads Settings at
                https://policies.google.com/technologies/ads.
              </p>
              <h4 className="text-base font-bold text-slate-900">
                3. Culinary Equipment & Affiliate Disclosure
              </h4>
              <p>
                CookReel.com participates in culinary retail affiliate programs
                including the Amazon Services LLC Associates Program. When you
                purchase recommended skillets or chef knives through our links,
                we may earn a small commission at no extra cost to you.
              </p>
            </div>
          )}

          {/* 4. TERMS & CONDITIONS */}
          {activeModal === 'terms' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-slate-500">
                LAST UPDATED: NOVEMBER 24, 2026
              </p>
              <h4 className="text-base font-bold text-slate-900">
                1. Intellectual Property & Original Media Rights
              </h4>
              <p>
                All original video reels, step-by-step photographs, and recipe
                articles published on CookReel.com are protected by copyright
                laws. You may share links to our recipes with attribution, but
                republishing full recipe texts or video files without written
                consent is prohibited.
              </p>
              <h4 className="text-base font-bold text-slate-900">
                2. Nutritional & Food Safety Disclaimer
              </h4>
              <p>
                Nutritional values (calories, protein, and net carbohydrates)
                provided in our Recipe Cards are calculated estimates for
                informational purposes. Readers following strict medical or
                ketogenic diets should verify specific ingredient labels.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>CookReel.com</span>
            <span aria-hidden="true">·</span>
            <span>CookReel Test Kitchen</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
