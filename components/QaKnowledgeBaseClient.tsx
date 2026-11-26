'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  Sparkles,
  ArrowUpRight,
  Plus,
  X,
  ShieldCheck,
} from 'lucide-react';
import {
  COOKING_QA_KNOWLEDGE_BASE,
  QA_TOPIC_LABELS,
  CookingQAItem,
  CookingQATopic,
} from '@/lib/cookreel-data';

export function QaKnowledgeBaseClient() {
  const [qaList, setQaList] = useState<CookingQAItem[]>(
    COOKING_QA_KNOWLEDGE_BASE
  );
  const [activeTopic, setActiveTopic] = useState<'all' | CookingQATopic>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [askModalOpen, setAskModalOpen] = useState(false);

  // Ask question form with anti-spam CAPTCHA
  const [questionText, setQuestionText] = useState('');
  const [topic, setTopic] = useState<CookingQATopic>('meal_prep_storage');
  const [answerText, setAnswerText] = useState('');
  const [proTipText, setProTipText] = useState('');
  const [captchaA, setCaptchaA] = useState(3);
  const [captchaB, setCaptchaB] = useState(6);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredItems = qaList.filter((item) => {
    const matchesTopic = activeTopic === 'all' || item.topic === activeTopic;
    const matchesSearch =
      !searchQuery.trim() ||
      item.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortAnswerEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailedStepsEn.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTopic && matchesSearch;
  });

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (honeypot.trim().length > 0) {
      setFormError('Spam submission blocked.');
      return;
    }

    if (Number(captchaAnswer) !== captchaA + captchaB) {
      setFormError('Please answer the anti-spam math question correctly.');
      return;
    }

    if (!termsAccepted) {
      setFormError(
        'Please confirm that your submission is original and complies with USDA food safety guidelines.'
      );
      return;
    }

    if (!questionText.trim() || questionText.trim().length < 8) {
      setFormError('Please enter a clear culinary question.');
      return;
    }

    const newQa: CookingQAItem = {
      id: `qa-user-${Date.now()}`,
      topic,
      topicLabelEn:
        QA_TOPIC_LABELS.find((t) => t.id === topic)?.labelEn ||
        'Cooking & Meal Prep',
      questionEn: questionText.trim(),
      shortAnswerEn:
        answerText.trim() ||
        'Submitted to the CookReel Editorial Team. Always verify safe internal cooking temperatures with a calibrated digital thermometer (74°C / 165°F for poultry and leftovers; 63°C / 145°F for fish and whole cuts).',
      detailedStepsEn: [
        'Pre-measure ingredients and bring proteins out of the refrigerator 15 minutes before searing for even cooking.',
        'Store cooked meal-prep portions in airtight glass containers at or below 4°C (40°F) within 90 minutes of cooking.',
        'Reheat refrigerated meals to an internal temperature of 74°C (165°F) before serving.',
      ],
      proTipEn:
        proTipText.trim() ||
        'Label all meal-prep containers with the date prepared and consume within 3 to 4 days.',
      relatedRecipeSlug:
        '60-minute-sunday-meal-prep-guide-5-high-protein-lunches',
    };

    setQaList((prev) => [newQa, ...prev]);
    setQuestionText('');
    setAnswerText('');
    setProTipText('');
    setCaptchaAnswer('');
    setTermsAccepted(false);
    setAskModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-10">
      {/* USDA Food Safety Official Temperature Reference Table */}
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-6 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-serif text-lg font-bold text-emerald-950">
                Official USDA Safe Minimum Internal Temperature Chart
              </h2>
              <p className="text-xs text-emerald-900">
                Measure with a calibrated instant-read food thermometer inserted into the thickest part of the food away from bone, fat, or gristle.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-emerald-800 text-white self-start">
            USDA Food Safety Reference
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200">
            <div className="font-mono uppercase text-[10px] text-emerald-800 font-bold">
              All Poultry &amp; Reheated Leftovers
            </div>
            <div className="font-mono text-lg font-bold text-slate-900 my-0.5">
              74°C (165°F)
            </div>
            <p className="text-slate-600">
              Chicken breasts, thighs, whole birds, turkey, duck, stuffing, and all reheated meal-prep leftovers.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200">
            <div className="font-mono uppercase text-[10px] text-emerald-800 font-bold">
              Ground Meats (Beef, Pork, Lamb)
            </div>
            <div className="font-mono text-lg font-bold text-slate-900 my-0.5">
              71°C (160°F)
            </div>
            <p className="text-slate-600">
              Burgers, meatballs, meatloaf, and ground meat skillet meals. Ground poultry always requires 74°C (165°F).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200">
            <div className="font-mono uppercase text-[10px] text-emerald-800 font-bold">
              Whole Beef, Pork, Veal &amp; Lamb Cuts
            </div>
            <div className="font-mono text-lg font-bold text-slate-900 my-0.5">
              63°C (145°F) + 3-Min Rest
            </div>
            <p className="text-slate-600">
              Steaks, chops, and roasts. Allow meat to rest for at least 3 minutes after removing from heat before carving.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-emerald-200">
            <div className="font-mono uppercase text-[10px] text-emerald-800 font-bold">
              Salmon, Fin Fish &amp; Shellfish
            </div>
            <div className="font-mono text-lg font-bold text-slate-900 my-0.5">
              63°C (145°F)
            </div>
            <p className="text-slate-600">
              Cook fish until it reaches 63°C (145°F) internally or until flesh is opaque and flakes easily with a fork.
            </p>
          </div>
        </div>
      </div>

      {/* Topic Filter Bar + Search + Ask Question Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {QA_TOPIC_LABELS.map((topicItem) => {
            const isActive = activeTopic === topicItem.id;
            return (
              <button
                key={topicItem.id}
                type="button"
                onClick={() => setActiveTopic(topicItem.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-800/50'
                }`}
              >
                {topicItem.labelEn}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food prep or cooking questions..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-amber-800"
            />
          </div>
          <button
            type="button"
            onClick={() => setAskModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Submit a Cooking Question</span>
          </button>
        </div>
      </div>

      {/* Q&A Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((qa) => (
          <article
            key={qa.id}
            className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-amber-800/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-mono uppercase tracking-wider font-bold">
                  {qa.topicLabelEn}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  CookReel Editorial Guide
                </span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug">
                {qa.questionEn}
              </h3>

              <div className="p-3.5 rounded-lg bg-[#FAF9F6] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                <span className="font-bold text-amber-900">Direct Answer: </span>
                {qa.shortAnswerEn}
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Step-by-Step Action Checklist:
                </div>
                <ul className="space-y-1.5">
                  {qa.detailedStepsEn.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"
                    >
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-900 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50/70 border border-emerald-200/70 rounded-lg px-3 py-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Kitchen Tip:</strong> {qa.proTipEn}
                </span>
              </div>

              {qa.relatedRecipeSlug && (
                <Link
                  href={`/recipes/${qa.relatedRecipeSlug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 shrink-0"
                >
                  <span>View Related Recipe</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Moderated Submit Question Modal with Anti-Spam CAPTCHA */}
      {askModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold">
                  Moderated Culinary Q&amp;A Submission
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Submit a Cooking or Meal-Prep Question
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAskModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-800">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Cooking or Meal-Prep Question *
                </label>
                <input
                  type="text"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g., How do I keep meal-prepped chicken breast moist when reheating?"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic Category
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as CookingQATopic)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                >
                  <option value="meal_prep_storage">
                    Meal Prep &amp; Food Storage
                  </option>
                  <option value="cooking_science">
                    Cooking Science &amp; Pan Sear Techniques
                  </option>
                  <option value="ingredient_substitutions">
                    Ingredient Substitutions
                  </option>
                  <option value="air_fryer_equipment">
                    Air Fryer &amp; Cookware Care
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Optional Context or Answer Notes
                </label>
                <textarea
                  rows={3}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Share any context or technique notes..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                <span className="text-xs font-bold text-slate-700">
                  Anti-Spam Check: What is {captchaA} + {captchaB}?
                </span>
                <input
                  type="number"
                  required
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Enter sum"
                  className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-amber-800"
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-amber-800"
                />
                <span>
                  I confirm this submission is original and agrees to our{' '}
                  <Link href="/terms" className="underline text-amber-800">
                    Editorial Moderation &amp; Terms Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
              >
                Verify &amp; Publish Question
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
