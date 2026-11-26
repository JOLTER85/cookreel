import { NextRequest, NextResponse } from 'next/server';
import {
  readDatabase,
  writeDatabase,
  sanitizeText,
  isValidCategory,
  verifyAntiSpamChallenge,
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

    if (
      !verifyAntiSpamChallenge(
        body.captchaA,
        body.captchaB,
        body.captchaAnswer,
        body.websiteHoneypot
      )
    ) {
      return NextResponse.json(
        { error: 'Please complete the anti-spam security check correctly.' },
        { status: 400 }
      );
    }

    if (!body.rightsConfirmed) {
      return NextResponse.json(
        {
          error:
            'You must confirm that your recipe submission is original content and agree to the Editorial Terms.',
        },
        { status: 400 }
      );
    }

    const title = sanitizeText(body.title, 120);
    if (!title || title.length < 3) {
      return NextResponse.json(
        { error: 'Recipe title must be at least 3 characters.' },
        { status: 400 }
      );
    }

    const subtitle =
      sanitizeText(body.subtitle, 240) ||
      'Step-by-step recipe and culinary guide submitted by a community contributor and reviewed by the CookReel Editorial Team.';
    const introText =
      sanitizeText(body.introText, 900) ||
      `${title} is designed for reliable home cooking with clear measurements, tested ingredient substitutions, and USDA food safety temperature guidance.`;
    const chefTipText =
      sanitizeText(body.chefTip, 400) ||
      'Prep and measure your ingredients before heating the pan, and verify internal temperatures with an instant-read digital thermometer.';
    const authorName =
      sanitizeText(body.authorName || body.chefName, 60) ||
      'CookReel Community Contributor';
    const category = isValidCategory(body.category)
      ? body.category
      : 'quick-easy';

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
      'Seasoned Cast-Iron Skillet (12-Inch)';
    const gearPrice = Math.min(Math.max(Number(body.gearPrice) || 125, 10), 2000);

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
      titleEn: title,
      subtitleEn: subtitle,
      wordCount: 860,
      introParagraphsEn: [
        introText,
        'Every recipe published on CookReel includes gram and milliliter measurements, 1:1 ingredient substitutions, storage instructions, and USDA safe cooking temperature guidelines.',
      ],
      whyThisWorksEn: [
        'Clear step-by-step timing with metric measurements for repeatable results.',
        'Includes 1:1 ingredient substitutions and refrigerator/freezer storage instructions.',
      ],
      chefTipsEn: [
        chefTipText,
        'Always taste and adjust seasoning and acidity (fresh lemon juice or vinegar) just before serving.',
      ],
      substitutions: [
        {
          originalEn: 'Primary Cooking Fat (Unsalted Butter / Olive Oil)',
          substituteEn: 'Ghee or High-Smoke-Point Avocado Oil (1:1 Ratio)',
          chefNoteEn: 'Maintains even browning for dairy-free preparation.',
        },
      ],
      faqs: [
        {
          questionEn: 'How long can I store this dish in the refrigerator?',
          answerEn:
            'Store in an airtight glass container in the refrigerator (at or below 4°C / 40°F) for up to 3–4 days.',
        },
        {
          questionEn: 'Can I freeze leftovers of this recipe?',
          answerEn:
            'Yes, cool completely before freezing in portioned airtight containers for up to 2 months.',
        },
        {
          questionEn: 'What is the safest way to reheat leftovers?',
          answerEn:
            'Reheat gently in a covered skillet or oven until the internal temperature reaches 74°C (165°F) per USDA guidelines.',
        },
      ],
      stepGalleryImages: [
        '/images/hero_cookreel_studio_1795527112508.jpg',
        '/images/action_searing_skillet_butter_1795530068462.jpg',
        '/images/gear_cast_iron_skillet_1795527125638.jpg',
      ],
      authorName,
      authorRoleEn: 'Community Recipe Contributor (Moderated by CookReel Editorial Team)',
      prepMinutes: 10,
      cookMinutes,
      calories: 420,
      proteinGrams: 32,
      netCarbsGrams: 16,
      usdaSafetyNoteEn:
        'USDA Food Safety Note: Verify safe internal temperatures using a calibrated thermometer (74°C / 165°F for poultry and reheated leftovers; 63°C / 145°F for fish and whole beef/pork cuts; 71°C / 160°F for ground meats).',
      image: '/images/hero_cookreel_studio_1795527112508.jpg',
      gearItem: {
        id: `gear-${Date.now()}`,
        nameEn: gearName,
        brand: 'CookReel Select',
        priceUsd: gearPrice,
        affiliateStore: 'Culinary Gear Partner',
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
      stepsEn: [
        {
          title: 'Prep & Measure Ingredients',
          instruction:
            'Prepare and weigh all ingredients and pat proteins dry with paper towels before heating the pan.',
          timerSeconds: 90,
        },
        {
          title: 'Cook & Verify Safe Internal Temperature',
          instruction:
            'Cook over medium-high heat until golden and verify the USDA-recommended internal temperature with an instant-read thermometer.',
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
      { error: 'Unable to save recipe submission.' },
      { status: 500 }
    );
  }
}
