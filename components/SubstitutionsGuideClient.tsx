'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Repeat,
  Scale,
  CheckCircle2,
  ArrowUpRight,
  HelpCircle,
  BookOpen,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  COOKREEL_RECIPES,
  COOKING_QA_KNOWLEDGE_BASE,
} from '@/lib/cookreel-data';
import {
  SubstitutionCategoryId,
  SUBSTITUTION_CATEGORIES,
  MASTER_SUBSTITUTIONS_LIST,
} from '@/lib/substitutions-data';

export function SubstitutionsGuideClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<SubstitutionCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [batchMultiplier, setBatchMultiplier] = useState<number>(1);

  const filteredMasterList = MASTER_SUBSTITUTIONS_LIST.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.originalIngredient.toLowerCase().includes(q) ||
      item.substituteRatio.toLowerCase().includes(q) ||
      item.bestFor.toLowerCase().includes(q) ||
      item.scienceAndImpact.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Also gather all recipe-specific substitutions from the 18 recipes
  const recipeSpecificSwaps = COOKREEL_RECIPES.flatMap((recipe) =>
    recipe.substitutions.map((sub, idx) => ({
      id: `${recipe.id}-sub-${idx}`,
      recipeSlug: recipe.slug,
      recipeTitle: recipe.titleEn,
      categoryLabel: recipe.categoryLabelEn,
      originalEn: sub.originalEn,
      substituteEn: sub.substituteEn,
      chefNoteEn: sub.chefNoteEn,
    }))
  ).filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      item.originalEn.toLowerCase().includes(q) ||
      item.substituteEn.toLowerCase().includes(q) ||
      item.recipeTitle.toLowerCase().includes(q)
    );
  });

  const substitutionQas = COOKING_QA_KNOWLEDGE_BASE.filter(
    (qa) => qa.topic === 'ingredient_substitutions'
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 py-10 space-y-14">
      {/* USDA Food Safety & Measurement Callout */}
      <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
          <strong className="font-bold">
            Gram-for-Gram Accuracy &amp; USDA Food Safety Note:
          </strong>{' '}
          All substitution ratios below are tested in both metric weights (grams / milliliters) and standard US kitchen volume. Always store homemade dairy substitutes (such as buttermilk or cream mixtures) at or below <strong>4°C (39°F)</strong>, and verify all cooked poultry reaches <strong>74°C (165°F)</strong> and fish/whole beef cuts reach <strong>63°C (145°F)</strong>.
        </div>
      </div>

      {/* Interactive Search, Category Filter & Quick Ratio Converter */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
              <Repeat className="w-3.5 h-3.5" />
              <span>Interactive 1:1 Culinary Substitution Directory</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Search &amp; Filter Tested Ingredient Swaps
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ingredient (e.g. heavy cream, buttermilk, egg, wine)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-[#FAF9F6] text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-800"
            />
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {SUBSTITUTION_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                    active
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Batch Multiplier */}
          <div className="flex items-center gap-2 bg-[#FAF9F6] border border-slate-200 rounded-lg px-3 py-1.5">
            <Scale className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-semibold text-slate-700">
              Quick Scale Reference:
            </span>
            {[1, 2, 3].map((mult) => (
              <button
                key={mult}
                type="button"
                onClick={() => setBatchMultiplier(mult)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                  batchMultiplier === mult
                    ? 'bg-amber-800 text-white'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                {mult}x Batch
              </button>
            ))}
          </div>
        </div>

        {/* Quick Scale Calculator Cards for Top 4 Emergency Kitchen Swaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold mb-1">
              Heavy Cream ({batchMultiplier} Cup / {240 * batchMultiplier} ml)
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {180 * batchMultiplier} ml Whole Milk + {60 * batchMultiplier} g Melted Butter
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              +{batchMultiplier} tsp cornstarch if boiling in skillet sauces.
            </p>
          </div>

          <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold mb-1">
              Buttermilk ({batchMultiplier} Cup / {240 * batchMultiplier} ml)
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {225 * batchMultiplier} ml Warm Milk + {15 * batchMultiplier} ml Lemon Juice
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Rest 5 mins at room temperature until lightly thickened.
            </p>
          </div>

          <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold mb-1">
              Cake Flour ({batchMultiplier} Cup / {120 * batchMultiplier} g)
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {104 * batchMultiplier} g All-Purpose Flour + {16 * batchMultiplier} g Cornstarch
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Sift together twice to aerate and lower gluten strength.
            </p>
          </div>

          <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold mb-1">
              Fresh Herbs ({batchMultiplier} Tbsp / {15 * batchMultiplier} ml)
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">
              {batchMultiplier} tsp ({5 * batchMultiplier} ml) Dried Herbs (3:1 Ratio)
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Add dried herbs early in cooking; add fresh herbs at the end.
            </p>
          </div>
        </div>

        {/* Master Substitutions Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="py-3.5 px-4 font-bold">Missing Ingredient</th>
                <th className="py-3.5 px-4 font-bold">Standard Measure</th>
                <th className="py-3.5 px-4 font-bold">
                  Exact 1:1 Tested Substitute
                </th>
                <th className="py-3.5 px-4 font-bold">
                  Culinary Science &amp; Best Use
                </th>
                <th className="py-3.5 px-4 font-bold">Tested In Recipe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredMasterList.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 px-4 text-center text-slate-500"
                  >
                    No ingredient substitutions matched &ldquo;{searchQuery}&rdquo;. Try clearing your filter or searching for cream, egg, flour, butter, or herbs.
                  </td>
                </tr>
              ) : (
                filteredMasterList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-amber-50/40 transition-colors align-top"
                  >
                    <td className="py-4 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono uppercase mb-1">
                        {item.categoryLabel}
                      </span>
                      <div className="font-bold text-slate-900">
                        {item.originalIngredient}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-700 whitespace-nowrap">
                      {item.exactAmount}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-amber-900">
                        {item.substituteRatio}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">
                        Note: {item.metricBreakdown}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 max-w-md">
                      <div className="text-xs font-semibold text-slate-800 mb-1">
                        Best for: {item.bestFor}
                      </div>
                      <p className="text-xs leading-relaxed">
                        {item.scienceAndImpact}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/recipes/${item.relatedRecipeSlug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline"
                      >
                        <span>{item.relatedRecipeTitle}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Fundamental Culinary Chemistry of Ingredient Swaps */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
            1. Fat &amp; Emulsion Balance in Pan Sauces
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Heavy cream can simmer at high heat without curdling because its 36% milkfat coats casein proteins. When substituting whole milk (3.25% fat) or half-and-half (12% fat), whisking in melted unsalted butter and 1 teaspoon of cornstarch stabilizes the emulsion so your Tuscan chicken or pasta sauce stays glossy.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Always temper cold yogurt or sour cream with 2 Tbsp warm sauce before stirring into a hot skillet.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Use full-fat canned coconut cream for a 1:1 dairy-free &amp; keto heavy cream replacement.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
            2. Baking Leaveners &amp; Protein Structure
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Baking relies on precise ratios of structure (flour &amp; eggs), tenderness (butter, sugar &amp; oil), and lift (baking powder/soda + acid). When swapping all-purpose flour for cake flour, replacing 16g per cup with cornstarch prevents tough gluten networks.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Never replace more than 2 eggs in a cake recipe with fruit puree or the center will remain dense.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Measure flour by weight (120g per cup) or spoon-and-level to avoid adding 25% extra dry flour.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
            3. High-Smoke-Point Oils &amp; Cast-Iron Care
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Whole dairy butter contains milk solids that scorch at 175°C (350°F). For searing ribeye steaks or crispy salmon skin at 220°C (425°F), start with refined avocado oil, grapeseed oil, or clarified ghee, then add whole butter and herbs in the final 90 seconds.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Dry cast-iron skillets on a warm burner for 2 minutes after rinsing and wipe with 1 tsp avocado oil.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>Check out our full Cast-Iron Care &amp; Pantry Guide below for step-by-step seasoning timers.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Recipe-by-Recipe Substitution Matrix across All 18 CookReel Recipes */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
              Recipe-Specific Swaps ({recipeSpecificSwaps.length} Tested Variations)
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              1:1 Ingredient Swaps Organized by CookReel Recipe
            </h2>
          </div>
          <Link
            href="/recipes/ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
          >
            <span>Open Cast-Iron &amp; Substitutes Recipe Card</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COOKREEL_RECIPES.slice(0, 9).map((recipe) => (
            <div
              key={recipe.id}
              className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-2xs hover:border-amber-800/40 transition-colors"
            >
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold mb-1">
                  {recipe.categoryLabelEn}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-3 leading-snug">
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="hover:text-amber-800 transition-colors"
                  >
                    {recipe.titleEn}
                  </Link>
                </h3>
                <ul className="space-y-2.5 mb-4">
                  {recipe.substitutions.map((sub, i) => (
                    <li
                      key={i}
                      className="p-2.5 rounded-lg bg-[#FAF9F6] border border-slate-200/80 text-xs"
                    >
                      <div className="font-bold text-slate-900">
                        Instead of: {sub.originalEn}
                      </div>
                      <div className="text-amber-900 font-semibold mt-0.5">
                        Use: {sub.substituteEn}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {sub.chefNoteEn}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/recipes/${recipe.slug}`}
                className="inline-flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-amber-800 hover:text-amber-950"
              >
                <span>View Full Recipe &amp; Step Timers</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Substitution Q&A from Knowledge Base */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Substitution Questions</span>
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Troubleshooting Common Kitchen Swaps
            </h2>
          </div>
          <Link
            href="/qa"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 hover:border-amber-800 text-xs font-bold text-slate-800 transition-colors"
          >
            <span>Explore All 36 Cooking Q&amp;A Guides</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {substitutionQas.map((qa) => (
            <div
              key={qa.id}
              className="rounded-xl bg-[#FAF9F6] border border-slate-200 p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
                  {qa.questionEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                  {qa.shortAnswerEn}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {qa.detailedStepsEn.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="font-mono text-amber-900 font-semibold">
                  Key Metric: {qa.proTipEn}
                </span>
                <Link
                  href={`/recipes/${qa.relatedRecipeSlug || '15-minute-crispy-cast-iron-salmon-lemon-caper'}`}
                  className="font-bold text-amber-800 hover:underline inline-flex items-center gap-1"
                >
                  <span>Related Recipe</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
