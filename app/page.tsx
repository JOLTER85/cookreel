'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  COOKREEL_RECIPES,
  HERO_FEATURED_VIDEO_URL,
  SITE_ARCHITECTURE,
  CulinaryRecipe,
  PrimaryCategorySlug,
} from '@/lib/cookreel-data';
import LegalAndAdsenseModals, {
  LegalModalType,
} from '@/components/LegalAndAdsenseModals';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Clock,
  Flame,
  ShoppingBag,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckSquare,
  Square,
  RotateCcw,
  Bookmark,
  Upload,
  X,
  ArrowUpRight,
  Printer,
  Calendar,
  Download,
  MessageSquare,
  Check,
  Mail,
  BookOpen,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface ClientReview {
  id: string;
  recipeId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ConfirmedOrderReceipt {
  orderId: string;
  customerName: string;
  shippingAddress: string;
  totalUsd: number;
  status: string;
  createdAt: string;
}

const WEEKDAYS_EN = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const WEEKDAYS_AR = [
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
  'الأحد',
];

export default function CookReelPlatformPage() {
  const isAr = false;

  const [recipes, setRecipes] = useState<CulinaryRecipe[]>(COOKREEL_RECIPES);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | PrimaryCategorySlug
  >('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRecipeId, setActiveRecipeId] = useState<string>(
    COOKREEL_RECIPES[0].id
  );
  const [servingsMultiplier, setServingsMultiplier] = useState<1 | 2 | 4>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  // Legal & AdSense 30-Day Plan Modal State
  const [activeLegalModal, setActiveLegalModal] =
    useState<LegalModalType>(null);

  // Hero Video Refs & State
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isHeroPlaying, setIsHeroPlaying] = useState<boolean>(true);
  const [isHeroMuted, setIsHeroMuted] = useState<boolean>(true);

  // Studio Main Video Player Refs & State
  const studioVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isStudioPlaying, setIsStudioPlaying] = useState<boolean>(true);
  const [isStudioMuted, setIsStudioMuted] = useState<boolean>(true);
  const [videoProgressPct, setVideoProgressPct] = useState<number>(0);
  const [videoCurrentSec, setVideoCurrentSec] = useState<number>(0);
  const [videoDurationSec, setVideoDurationSec] = useState<number>(12);

  // Interactive Hands-Free Cooking Timer State
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [timerRemainingSec, setTimerRemainingSec] = useState<number>(
    COOKREEL_RECIPES[0].stepsEn[0].timerSeconds
  );
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // 7-Day Weekly Meal Planner State
  const [weeklyPlan, setWeeklyPlan] = useState<Record<number, string>>({
    0: 'crispy-salmon-skillet',
    1: 'truffle-tagliatelle-pasta',
    2: 'lemon-herb-roasted-chicken',
    3: 'mediterranean-spiced-shakshuka',
    4: 'garlic-butter-ribeye-steak',
    5: 'mango-strawberry-sunset-cupcakes',
    6: 'kitchen-guide-substitutes-cast-iron',
  });
  const [selectedDayToAssign, setSelectedDayToAssign] = useState<number>(0);

  // Community Review Form State
  const [reviewAuthor, setReviewAuthor] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);

  // Shoppable Kitchen Gear & Checkout State
  const [gearCart, setGearCart] = useState<
    { id: string; name: string; brand: string; priceUsd: number; qty: number }[]
  >([]);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>([
    'crispy-salmon-skillet',
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [checkoutName, setCheckoutName] = useState<string>('');
  const [checkoutEmail, setCheckoutEmail] = useState<string>('');
  const [checkoutAddress, setCheckoutAddress] = useState<string>('');
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [confirmedReceipt, setConfirmedReceipt] =
    useState<ConfirmedOrderReceipt | null>(null);

  // Newsletter Subscription State
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(false);

  // Upload Long-Form E-E-A-T Video Recipe Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadSubtitle, setUploadSubtitle] = useState<string>('');
  const [uploadIntroText, setUploadIntroText] = useState<string>('');
  const [uploadChefTip, setUploadChefTip] = useState<string>('');
  const [uploadCategory, setUploadCategory] =
    useState<PrimaryCategorySlug>('quick_easy');
  const [uploadSubcategory, setUploadSubcategory] =
    useState<string>('15-minute-meals');
  const [uploadChef, setUploadChef] = useState<string>('');
  const [uploadCookMin, setUploadCookMin] = useState<number>(15);
  const [uploadGearName, setUploadGearName] = useState<string>('');
  const [uploadGearPrice, setUploadGearPrice] = useState<number>(125);
  const [uploadedVideoBlobUrl, setUploadedVideoBlobUrl] = useState<string>('');
  const [uploadedVideoFileName, setUploadedVideoFileName] =
    useState<string>('');

  // Load persistent recipes and reviews from Next.js Backend API on mount
  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.recipes) && data.recipes.length > 0) {
          setRecipes(data.recipes);
        }
        if (Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const activeRecipe = useMemo(
    () => recipes.find((r) => r.id === activeRecipeId) || recipes[0],
    [recipes, activeRecipeId]
  );

  const activeRecipeReviews = useMemo(
    () => reviews.filter((rev) => rev.recipeId === activeRecipe.id),
    [reviews, activeRecipe.id]
  );

  const activeCategoryArchitecture = useMemo(
    () =>
      SITE_ARCHITECTURE.find((c) => c.slug === selectedCategory) || null,
    [selectedCategory]
  );

  const selectCategory = (cat: 'all' | PrimaryCategorySlug, subId = 'all') => {
    setSelectedCategory(cat);
    setSelectedSubcategory(subId);
  };

  const selectRecipeAndStep = (
    recipe: CulinaryRecipe,
    stepIndex = 0,
    autoPlayNow = true
  ) => {
    setActiveRecipeId(recipe.id);
    setActiveStepIdx(stepIndex);
    setTimerRunning(false);
    const stepObj = recipe.stepsEn[stepIndex] || recipe.stepsEn[0];
    setTimerRemainingSec(stepObj ? stepObj.timerSeconds : 60);
    setIsStudioPlaying(autoPlayNow);
  };

  useEffect(() => {
    const vid = studioVideoRef.current;
    if (!vid) return;
    vid.load();
    if (isStudioPlaying) {
      vid.play().catch(() => {
        setIsStudioPlaying(false);
      });
    }
  }, [activeRecipe.videoUrl, isStudioPlaying]);

  const toggleHeroPlay = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsHeroPlaying(true);
    } else {
      vid.pause();
      setIsHeroPlaying(false);
    }
  };

  const toggleHeroMute = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsHeroMuted(vid.muted);
  };

  const toggleStudioPlay = () => {
    const vid = studioVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsStudioPlaying(true);
    } else {
      vid.pause();
      setIsStudioPlaying(false);
    }
  };

  const toggleStudioMute = () => {
    const vid = studioVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsStudioMuted(vid.muted);
  };

  const handleStudioFullscreen = () => {
    const vid = studioVideoRef.current;
    if (!vid) return;
    if (vid.requestFullscreen) {
      vid.requestFullscreen().catch(() => {});
    }
  };

  const handleStudioTimeUpdate = () => {
    const vid = studioVideoRef.current;
    if (!vid || !vid.duration) return;
    const cur = vid.currentTime;
    const dur = vid.duration;
    setVideoCurrentSec(cur);
    setVideoDurationSec(dur);
    setVideoProgressPct((cur / dur) * 100);
  };

  const handleStudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = studioVideoRef.current;
    if (!vid || !vid.duration) return;
    const newPct = Number(e.target.value);
    vid.currentTime = (newPct / 100) * vid.duration;
    setVideoProgressPct(newPct);
  };

  const currentVideoSceneIndex = useMemo(() => {
    const totalSteps = activeRecipe.stepsEn.length || 3;
    if (videoDurationSec <= 0) return 0;
    const idx = Math.floor((videoCurrentSec / videoDurationSec) * totalSteps);
    return Math.min(Math.max(idx, 0), totalSteps - 1);
  }, [videoCurrentSec, videoDurationSec, activeRecipe.stepsEn.length]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimerRemainingSec((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      if (selectedCategory !== 'all' && r.category !== selectedCategory) {
        return false;
      }
      if (
        selectedSubcategory !== 'all' &&
        r.subcategoryId !== selectedSubcategory
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.titleEn.toLowerCase().includes(q) ||
          r.titleAr.toLowerCase().includes(q) ||
          r.subtitleEn.toLowerCase().includes(q) ||
          r.gearItem.nameEn.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [recipes, selectedCategory, selectedSubcategory, searchQuery]);

  const toggleIngredientCheck = (key: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key]
    );
  };

  const handleAddGearToBag = (recipe: CulinaryRecipe) => {
    const g = recipe.gearItem;
    const displayName = isAr ? g.nameAr : g.nameEn;
    setConfirmedReceipt(null);
    setGearCart((prev) => {
      const existing = prev.find((item) => item.id === g.id);
      if (existing) {
        return prev.map((item) =>
          item.id === g.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: g.id,
          name: displayName,
          brand: g.brand,
          priceUsd: g.priceUsd,
          qty: 1,
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const updateCartItemQty = (id: string, delta: number) => {
    setGearCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const toggleSaveRecipe = (id: string) => {
    setSavedRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAssignToWeekday = (dayIdx: number, recipeId: string) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [dayIdx]: recipeId,
    }));
  };

  const handleExportWeeklyGroceryList = () => {
    const lines: string[] = [
      'COOKREEL.COM — 7-DAY WEEKLY DINNER PLAN & GROCERY LIST',
      '======================================================',
      '',
    ];
    Object.entries(weeklyPlan).forEach(([dayIdxStr, recId]) => {
      const dayIdx = Number(dayIdxStr);
      const rec = recipes.find((r) => r.id === recId);
      if (!rec) return;
      const dayName = isAr ? WEEKDAYS_AR[dayIdx] : WEEKDAYS_EN[dayIdx];
      lines.push(`[${dayName}] ${isAr ? rec.titleAr : rec.titleEn}`);
      (isAr ? rec.ingredientsAr : rec.ingredientsEn).forEach((ing) => {
        lines.push(`  - ${ing.amount} ${ing.unit} ${ing.item}`);
      });
      lines.push('');
    });
    const blob = new Blob([lines.join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cookreel-weekly-grocery-list.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim() || isSubmittingReview) return;
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeId: activeRecipe.id,
          authorName:
            reviewAuthor.trim() || (isAr ? 'شيف منزلي' : 'Verified Home Chef'),
          rating: reviewRating,
          comment: reviewComment.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          setReviews((prev) => [data.review, ...prev]);
        }
        if (data.updatedRecipe) {
          setRecipes((prev) =>
            prev.map((r) =>
              r.id === data.updatedRecipe.id ? data.updatedRecipe : r
            )
          );
        }
        setReviewComment('');
        setReviewAuthor('');
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handlePlaceGearOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !checkoutName.trim() ||
      !checkoutAddress.trim() ||
      gearCart.length === 0 ||
      isPlacingOrder
    ) {
      return;
    }
    setIsPlacingOrder(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: checkoutName.trim(),
          customerEmail: checkoutEmail.trim(),
          shippingAddress: checkoutAddress.trim(),
          items: gearCart,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setConfirmedReceipt(data.order);
          setGearCart([]);
          setCheckoutName('');
          setCheckoutEmail('');
          setCheckoutAddress('');
        }
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'subscribe',
        email: newsletterEmail.trim(),
      }),
    });
    if (res.ok) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setUploadedVideoBlobUrl(blobUrl);
    setUploadedVideoFileName(file.name);
  };

  const handleUploadRecipeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: uploadTitle.trim(),
          subtitle: uploadSubtitle.trim(),
          introText: uploadIntroText.trim(),
          chefTip: uploadChefTip.trim(),
          category: uploadCategory,
          subcategoryId: uploadSubcategory,
          chefName: uploadChef.trim(),
          cookMinutes: uploadCookMin,
          gearName: uploadGearName.trim(),
          gearPrice: uploadGearPrice,
          videoUrl: '/videos/hero-cookreel-featured.mp4',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const created: CulinaryRecipe = {
          ...data.recipe,
          videoUrl: uploadedVideoBlobUrl || data.recipe.videoUrl,
        };
        setRecipes((prev) => [created, ...prev]);
        selectRecipeAndStep(created, 0, true);
      }
    } finally {
      setUploadTitle('');
      setUploadSubtitle('');
      setUploadIntroText('');
      setUploadChefTip('');
      setUploadGearName('');
      setUploadedVideoBlobUrl('');
      setUploadedVideoFileName('');
      setIsUploadModalOpen(false);
    }
  };

  const totalBagCount =
    gearCart.reduce((acc, item) => acc + item.qty, 0) + savedRecipeIds.length;
  const totalGearPrice = gearCart.reduce(
    (acc, item) => acc + item.priceUsd * item.qty,
    0
  );

  // Combined Recipe + VideoObject + FAQPage Schema.org JSON-LD for Google Rich Results
  const activeRecipeSchemaJson = useMemo(() => {
    return JSON.stringify([
      {
        '@context': 'https://schema.org/',
        '@type': 'Recipe',
        name: activeRecipe.titleEn,
        description: activeRecipe.subtitleEn,
        image: [`https://cookreel.com${activeRecipe.image}`],
        author: {
          '@type': 'Person',
          name: activeRecipe.chefName,
        },
        prepTime: `PT${activeRecipe.prepMinutes}M`,
        cookTime: `PT${activeRecipe.cookMinutes}M`,
        totalTime: `PT${
          activeRecipe.prepMinutes + activeRecipe.cookMinutes
        }M`,
        recipeYield: `${2 * servingsMultiplier} servings`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: activeRecipe.rating,
          ratingCount: activeRecipe.reviewsCount,
        },
        nutrition: {
          '@type': 'NutritionInformation',
          calories: `${activeRecipe.calories} calories`,
          proteinContent: `${activeRecipe.proteinGrams}g`,
          carbohydrateContent: `${activeRecipe.netCarbsGrams || 15}g`,
        },
        recipeIngredient: activeRecipe.ingredientsEn.map(
          (i) => `${i.amount * servingsMultiplier} ${i.unit} ${i.item}`
        ),
        recipeInstructions: activeRecipe.stepsEn.map((step, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: step.title,
          text: step.instruction,
        })),
        video: {
          '@type': 'VideoObject',
          name: activeRecipe.titleEn,
          description: activeRecipe.subtitleEn,
          thumbnailUrl: [`https://cookreel.com${activeRecipe.image}`],
          contentUrl: `https://cookreel.com${activeRecipe.videoUrl}`,
          uploadDate: '2026-11-24T08:00:00+00:00',
          duration: 'PT12S',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (activeRecipe.faqs || []).map((faq) => ({
          '@type': 'Question',
          name: faq.questionEn,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answerEn,
          },
        })),
      },
    ]);
  }, [activeRecipe, servingsMultiplier]);

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900"
    >
      {/* Dynamic Recipe + VideoObject + FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: activeRecipeSchemaJson }}
      />

      {/* Strict 3-Zone Top Bar Contract with the Exact 4 Primary Navigation Silos */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={() => selectCategory('all')}
            className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display"
          >
            CookReel
          </a>

          {/* Zone 2: The 4 Main Site Architecture Categories + Meal Planner */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#site-architecture"
              onClick={() => selectCategory('quick_easy')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'quick_easy'
                  ? 'text-slate-900 font-bold underline underline-offset-8 decoration-2 decoration-amber-700'
                  : ''
              }`}
            >
              {isAr ? 'وصفات سريعة' : 'Quick & Easy'}
            </a>
            <a
              href="#site-architecture"
              onClick={() => selectCategory('healthy_diet')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'healthy_diet'
                  ? 'text-slate-900 font-bold underline underline-offset-8 decoration-2 decoration-amber-700'
                  : ''
              }`}
            >
              {isAr ? 'أكل صحي وحميات' : 'Healthy & Diet'}
            </a>
            <a
              href="#site-architecture"
              onClick={() => selectCategory('desserts_baking')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'desserts_baking'
                  ? 'text-slate-900 font-bold underline underline-offset-8 decoration-2 decoration-amber-700'
                  : ''
              }`}
            >
              {isAr ? 'حلويات ومخبوزات' : 'Desserts & Baking'}
            </a>
            <a
              href="#site-architecture"
              onClick={() => selectCategory('kitchen_hacks')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'kitchen_hacks'
                  ? 'text-slate-900 font-bold underline underline-offset-8 decoration-2 decoration-amber-700'
                  : ''
              }`}
            >
              {isAr ? 'نصائح وأدوات' : 'Kitchen Hacks'}
            </a>
            <a
              href="#weekly-planner"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? 'جدول الأسبوع' : 'Meal Planner'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {isAr
                ? `حقيبة المطبخ (${totalBagCount})`
                : `Kitchen Bag (${totalBagCount})`}
            </button>
          </div>
        </div>
      </header>

      <main
        id="top"
        className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 space-y-12"
      >
        {/* Hero Split with REAL Auto-Playing MP4 Cooking Video Reel & 30-Day AdSense Roadmap Access */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Editorial Headline, Search & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <div>
                    <span>CookReel.com</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>Test-Kitchen Video Recipes & Culinary Guides</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight leading-[1.18] font-display">
                  {isAr
                    ? 'وصفات فيديو قصيرة خطوة بخطوة مع أدلة المطبخ وجداول بدائل المكونات.'
                    : 'Short-Form Video Recipes Paired with In-Depth Culinary Guides & Chef Substitutions.'}
                </h1>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                  {isAr
                    ? 'اكتشف وصفات العشاء السريعة في 15 دقيقة، أطباق الكيتو والبروتين العالي، الحلويات المنزلية، وأدلة بدائل المكونات المختبرة في مطبخ CookReel.'
                    : 'Explore 15-minute weeknight dinners, high-protein & keto skillets, bakery-style desserts, and kitchen-tested ingredient substitution guides.'}
                </p>
              </div>

              {/* Search Input & Quick Actions */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        isAr
                          ? 'ابحث عن وجبات 15 دقيقة، كيتو، قلاية هوائية، أو بدائل المكونات...'
                          : 'Search 15-minute meals, keto, air fryer, or ingredient substitutes...'
                      }
                      className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF9F6] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Upload className="w-4 h-4" />
                    <span>
                      {isAr ? 'إضافة وصفة جديدة' : 'Submit Recipe Reel'}
                    </span>
                  </button>
                </div>

                {/* Quick Editorial Links */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('about')}
                    className="hover:text-slate-900 underline underline-offset-4"
                  >
                    {isAr ? 'من نحن' : 'About Us'}
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('contact')}
                    className="hover:text-slate-900 underline underline-offset-4"
                  >
                    {isAr ? 'اتصل بنا' : 'Contact Us'}
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('privacy')}
                    className="hover:text-slate-900 underline underline-offset-4"
                  >
                    {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => setActiveLegalModal('terms')}
                    className="hover:text-slate-900 underline underline-offset-4"
                  >
                    {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Real HTML5 <video> Player Running /videos/hero-cookreel-featured.mp4 */}
            <div className="lg:col-span-5 relative min-h-[300px] rounded-xl overflow-hidden bg-slate-950 border border-slate-200">
              <video
                ref={heroVideoRef}
                src={HERO_FEATURED_VIDEO_URL}
                poster="/images/hero_cookreel_studio_1795527112508.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 p-5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span>COOKREEL TV · LIVE HD VIDEO REEL</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleHeroMute}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                      title={
                        isHeroMuted
                          ? isAr
                            ? 'تشغيل صوت التحمير'
                            : 'Unmute Skillet Audio'
                          : isAr
                          ? 'كتم الصوت'
                          : 'Mute Audio'
                      }
                    >
                      {isHeroMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleHeroPlay}
                      className="p-2 rounded-full bg-amber-600 hover:bg-amber-500 text-white transition-colors"
                      title={isHeroPlaying ? 'Pause' : 'Play'}
                    >
                      {isHeroPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-amber-300">
                    {isAr
                      ? 'استوديو مطبخ CookReel · وصفة مميزة'
                      : 'CookReel Test Kitchen · Featured Reel'}
                  </div>
                  <p className="text-base font-bold leading-snug">
                    {isAr
                      ? 'تحمير الستيك والأعشاب في مقلاة الحديد الزهر (54 جم بروتين)'
                      : 'Cast-Iron Keto Ribeye & Garlic Herb Butter Baste'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 4-Pillar Site Architecture & 12 Subcategories Matrix */}
        <section
          id="site-architecture"
          className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-mono text-amber-800">
                {isAr
                  ? 'أقسام الوصفات وأدلة الطهي'
                  : 'EXPLORE RECIPES BY CATEGORY & DIET'}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1 font-display">
                {isAr
                  ? 'تصفح حسب القسم الرئيسي أو التخصص'
                  : 'Browse by Culinary Department or Subcategory'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => selectCategory('all', 'all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isAr
                ? `عرض كل المقالات (${recipes.length})`
                : `View All Articles (${recipes.length})`}
            </button>
          </div>

          {/* 4 Main Silo Cards with Their 3 Subcategories & SEO/AdSense Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SITE_ARCHITECTURE.map((cat) => {
              const isCatActive = selectedCategory === cat.slug;
              return (
                <div
                  key={cat.slug}
                  className={`p-5 rounded-xl border transition-colors flex flex-col justify-between space-y-4 ${
                    isCatActive
                      ? 'bg-[#FAF9F6] border-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => selectCategory(cat.slug, 'all')}
                      className="text-left w-full"
                    >
                      <h3 className="text-base font-bold text-slate-900 hover:text-amber-800 transition-colors">
                        {isAr ? cat.labelAr : cat.labelEn}
                      </h3>
                    </button>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isAr ? cat.seoObjectiveAr : cat.seoObjectiveEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 space-y-1.5">
                    <div className="text-[11px] font-mono text-slate-500">
                      {isAr ? 'الأقسام الفرعية:' : 'Subcategories:'}
                    </div>
                    <div className="flex flex-col gap-1">
                      {cat.subcategories.map((sub) => {
                        const isSubActive =
                          selectedCategory === cat.slug &&
                          selectedSubcategory === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => selectCategory(cat.slug, sub.id)}
                            className={`text-xs text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
                              isSubActive
                                ? 'bg-slate-900 text-white font-semibold'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>• {isAr ? sub.labelAr : sub.labelEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeCategoryArchitecture && (
            <div className="p-4 rounded-lg bg-[#FAF9F6] border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-slate-900">
                  {isAr
                    ? activeCategoryArchitecture.labelAr
                    : activeCategoryArchitecture.labelEn}
                </strong>{' '}
                ·{' '}
                <span className="text-slate-600">
                  {isAr
                    ? activeCategoryArchitecture.seoObjectiveAr
                    : activeCategoryArchitecture.seoObjectiveEn}
                </span>
              </div>
              <button
                type="button"
                onClick={() => selectCategory('all', 'all')}
                className="text-amber-800 font-semibold hover:underline"
              >
                {isAr ? 'إلغاء الفلتر' : 'Clear Filter'}
              </button>
            </div>
          )}
        </section>

        {/* Section 3: Video Recipe Articles Grid */}
        <section id="video-recipes" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-amber-800">
                {isAr
                  ? 'أحدث وصفات الفيديو المصورة'
                  : 'LATEST TEST-KITCHEN VIDEO RECIPES'}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-display">
                {isAr
                  ? 'اختر أي وصفة لمشاهدة الفيديو، خطوات التحضير، وجدول البدائل'
                  : 'Fresh Video Reels, Step-by-Step Guides & Substitution Charts'}
              </h2>
            </div>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
              <p className="text-sm text-slate-600">
                {isAr
                  ? 'لا توجد مقالات في هذا القسم الفرعي حالياً.'
                  : 'No articles match this subcategory filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  selectCategory('all', 'all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'عرض كل المقالات' : 'Show All Articles'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => {
                const isSelected = recipe.id === activeRecipe.id;
                const isSaved = savedRecipeIds.includes(recipe.id);
                return (
                  <article
                    key={recipe.id}
                    className={`group bg-white rounded-xl overflow-hidden border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-slate-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div>
                      {/* 4:3 Real HTML5 <video> Player on Every Card */}
                      <div
                        onClick={() => {
                          selectRecipeAndStep(recipe, 0, true);
                          document
                            .getElementById('adsense-post-template')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer"
                      >
                        <video
                          src={recipe.videoUrl}
                          poster={recipe.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-between text-white">
                          <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                            <span className="bg-black/65 px-2 py-0.5 rounded">
                              <Play className="w-3 h-3 inline mr-1 fill-current text-amber-400" />
                              REEL · {recipe.videoDuration}
                            </span>
                            <span>
                              {recipe.wordCount || 1050}{' '}
                              {isAr ? 'كلمة' : 'words'} · ★ {recipe.rating}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs font-mono tabular-nums text-slate-200">
                            <span>
                              {recipe.prepMinutes + recipe.cookMinutes}{' '}
                              {isAr ? 'دقيقة' : 'min total'}
                            </span>
                            <span>
                              {recipe.calories} kcal · {recipe.proteinGrams}g
                              protein
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>
                            {isAr
                              ? recipe.categoryLabelAr
                              : recipe.categoryLabelEn}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleSaveRecipe(recipe.id)}
                            className={`hover:text-slate-900 transition-colors ${
                              isSaved
                                ? 'text-amber-700 font-semibold'
                                : 'text-slate-400'
                            }`}
                            aria-label="Save Recipe"
                          >
                            <Bookmark
                              className={`w-4 h-4 ${
                                isSaved ? 'fill-current' : ''
                              }`}
                            />
                          </button>
                        </div>

                        <h3
                          onClick={() => {
                            selectRecipeAndStep(recipe, 0, true);
                            document
                              .getElementById('adsense-post-template')
                              ?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-2"
                        >
                          {isAr ? recipe.titleAr : recipe.titleEn}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {isAr ? recipe.subtitleAr : recipe.subtitleEn}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-3.5 bg-[#FAF9F6] border-t border-slate-200 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-600 font-mono">
                        {isAr
                          ? `${(recipe.substitutions || []).length} بدائل · ${
                              (recipe.faqs || []).length
                            } أسئلة شائعة`
                          : `${(recipe.substitutions || []).length} Swaps · ${
                              (recipe.faqs || []).length
                            } FAQs`}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          selectRecipeAndStep(recipe, 0, true);
                          document
                            .getElementById('adsense-post-template')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-amber-700 rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        {isAr ? 'قراءة المقال الكامل' : 'Read Full Article'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 4: THE 5-PART ADSENSE-APPROVED LONG-FORM RECIPE ARTICLE TEMPLATE */}
        <article
          id="adsense-post-template"
          className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 space-y-10"
        >
          {/* Article Header & E-E-A-T Byline */}
          <div className="border-b border-slate-200 pb-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-amber-800">
              <div>
                <span>
                  {isAr
                    ? activeRecipe.categoryLabelAr
                    : activeRecipe.categoryLabelEn}
                </span>
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                <span>
                  {isAr
                    ? `دليل الطهي الكامل (${
                        activeRecipe.wordCount || 1080
                      } كلمة)`
                    : `Complete Culinary Guide (${
                        activeRecipe.wordCount || 1080
                      } Words)`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#structured-recipe-card"
                  className="px-3 py-1.5 rounded-md bg-amber-700 text-white font-sans font-semibold hover:bg-amber-800 transition-colors"
                >
                  {isAr
                    ? '↓ الانتقال لبطاقة الوصفة'
                    : '↓ Jump to Recipe Card'}
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-800 font-sans font-medium hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isAr ? 'طباعة' : 'Print'}</span>
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 font-display leading-tight">
              {isAr ? activeRecipe.titleAr : activeRecipe.titleEn}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <strong className="text-slate-900">
                {activeRecipe.chefName}
              </strong>
              <span aria-hidden="true">·</span>
              <span>
                {isAr
                  ? activeRecipe.chefTitleAr || 'شيف تنفيذي في استوديو CookReel'
                  : activeRecipe.chefTitleEn ||
                    'CookReel Executive Test Kitchen'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-amber-800 font-semibold">
                ★ {activeRecipe.rating} ({activeRecipe.reviewsCount}{' '}
                {isAr ? 'تقييم' : 'reviews'})
              </span>
            </div>
          </div>

          {/* PART 1: Engaging Editorial Introduction (100–150+ Words) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800">
              <BookOpen className="w-4 h-4" />
              <span>
                {isAr
                  ? '01. المقدمة التحريرية ولماذا تنجح هذه الطريقة (150+ كلمة)'
                  : '01. Editorial Introduction & Culinary Science (150+ Words)'}
              </span>
            </div>

            <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed max-w-4xl">
              {(isAr
                ? activeRecipe.introParagraphsAr || [activeRecipe.subtitleAr]
                : activeRecipe.introParagraphsEn || [activeRecipe.subtitleEn]
              ).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Why This Recipe Works Highlight Box */}
            {activeRecipe.whyThisWorksEn && (
              <div className="p-5 rounded-xl bg-[#FAF9F6] border border-slate-200 space-y-2.5">
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr
                    ? 'لماذا تتفوق هذه الوصفة على الطرق التقليدية؟'
                    : 'Why This Test-Kitchen Method Works Every Time:'}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
                  {(isAr
                    ? activeRecipe.whyThisWorksAr
                    : activeRecipe.whyThisWorksEn
                  ).map((point, i) => (
                    <li
                      key={i}
                      className="p-3 rounded-lg bg-white border border-slate-200 leading-relaxed"
                    >
                      <strong className="font-mono text-amber-800 mr-1">
                        ✓
                      </strong>{' '}
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* PART 2: Short Video Reel + 3 Step-by-Step Original Stage Visuals */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-amber-800">
                {isAr
                  ? '02. فيديو التحضير القصير (CookReel Video) + صور مراحل الطبخ خطوة بخطوة'
                  : '02. Short-Form Video Reel & Step-by-Step Cooking Visuals'}
              </div>
              <span className="text-xs text-slate-500 font-mono">
                CookReel Test Kitchen Studio
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Video Player */}
              <div className="lg:col-span-7 rounded-xl overflow-hidden bg-slate-950 border border-slate-200 flex flex-col justify-between">
                <div className="relative aspect-[4/3] w-full bg-black">
                  <video
                    ref={studioVideoRef}
                    key={activeRecipe.videoUrl}
                    src={activeRecipe.videoUrl}
                    poster={activeRecipe.image}
                    autoPlay
                    loop
                    muted={isStudioMuted}
                    playsInline
                    onTimeUpdate={handleStudioTimeUpdate}
                    onPlay={() => setIsStudioPlaying(true)}
                    onPause={() => setIsStudioPlaying(false)}
                    onClick={toggleStudioPlay}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded bg-black/70 text-[11px] font-mono text-white">
                      {activeRecipe.chefName}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-amber-600/90 text-[11px] font-mono font-semibold text-white">
                      {isAr
                        ? `مشهد 0${currentVideoSceneIndex + 1}: ${
                            activeRecipe.stepsAr[currentVideoSceneIndex]
                              ?.title || ''
                          }`
                        : `Scene 0${currentVideoSceneIndex + 1}: ${
                            activeRecipe.stepsEn[currentVideoSceneIndex]
                              ?.title || ''
                          }`}
                    </span>
                  </div>
                </div>

                {/* Video Scrubber Controls */}
                <div className="p-3.5 bg-slate-950 text-white space-y-2 border-t border-slate-800">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.5}
                    value={videoProgressPct}
                    onChange={handleStudioSeek}
                    className="w-full accent-amber-500 cursor-pointer h-1.5"
                    aria-label="Seek video timeline"
                  />
                  <div className="flex items-center justify-between gap-3 text-xs font-mono tabular-nums">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleStudioPlay}
                        className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold inline-flex items-center gap-1.5"
                      >
                        {isStudioPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>{isAr ? 'إيقاف' : 'Pause'}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{isAr ? 'تشغيل' : 'Play'}</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={toggleStudioMute}
                        className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 inline-flex items-center gap-1.5"
                      >
                        {isStudioMuted ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>
                              {isAr ? 'تشغيل الصوت' : 'Unmute Sizzle'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isAr ? 'الصوت يعمل' : 'Audio On'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300">
                        {formatTimer(videoCurrentSec)} /{' '}
                        {formatTimer(videoDurationSec)}
                      </span>
                      <button
                        type="button"
                        onClick={handleStudioFullscreen}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Original Step-by-Step Visual Photographs */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr
                    ? 'صور مراحل التحضير خطوة بخطوة (اضغط للانتقال للمشهد):'
                    : 'Step-by-Step Visual Stages (Click to Seek Video):'}
                </h3>
                <div className="grid grid-cols-1 gap-3 flex-1">
                  {(
                    activeRecipe.stepGalleryImages || [
                      '/images/gear_cast_iron_skillet_1795527125638.jpg',
                      '/images/action_searing_skillet_butter_1795530068462.jpg',
                      activeRecipe.image,
                    ]
                  ).map((imgUrl, sIdx) => {
                    const stepMeta = (
                      isAr ? activeRecipe.stepsAr : activeRecipe.stepsEn
                    )[sIdx];
                    return (
                      <div
                        key={sIdx}
                        onClick={() => {
                          setActiveStepIdx(sIdx);
                          const vid = studioVideoRef.current;
                          if (vid && vid.duration) {
                            vid.currentTime = (sIdx / 3) * vid.duration;
                            vid.play().catch(() => {});
                            setIsStudioPlaying(true);
                          }
                        }}
                        className="flex items-center gap-3.5 p-2.5 rounded-xl border border-slate-200 hover:border-slate-900 cursor-pointer bg-[#FAF9F6] transition-colors"
                      >
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                          <Image
                            src={imgUrl}
                            alt={stepMeta?.title || `Step ${sIdx + 1}`}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-mono font-bold text-amber-800">
                            {isAr
                              ? `المرحلة 0${sIdx + 1}`
                              : `Stage 0${sIdx + 1}`}{' '}
                            · {stepMeta?.title}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                            {stepMeta?.instruction}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* PART 3: Chef Tips for Success & Ingredient Substitutions Table */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800">
              <Sparkles className="w-4 h-4" />
              <span>
                {isAr
                  ? '03. أسرار نجاح الوصفة وجدول بدائل المكونات'
                  : '03. Chef Tips for Success & 1:1 Ingredient Substitutions Matrix'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Pro Chef Tips */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-[#FAF9F6] border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-slate-900">
                  {isAr
                    ? 'نصائح الشيف الذهبية لضمان نجاح الطبق:'
                    : 'Pro Test-Kitchen Secrets for Foolproof Results:'}
                </h3>
                <ul className="space-y-2.5 text-xs md:text-sm text-slate-700">
                  {(isAr
                    ? activeRecipe.chefTipsAr || []
                    : activeRecipe.chefTipsEn || []
                  ).map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <strong className="font-mono text-amber-800">
                        0{idx + 1}.
                      </strong>{' '}
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredient Substitutions Table */}
              <div className="lg:col-span-7 border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900">
                    {isAr
                      ? 'جدول بدائل المكونات (ماذا تفعل إذا لم يتوفر لديك مكون؟)'
                      : 'Verified Ingredient Substitutions Guide'}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-white font-mono text-slate-500">
                        <th className="py-2.5 px-4">
                          {isAr ? 'المكون الأصلي' : 'Original Ingredient'}
                        </th>
                        <th className="py-2.5 px-4">
                          {isAr
                            ? 'البديل المجرب (1:1)'
                            : 'Tested 1:1 Substitute'}
                        </th>
                        <th className="py-2.5 px-4">
                          {isAr ? 'ملاحظة الشيف' : 'Culinary Impact'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {(activeRecipe.substitutions || []).map((sub, idx) => (
                        <tr key={idx} className="align-top">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {isAr ? sub.originalAr : sub.originalEn}
                          </td>
                          <td className="py-3 px-4 font-semibold text-emerald-800">
                            {isAr ? sub.substituteAr : sub.substituteEn}
                          </td>
                          <td className="py-3 px-4 text-slate-600 leading-relaxed">
                            {isAr ? sub.chefNoteAr : sub.chefNoteEn}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* PART 4: Structured Printable Recipe Card */}
          <div
            id="structured-recipe-card"
            className="pt-6 border-t border-slate-200 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-mono text-amber-800">
                {isAr
                  ? '04. بطاقة الوصفة والمقادير الدقيقة'
                  : '04. Printable Recipe Card & Interactive Cooking Timer'}
              </div>
              <span className="text-xs font-mono text-emerald-800 font-semibold">
                {isAr ? 'مختبرة في مطبخ CookReel' : 'Tested & Verified in Our Kitchen'}
              </span>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-[#FAF9F6] border-2 border-slate-900 space-y-6">
              {/* Recipe Card Top Summary Strip */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-amber-800">
                    OFFICIAL COOKREEL RECIPE CARD · ★ {activeRecipe.rating} (
                    {activeRecipe.reviewsCount} REVIEWS)
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display">
                    {isAr ? activeRecipe.titleAr : activeRecipe.titleEn}
                  </h3>
                </div>

                {/* Quick Add to Weekly Meal Planner + Print */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300">
                    <select
                      value={selectedDayToAssign}
                      onChange={(e) =>
                        setSelectedDayToAssign(Number(e.target.value))
                      }
                      className="text-xs bg-white px-2 py-1 text-slate-800"
                    >
                      {(isAr ? WEEKDAYS_AR : WEEKDAYS_EN).map((day, idx) => (
                        <option key={day} value={idx}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        handleAssignToWeekday(
                          selectedDayToAssign,
                          activeRecipe.id
                        )
                      }
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-900 text-white rounded hover:bg-slate-800"
                    >
                      {isAr ? '+ لجدول الأسبوع' : '+ Plan Day'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 hover:border-slate-900 rounded-lg inline-flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{isAr ? 'طباعة الوصفة' : 'Print Recipe'}</span>
                  </button>
                </div>
              </div>

              {/* 5-Metric Nutritional & Timing Telemetry Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-lg bg-white border border-slate-200 text-xs font-mono tabular-nums">
                <div>
                  <div className="text-slate-500">
                    {isAr ? 'وقت التجهيز' : 'Prep Time'}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {activeRecipe.prepMinutes} mins
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">
                    {isAr ? 'وقت الطهي' : 'Cook Time'}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {activeRecipe.cookMinutes} mins
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">
                    {isAr ? 'السعرات الحرارية' : 'Calories'}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {activeRecipe.calories} kcal
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">
                    {isAr ? 'البروتين الصافي' : 'Protein'}
                  </div>
                  <div className="font-bold text-emerald-800 text-sm mt-0.5">
                    {activeRecipe.proteinGrams}g
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">
                    {isAr ? 'صافي الكربوهيدرات' : 'Net Carbs'}
                  </div>
                  <div className="font-bold text-amber-800 text-sm mt-0.5">
                    {activeRecipe.netCarbsGrams ?? 12}g
                  </div>
                </div>
              </div>

              {/* Ingredients & Interactive Timer Split inside Recipe Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Ingredients Column */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">
                      {isAr ? 'جدول المكونات:' : 'Ingredients:'}
                    </h4>
                    <div className="flex items-center gap-1 p-1 bg-slate-200/75 rounded-lg">
                      {([1, 2, 4] as const).map((mult) => (
                        <button
                          key={mult}
                          type="button"
                          onClick={() => setServingsMultiplier(mult)}
                          className={`px-2.5 py-1 text-xs font-mono font-semibold rounded transition-colors ${
                            servingsMultiplier === mult
                              ? 'bg-white text-slate-900 shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {mult}x ({2 * mult} {isAr ? 'حصص' : 'servings'})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {(isAr
                      ? activeRecipe.ingredientsAr
                      : activeRecipe.ingredientsEn
                    ).map((ing, idx) => {
                      const key = `${activeRecipe.id}-ing-${idx}`;
                      const checked = checkedIngredients.includes(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleIngredientCheck(key)}
                          className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg border text-xs text-left transition-colors ${
                            checked
                              ? 'bg-slate-100 border-slate-200 text-slate-400 line-through'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {checked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <span>{ing.item}</span>
                          </span>
                          <span className="font-mono font-bold tabular-nums shrink-0">
                            {ing.amount * servingsMultiplier} {ing.unit}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Shop the Reel Cookware Box inside Card */}
                  <div
                    id="shop-gear"
                    className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-amber-800">
                        {isAr ? 'الأداة الموصى بها:' : 'RECOMMENDED EQUIPMENT:'}
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">
                        {isAr
                          ? activeRecipe.gearItem.nameAr
                          : activeRecipe.gearItem.nameEn}
                      </div>
                      <div className="text-xs font-mono text-slate-600 mt-0.5">
                        ${activeRecipe.gearItem.priceUsd} ·{' '}
                        {activeRecipe.gearItem.brand}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddGearToBag(activeRecipe)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isAr ? 'اطلب الأداة' : 'Shop Gear'}</span>
                    </button>
                  </div>
                </div>

                {/* Instructions & Built-In Timer Column */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-mono text-amber-400">
                        {isAr
                          ? `مؤقت الخطوة 0${activeStepIdx + 1}`
                          : `STEP 0${activeStepIdx + 1} TIMER`}
                      </div>
                      <div className="text-2xl font-mono font-bold tabular-nums mt-0.5">
                        {formatTimer(timerRemainingSec)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTimerRunning((r) => !r)}
                        className="px-3.5 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white rounded-lg"
                      >
                        {timerRunning
                          ? isAr
                            ? 'إيقاف'
                            : 'Pause'
                          : isAr
                          ? 'بدء المؤقت'
                          : 'Start Timer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTimerRunning(false);
                          const stepObj =
                            activeRecipe.stepsEn[activeStepIdx] ||
                            activeRecipe.stepsEn[0];
                          setTimerRemainingSec(stepObj.timerSeconds);
                        }}
                        className="px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                      >
                        {isAr ? 'إعادة' : 'Reset'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {(isAr ? activeRecipe.stepsAr : activeRecipe.stepsEn).map(
                      (step, idx) => {
                        const isCurrentStep = activeStepIdx === idx;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveStepIdx(idx);
                              setTimerRunning(false);
                              setTimerRemainingSec(step.timerSeconds);
                            }}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-colors ${
                              isCurrentStep
                                ? 'bg-white border-slate-900 shadow-sm'
                                : 'bg-white/70 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-800 mb-1">
                              <span>
                                0{idx + 1}. {step.title}
                              </span>
                              <span>{formatTimer(step.timerSeconds)}</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {step.instruction}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PART 5: Frequently Asked Questions (FAQ Section) + Verified Community Reviews */}
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800">
              <HelpCircle className="w-4 h-4" />
              <span>
                {isAr
                  ? '05. الأسئلة الشائعة حول التخزين والتجميد وإعادة التسخين'
                  : '05. Frequently Asked Questions: Storage, Freezing & Reheating'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(activeRecipe.faqs || []).map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#FAF9F6] border border-slate-200 space-y-2"
                >
                  <h4 className="text-sm font-bold text-slate-900">
                    {isAr ? faq.questionAr : faq.questionEn}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isAr ? faq.answerAr : faq.answerEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Community Reviews Sub-Section */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  <span>
                    {isAr
                      ? `تعليقات وتقييمات القراء (${activeRecipeReviews.length})`
                      : `Reader Reviews & Comments (${activeRecipeReviews.length})`}
                  </span>
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeRecipeReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-lg bg-[#FAF9F6] border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono">
                      <strong className="text-slate-900">
                        {rev.authorName}
                      </strong>
                      <span className="text-amber-700">
                        {'★'.repeat(rev.rating)}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleReviewSubmit}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-2"
              >
                <input
                  type="text"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder={isAr ? 'اسمك...' : 'Your name...'}
                  className="sm:col-span-3 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="sm:col-span-2 px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                >
                  <option value={5}>★★★★★ (5)</option>
                  <option value={4}>★★★★☆ (4)</option>
                  <option value={3}>★★★☆☆ (3)</option>
                </select>
                <input
                  type="text"
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={
                    isAr
                      ? 'شاركنا تجربتك أو سؤالك حول الوصفة...'
                      : 'Share how this recipe turned out...'
                  }
                  className="sm:col-span-5 px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                />
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="sm:col-span-2 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {isAr ? 'إرسال التقييم' : 'Post Review'}
                </button>
              </form>
            </div>
          </div>
        </article>

        {/* Section 5: 7-Day Weekly Dinner Meal Planner & Smart Grocery List Exporter */}
        <section
          id="weekly-planner"
          className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-800">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? 'مخطط وجبات الأسبوع وقائمة المقاضي الذكية'
                    : '7-DAY WEEKLY DINNER PLANNER & CONSOLIDATED GROCERY LIST'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1 font-display">
                {isAr
                  ? 'رتّب جدول العشاء لأسبوع كامل وحمّل قائمة المقاضي المجمعة بضغطة زر'
                  : 'Plan Your Weekly Dinner Reels & Export a 1-Click Grocery List'}
              </h2>
            </div>

            <button
              type="button"
              onClick={handleExportWeeklyGroceryList}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>
                {isAr
                  ? 'تحميل قائمة مقاضي الأسبوع (.txt)'
                  : 'Download Weekly Grocery List (.txt)'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {(isAr ? WEEKDAYS_AR : WEEKDAYS_EN).map((dayName, dayIdx) => {
              const assignedId = weeklyPlan[dayIdx];
              const assignedRecipe = recipes.find((r) => r.id === assignedId);
              return (
                <div
                  key={dayName}
                  className="p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono font-bold text-amber-800">
                      {dayName}
                    </div>
                    {assignedRecipe ? (
                      <button
                        type="button"
                        onClick={() => {
                          selectRecipeAndStep(assignedRecipe, 0, true);
                          document
                            .getElementById('adsense-post-template')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs font-bold text-slate-900 hover:text-amber-800 text-left line-clamp-2"
                      >
                        {isAr ? assignedRecipe.titleAr : assignedRecipe.titleEn}
                      </button>
                    ) : (
                      <p className="text-xs text-slate-400">
                        {isAr ? 'لم يتم اختيار وصفة' : 'No dinner assigned'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/80">
                    {assignedRecipe && (
                      <div className="text-[11px] font-mono tabular-nums text-slate-500">
                        {assignedRecipe.prepMinutes +
                          assignedRecipe.cookMinutes}
                        m · {assignedRecipe.calories} kcal
                      </div>
                    )}
                    <select
                      value={assignedId || ''}
                      onChange={(e) =>
                        handleAssignToWeekday(dayIdx, e.target.value)
                      }
                      className="w-full text-[11px] bg-white border border-slate-300 rounded px-2 py-1 text-slate-700"
                    >
                      {recipes.map((r) => (
                        <option key={r.id} value={r.id}>
                          {(isAr ? r.titleAr : r.titleEn).slice(0, 26)}...
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 6: Weekly 15-Minute Video Recipe Club */}
        <section className="bg-slate-900 text-white rounded-xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="text-xs font-mono text-amber-400">
                {isAr
                  ? 'نشرة CookReel الأسبوعية المجانية'
                  : 'COOKREEL WEEKLY 15-MINUTE DINNER CLUB'}
              </div>
              <h2 className="text-2xl font-bold font-display">
                {isAr
                  ? 'احصل على 5 وصفات فيديو جديدة وجدول بدائل المكونات مجاناً في بريدك'
                  : 'Get 5 New 60-Second Dinner Reels & Substitution Guides Delivered Free'}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {isAr
                  ? 'انضم لأكثر من 14,500 طاهٍ منزلي يستلمون جدول العشاء السريع ووصفات الكيتو والقلاية الهوائية.'
                  : 'Join 14,500+ home cooks receiving our tested cast-iron skillet dinners, air fryer recipes, and meal-prep guides.'}
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterSubscribed ? (
                <div className="p-4 rounded-lg bg-emerald-950/90 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>
                    {isAr
                      ? 'تم تسجيل بريدك بنجاح في قاعدة بيانات CookReel!'
                      : 'You are subscribed! Your weekly 15-minute dinner reels are on the way.'}
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={
                        isAr
                          ? 'أدخل بريدك الإلكتروني...'
                          : 'Enter your email address...'
                      }
                      className="w-full pl-10 pr-4 py-3 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-3 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {isAr ? 'اشترك مجاناً' : 'Join Dinner Club'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Slide-Over Kitchen Gear Checkout & Saved Recipes Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 flex flex-col justify-between overflow-y-auto shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {isAr
                    ? 'حقيبة أدوات المطبخ والوصفات المحفوظة'
                    : 'Kitchen Gear Bag & Saved Reels'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {confirmedReceipt && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono font-bold text-emerald-900">
                    <span>
                      {isAr
                        ? `تم تأكيد الطلب #${confirmedReceipt.orderId}`
                        : `Order #${confirmedReceipt.orderId} Confirmed`}
                    </span>
                    <span>${confirmedReceipt.totalUsd}</span>
                  </div>
                  <p className="text-emerald-800">
                    {confirmedReceipt.status} · {confirmedReceipt.customerName}
                  </p>
                  <p className="text-emerald-700 font-mono text-[11px]">
                    {confirmedReceipt.shippingAddress}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-mono font-semibold text-slate-500">
                  {isAr
                    ? `أدوات الطهي المختارة (${gearCart.length})`
                    : `SELECTED CHEF COOKWARE (${gearCart.length})`}
                </h4>
                {gearCart.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3">
                    {isAr
                      ? 'لم تضف أي أداة مطبخ بعد. يمكنك إضافة المقلاة أو السكين من بطاقة الوصفة.'
                      : 'No cookware added yet. Click "Shop Gear" inside any recipe card.'}
                  </p>
                ) : (
                  <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
                    {gearCart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-900 truncate">
                            {item.name}
                          </div>
                          <div className="text-slate-500 mt-0.5 font-mono">
                            {item.brand} · ${item.priceUsd}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateCartItemQty(item.id, -1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold tabular-nums w-5 text-center">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartItemQty(item.id, 1)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartItemQty(item.id, -item.qty)
                            }
                            className="p-1 text-slate-400 hover:text-red-700 ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {gearCart.length > 0 && (
                <form
                  onSubmit={handlePlaceGearOrder}
                  className="p-4 rounded-xl bg-[#FAF9F6] border border-slate-200 space-y-3"
                >
                  <div className="text-xs font-mono font-bold text-slate-900">
                    {isAr
                      ? 'بيانات التوصيل وإتمام الطلب المباشر'
                      : 'EXPRESS COOKWARE CHECKOUT (FREE DELIVERY)'}
                  </div>
                  <input
                    type="text"
                    required
                    value={checkoutName}
                    onChange={(e) => setCheckoutName(e.target.value)}
                    placeholder={isAr ? 'الاسم الكامل...' : 'Full Name...'}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md"
                  />
                  <input
                    type="email"
                    required
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    placeholder={
                      isAr ? 'البريد الإلكتروني...' : 'Email for Receipt...'
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md"
                  />
                  <input
                    type="text"
                    required
                    value={checkoutAddress}
                    onChange={(e) => setCheckoutAddress(e.target.value)}
                    placeholder={
                      isAr
                        ? 'عنوان التوصيل والمدينة...'
                        : 'Street Address, City & Postal Code...'
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md"
                  />
                  <div className="flex items-center justify-between text-xs font-bold pt-1">
                    <span>
                      {isAr ? 'الإجمالي المستحق:' : 'Order Total (USD):'}
                    </span>
                    <span className="font-mono text-sm tabular-nums">
                      ${totalGearPrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isPlacingOrder}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>
                      {isPlacingOrder
                        ? isAr
                          ? 'جاري تأكيد الطلب...'
                          : 'Confirming Order...'
                        : isAr
                        ? 'تأكيد طلب أدوات المطبخ الآن'
                        : 'Confirm Cookware Order'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              <div className="space-y-3">
                <h4 className="text-xs font-mono font-semibold text-slate-500">
                  {isAr
                    ? `الوصفات المحفوظة (${savedRecipeIds.length})`
                    : `SAVED VIDEO RECIPES (${savedRecipeIds.length})`}
                </h4>
                <div className="space-y-2">
                  {recipes
                    .filter((r) => savedRecipeIds.includes(r.id))
                    .map((r) => (
                      <div
                        key={r.id}
                        onClick={() => {
                          selectRecipeAndStep(r, 0, true);
                          setIsDrawerOpen(false);
                        }}
                        className="p-3 rounded-lg border border-slate-200 hover:border-slate-400 cursor-pointer flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="font-semibold text-slate-900 truncate">
                          {isAr ? r.titleAr : r.titleEn}
                        </span>
                        <span className="font-mono text-slate-500 shrink-0">
                          {r.prepMinutes + r.cookMinutes}m
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-full py-2 px-4 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {isAr ? 'مواصلة تصفح الوصفات' : 'Continue Browsing Recipes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Long-Form AdSense E-E-A-T Video Recipe Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-800">
                  COOKREEL TEST KITCHEN STUDIO
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Submit a New Video Recipe & Culinary Guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadRecipeSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr
                    ? 'ملف الفيديو القصير (.mp4 أو .webm):'
                    : 'Short-Form Video File (.mp4 / .webm):'}
                </label>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/*"
                  onChange={handleVideoFileSelect}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white"
                />
                {uploadedVideoFileName && (
                  <p className="text-xs font-mono text-emerald-700 mt-1">
                    ✓ {uploadedVideoFileName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr ? 'عنوان المقال / الوصفة:' : 'Recipe Article Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder={
                    isAr
                      ? 'مثال: صدور الدجاج المقرمشة في القلاية الهوائية بـ 5 مكونات'
                      : 'e.g. 15-Minute Air Fryer Crispy Garlic Parmesan Chicken'
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr
                      ? 'القسم الرئيسي (من الأقسام الأربعة):'
                      : 'Primary Category:'}
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => {
                      const cat = e.target.value as PrimaryCategorySlug;
                      setUploadCategory(cat);
                      const found = SITE_ARCHITECTURE.find(
                        (c) => c.slug === cat
                      );
                      if (found && found.subcategories[0]) {
                        setUploadSubcategory(found.subcategories[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {SITE_ARCHITECTURE.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {isAr ? c.labelAr : c.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'القسم الفرعي:' : 'Subcategory:'}
                  </label>
                  <select
                    value={uploadSubcategory}
                    onChange={(e) => setUploadSubcategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {(
                      SITE_ARCHITECTURE.find((c) => c.slug === uploadCategory)
                        ?.subcategories || []
                    ).map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {isAr ? sub.labelAr : sub.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isAr
                    ? 'المقدمة التحريرية (تحدث عن طعم الوصفة ولماذا هذه الطريقة أفضل):'
                    : 'Editorial Introduction (100–150 words on flavor & technique):'}
                </label>
                <textarea
                  rows={2}
                  value={uploadIntroText}
                  onChange={(e) => setUploadIntroText(e.target.value)}
                  placeholder={
                    isAr
                      ? 'اكتب مقدمة جذابة تشرح سر الوصفة ومتى تقدم...'
                      : 'Explain why this technique works and when to serve it...'
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chef Tip & Ingredient Substitution Note:
                </label>
                <input
                  type="text"
                  value={uploadChefTip}
                  onChange={(e) => setUploadChefTip(e.target.value)}
                  placeholder={
                    isAr
                      ? 'مثال: يمكن استبدال كريمة الطبخ بالحليب مع الزبدة...'
                      : 'e.g. Swap heavy cream 1:1 with whole milk + melted butter...'
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr
                      ? 'أداة المطبخ الموصى بها (أفيليت):'
                      : 'Recommended Cookware:'}
                  </label>
                  <input
                    type="text"
                    value={uploadGearName}
                    onChange={(e) => setUploadGearName(e.target.value)}
                    placeholder="Digital Air Fryer XL / Cast-Iron Skillet"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {isAr ? 'السعر ($):' : 'Price ($):'}
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={800}
                    value={uploadGearPrice}
                    onChange={(e) =>
                      setUploadGearPrice(Number(e.target.value))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Video Recipe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Legal & Editorial Pages Modal */}
      <LegalAndAdsenseModals
        activeModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />

      {/* Editorial Footer with All 4 Primary Categories + Popular Subcategories + Legal Links */}
      <footer className="border-t border-slate-200 bg-white px-6 py-10 mt-16">
        <div className="max-w-[1280px] mx-auto space-y-6 text-xs text-slate-500">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="text-base font-bold text-slate-900 font-display">
                CookReel.com
              </div>
              <p className="leading-relaxed">
                {isAr
                  ? 'منصة وصفات الفيديو القصيرة وأدلة الطهي المنزلية مع جداول بدائل المكونات وحاسبة المقادير.'
                  : 'Short-form video recipes, step-by-step culinary guides, and 1:1 ingredient substitution charts for home cooks.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900">
                {isAr ? 'أقسام الوصفات' : 'Recipe Categories'}
              </div>
              <div className="flex flex-col gap-1.5">
                {SITE_ARCHITECTURE.map((cat) => (
                  <a
                    key={cat.slug}
                    href="#site-architecture"
                    onClick={() => selectCategory(cat.slug, 'all')}
                    className="hover:text-slate-900"
                  >
                    {isAr ? cat.labelAr : cat.labelEn}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900">
                {isAr ? 'تخصصات شائعة' : 'Popular Collections'}
              </div>
              <div className="flex flex-col gap-1.5 items-start">
                <a
                  href="#site-architecture"
                  onClick={() => selectCategory('quick_easy', '15-minute-meals')}
                  className="hover:text-slate-900"
                >
                  {isAr ? 'وجبات في 15 دقيقة' : '15-Minute Meals'}
                </a>
                <a
                  href="#site-architecture"
                  onClick={() => selectCategory('quick_easy', 'air-fryer-recipes')}
                  className="hover:text-slate-900"
                >
                  {isAr ? 'وصفات القلاية الهوائية' : 'Air Fryer Recipes'}
                </a>
                <a
                  href="#site-architecture"
                  onClick={() => selectCategory('healthy_diet', 'keto-low-carb')}
                  className="hover:text-slate-900"
                >
                  {isAr ? 'كيتو ولو كارب' : 'Keto & Low-Carb'}
                </a>
                <a
                  href="#site-architecture"
                  onClick={() =>
                    selectCategory('kitchen_hacks', 'ingredient-substitutes')
                  }
                  className="hover:text-slate-900"
                >
                  {isAr ? 'بدائل المكونات' : 'Ingredient Substitutes'}
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900">
                {isAr ? 'عن الموقع والسياسات' : 'About & Legal'}
              </div>
              <div className="flex flex-col gap-1.5 items-start">
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('about')}
                  className="hover:text-slate-900"
                >
                  {isAr ? 'من نحن' : 'About Us'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('contact')}
                  className="hover:text-slate-900"
                >
                  {isAr ? 'اتصل بنا' : 'Contact Us'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('privacy')}
                  className="hover:text-slate-900"
                >
                  {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLegalModal('terms')}
                  className="hover:text-slate-900"
                >
                  {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} CookReel.com · All Rights Reserved.
            </div>
            <div>
              CookReel Culinary Studio & Test Kitchen
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
