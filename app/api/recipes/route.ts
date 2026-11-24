import { NextRequest, NextResponse } from 'next/server';
import {
  readDatabase,
  writeDatabase,
  sanitizeText,
  isValidCategory,
} from '@/lib/server-db';
import { CulinaryRecipe, SITE_ARCHITECTURE } from '@/lib/cookreel-data';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({
    recipes: db.recipes,
    reviews: db.reviews,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = sanitizeText(body.title, 120);
    if (!title || title.length < 3) {
      return NextResponse.json(
        { error: 'Recipe title must be at least 3 characters.' },
        { status: 400 }
      );
    }

    const subtitle =
      sanitizeText(body.subtitle, 240) ||
      'Step-by-step culinary video reel and complete recipe guide published on CookReel.';
    const introText =
      sanitizeText(body.introText, 900) ||
      `${title} is crafted in our test kitchen to deliver maximum flavor with foolproof step-by-step video guidance. Below you will find our tested ingredient substitutions, storage FAQs, and interactive recipe card.`;
    const chefTipText =
      sanitizeText(body.chefTip, 400) ||
      'Bring your primary ingredients to room temperature 15 minutes before cooking and season in layers for restaurant-level balance.';
    const chefName = sanitizeText(body.chefName, 60) || 'CookReel Test Kitchen';
    const category = isValidCategory(body.category)
      ? body.category
      : 'quick_easy';

    const catObj =
      SITE_ARCHITECTURE.find((c) => c.slug === category) || SITE_ARCHITECTURE[0];
    const requestedSub = sanitizeText(body.subcategoryId, 60);
    const matchedSub =
      catObj.subcategories.find((s) => s.id === requestedSub) ||
      catObj.subcategories[0];

    const cookMinutes = Math.min(
      Math.max(Number(body.cookMinutes) || 15, 1),
      240
    );
    const gearName =
      sanitizeText(body.gearName, 100) ||
      'Professional Seasoned Cast-Iron Skillet';
    const gearPrice = Math.min(Math.max(Number(body.gearPrice) || 125, 10), 2000);

    const allowedVideos = [
      '/videos/hero-cookreel-featured.mp4',
      '/videos/crispy-salmon-skillet.mp4',
      '/videos/garlic-butter-ribeye-steak.mp4',
      '/videos/truffle-tagliatelle-pasta.mp4',
      '/videos/lemon-herb-roasted-chicken.mp4',
      '/videos/mediterranean-spiced-shakshuka.mp4',
      '/videos/mango-strawberry-sunset-cupcakes.mp4',
    ];
    const videoUrl = allowedVideos.includes(body.videoUrl)
      ? body.videoUrl
      : '/videos/hero-cookreel-featured.mp4';

    const newRecipe: CulinaryRecipe = {
      id: `reel-${Date.now()}`,
      slug:
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || `recipe-${Date.now()}`,
      category,
      subcategoryId: matchedSub.id,
      categoryLabelEn: `${catObj.labelEn} · ${matchedSub.labelEn}`,
      categoryLabelAr: `${catObj.labelAr} · ${matchedSub.labelAr}`,
      titleEn: title,
      titleAr: title,
      subtitleEn: subtitle,
      subtitleAr: subtitle,
      wordCount: 950,
      introParagraphsEn: [
        introText,
        'Every recipe on CookReel combines short-form video visuals, chef-tested ingredient substitutions, and complete nutritional metrics.',
      ],
      introParagraphsAr: [
        introText,
        'تجمع هذه الوصفة بين الفيديو القصير خطوة بخطوة، وجدول بدائل المكونات، وحساب القيم الغذائية.',
      ],
      whyThisWorksEn: [
        'Tested for consistent weeknight execution with minimal cleanup.',
        'Includes exact 1:1 ingredient substitutions and storage guidelines.',
      ],
      whyThisWorksAr: [
        'مختبرة في مطبخ CookReel لضمان نجاح القوام والنكهة من أول مرة.',
        'تتضمن جدول بدائل المكونات وإرشادات التخزين والتجميد.',
      ],
      chefTipsEn: [
        chefTipText,
        'Always taste and adjust acid (fresh lemon juice or vinegar) right before serving.',
      ],
      chefTipsAr: [
        chefTipText,
        'تذوق الطبق وأضف لمسة من عصير الليمون الطازج قبل التقديم مباشرة لإبراز النكهات.',
      ],
      substitutions: [
        {
          originalEn: 'Primary Cooking Fat (Butter / Olive Oil)',
          originalAr: 'الدهن الأساسي (زبدة أو زيت زيتون)',
          substituteEn: 'Ghee or High-Smoke-Point Avocado Oil (1:1 Ratio)',
          substituteAr: 'السمن الطبيعي أو زيت الأفوكادو بنسبة 1:1',
          chefNoteEn: 'Maintains moisture and browning for dairy-free diets.',
          chefNoteAr: 'يحافظ على التحمير المثالي لمن يتبعون حمية خالية من الألبان.',
        },
      ],
      faqs: [
        {
          questionEn: 'How long can I store this dish in the refrigerator?',
          questionAr: 'كم تدوم هذه الوصفة عند حفظها في الثلاجة؟',
          answerEn:
            'Store in an airtight glass container in the refrigerator for up to 4 days.',
          answerAr:
            'تحفظ في وعاء زجاجي محكم الإغلاق داخل الثلاجة لمدة تصل إلى 4 أيام.',
        },
        {
          questionEn: 'Can I freeze leftovers of this recipe?',
          questionAr: 'هل يمكن تجميد هذه الوصفة في الفريزر؟',
          answerEn:
            'Yes, cool completely before freezing in portioned containers for up to 2 months.',
          answerAr:
            'نعم، اتركها تبرد تماماً ثم احفظها في الفريزر لمدة تصل إلى شهرين.',
        },
        {
          questionEn: 'What is the best way to reheat without drying out?',
          questionAr: 'ما هي أفضل طريقة لإعادة التسخين؟',
          answerEn:
            'Reheat gently in a covered skillet over medium-low heat or in an Air Fryer at 175°C for 3–4 minutes.',
          answerAr:
            'سخنها على نار هادئة في مقلاة مغطاة أو في القلاية الهوائية على 175 مئوية لـ 3 دقائق.',
        },
      ],
      stepGalleryImages: [
        '/images/hero_cookreel_studio_1795527112508.jpg',
        '/images/action_searing_skillet_butter_1795530068462.jpg',
        '/images/gear_cast_iron_skillet_1795527125638.jpg',
      ],
      chefName,
      chefTitleEn: 'CookReel Verified Culinary Contributor',
      chefTitleAr: 'شيف معتمد في استوديو CookReel',
      prepMinutes: 10,
      cookMinutes,
      calories: 420,
      proteinGrams: 32,
      netCarbsGrams: 16,
      videoDuration: '0:12',
      videoUrl,
      rating: 5.0,
      reviewsCount: 1,
      image: '/images/hero_cookreel_studio_1795527112508.jpg',
      gearItem: {
        id: `gear-${Date.now()}`,
        nameEn: gearName,
        nameAr: gearName,
        brand: 'CookReel Select',
        priceUsd: gearPrice,
        affiliateStore: 'Amazon Kitchen',
        image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
      },
      ingredientsEn: [
        {
          item: 'Primary fresh seasonal protein or produce',
          amount: 350,
          unit: 'g',
        },
        { item: 'Extra-virgin cold-pressed olive oil', amount: 30, unit: 'ml' },
        { item: 'Fresh garlic, herbs & flaky sea salt', amount: 15, unit: 'g' },
      ],
      ingredientsAr: [
        { item: 'المكون الرئيسي الطازج حسب الوصفة', amount: 350, unit: 'جم' },
        { item: 'زيت زيتون بكر ممتاز', amount: 30, unit: 'مل' },
        { item: 'ثوم طازج وأعشاب وملح بحري', amount: 15, unit: 'جم' },
      ],
      stepsEn: [
        {
          title: 'Prep & Season Ingredients',
          instruction:
            'Bring ingredients to room temperature and season evenly before heating the pan.',
          timerSeconds: 90,
        },
        {
          title: 'High-Heat Sear & Baste',
          instruction:
            'Sear over medium-high heat until golden brown and baste with aromatics.',
          timerSeconds: 240,
        },
      ],
      stepsAr: [
        {
          title: 'تجهيز وتتبيل المكونات',
          instruction: 'جهّز المكونات الطازجة وتبلها بالتساوي قبل تسخين المقلاة.',
          timerSeconds: 90,
        },
        {
          title: 'الطهي والتحمير السريع',
          instruction:
            'احمر المكونات على نار متوسطة إلى عالية مع إضافة الأعشاب العطرية.',
          timerSeconds: 240,
        },
      ],
    };

    const db = readDatabase();
    db.recipes = [newRecipe, ...db.recipes];
    writeDatabase(db);

    return NextResponse.json({ recipe: newRecipe }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Unable to save video recipe.' },
      { status: 500 }
    );
  }
}
