export type PrimaryCategorySlug =
  | 'quick-easy'
  | 'healthy-diet'
  | 'desserts-baking'
  | 'kitchen-hacks';

export interface SubcategoryMeta {
  id: string;
  parent: PrimaryCategorySlug;
  labelEn: string;
}

export interface CategoryArchitecture {
  slug: PrimaryCategorySlug;
  labelEn: string;
  descriptionEn: string;
  subcategories: SubcategoryMeta[];
}

export interface IngredientSubstitution {
  originalEn: string;
  substituteEn: string;
  chefNoteEn: string;
}

export interface RecipeFaq {
  questionEn: string;
  answerEn: string;
}

export interface CulinaryRecipe {
  id: string;
  slug: string;
  category: PrimaryCategorySlug;
  subcategoryId: string;
  categoryLabelEn: string;
  titleEn: string;
  subtitleEn: string;
  wordCount: number;
  introParagraphsEn: string[];
  whyThisWorksEn: string[];
  chefTipsEn: string[];
  usdaSafetyNoteEn: string;
  substitutions: IngredientSubstitution[];
  faqs: RecipeFaq[];
  stepGalleryImages: string[];
  authorName: string;
  authorRoleEn: string;
  prepMinutes: number;
  cookMinutes: number;
  calories: number;
  proteinGrams: number;
  netCarbsGrams: number;
  /**
   * Only set when a unique, dedicated MP4 video exists for this specific recipe.
   * Prevents duplicate video assignments across different articles.
   */
  videoUrl?: string;
  videoDuration?: string;
  image: string;
  gearItem: {
    id: string;
    nameEn: string;
    brand: string;
    priceUsd: number;
    affiliateStore: string;
    image: string;
  };
  ingredientsEn: { item: string; amount: number; unit: string }[];
  stepsEn: { title: string; instruction: string; timerSeconds: number }[];
}

export const SITE_ORIGIN = 'https://www.cookreel.com';
export const HERO_FEATURED_VIDEO_URL = '/videos/hero-cookreel-featured.mp4';

/**
 * Verified sharing & bookmarking channels for CookReel.com
 * (Does not point to unclaimed third-party social handles)
 */
export const SOCIAL_LINKS = [
  {
    name: 'Pin to Pinterest',
    platform: 'Pin to Pinterest',
    url: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.cookreel.com&media=https%3A%2F%2Fwww.cookreel.com%2Fimages%2Fhero_cookreel_studio_1795527112508.jpg&description=CookReel%20Step-by-Step%20Video%20Recipes%20%26%20Culinary%20Guides',
    handle: 'Save Recipe Pin',
  },
  {
    name: 'Share on WhatsApp',
    platform: 'Share on WhatsApp',
    url: 'https://api.whatsapp.com/send?text=CookReel%20Step-by-Step%20Video%20Recipes%20https%3A%2F%2Fwww.cookreel.com',
    handle: 'Send to Kitchen',
  },
  {
    name: 'Share on Facebook',
    platform: 'Share on Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.cookreel.com',
    handle: 'Share Guide',
  },
  {
    name: 'Editorial Desk',
    platform: 'Editorial Desk',
    url: 'mailto:editorial@cookreel.com',
    handle: 'editorial@cookreel.com',
  },
];

export const SITE_ARCHITECTURE: CategoryArchitecture[] = [
  {
    slug: 'quick-easy',
    labelEn: 'Quick & Easy',
    descriptionEn:
      'Weeknight dinners ready in 15 to 25 minutes—featuring crispy air fryer favorites, one-pan skillets, and streamlined 5-ingredient meals.',
    subcategories: [
      {
        id: '15-minute-meals',
        parent: 'quick-easy',
        labelEn: '15-Minute Meals',
      },
      {
        id: '5-ingredient-recipes',
        parent: 'quick-easy',
        labelEn: '5-Ingredient Recipes',
      },
      {
        id: 'air-fryer-recipes',
        parent: 'quick-easy',
        labelEn: 'Air Fryer Recipes',
      },
    ],
  },
  {
    slug: 'healthy-diet',
    labelEn: 'Healthy & Diet',
    descriptionEn:
      'Nutrient-dense recipes with complete macro profiles—covering Keto, low-carb, high-protein, and plant-based meals.',
    subcategories: [
      {
        id: 'keto-low-carb',
        parent: 'healthy-diet',
        labelEn: 'Keto & Low-Carb',
      },
      {
        id: 'high-protein-meals',
        parent: 'healthy-diet',
        labelEn: 'High-Protein Meals',
      },
      {
        id: 'vegan-vegetarian',
        parent: 'healthy-diet',
        labelEn: 'Vegan & Vegetarian',
      },
    ],
  },
  {
    slug: 'desserts-baking',
    labelEn: 'Desserts & Baking',
    descriptionEn:
      'Step-by-step cakes, swirled cupcakes, effortless no-bake treats, and naturally sweetened desserts.',
    subcategories: [
      {
        id: 'no-bake-desserts',
        parent: 'desserts-baking',
        labelEn: 'No-Bake Desserts',
      },
      {
        id: 'healthy-sweets',
        parent: 'desserts-baking',
        labelEn: 'Healthy Sweets',
      },
      {
        id: 'cakes-pastries',
        parent: 'desserts-baking',
        labelEn: 'Cakes & Pastries',
      },
    ],
  },
  {
    slug: 'kitchen-hacks',
    labelEn: 'Kitchen Hacks & Guides',
    descriptionEn:
      'Practical culinary handbooks covering 1:1 ingredient substitutions, weekly meal-prep storage, and USDA safe cooking temperatures.',
    subcategories: [
      {
        id: 'ingredient-substitutes',
        parent: 'kitchen-hacks',
        labelEn: 'Ingredient Substitutes',
      },
      {
        id: 'meal-prep-guides',
        parent: 'kitchen-hacks',
        labelEn: 'Meal Prep Guides',
      },
      {
        id: 'cooking-tips',
        parent: 'kitchen-hacks',
        labelEn: 'Cooking Tips',
      },
    ],
  },
];

export const COOKREEL_RECIPES: CulinaryRecipe[] = [
  {
    id: 'crispy-salmon-skillet',
    slug: '15-minute-crispy-cast-iron-salmon-lemon-caper',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 15-Minute Meals',
    titleEn: '15-Minute Crispy Cast-Iron Salmon with Meyer Lemon Caper Butter',
    subtitleEn:
      'Golden crispy salmon skin seared in a hot skillet and finished with crushed garlic, fresh Meyer lemon juice, and brined caper butter.',
    wordCount: 1080,
    introParagraphsEn: [
      'A great weeknight salmon dinner comes down to moisture control and direct skillet contact. While baking salmon wrapped in foil traps steam and softens the exterior, searing skin-on fillets in a preheated cast-iron pan renders the subcutaneous fat into a crisp golden layer in minutes.',
      'By starting with thoroughly dried skin and pressing gently with a flexible spatula for the first 10 seconds, the fillet stays flat against the cooking surface. We finish the pan with crushed garlic cloves, unsalted butter, brined non-pareil capers, and fresh Meyer lemon juice for a bright pan sauce.',
    ],
    whyThisWorksEn: [
      'Most of the cooking time happens skin-side down, shielding the tender fish flesh from drying out.',
      'Drying the skin thoroughly with paper towels before searing prevents sticking and spattering.',
      'Emulsifying butter with fresh Meyer lemon juice, garlic, and caper brine creates a quick 60-second sauce.',
    ],
    chefTipsEn: [
      'Pat the salmon skin completely dry with paper towels right before cooking, and season with flaky salt just before placing it into the hot skillet.',
      'Leave the fillet undisturbed for the first 5 to 6 minutes so the skin crisps and releases naturally from the pan.',
      'Watch the opaque cooked line rise about three-quarters up the side of the fillet before flipping.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook salmon to an internal temperature of 63°C (145°F) measured at the thickest part, or until the flesh is opaque and flakes easily with a fork.',
    substitutions: [
      {
        originalEn: 'Unsalted Dairy Butter (35g)',
        substituteEn: 'Clarified Ghee or Extra-Virgin Olive Oil + 1 tsp Dijon Mustard',
        chefNoteEn:
          'Works well for dairy-free diets while keeping the lemon caper sauce smooth.',
      },
      {
        originalEn: 'Fresh Meyer Lemon Juice (25ml)',
        substituteEn: '18ml Standard Eureka Lemon Juice + 7ml Fresh Orange Juice',
        chefNoteEn:
          'Matches the sweeter, floral citrus profile of Meyer lemons when they are out of season.',
      },
      {
        originalEn: 'Brined Non-Pareil Capers (15g)',
        substituteEn: 'Finely chopped green Castelvetrano olives',
        chefNoteEn:
          'Delivers a similar briny contrast against rich Atlantic salmon.',
      },
    ],
    faqs: [
      {
        questionEn:
          'How do I store leftover cooked salmon in the refrigerator?',
        answerEn:
          'Store cooled salmon fillets in an airtight glass container lined with a dry paper towel at 4°C (39°F) or below for up to 3 days. Keep the lemon caper sauce in a separate small container.',
      },
      {
        questionEn: 'What is the best way to reheat cooked salmon so it stays moist?',
        answerEn:
          'Warm gently skin-side down in a skillet over medium-low heat for 3 to 4 minutes or in an Air Fryer at 175°C (350°F) until reheated to a safe internal temperature.',
      },
      {
        questionEn: 'Can I use frozen salmon fillets for this recipe?',
        answerEn:
          'Yes. Thaw frozen fillets overnight in the refrigerator at 4°C, then press firmly with paper towels to remove surface moisture before searing.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_crispy_salmon_1795527113114.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 460,
    proteinGrams: 42,
    netCarbsGrams: 4,
    videoDuration: '0:12',
    videoUrl: '/videos/crispy-salmon-skillet.mp4',
    image: '/images/recipe_crispy_salmon_1795527113114.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Matte Black Enameled Cast-Iron Skillet',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Skin-on Atlantic salmon fillets (center-cut)', amount: 400, unit: 'g' },
      { item: 'Unsalted butter', amount: 35, unit: 'g' },
      { item: 'Crushed fresh garlic cloves', amount: 2, unit: 'cloves' },
      { item: 'Fresh Meyer lemon juice & finely grated zest', amount: 25, unit: 'ml' },
      { item: 'Drained non-pareil capers', amount: 15, unit: 'g' },
      { item: 'Fresh green asparagus spears, trimmed', amount: 200, unit: 'g' },
      { item: 'Flaky sea salt & cracked black pepper', amount: 6, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Dry & Season the Salmon Skin',
        instruction:
          'Pat the salmon skin thoroughly dry with paper towels and season evenly with flaky sea salt and black pepper immediately before searing.',
        timerSeconds: 60,
      },
      {
        title: 'Uninterrupted Cast-Iron Sear',
        instruction:
          'Place fillets skin-side down into a preheated skillet over medium-high heat. Press gently for 10 seconds and sear undisturbed for 6 minutes until crisp.',
        timerSeconds: 360,
      },
      {
        title: 'Garlic, Meyer Lemon & Caper Butter Baste',
        instruction:
          'Flip fillets, add unsalted butter, 2 crushed garlic cloves, drained capers, Meyer lemon juice, and asparagus spears. Baste for 2 to 3 minutes until internal temperature reaches 63°C (145°F).',
        timerSeconds: 150,
      },
    ],
  },
  {
    id: 'garlic-butter-ribeye-steak',
    slug: 'keto-garlic-herb-butter-ribeye-steak-high-protein',
    category: 'healthy-diet',
    subcategoryId: 'keto-low-carb',
    categoryLabelEn: 'Healthy & Diet · Keto & Low-Carb',
    titleEn: 'Pan-Seared Ribeye Steak with Garlic & Fresh Thyme Butter',
    subtitleEn:
      'Low-carb, high-protein boneless ribeye seared in avocado oil and basted with crushed garlic cloves, fresh rosemary, thyme, and butter.',
    wordCount: 1120,
    introParagraphsEn: [
      'A thick-cut boneless ribeye seared in a heavy skillet is one of the most satisfying low-carb dinners you can prepare in under 15 minutes. Delivering 54 grams of protein and zero net carbohydrates, the French arrosé (butter-basting) technique builds a rich exterior crust while keeping the interior tender.',
      'We use a two-step heat method: first searing the steak in high-smoke-point avocado oil to brown the surface evenly, then lowering the heat and adding butter, crushed garlic cloves, and woody thyme sprigs during the final 90 seconds.',
    ],
    whyThisWorksEn: [
      '0g Net Carbs and 54g Protein—ideal for ketogenic and low-carb meal plans.',
      'Starting with avocado oil prevents the butter milk solids from scorching during the initial sear.',
      'Resting the steak on a warm cutting board redistributes juices evenly before slicing.',
    ],
    chefTipsEn: [
      'Select a boneless ribeye at least 1.5 inches (3.8 cm) thick so the exterior develops a deep brown crust before the center overcooks.',
      'Leave the papery skin on your crushed garlic cloves when adding them to the skillet to keep the garlic from burning.',
      'Check the center of the steak with a digital instant-read thermometer and allow 3 to 5 minutes of resting time.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: The USDA recommends cooking whole cuts of beef to a minimum internal temperature of 63°C (145°F) followed by a 3-minute rest before carving.',
    substitutions: [
      {
        originalEn: 'Boneless Ribeye Steak (450g)',
        substituteEn: 'New York Strip Sirloin or Beef Tenderloin Filet',
        chefNoteEn:
          'Choose tenderloin filet if you prefer a leaner cut with lower total calories.',
      },
      {
        originalEn: 'Unsalted Dairy Butter (45g)',
        substituteEn: 'Clarified Ghee or Beef Tallow',
        chefNoteEn:
          'Lactose-free option with a higher smoke point for dairy-free keto diets.',
      },
    ],
    faqs: [
      {
        questionEn: 'Is this garlic butter ribeye recipe keto and gluten-free?',
        answerEn:
          'Yes, it contains naturally zero gluten and minimal net carbohydrates from the garlic and fresh herbs.',
      },
      {
        questionEn: 'How can I store cooked steak slices for meal prep?',
        answerEn:
          'Slice the rested steak against the grain, spoon the pan juices over the slices, and refrigerate in an airtight glass container at 4°C for up to 4 days.',
      },
      {
        questionEn: 'Can I freeze cooked ribeye steak?',
        answerEn:
          'Yes, wrap tightly in freezer-safe packaging and freeze at -18°C for up to 2 months. Thaw overnight in the refrigerator before warming gently in a skillet.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 5,
    cookMinutes: 9,
    calories: 610,
    proteinGrams: 54,
    netCarbsGrams: 1,
    videoDuration: '0:12',
    videoUrl: '/videos/garlic-butter-ribeye-steak.mp4',
    image: '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    gearItem: {
      id: 'gear-damascus-knife',
      nameEn: '8-Inch Japanese 67-Layer Damascus Chef Knife',
      brand: 'Shun Premier',
      priceUsd: 175,
      affiliateStore: 'Williams Sonoma',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Boneless ribeye steak (1.5 inch thick)', amount: 450, unit: 'g' },
      { item: 'Unsalted butter', amount: 45, unit: 'g' },
      { item: 'Crushed garlic cloves, skin-on', amount: 4, unit: 'cloves' },
      { item: 'Fresh thyme & rosemary sprigs', amount: 3, unit: 'sprigs' },
      { item: 'High-smoke-point avocado oil', amount: 15, unit: 'ml' },
      { item: 'Coarse sea salt & cracked black pepper', amount: 8, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Dry & Season the Ribeye',
        instruction:
          'Pat the steak dry with paper towels and season all sides evenly with coarse sea salt and freshly cracked black pepper.',
        timerSeconds: 120,
      },
      {
        title: 'High-Heat Crust Sear',
        instruction:
          'Sear in a hot skillet with avocado oil for 3 to 4 minutes per side until a deep golden-brown crust develops.',
        timerSeconds: 210,
      },
      {
        title: 'Aromatic Garlic Herb Butter Baste',
        instruction:
          'Add butter, crushed garlic cloves, and thyme sprigs. Tilt the pan and spoon foaming butter over the steak for 90 seconds, then rest on a warm board before slicing.',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: 'truffle-tagliatelle-pasta',
    slug: '5-ingredient-tagliatelle-black-truffle-butter-parmigiano',
    category: 'quick-easy',
    subcategoryId: '5-ingredient-recipes',
    categoryLabelEn: 'Quick & Easy · 5-Ingredient Recipes',
    titleEn: '5-Ingredient Tagliatelle with Black Truffle Butter & Parmigiano',
    subtitleEn:
      'Fresh egg pasta ribbons tossed with starchy pasta water, black truffle butter, and finely grated 24-month Parmigiano-Reggiano—no heavy cream needed.',
    wordCount: 1040,
    introParagraphsEn: [
      'Traditional Italian pasta sauces achieve their creamy texture without adding heavy cream. Instead, they rely on starch-lipid emulsification: whisking starchy pasta cooking water directly into melted truffle butter and finely grated aged Parmigiano-Reggiano.',
      'Using just five ingredients and 18 minutes from start to finish, this technique produces a glossy sauce that coats every ribbon of tagliatelle.',
    ],
    whyThisWorksEn: [
      'Uses only 5 simple ingredients and requires no heavy cream.',
      'Tossing the pasta off the burner keeps Parmigiano proteins from clumping.',
      'Fresh egg tagliatelle cooks in under 3 minutes.',
    ],
    chefTipsEn: [
      'Boil the pasta in slightly less water than usual so the cooking water becomes rich in wheat starch, which binds the butter and cheese.',
      'Grate whole wedge Parmigiano-Reggiano on a fine microplane grater rather than using pre-shredded cheese.',
      'Remove the skillet from the heat for 20 seconds before tossing in the grated cheese.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Serve freshly emulsified egg pasta immediately while hot, or cool within 60 minutes and refrigerate at 4°C (39°F) for up to 3 days.',
    substitutions: [
      {
        originalEn: 'Black Truffle Butter (45g)',
        substituteEn: 'Unsalted butter + 1 tsp truffle olive oil or finely minced sautéed mushrooms',
        chefNoteEn:
          'Browned cremini mushrooms provide rich savory depth if truffle butter is unavailable.',
      },
      {
        originalEn: '24-Month Parmigiano-Reggiano (75g)',
        substituteEn: 'Finely grated Grana Padano or Pecorino Romano',
        chefNoteEn:
          'Reduce pasta water salt slightly when using sharper Pecorino Romano.',
      },
    ],
    faqs: [
      {
        questionEn: 'Does this pasta recipe require heavy cream?',
        answerEn:
          'No. Whisking 90ml of starchy pasta cooking water with melted butter and finely grated Parmigiano creates a natural creamy emulsion without heavy cream.',
      },
      {
        questionEn: 'How do I reheat leftover tagliatelle without the butter separating?',
        answerEn:
          'Warm gently in a skillet over low heat with 2 tablespoons of water, tossing continuously for 90 seconds until smooth.',
      },
      {
        questionEn: 'Can I use dried fettuccine instead of fresh egg tagliatelle?',
        answerEn:
          'Yes. Boil dried fettuccine 1 minute less than the package directions and finish cooking it directly in the butter and pasta water emulsion.',
      },
    ],
    stepGalleryImages: [
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
      '/images/recipe_truffle_pasta_1795527116427.jpg',
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 8,
    cookMinutes: 10,
    calories: 540,
    proteinGrams: 21,
    netCarbsGrams: 52,
    videoDuration: '0:12',
    videoUrl: '/videos/truffle-tagliatelle-pasta.mp4',
    image: '/images/recipe_truffle_pasta_1795527116427.jpg',
    gearItem: {
      id: 'gear-pasta-roller',
      nameEn: 'Italian Stainless Steel Pasta Machine & Fine Grater Set',
      brand: 'Marcato Atlas',
      priceUsd: 112,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Fresh egg tagliatelle pasta', amount: 280, unit: 'g' },
      { item: 'Black truffle butter', amount: 45, unit: 'g' },
      { item: 'Finely grated 24-month Parmigiano-Reggiano', amount: 75, unit: 'g' },
      { item: 'Reserved starchy pasta cooking water', amount: 90, unit: 'ml' },
      { item: 'Sea salt & freshly ground black pepper', amount: 5, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Boil Tagliatelle Al Dente',
        instruction:
          'Cook fresh egg tagliatelle in salted boiling water for 2.5 minutes until al dente, reserving 90ml of starchy pasta water before draining.',
        timerSeconds: 150,
      },
      {
        title: 'Whisk Truffle Butter Emulsion',
        instruction:
          'Melt black truffle butter in a wide skillet over low heat and whisk in the warm starchy pasta water until emulsified.',
        timerSeconds: 90,
      },
      {
        title: 'Off-Heat Parmigiano Toss',
        instruction:
          'Remove the skillet from the burner, add drained tagliatelle and grated Parmigiano-Reggiano, and toss vigorously for 60 seconds.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'lemon-herb-roasted-chicken',
    slug: 'air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
    category: 'quick-easy',
    subcategoryId: 'air-fryer-recipes',
    categoryLabelEn: 'Quick & Easy · Air Fryer Recipes',
    titleEn: 'Crispy Air Fryer & One-Pan Lemon Herb Chicken Thighs with Potatoes',
    subtitleEn:
      'Golden skin-on chicken thighs roasted with baby Yukon gold potatoes, shallots, garlic, and rosemary—with instructions for both Air Fryer and oven skillet.',
    wordCount: 1150,
    introParagraphsEn: [
      'Bone-in, skin-on chicken thighs are forgiving and flavorful for weeknight cooking, whether you use a countertop Air Fryer or an oven-safe skillet. As the skin crisps, the natural juices season the halved baby Yukon gold potatoes underneath.',
      'We finish the dish with fresh lemon juice, roasted garlic cloves, and woody rosemary sprigs for a complete one-vessel dinner.',
    ],
    whyThisWorksEn: [
      'Works in 22 to 25 minutes in an Air Fryer at 200°C (400°F) or in an oven skillet.',
      'Rendering the chicken skin gradually creates a crisp texture without breading.',
      'Roasts both protein and potatoes together for easy weeknight cleanup.',
    ],
    chefTipsEn: [
      'For the Air Fryer method: preheat to 200°C (400°F), place seasoned halved baby potatoes in the basket base, and set chicken thighs skin-side up on top for 22 to 25 minutes.',
      'Pat the chicken skin dry with paper towels before rubbing with olive oil and herbs.',
      'Add fresh lemon juice at the end of cooking so the citrus aroma stays bright.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always cook poultry (chicken thighs and breasts) to a minimum internal temperature of 74°C (165°F) verified with a food thermometer at the thickest part of the thigh without touching bone.',
    substitutions: [
      {
        originalEn: 'Bone-In Skin-On Chicken Thighs (650g)',
        substituteEn: 'Boneless skinless chicken thighs or drumsticks (cook to 74°C / 165°F)',
        chefNoteEn:
          'Boneless thighs typically reach 74°C (165°F) about 4 to 5 minutes faster than bone-in cuts.',
      },
      {
        originalEn: 'Baby Yukon Gold Potatoes (400g)',
        substituteEn: 'Cauliflower florets, green beans, or cubed sweet potatoes',
        chefNoteEn:
          'Swap potatoes for cauliflower florets if you want a lower-carb dinner.',
      },
    ],
    faqs: [
      {
        questionEn: 'What internal temperature should chicken thighs reach?',
        answerEn:
          'For food safety, the USDA requires all poultry to reach a minimum internal temperature of 74°C (165°F). Dark-meat chicken thighs remain very tender even when cooked to 79°C–82°C (175°F–180°F).',
      },
      {
        questionEn: 'How do I reheat leftover chicken thighs so the skin crisps back up?',
        answerEn:
          'Reheat in an Air Fryer at 175°C (350°F) for 4 to 5 minutes until the skin is crisp and the internal center reaches 74°C (165°F).',
      },
      {
        questionEn: 'How long can I store cooked chicken and potatoes in the fridge?',
        answerEn:
          'Store in an airtight glass container in the refrigerator at 4°C (39°F) or colder for 3 to 4 days.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 25,
    calories: 520,
    proteinGrams: 44,
    netCarbsGrams: 24,
    videoDuration: '0:12',
    videoUrl: '/videos/lemon-herb-roasted-chicken.mp4',
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-braiser-pan',
      nameEn: '3.5-Quart Stainless Steel All-Clad Braiser & Roasting Pan',
      brand: 'All-Clad',
      priceUsd: 165,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Bone-in, skin-on chicken thighs', amount: 650, unit: 'g' },
      { item: 'Baby Yukon gold potatoes, halved', amount: 400, unit: 'g' },
      { item: 'Extra-virgin olive oil', amount: 25, unit: 'ml' },
      { item: 'Fresh lemon juice, garlic cloves & rosemary sprigs', amount: 35, unit: 'g' },
      { item: 'Sea salt & cracked black pepper', amount: 8, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Dry & Season Chicken and Potatoes',
        instruction:
          'Pat chicken thighs dry with paper towels and season with salt, pepper, and rosemary. Toss halved baby potatoes in olive oil and garlic.',
        timerSeconds: 180,
      },
      {
        title: 'Crisp the Skin & Arrange Potatoes',
        instruction:
          'Arrange potatoes in the Air Fryer basket or skillet base and place chicken thighs skin-side up on top.',
        timerSeconds: 300,
      },
      {
        title: 'Roast to 74°C (165°F) & Finish with Lemon',
        instruction:
          'Roast at 200°C (400°F) for 22 to 25 minutes until chicken reaches a minimum internal temperature of 74°C (165°F), then finish with fresh lemon juice.',
        timerSeconds: 1200,
      },
    ],
  },
  {
    id: 'mediterranean-spiced-shakshuka',
    slug: 'mediterranean-poached-eggs-spiced-tomato-pepper-shakshuka',
    category: 'healthy-diet',
    subcategoryId: 'vegan-vegetarian',
    categoryLabelEn: 'Healthy & Diet · Vegetarian & Plant-Forward',
    titleEn: 'Mediterranean Poached Eggs in Spiced Tomato & Roasted Pepper Sauce',
    subtitleEn:
      'Pasture-raised eggs poached gently in a smoky cumin, sweet paprika, charred bell pepper, and crushed plum tomato skillet sauce.',
    wordCount: 1090,
    introParagraphsEn: [
      'Shakshuka is one of the most versatile one-skillet vegetarian meals for breakfast, lunch, or a quick weeknight dinner. Built on a base of sautéed onions, red bell peppers, garlic, toasted cumin, and crushed San Marzano tomatoes, the thick sauce poaches the eggs gently in place.',
      'For a 100% plant-based vegan variation, you can swap the eggs for cubed firm tofu or simmered chickpeas directly in the spiced tomato base.',
    ],
    whyThisWorksEn: [
      'One-pan vegetarian dinner packed with lycopene-rich tomatoes, bell peppers, and protein.',
      'Toasting the cumin and smoked paprika in olive oil for 30 seconds unlocks deep aroma.',
      'The spiced tomato sauce base can be prepped 4 days ahead for a 6-minute weeknight meal.',
    ],
    chefTipsEn: [
      'Simmer the tomato and pepper sauce until thick enough that drawing a wooden spoon across the pan leaves a brief channel before adding the eggs.',
      'Make small indentations in the sauce with the back of a spoon so the eggs stay evenly spaced.',
      'Sprinkle crumbled feta and chopped fresh cilantro right before serving.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook eggs until both the whites and yolks are firm, or to an internal temperature of 71°C (160°F) for egg dishes.',
    substitutions: [
      {
        originalEn: 'Pasture-Raised Whole Eggs (4 pcs)',
        substituteEn: '300g Cubed Firm Tofu or 1 Can Drained Chickpeas (for 100% Vegan Shakshuka)',
        chefNoteEn:
          'Simmer cubed tofu or chickpeas in the tomato sauce for 8 minutes so they absorb the spices.',
      },
      {
        originalEn: 'Crumbled Sheep Feta Cheese (60g)',
        substituteEn: 'Diced Hass Avocado or Kalamata Olives',
        chefNoteEn:
          'Provides creamy richness for dairy-free or vegan diners.',
      },
    ],
    faqs: [
      {
        questionEn: 'Can I make the shakshuka tomato sauce ahead of time for meal prep?',
        answerEn:
          'Yes. Prepare the spiced tomato and bell pepper sauce up to 4 days in advance and store it in a glass jar in the refrigerator at 4°C. Reheat in a skillet and poach fresh eggs when ready to eat.',
      },
      {
        questionEn: 'Can I freeze the tomato pepper base?',
        answerEn:
          'The tomato and pepper sauce freezes well for up to 3 months without the eggs. Thaw overnight in the fridge before reheating.',
      },
      {
        questionEn: 'What pan is best for cooking acidic tomato sauces?',
        answerEn:
          'Use an enameled cast-iron skillet or stainless-steel pan so the acidity of the tomatoes does not react with bare unseasoned metal.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 18,
    calories: 380,
    proteinGrams: 22,
    netCarbsGrams: 18,
    videoDuration: '0:12',
    videoUrl: '/videos/mediterranean-spiced-shakshuka.mp4',
    image: '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    gearItem: {
      id: 'gear-enameled-skillet',
      nameEn: '11-Inch Enameled Cast-Iron Deep Sauté Skillet with Lid',
      brand: 'Le Creuset',
      priceUsd: 185,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Crushed San Marzano plum tomatoes', amount: 450, unit: 'g' },
      { item: 'Large pasture-raised eggs', amount: 4, unit: 'pcs' },
      { item: 'Diced red bell pepper & yellow onion', amount: 220, unit: 'g' },
      { item: 'Crumbled feta cheese & fresh cilantro leaves', amount: 60, unit: 'g' },
      { item: 'Extra-virgin olive oil, ground cumin & smoked paprika', amount: 25, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Sauté Peppers & Bloom Spices',
        instruction:
          'Sauté diced onion and red bell pepper in olive oil for 6 minutes until soft, then stir in garlic, ground cumin, and smoked paprika for 30 seconds.',
        timerSeconds: 360,
      },
      {
        title: 'Simmer Crushed Tomato Reduction',
        instruction:
          'Pour in crushed plum tomatoes and simmer uncovered for 8 minutes until thickened.',
        timerSeconds: 480,
      },
      {
        title: 'Poach Eggs & Garnish',
        instruction:
          'Create 4 wells in the sauce, crack in the eggs, cover the skillet, and cook on low heat for 5 to 6 minutes until cooked to your preference.',
        timerSeconds: 330,
      },
    ],
  },
  {
    id: 'tropical-mango-berry-swirl-cupcakes',
    slug: 'tropical-mango-berry-swirl-vanilla-bean-cupcakes',
    category: 'desserts-baking',
    subcategoryId: 'cakes-pastries',
    categoryLabelEn: 'Desserts & Baking · Cakes & Pastries',
    titleEn: 'Tropical Mango & Berry Swirl Vanilla Bean Cupcakes',
    subtitleEn:
      'Tender Madagascar vanilla cupcakes topped with a two-tone buttercream frosting made with reduced Alfonso mango puree and freeze-dried berry powder.',
    wordCount: 1110,
    introParagraphsEn: [
      'Fruit-flavored buttercreams often curdle or turn runny when bakers add raw fruit juice directly into whipped butter. Our Tropical Mango & Berry Swirl Vanilla Cupcakes solve this by pairing reduced mango pulp with pulverized freeze-dried berries—delivering vibrant natural fruit flavor and color without excess water.',
      'The vanilla cupcake base uses room-temperature butter, whole eggs, and buttermilk to create a fine, tender crumb that stays soft for days.',
    ],
    whyThisWorksEn: [
      'Freeze-dried berry powder adds concentrated fruit flavor without watering down the buttercream.',
      'Room-temperature eggs and buttermilk create a stable batter emulsion.',
      'Side-by-side piping bag loading produces a clean two-tone swirl on every cupcake.',
    ],
    chefTipsEn: [
      'Bring your butter, eggs, and buttermilk to 20°C (68°F) for 30 minutes before mixing so the batter emulsifies smoothly.',
      'Fill cupcake liners only two-thirds full (about 45g batter per cup) to achieve even domes without overflowing.',
      'Cool cupcakes completely on a wire rack for 45 minutes before piping the buttercream.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Bake cupcakes until a toothpick inserted into the center comes out clean (internal crumb temperature of 96°C / 205°F), and refrigerate frosted cupcakes in an airtight container if storing longer than 24 hours.',
    substitutions: [
      {
        originalEn: 'Cake Flour (240g)',
        substituteEn: '210g All-Purpose Flour + 30g Cornstarch (sifted twice)',
        chefNoteEn:
          'Cornstarch lowers the gluten protein ratio of all-purpose flour to match soft cake flour.',
      },
      {
        originalEn: 'Cultured Buttermilk (120ml)',
        substituteEn: '110ml Whole Milk + 10ml Fresh Lemon Juice (rested 5 minutes)',
        chefNoteEn:
          'Provides the exact acidity needed to activate the baking leaveners.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I store frosted cupcakes so the sponge stays moist?',
        answerEn:
          'Store frosted cupcakes in a tall airtight container in the refrigerator for up to 4 days. Let them sit at room temperature for 20 minutes before serving so the buttercream softens.',
      },
      {
        questionEn: 'Can I freeze unfrosted cupcakes ahead of a party?',
        answerEn:
          'Yes! Wrap cooled unfrosted cupcakes individually and freeze at -18°C for up to 2 months. Thaw at room temperature before piping fresh frosting.',
      },
      {
        questionEn: 'How do I pipe two colors of frosting at the same time?',
        answerEn:
          'Spoon the mango frosting along the left side of a piping bag fitted with a 1M star tip and the berry frosting along the right side, then pipe in a continuous spiral.',
      },
    ],
    stepGalleryImages: [
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 20,
    cookMinutes: 18,
    calories: 340,
    proteinGrams: 5,
    netCarbsGrams: 42,
    videoDuration: '0:12',
    videoUrl: '/videos/mango-strawberry-sunset-cupcakes.mp4',
    image: '/images/recipe_mango_cupcakes_1795527116791.jpg',
    gearItem: {
      id: 'gear-piping-kit',
      nameEn: 'Professional Stainless Steel Pastry Piping Tip Set & 12-Cup Pan',
      brand: 'Ateco Pastry',
      priceUsd: 54,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Sifted cake flour & baking powder', amount: 240, unit: 'g' },
      { item: 'Softened unsalted butter & superfine caster sugar', amount: 280, unit: 'g' },
      { item: 'Reduced Alfonso mango puree', amount: 120, unit: 'g' },
      { item: 'Pulverized freeze-dried strawberry powder', amount: 35, unit: 'g' },
      { item: 'Whole eggs (2 pcs), buttermilk (120ml) & vanilla bean paste', amount: 220, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Cream Butter, Sugar & Vanilla Bean',
        instruction:
          'Beat softened butter, sugar, and vanilla bean paste on medium-high speed for 4 minutes until pale and fluffy, then add eggs one at a time.',
        timerSeconds: 240,
      },
      {
        title: 'Fold Flour & Bake at 175°C (350°F)',
        instruction:
          'Alternate folding sifted cake flour and buttermilk into the batter. Divide into a 12-cup liner tray and bake at 175°C (350°F) for 18 minutes.',
        timerSeconds: 1080,
      },
      {
        title: 'Pipe Dual-Tone Mango & Berry Swirl',
        instruction:
          'Load mango buttercream and berry buttercream side-by-side into a star-tipped piping bag and pipe tall swirls onto cooled cupcakes.',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'kitchen-guide-substitutes-cast-iron',
    slug: 'ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide',
    category: 'kitchen-hacks',
    subcategoryId: 'ingredient-substitutes',
    categoryLabelEn: 'Kitchen Hacks & Guides · Ingredient Substitutes',
    titleEn:
      'Complete Guide to 1:1 Ingredient Substitutes & Cast-Iron Skillet Care',
    subtitleEn:
      'Exact gram-for-gram culinary ratios for swapping missing heavy cream, buttermilk, eggs, flours, and herbs—plus step-by-step cast-iron seasoning care.',
    wordCount: 1280,
    introParagraphsEn: [
      'Discovering you are out of heavy cream, buttermilk, or fresh herbs halfway through cooking dinner does not mean a trip to the grocery store. Understanding the fat, acid, and moisture balance of common pantry staples lets you substitute ingredients reliably.',
      'In this reference guide, we share 1:1 kitchen substitution ratios alongside our daily routine for cleaning and seasoning cast-iron skillets.',
    ],
    whyThisWorksEn: [
      'Exact gram-for-gram substitution ratios for sauces, soups, and baked goods.',
      'Answers everyday kitchen questions on dairy swaps, egg binders, and herb ratios.',
      'Simple 3-minute stovetop drying routine keeps cast-iron cookware naturally non-stick.',
    ],
    chefTipsEn: [
      'Heavy Cream Substitute: Whisk 180ml whole milk with 60g melted unsalted butter (plus 1 teaspoon cornstarch for simmering sauces) to match the 36% milkfat content of heavy cream.',
      '5-Minute Buttermilk Swap: Stir 15ml fresh lemon juice or white vinegar into 225ml warm whole milk and let stand for 5 minutes.',
      'Cast-Iron Care: Wash with warm water, dry immediately over a low burner for 2 minutes, and wipe a thin drop of avocado oil across the cooking surface.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always store dairy substitutes and prepped ingredients at or below 4°C (39°F), and cook all raw poultry to 74°C (165°F) and whole beef cuts/fish to 63°C (145°F).',
    substitutions: [
      {
        originalEn: '1 Cup Heavy Whipping Cream (240ml)',
        substituteEn: '180ml Whole Milk + 60g Melted Unsalted Butter (or Canned Coconut Cream)',
        chefNoteEn:
          'Works 1:1 in pasta sauces, soups, and curries without curdling.',
      },
      {
        originalEn: '1 Tbsp Fresh Chopped Herbs (15ml)',
        substituteEn: '1 Teaspoon Dried Herbs (5ml — 3:1 Fresh-to-Dried Ratio)',
        chefNoteEn:
          'Add dried herbs early in cooking so they rehydrate; add fresh herbs at the end.',
      },
      {
        originalEn: '1 Large Egg in Baking (50g)',
        substituteEn: '1 Tbsp Ground Flaxseed + 3 Tbsp Warm Water (or 65g Unsweetened Applesauce)',
        chefNoteEn:
          'Let the flax mixture thicken for 5 minutes before folding into muffin or pancake batter.',
      },
    ],
    faqs: [
      {
        questionEn: 'Can I use milk instead of heavy cream in pasta sauces without curdling?',
        answerEn:
          'Low-fat milk alone can separate over high heat. Whisking 1 teaspoon of cornstarch into whole milk with melted butter stabilizes the emulsion so it simmers smoothly.',
      },
      {
        questionEn: 'Is mild dish soap safe to use on cast-iron skillets?',
        answerEn:
          'Yes, a small amount of mild dish soap with warm water is safe on seasoned cast iron. Avoid soaking the pan in water and always dry it immediately on the stove.',
      },
      {
        questionEn: 'How do I replace cornstarch when thickening a pan sauce?',
        answerEn:
          'Use twice the amount of all-purpose flour (2 teaspoons flour per 1 teaspoon cornstarch) or an equal 1:1 amount of arrowroot powder.',
      },
    ],
    stepGalleryImages: [
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 15,
    calories: 310,
    proteinGrams: 12,
    netCarbsGrams: 14,
    image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    gearItem: {
      id: 'gear-complete-skillet-knife-bundle',
      nameEn: 'Seasoned 12-Inch Cast-Iron Skillet & Silicone Handle Cover',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Whole milk (180ml) + melted unsalted butter (60g) for cream swap', amount: 240, unit: 'ml' },
      { item: 'High-smoke-point avocado oil (for skillet polymer seasoning)', amount: 15, unit: 'ml' },
      { item: 'Fresh lemon juice (15ml) + warm milk (225ml) for buttermilk swap', amount: 240, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Measure 1:1 Dairy & Herb Ratios',
        instruction:
          'Measure replacement ingredients by weight or volume before turning on the burner so sauces emulsify evenly.',
        timerSeconds: 180,
      },
      {
        title: 'Warm-Water Skillet Rinse & Stovetop Dry',
        instruction:
          'Wash cast-iron skillet with warm water and a non-scratch brush, then place over medium-low heat for 2 minutes until all moisture evaporates.',
        timerSeconds: 120,
      },
      {
        title: 'Micro-Thin Oil Seasoning Coat',
        instruction:
          'Rub 1 teaspoon of avocado oil across the warm skillet interior with a folded paper towel and buffs dry before storing.',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: 'sunday-meal-prep-high-protein-bowls',
    slug: '60-minute-sunday-meal-prep-guide-5-high-protein-lunches',
    category: 'kitchen-hacks',
    subcategoryId: 'meal-prep-guides',
    categoryLabelEn: 'Kitchen Hacks & Guides · Meal Prep Guides',
    titleEn:
      '60-Minute Sunday Meal Prep Guide: 5 High-Protein Lunches for the Week',
    subtitleEn:
      'A practical batch-cooking workflow for preparing 5 balanced lunches with roasted vegetables and grains while preventing condensation and sogginess.',
    wordCount: 1240,
    introParagraphsEn: [
      'The most common reason meal-prep lunches turn soggy by mid-week is trapped steam: closing container lids while food is still hot creates condensation that softens roasted vegetables.',
      'This 60-minute Sunday workflow uses three simple rules: cooking all proteins to safe USDA internal temperatures, letting food cool uncovered for 20 minutes before sealing, and storing sauces in separate small containers.',
    ],
    whyThisWorksEn: [
      '20-minute uncovered steam venting prevents moisture condensation inside containers.',
      'Keeping dressings and glazes in separate small cups preserves vegetable crunch.',
      'Prepares 5 balanced lunches in 60 minutes of organized kitchen time.',
    ],
    chefTipsEn: [
      'Always verify poultry reaches the safe USDA internal temperature of 74°C (165°F) and salmon reaches 63°C (145°F) with a food thermometer before cooling.',
      'Place a folded dry paper towel inside leafy green containers to absorb excess humidity in the refrigerator.',
      'Refrigerate all cooked meal-prep boxes at 4°C (39°F) or below within 1 to 2 hours of cooking.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook all poultry to 74°C (165°F) and fish to 63°C (145°F). Cool food rapidly and refrigerate at 4°C (39°F) or below within 2 hours; consume cooked poultry/meat within 3 to 4 days and cooked seafood within 3 days.',
    substitutions: [
      {
        originalEn: 'Jasmine Rice or Brown Rice Base (600g)',
        substituteEn: 'Tri-Color Quinoa, Farro, or Roasted Sweet Potato Cubes',
        chefNoteEn:
          'Quinoa adds complete plant protein and holds its texture for 4 days in the fridge.',
      },
      {
        originalEn: 'Boneless Skinless Chicken Thighs (1000g)',
        substituteEn: 'Chicken Breasts, Firm Tofu Cubes, or Lean Sirloin Strips',
        chefNoteEn:
          'Slice cooked meats just before portioning or reheat with a splash of broth to retain moisture.',
      },
    ],
    faqs: [
      {
        questionEn: 'How many days does cooked meal-prep food safely last in the refrigerator?',
        answerEn:
          'According to USDA food safety guidelines, cooked poultry, beef, roasted vegetables, and grains stay safe for 3 to 4 days when refrigerated at 4°C (40°F) or colder. Cooked fish should be eaten within 3 days.',
      },
      {
        questionEn: 'Should I use glass or plastic containers for weekly food prep?',
        answerEn:
          'Airtight borosilicate glass containers with locking lids do not retain food odors, clean easily, and allow safe reheating.',
      },
      {
        questionEn: 'How do I prevent cut avocados or apples from browning in meal-prep boxes?',
        answerEn:
          'Brush cut surfaces with fresh lemon or lime juice and press parchment paper directly over the surface to limit air exposure.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 20,
    cookMinutes: 40,
    calories: 495,
    proteinGrams: 46,
    netCarbsGrams: 28,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-glass-prep-set',
      nameEn: '10-Piece Borosilicate Glass Meal-Prep Container Set with Locking Lids',
      brand: 'Pyrex Culinary',
      priceUsd: 68,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Boneless skinless chicken thighs', amount: 1000, unit: 'g' },
      { item: 'Broccoli florets, bell peppers & cubed sweet potatoes', amount: 850, unit: 'g' },
      { item: 'Cooked jasmine rice or tri-color quinoa', amount: 600, unit: 'g' },
      { item: 'Extra-virgin olive oil, lemon juice & garlic herb seasoning', amount: 65, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Dice & Season Vegetables Evenly',
        instruction:
          'Cut sweet potatoes and broccoli into uniform 2cm pieces and toss with olive oil, salt, and garlic herb seasoning on a sheet pan.',
        timerSeconds: 300,
      },
      {
        title: 'Roast Vegetables & Cook Chicken to 74°C (165°F)',
        instruction:
          'Roast vegetables at 200°C (400°F) for 25 minutes while cooking chicken thighs until an instant-read thermometer registers 74°C (165°F).',
        timerSeconds: 600,
      },
      {
        title: 'Vent Steam for 20 Minutes & Portion',
        instruction:
          'Allow cooked food to cool uncovered for 20 minutes so steam escapes, then portion into 5 glass containers and refrigerate immediately at 4°C.',
        timerSeconds: 300,
      },
    ],
  },
  {
    id: 'cooking-science-temperatures-deglazing-guide',
    slug: 'essential-cooking-tips-internal-meat-temperatures-pan-deglazing-herb-storage',
    category: 'kitchen-hacks',
    subcategoryId: 'cooking-tips',
    categoryLabelEn: 'Kitchen Hacks & Guides · Cooking Tips',
    titleEn:
      'Essential Cooking Tips: USDA Safe Meat Temperatures, Pan Deglazing & Herb Storage',
    subtitleEn:
      'Master foundational kitchen techniques: the water-drop skillet preheat test, official USDA internal cooking temperatures, pan deglazing, and storing fresh herbs.',
    wordCount: 1190,
    introParagraphsEn: [
      'Consistent home cooking relies on three simple habits: preheating your skillet properly before adding oil, using a digital food thermometer to verify safe internal temperatures, and controlling moisture when storing fresh produce.',
      'This guide covers the Leidenfrost water-drop test for stainless-steel and cast-iron pans, official USDA safe minimum internal temperature targets, 60-second pan sauce deglazing, and how to keep parsley, cilantro, and basil fresh.',
    ],
    whyThisWorksEn: [
      'Preheating dry stainless steel or cast iron prevents proteins from sticking.',
      'Follows official USDA safe minimum internal temperature standards for poultry, meat, and fish.',
      'Proper stem-water storage keeps fresh cilantro and parsley crisp for up to 10–14 days.',
    ],
    chefTipsEn: [
      'Water-Drop Skillet Test: Heat a dry stainless-steel skillet over medium-high heat and flick a drop of water onto the surface. When the droplet glides smoothly like a bead without evaporating immediately, add your cooking oil and food.',
      'USDA Safe Internal Temperature Chart: Cook all Poultry (chicken & turkey) to 74°C (165°F); Ground Beef/Pork to 71°C (160°F); Whole Cuts of Beef, Pork, Veal & Lamb to 63°C (145°F) with a 3-minute rest; and Fish/Salmon to 63°C (145°F).',
      'Herb Storage: Trim 1cm off parsley or cilantro stems, place upright in a glass with 2cm cold water in the fridge, and keep fresh basil at room temperature out of direct sun.',
    ],
    usdaSafetyNoteEn:
      'Official USDA Minimum Internal Temperatures: Poultry 74°C (165°F) · Ground Meats 71°C (160°F) · Whole Beef/Pork/Lamb Cuts 63°C (145°F + 3-min rest) · Fin Fish 63°C (145°F) · Reheated Leftovers 74°C (165°F).',
    substitutions: [
      {
        originalEn: 'Dry White Wine (for Pan Deglazing)',
        substituteEn: 'Low-Sodium Chicken Broth + 1 Tbsp Fresh Lemon Juice or White Wine Vinegar',
        chefNoteEn:
          'Lifts caramelized browned bits (fond) from the bottom of the skillet to build a quick pan sauce.',
      },
      {
        originalEn: 'Flaky Kosher Salt vs. Fine Table Salt',
        substituteEn: 'Use half the volume (50%) when substituting fine table salt for flaky kosher salt',
        chefNoteEn:
          'Fine table salt packs much more densely by volume than coarse flaky salt.',
      },
    ],
    faqs: [
      {
        questionEn: 'Why does meat or fish stick to my skillet even when I use oil?',
        answerEn:
          'Food sticks when the pan is too cold, the protein surface is wet, or you try to flip it before a crust forms. Pat food dry with paper towels, preheat the pan properly, and let the crust release naturally.',
      },
      {
        questionEn: 'How can I fix a soup or sauce that became too salty?',
        answerEn:
          'Add unsalted broth or water to dilute the sodium concentration, swirl in a tablespoon of unsalted butter or cream, and finish with a squeeze of fresh lemon juice.',
      },
      {
        questionEn: 'How do I convert an oven recipe to an Air Fryer?',
        answerEn:
          'Reduce the conventional oven temperature by 15°C (25°F) and reduce the cooking time by about 20%, checking for doneness a few minutes early.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 15,
    calories: 320,
    proteinGrams: 34,
    netCarbsGrams: 6,
    image: '/images/action_searing_skillet_butter_1795530068462.jpg',
    gearItem: {
      id: 'gear-instant-thermometer',
      nameEn: 'Waterproof Digital Instant-Read Food Thermometer',
      brand: 'ThermoWorks',
      priceUsd: 89,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Low-sodium chicken or beef broth (for deglazing)', amount: 120, unit: 'ml' },
      { item: 'Cold unsalted butter cubes (for pan sauce)', amount: 30, unit: 'g' },
      { item: 'Fresh lemon juice & minced shallots', amount: 25, unit: 'g' },
      { item: 'Fresh parsley, thyme & rosemary stems', amount: 15, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Preheat Skillet & Dry Protein Surface',
        instruction:
          'Preheat dry skillet for 3 minutes until a drop of water glides across the surface, add oil, and sear dry protein.',
        timerSeconds: 180,
      },
      {
        title: 'Verify USDA Internal Temperature',
        instruction:
          'Insert a digital food thermometer into the thickest center of the meat (74°C / 165°F for poultry; 63°C / 145°F for beef or fish) and transfer to a clean board.',
        timerSeconds: 180,
      },
      {
        title: '60-Second Fond Deglaze & Butter Swirl',
        instruction:
          'Pour broth and lemon juice into the hot skillet, scrape up browned fond with a wooden spoon, turn off heat, and swirl in cold butter.',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: '15-minute-garlic-shrimp-zucchini-skillet',
    slug: '15-minute-garlic-lemon-shrimp-and-zucchini-skillet',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 15-Minute Meals',
    titleEn: '15-Minute Garlic Lemon Shrimp & Crisp Zucchini Skillet',
    subtitleEn:
      'Jumbo shrimp seared with sliced courgettes, garlic, crushed red pepper flakes, and fresh lemon juice in a single skillet.',
    wordCount: 960,
    introParagraphsEn: [
      'Jumbo shrimp cook in less than four minutes, making them one of the fastest weeknight proteins in your freezer. Paired with half-moons of fresh zucchini and a bright garlic lemon pan glaze, this entire meal comes together in 15 minutes.',
      'To keep zucchini crisp-tender rather than watery, sear the zucchini slices first over medium-high heat before adding the shrimp.',
    ],
    whyThisWorksEn: [
      'Searing zucchini first prevents excess moisture from steaming the shrimp.',
      'Ready from prep to table in 15 minutes flat.',
      'Naturally low-carb, gluten-free, and rich in lean protein.',
    ],
    chefTipsEn: [
      'Pat thawed shrimp dry with paper towels before tossing with salt and paprika.',
      'Remove the skillet from the burner as soon as the shrimp turn opaque pink and curl into a C-shape.',
      'Finish with fresh lemon zest and chopped parsley off the heat.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook shrimp and shellfish until reaches 63°C (145°F) and the flesh is pearly and opaque.',
    substitutions: [
      {
        originalEn: 'Jumbo Peeled Shrimp (450g)',
        substituteEn: 'Sea Scallops or Cubed Firm Cod Fillets',
        chefNoteEn: 'Dry scallops thoroughly before searing for 2 minutes per side.',
      },
      {
        originalEn: 'Green Zucchini (300g)',
        substituteEn: 'Yellow Summer Squash, Asparagus, or Sugar Snap Peas',
        chefNoteEn: 'All cook in 3 to 4 minutes in the same hot skillet.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I thaw frozen shrimp quickly for a 15-minute dinner?',
        answerEn:
          'Place frozen shrimp in a sealed bag submerged in a bowl of cold tap water for 15 minutes, then drain and pat dry with paper towels.',
      },
      {
        questionEn: 'How long can I store cooked garlic shrimp in the fridge?',
        answerEn:
          'Store in an airtight container at 4°C (39°F) for up to 2 to 3 days.',
      },
      {
        questionEn: 'What sides go well with garlic lemon shrimp?',
        answerEn:
          'Serve over steamed jasmine rice, cauliflower rice, or crusty toasted sourdough bread.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 6,
    cookMinutes: 9,
    calories: 340,
    proteinGrams: 38,
    netCarbsGrams: 7,
    image: '/images/action_searing_skillet_butter_1795530068462.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Matte Black Enameled Cast-Iron Skillet',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Peeled & deveined jumbo shrimp, patted dry', amount: 450, unit: 'g' },
      { item: 'Fresh green zucchini, sliced into half-moons', amount: 300, unit: 'g' },
      { item: 'Extra-virgin olive oil & unsalted butter', amount: 30, unit: 'g' },
      { item: 'Minced garlic cloves (3 pcs) & fresh lemon juice', amount: 30, unit: 'ml' },
      { item: 'Fresh chopped parsley, sea salt & red pepper flakes', amount: 10, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Sear Zucchini Half-Moons',
        instruction:
          'Sauté sliced zucchini in olive oil over medium-high heat for 4 minutes until golden at the edges, then transfer to a warm plate.',
        timerSeconds: 240,
      },
      {
        title: 'Sear Garlic Shrimp for 3 Minutes',
        instruction:
          'Add shrimp in a single layer and sear for 90 seconds per side with minced garlic and butter until opaque and 63°C (145°F).',
        timerSeconds: 180,
      },
      {
        title: 'Toss with Lemon & Parsley',
        instruction:
          'Return zucchini to the skillet, squeeze fresh lemon juice over the pan, scatter parsley, and serve hot.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: '15-minute-Mediterranean-chickpea-feta-skillet',
    slug: '15-minute-mediterranean-spiced-chickpea-spinach-feta-skillet',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 15-Minute Meals',
    titleEn: '15-Minute Mediterranean Crispy Chickpea, Spinach & Feta Skillet',
    subtitleEn:
      'Pantry chickpeas pan-crisped in olive oil with smoked paprika, garlic, baby spinach, sun-dried tomatoes, and crumbled feta.',
    wordCount: 940,
    introParagraphsEn: [
      'Canned chickpeas transform into a crispy, nutty weeknight dinner when dried properly and pan-roasted in extra-virgin olive oil with smoked paprika and garlic.',
      'Wilting fresh baby spinach and sun-dried tomatoes into the hot skillet during the last two minutes creates a complete 15-minute Mediterranean meal.',
    ],
    whyThisWorksEn: [
      'Built from shelf-stable pantry staples in 15 minutes.',
      'Pan-searing chickpeas in olive oil creates a crisp exterior and creamy interior.',
      'High in fiber, plant protein, and iron.',
    ],
    chefTipsEn: [
      'Rinse and drain canned chickpeas, then roll them gently on a clean kitchen towel to dry before adding to hot oil.',
      'Wait to stir the chickpeas for the first 4 minutes so they blister and brown.',
      'Add baby spinach off the heat so residual warmth wilts the leaves without overcooking.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Refrigerate leftovers in an airtight container at 4°C (39°F) within 2 hours and consume within 4 days.',
    substitutions: [
      {
        originalEn: 'Canned Chickpeas (400g drained)',
        substituteEn: 'Cannellini White Beans or Butter Beans',
        chefNoteEn: 'White beans become extra creamy inside while crisping on the outside.',
      },
      {
        originalEn: 'Crumbled Feta Cheese (60g)',
        substituteEn: 'Pitted Kalamata Olives or Toasted Pine Nuts (for Vegan option)',
        chefNoteEn: 'Keeps the dish 100% plant-based and dairy-free.',
      },
    ],
    faqs: [
      {
        questionEn: 'Why do chickpeas pop when pan-fried?',
        answerEn:
          'Internal moisture expands as the chickpea heats up—drying them on a towel first minimizes splattering and helps them crisp faster.',
      },
      {
        questionEn: 'Can I pack this chickpea skillet for work lunches?',
        answerEn:
          'Yes, it tastes great both warm and at room temperature as a Mediterranean grain bowl topper.',
      },
      {
        questionEn: 'Can I use frozen spinach instead of fresh baby spinach?',
        answerEn:
          'Yes, thaw frozen spinach and squeeze out excess water in a clean towel before stirring into the skillet.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 410,
    proteinGrams: 18,
    netCarbsGrams: 34,
    image: '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    gearItem: {
      id: 'gear-enameled-skillet',
      nameEn: '11-Inch Enameled Cast-Iron Deep Sauté Skillet',
      brand: 'Le Creuset',
      priceUsd: 185,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Rinsed, drained & towel-dried chickpeas', amount: 400, unit: 'g' },
      { item: 'Fresh baby spinach leaves', amount: 150, unit: 'g' },
      { item: 'Sliced sun-dried tomatoes & minced garlic', amount: 65, unit: 'g' },
      { item: 'Extra-virgin olive oil & smoked paprika', amount: 30, unit: 'ml' },
      { item: 'Crumbled feta cheese & fresh lemon juice', amount: 60, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Crisp Dried Chickpeas in Olive Oil',
        instruction:
          'Heat olive oil in a wide skillet over medium-high heat and cook towel-dried chickpeas for 6 minutes until golden and blistered.',
        timerSeconds: 360,
      },
      {
        title: 'Stir in Garlic, Paprika & Sun-Dried Tomatoes',
        instruction:
          'Add minced garlic, smoked paprika, and sliced sun-dried tomatoes, tossing for 2 minutes until fragrant.',
        timerSeconds: 120,
      },
      {
        title: 'Wilt Baby Spinach & Top with Feta',
        instruction:
          'Fold in fresh baby spinach until just wilted, squeeze fresh lemon juice over top, and finish with crumbled feta.',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: '5-ingredient-pesto-gnocchi-skillet',
    slug: '5-ingredient-crispy-pan-seared-gnocchi-basil-pesto-mozzarella',
    category: 'quick-easy',
    subcategoryId: '5-ingredient-recipes',
    categoryLabelEn: 'Quick & Easy · 5-Ingredient Recipes',
    titleEn: '5-Ingredient Crispy Pan-Seared Potato Gnocchi with Basil Pesto',
    subtitleEn:
      'Skip boiling water: sear shelf-stable potato gnocchi directly in olive oil until golden-crisp outside, then toss with basil pesto and cherry tomatoes.',
    wordCount: 920,
    introParagraphsEn: [
      'Boiling packaged potato gnocchi often turns them soft, whereas pan-searing them straight from the package in extra-virgin olive oil creates a crisp golden exterior with a pillowy potato center.',
      'With just five ingredients—gnocchi, olive oil, cherry tomatoes, basil pesto, and fresh mozzarella pearls—dinner is on the table in 14 minutes.',
    ],
    whyThisWorksEn: [
      'No pot of boiling water needed—everything cooks in one skillet.',
      'Direct pan-searing gives potato gnocchi a toasted, crisp crust.',
      'Only 5 ingredients and 14 minutes total time.',
    ],
    chefTipsEn: [
      'Do not boil the gnocchi first; add them directly to the warm olive oil in a single layer.',
      'Let the gnocchi sear undisturbed for 4 minutes so a golden crust forms on the bottom.',
      'Stir in the basil pesto off the heat so the fresh basil stays bright green.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Store leftover gnocchi in an airtight container in the refrigerator at 4°C (39°F) for up to 3 days and reheat in a skillet to 74°C (165°F).',
    substitutions: [
      {
        originalEn: 'Potato Gnocchi (500g)',
        substituteEn: 'Cauliflower Gnocchi or Ricotta Gnocchi',
        chefNoteEn: 'Sear frozen cauliflower gnocchi directly from frozen without thawing first.',
      },
      {
        originalEn: 'Basil Pesto with Pine Nuts (90g)',
        substituteEn: 'Sun-Dried Tomato Pesto or Nut-Free Kale Basil Pesto',
        chefNoteEn: 'Use sunflower seed pesto for nut-free kitchens.',
      },
    ],
    faqs: [
      {
        questionEn: 'Do I really not need to boil shelf-stable gnocchi before pan-frying?',
        answerEn:
          'No boiling is required! Shelf-stable and refrigerated potato gnocchi are already par-cooked, so pan-searing them with blistered cherry tomatoes cooks them through in 7 minutes.',
      },
      {
        questionEn: 'How do I store leftover pesto gnocchi?',
        answerEn:
          'Refrigerate in a glass container for up to 3 days and re-crisp in a dry non-stick or cast-iron skillet over medium heat.',
      },
      {
        questionEn: 'Can I add extra protein to this 5-ingredient meal?',
        answerEn:
          'Yes, fold in shredded cooked rotisserie chicken or white cannellini beans at the end.',
      },
    ],
    stepGalleryImages: [
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
      '/images/recipe_truffle_pasta_1795527116427.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 4,
    cookMinutes: 10,
    calories: 480,
    proteinGrams: 16,
    netCarbsGrams: 54,
    image: '/images/recipe_truffle_pasta_1795527116427.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Matte Black Enameled Cast-Iron Skillet',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Shelf-stable or refrigerated potato gnocchi', amount: 500, unit: 'g' },
      { item: 'Halved sweet cherry tomatoes', amount: 250, unit: 'g' },
      { item: 'Genovese basil pesto', amount: 90, unit: 'g' },
      { item: 'Fresh mini mozzarella pearls', amount: 120, unit: 'g' },
      { item: 'Extra-virgin olive oil', amount: 25, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Pan-Sear Dry Gnocchi in Olive Oil',
        instruction:
          'Toss potato gnocchi in warm olive oil in a wide skillet over medium-high heat and sear undisturbed for 4 minutes until golden underneath.',
        timerSeconds: 240,
      },
      {
        title: 'Blister Cherry Tomatoes',
        instruction:
          'Add halved cherry tomatoes and a splash (30ml) of water, cover for 3 minutes until tomatoes burst and gnocchi are tender.',
        timerSeconds: 180,
      },
      {
        title: 'Fold in Basil Pesto & Mozzarella Pearls',
        instruction:
          'Remove pan from heat, stir in basil pesto and fresh mozzarella pearls, and serve warm.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: '5-ingredient-honey-mustard-pork-tenderloin',
    slug: '5-ingredient-herb-crusted-honey-mustard-pork-tenderloin-medallions',
    category: 'quick-easy',
    subcategoryId: '5-ingredient-recipes',
    categoryLabelEn: 'Quick & Easy · 5-Ingredient Recipes',
    titleEn: '5-Ingredient Pan-Seared Honey Mustard Pork Tenderloin Medallions',
    subtitleEn:
      'Lean pork tenderloin sliced into quick-cooking medallions, seared golden, and glazed with whole-grain Dijon mustard, raw honey, and thyme.',
    wordCount: 930,
    introParagraphsEn: [
      'Roasting a whole pork tenderloin in the oven takes 25 to 30 minutes, but slicing it into 2.5cm medallions first cuts the cooking time down to 8 minutes in a single skillet.',
      'A 5-ingredient glaze of whole-grain Dijon mustard, honey, butter, and fresh thyme deglazes the skillet into a savory-sweet pan sauce.',
    ],
    whyThisWorksEn: [
      'Slicing pork tenderloin into medallions reduces cooking time by 70%.',
      'Pork tenderloin is as lean as skinless chicken breast while staying tender.',
      'Requires only 5 pantry ingredients.',
    ],
    chefTipsEn: [
      'Trim off the thin silver skin membrane from the pork tenderloin before slicing into medallions so the meat stays tender.',
      'Pat medallions dry with paper towels before seasoning with salt and pepper.',
      'Use an instant-read thermometer and pull pork medallions at 63°C (145°F), followed by a 3-minute rest.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook whole cuts of pork (including pork tenderloin and chops) to a minimum internal temperature of 63°C (145°F) followed by a 3-minute rest.',
    substitutions: [
      {
        originalEn: 'Pork Tenderloin Medallions (500g)',
        substituteEn: 'Chicken Breast Cutlets (cook to 74°C / 165°F)',
        chefNoteEn: 'If substituting poultry, cook until internal temperature reaches 74°C (165°F).',
      },
      {
        originalEn: 'Raw Honey (30ml)',
        substituteEn: 'Pure Maple Syrup or Sugar-Free Monkfruit Syrup',
        chefNoteEn: 'Maple syrup pairs well with whole-grain Dijon mustard.',
      },
    ],
    faqs: [
      {
        questionEn: 'Is pork safe at 63°C (145°F) with a slight pink tint?',
        answerEn:
          'Yes! The USDA updated its official safe pork cooking standard to 63°C (145°F) with a 3-minute rest for whole muscle cuts like pork tenderloin, keeping the meat juicy and tender.',
      },
      {
        questionEn: 'How long do cooked pork medallions last in the fridge?',
        answerEn:
          'Store in an airtight glass container at 4°C (39°F) for 3 to 4 days.',
      },
      {
        questionEn: 'What vegetables pair well with honey mustard pork?',
        answerEn:
          'Serve with roasted green beans, steamed broccoli, or mashed sweet potatoes.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 5,
    cookMinutes: 9,
    calories: 390,
    proteinGrams: 42,
    netCarbsGrams: 14,
    image: '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    gearItem: {
      id: 'gear-instant-thermometer',
      nameEn: 'Waterproof Digital Instant-Read Food Thermometer',
      brand: 'ThermoWorks',
      priceUsd: 89,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Pork tenderloin, sliced into 2.5cm medallions', amount: 500, unit: 'g' },
      { item: 'Whole-grain Dijon mustard', amount: 35, unit: 'g' },
      { item: 'Raw honey', amount: 25, unit: 'ml' },
      { item: 'Unsalted butter & splash of water/broth', amount: 30, unit: 'g' },
      { item: 'Fresh thyme leaves, sea salt & black pepper', amount: 8, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Slice & Season Pork Medallions',
        instruction:
          'Slice trimmed pork tenderloin into even 2.5cm medallions, pat dry, and season with sea salt and black pepper.',
        timerSeconds: 120,
      },
      {
        title: 'Sear Medallions for 3 Minutes per Side',
        instruction:
          'Sear medallions in melted butter over medium-high heat for 3 to 4 minutes per side until golden brown and 63°C (145°F).',
        timerSeconds: 420,
      },
      {
        title: 'Glaze with Dijon Honey Pan Sauce & Rest 3 Minutes',
        instruction:
          'Whisk Dijon mustard, honey, thyme, and 30ml water into the skillet for 60 seconds, coat medallions, and rest 3 minutes before serving.',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'air-fryer-crispy-honey-garlic-salmon-bites',
    slug: 'air-fryer-crispy-honey-garlic-salmon-bites-and-broccoli',
    category: 'quick-easy',
    subcategoryId: 'air-fryer-recipes',
    categoryLabelEn: 'Quick & Easy · Air Fryer Recipes',
    titleEn: '12-Minute Air Fryer Honey Garlic Salmon Bites & Roasted Broccoli',
    subtitleEn:
      'Skinless salmon cubed into bite-sized pieces, tossed with garlic, soy sauce, and honey, and air-fried until caramelized alongside crisp broccoli florets.',
    wordCount: 950,
    introParagraphsEn: [
      'Cutting salmon fillets into 2.5cm cubes exposes four times more surface area to the circulating heat of an Air Fryer, allowing the edges to caramelize in just 7 to 8 minutes while the centers stay flaky.',
      'Paired with bite-sized broccoli florets in the same basket, this makes a fast weeknight bowl or 3-day meal-prep lunch.',
    ],
    whyThisWorksEn: [
      'Cubed salmon cooks in 7 to 8 minutes at 200°C (400°F) in the Air Fryer.',
      'More surface area means more caramelized garlic glaze on every bite.',
      'Great over steamed rice or greens for quick weeknight bowls.',
    ],
    chefTipsEn: [
      'Preheat your Air Fryer to 200°C (400°F) for 3 minutes before adding the salmon cubes so the exterior sears immediately.',
      'Leave slight space between salmon cubes in the basket for even air circulation.',
      'Toss with the remaining warm honey garlic glaze right after removing from the basket.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook salmon cubes to a minimum internal temperature of 63°C (145°F) or until opaque and easily flaked.',
    substitutions: [
      {
        originalEn: 'Low-Sodium Soy Sauce (30ml)',
        substituteEn: 'Tamari or Coconut Aminos (for Gluten-Free / Paleo)',
        chefNoteEn: 'Coconut aminos add natural sweetness with lower sodium.',
      },
      {
        originalEn: 'Honey (20ml)',
        substituteEn: 'Sugar-Free Allulose Syrup (for Keto Salmon Bites)',
        chefNoteEn: 'Reduces net carbs to under 4g per serving.',
      },
    ],
    faqs: [
      {
        questionEn: 'Should I remove the salmon skin before cutting into cubes?',
        answerEn:
          'Removing the skin makes bite-sized salmon cubes easier to toss evenly in the glaze, though you can leave skin on the bottom if you prefer crispy skin.',
      },
      {
        questionEn: 'Do I need to flip salmon bites in the Air Fryer?',
        answerEn:
          'No flipping is necessary if the cubes are arranged in a single uncrowded layer at 200°C (400°F).',
      },
      {
        questionEn: 'How long do cooked salmon bites keep in the refrigerator?',
        answerEn:
          'Refrigerate in an airtight container at 4°C (39°F) for up to 3 days.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_crispy_salmon_1795527113114.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 5,
    cookMinutes: 8,
    calories: 430,
    proteinGrams: 40,
    netCarbsGrams: 15,
    image: '/images/recipe_crispy_salmon_1795527113114.jpg',
    gearItem: {
      id: 'gear-instant-thermometer',
      nameEn: 'Waterproof Digital Instant-Read Food Thermometer',
      brand: 'ThermoWorks',
      priceUsd: 89,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Fresh salmon fillets, cubed into 2.5cm pieces', amount: 450, unit: 'g' },
      { item: 'Fresh broccoli florets, bite-sized', amount: 250, unit: 'g' },
      { item: 'Low-sodium soy sauce or tamari', amount: 30, unit: 'ml' },
      { item: 'Honey, minced garlic (2 cloves) & grated ginger', amount: 25, unit: 'g' },
      { item: 'Avocado oil or toasted sesame oil', amount: 15, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Cube Salmon & Toss in Garlic Glaze',
        instruction:
          'Cut salmon into uniform 2.5cm cubes and toss gently with half the soy sauce, honey, minced garlic, and oil.',
        timerSeconds: 180,
      },
      {
        title: 'Arrange Salmon & Broccoli in Air Fryer Basket',
        instruction:
          'Place seasoned salmon cubes and oil-tossed broccoli florets in a single layer in a preheated 200°C (400°F) Air Fryer basket.',
        timerSeconds: 120,
      },
      {
        title: 'Air-Fry 7–8 Minutes to 63°C (145°F)',
        instruction:
          'Air-fry at 200°C (400°F) for 7 to 8 minutes until caramelized at the edges and 63°C (145°F) internally.',
        timerSeconds: 450,
      },
    ],
  },
  {
    id: 'air-fryer-crispy-parmesan-zucchini-fries',
    slug: 'air-fryer-crispy-garlic-parmesan-zucchini-fries',
    category: 'quick-easy',
    subcategoryId: 'air-fryer-recipes',
    categoryLabelEn: 'Quick & Easy · Air Fryer Recipes',
    titleEn: 'Crispy Air Fryer Garlic Parmesan Zucchini Batons',
    subtitleEn:
      'Fresh zucchini cut into batons, coated in grated Parmigiano-Reggiano, Italian herbs, and toasted panko, and air-fried without deep frying.',
    wordCount: 910,
    introParagraphsEn: [
      'Air-frying zucchini batons at 200°C (400°F) crisps the Parmesan and herb crust before the zucchini interior has time to release excess water.',
      'Served with warm marinara or Greek yogurt garlic dip, these make a fast 15-minute side dish or appetizer.',
    ],
    whyThisWorksEn: [
      'High-velocity 200°C (400°F) convection heat crisps the cheese crust in 10 minutes.',
      'Uses 85% less oil than deep-fried zucchini sticks.',
      'Easy way to add vegetables to weeknight dinners.',
    ],
    chefTipsEn: [
      'Choose small to medium zucchini, which have fewer watery seeds in the center than oversized zucchini.',
      'Pat the cut zucchini batons dry with paper towels before dredging.',
      'Air-fry in a single layer without stacking so every side browns evenly.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: If using a whisked raw egg wash for breading, cook until the coating is crisp and the internal center exceeds 71°C (160°F).',
    substitutions: [
      {
        originalEn: 'Toasted Panko Breadcrumbs (60g)',
        substituteEn: 'Almond Flour + Crushed Pork Rinds (for Keto / Gluten-Free)',
        chefNoteEn: 'Almond flour and Parmesan create a crispy low-carb crust.',
      },
      {
        originalEn: 'Parmigiano-Reggiano (50g)',
        substituteEn: 'Nutritional Yeast Flakes (for Dairy-Free)',
        chefNoteEn: 'Provides a savory cheesy flavor without dairy.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I prevent zucchini fries from getting soggy?',
        answerEn:
          'Dry the cut zucchini batons before breading, do not salt them ahead of time, and serve immediately or re-crisp in the Air Fryer for 2 minutes.',
      },
      {
        questionEn: 'Can I bake these in a regular oven if I do not have an Air Fryer?',
        answerEn:
          'Yes, bake on a wire rack set over a sheet pan at 215°C (425°F) for 16 to 18 minutes.',
      },
      {
        questionEn: 'How long do leftovers keep in the fridge?',
        answerEn:
          'Store in an airtight container lined with a paper towel at 4°C for up to 3 days.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 8,
    cookMinutes: 10,
    calories: 245,
    proteinGrams: 11,
    netCarbsGrams: 16,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-braiser-pan',
      nameEn: 'Stainless Steel Wire Cooling & Air-Flow Baking Rack Set',
      brand: 'All-Clad',
      priceUsd: 42,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Medium green zucchini, cut into 8cm batons', amount: 450, unit: 'g' },
      { item: 'Finely grated Parmigiano-Reggiano', amount: 55, unit: 'g' },
      { item: 'Panko breadcrumbs (or almond flour for low-carb)', amount: 60, unit: 'g' },
      { item: 'Large egg, whisked with 15ml water', amount: 1, unit: 'pc' },
      { item: 'Garlic powder, dried oregano & olive oil spray', amount: 12, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Cut & Dry Zucchini Batons',
        instruction:
          'Trim zucchini ends, slice into even 8cm batons, and press gently with paper towels to remove surface moisture.',
        timerSeconds: 180,
      },
      {
        title: 'Coat in Egg Wash & Parmesan Herb Crumb',
        instruction:
          'Dip batons in whisked egg, then press into a mixture of grated Parmigiano, panko, garlic powder, and oregano.',
        timerSeconds: 240,
      },
      {
        title: 'Air-Fry at 200°C (400°F) for 10 Minutes',
        instruction:
          'Arrange in a single layer in the Air Fryer basket, mist lightly with olive oil, and cook at 200°C (400°F) for 10 minutes until golden.',
        timerSeconds: 600,
      },
    ],
  },
  {
    id: 'keto-creamy-tuscan-garlic-chicken-skillet',
    slug: 'keto-creamy-tuscan-garlic-spinach-chicken-skillet',
    category: 'healthy-diet',
    subcategoryId: 'keto-low-carb',
    categoryLabelEn: 'Healthy & Diet · Keto & Low-Carb',
    titleEn: 'Keto Creamy Tuscan Garlic Chicken with Spinach & Sun-Dried Tomatoes',
    subtitleEn:
      'Golden pan-seared chicken breasts simmered in a low-carb garlic, Parmigiano, sun-dried tomato, and baby spinach cream sauce.',
    wordCount: 990,
    introParagraphsEn: [
      'Slicing chicken breasts horizontally into even cutlets allows them to cook evenly in 10 minutes without drying out, while soaking up a rich Tuscan pan sauce.',
      'With 48g of protein and only 5g net carbs per serving, this one-skillet recipe pairs well with steamed broccoli, zucchini ribbons, or cauliflower mash.',
    ],
    whyThisWorksEn: [
      'Horizontal chicken cutlets cook in half the time of thick whole breasts.',
      '5g Net Carbs and 48g Protein per serving.',
      'Sun-dried tomato oil seasons the skillet before building the cream sauce.',
    ],
    chefTipsEn: [
      'Slice thick chicken breasts in half horizontally to create two even 1.5cm cutlets.',
      'Verify internal temperature reaches 74°C (165°F) with an instant-read thermometer.',
      'Simmer the cream sauce over low heat after adding Parmigiano so it thickens smoothly.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always cook chicken breasts and poultry cutlets to a minimum internal temperature of 74°C (165°F) measured at the thickest center.',
    substitutions: [
      {
        originalEn: 'Heavy Whipping Cream (180ml)',
        substituteEn: 'Full-Fat Canned Coconut Cream or 120ml Chicken Broth + 60g Cream Cheese',
        chefNoteEn: 'Cream cheese whisked into broth creates a thick low-carb sauce.',
      },
      {
        originalEn: 'Chicken Breast Cutlets (600g)',
        substituteEn: 'Boneless Skinless Chicken Thighs or Salmon Fillets',
        chefNoteEn: 'Both work well with the Tuscan garlic spinach sauce.',
      },
    ],
    faqs: [
      {
        questionEn: 'How many net carbs are in a serving of Tuscan garlic chicken?',
        answerEn:
          'Each serving contains approximately 5g net carbohydrates, coming primarily from the garlic, baby spinach, and sun-dried tomatoes.',
      },
      {
        questionEn: 'How do I reheat creamy Tuscan chicken without the sauce splitting?',
        answerEn:
          'Warm gently in a covered skillet over low heat with 1 to 2 tablespoons of chicken broth or water, stirring occasionally until the chicken reaches 74°C (165°F).',
      },
      {
        questionEn: 'Can I use this recipe for 4-day keto meal prep?',
        answerEn:
          'Yes, store in glass containers with steamed broccoli or cauliflower rice at 4°C for up to 4 days.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 8,
    cookMinutes: 14,
    calories: 510,
    proteinGrams: 48,
    netCarbsGrams: 5,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Matte Black Enameled Cast-Iron Skillet',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Chicken breast cutlets, patted dry', amount: 600, unit: 'g' },
      { item: 'Heavy whipping cream (or coconut cream) & chicken broth', amount: 220, unit: 'ml' },
      { item: 'Fresh baby spinach & julienned sun-dried tomatoes', amount: 180, unit: 'g' },
      { item: 'Grated Parmigiano-Reggiano & minced garlic (3 cloves)', amount: 65, unit: 'g' },
      { item: 'Extra-virgin olive oil, Italian herbs, salt & pepper', amount: 20, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Sear Chicken Cutlets to 74°C (165°F)',
        instruction:
          'Season chicken cutlets and sear in olive oil over medium-high heat for 4 to 5 minutes per side until golden and 74°C (165°F) internally. Set aside on a plate.',
        timerSeconds: 540,
      },
      {
        title: 'Sauté Garlic & Sun-Dried Tomatoes',
        instruction:
          'In the same skillet, sauté minced garlic and sun-dried tomatoes for 60 seconds, then pour in chicken broth and cream to deglaze.',
        timerSeconds: 120,
      },
      {
        title: 'Wilt Spinach, Stir in Parmigiano & Return Chicken',
        instruction:
          'Stir in grated Parmigiano and baby spinach over low heat until wilted, then return chicken cutlets to coat in the sauce.',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'keto-cauliflower-fried-rice-garlic-shrimp',
    slug: 'keto-low-carb-garlic-ginger-shrimp-cauliflower-fried-rice',
    category: 'healthy-diet',
    subcategoryId: 'keto-low-carb',
    categoryLabelEn: 'Healthy & Diet · Keto & Low-Carb',
    titleEn: '15-Minute Low-Carb Shrimp & Egg Cauliflower Fried Rice',
    subtitleEn:
      'High-protein skillet cauliflower rice stir-fried over high heat with jumbo shrimp, scrambled eggs, scallions, ginger, and toasted sesame oil.',
    wordCount: 940,
    introParagraphsEn: [
      'The secret to dry, fluffy cauliflower rice that mimics traditional takeout fried rice is evaporating surface moisture in a dry hot skillet before adding toasted sesame oil and sauces.',
      'Loaded with seared shrimp and ribbons of scrambled egg, this bowl delivers 39g of protein and just 7g net carbs.',
    ],
    whyThisWorksEn: [
      'Dry-roasting riced cauliflower for 3 minutes removes excess water so it never turns mushy.',
      '39g Protein and 7g Net Carbs in a single 15-minute skillet.',
      'Holds up well for 3 days of low-carb lunch prep.',
    ],
    chefTipsEn: [
      'If using frozen riced cauliflower, squeeze out excess thaw water in a clean kitchen towel or dry-sauté it in a hot pan for 4 minutes first.',
      'Push the cauliflower rice to the perimeter of the skillet to scramble the eggs in the hot center.',
      'Add toasted sesame oil and sliced green onions right off the heat.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook shrimp to an internal temperature of 63°C (145°F) until opaque and cook eggs until firm.',
    substitutions: [
      {
        originalEn: 'Jumbo Shrimp (400g)',
        substituteEn: 'Diced Chicken Breast (cooked to 74°C / 165°F) or Crispy Tofu',
        chefNoteEn: 'Works with any quick-cooking diced protein.',
      },
      {
        originalEn: 'Soy Sauce / Tamari (25ml)',
        substituteEn: 'Coconut Aminos',
        chefNoteEn: 'Soy-free and gluten-free option for Whole30 and Paleo.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I stop cauliflower rice from tasting watery?',
        answerEn:
          'Never cover the skillet while cooking cauliflower rice, and cook over medium-high heat so moisture evaporates rapidly.',
      },
      {
        questionEn: 'Can I grate fresh cauliflower at home instead of buying bagged riced cauliflower?',
        answerEn:
          'Yes, pulse raw cauliflower florets 8 to 10 times in a food processor or grate on the coarse side of a box grater.',
      },
      {
        questionEn: 'How long does cauliflower fried rice keep in the fridge?',
        answerEn:
          'Store in an airtight glass container at 4°C (39°F) for up to 3 days.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 365,
    proteinGrams: 39,
    netCarbsGrams: 7,
    image: '/images/action_searing_skillet_butter_1795527113114.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Matte Black Enameled Cast-Iron Skillet',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Fresh riced cauliflower', amount: 450, unit: 'g' },
      { item: 'Peeled jumbo shrimp, patted dry', amount: 400, unit: 'g' },
      { item: 'Large eggs, whisked', amount: 2, unit: 'pcs' },
      { item: 'Minced garlic, fresh ginger & sliced scallions', amount: 45, unit: 'g' },
      { item: 'Tamari soy sauce (25ml) & toasted sesame oil (15ml)', amount: 40, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Sear Shrimp with Garlic & Ginger',
        instruction:
          'Sear shrimp in a hot skillet for 90 seconds per side with garlic and ginger until opaque and 63°C (145°F), then transfer to a plate.',
        timerSeconds: 180,
      },
      {
        title: 'Dry-Roast Cauliflower Rice & Scramble Eggs',
        instruction:
          'Sauté riced cauliflower over high heat for 4 minutes until dry and tender-crisp, push to the side, and scramble the eggs in the center.',
        timerSeconds: 240,
      },
      {
        title: 'Toss with Shrimp, Tamari & Sesame Oil',
        instruction:
          'Return shrimp to the skillet, drizzle with tamari and toasted sesame oil, toss with scallions, and serve.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'high-protein-turkey-sweet-potato-skillet',
    slug: 'high-protein-lean-turkey-and-roasted-sweet-potato-meal-prep-skillet',
    category: 'healthy-diet',
    subcategoryId: 'high-protein-meals',
    categoryLabelEn: 'Healthy & Diet · High-Protein Meals',
    titleEn: 'High-Protein Lean Ground Turkey & Sweet Potato Skillet (45g Protein)',
    subtitleEn:
      'One-pan macro-balanced skillet with 93% lean ground turkey, diced sweet potatoes, black beans, bell peppers, and smoky cumin.',
    wordCount: 970,
    introParagraphsEn: [
      'For athletes and busy professionals tracking daily protein and complex carbohydrate targets, this one-pan ground turkey and sweet potato skillet delivers 45 grams of protein per serving and reheats cleanly all week.',
      'Dicing the sweet potatoes into small 1.5cm cubes allows them to tenderize in the skillet in just 12 minutes.',
    ],
    whyThisWorksEn: [
      '45g complete protein paired with slow-digesting sweet potato carbohydrates.',
      'Cooks in one skillet with minimal dishes.',
      'Freezes and reheats well for 4-day meal prep.',
    ],
    chefTipsEn: [
      'Let the ground turkey sear undisturbed for 3 minutes before breaking it up with a wooden spoon so it develops deep browned flavor.',
      'Cut sweet potatoes into uniform 1.5cm cubes so they finish cooking at the same time.',
      'Verify ground turkey reaches a minimum internal temperature of 74°C (165°F).',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always cook ground poultry (ground turkey and ground chicken) to a safe minimum internal temperature of 74°C (165°F).',
    substitutions: [
      {
        originalEn: '93% Lean Ground Turkey (500g)',
        substituteEn: '95% Lean Ground Beef (cook to 71°C / 160°F) or Lentils',
        chefNoteEn: 'Lean ground beef or diced chicken breast work 1:1.',
      },
      {
        originalEn: 'Orange Sweet Potatoes (350g)',
        substituteEn: 'Cubed Butternut Squash or Baby Gold Potatoes',
        chefNoteEn: 'Butternut squash reduces total carbohydrates slightly.',
      },
    ],
    faqs: [
      {
        questionEn: 'How long can I store this turkey sweet potato skillet for meal prep?',
        answerEn:
          'Refrigerate in airtight glass containers at 4°C (39°F) for 3 to 4 days, or freeze at -18°C for up to 2 months.',
      },
      {
        questionEn: 'Do I need to peel the sweet potatoes first?',
        answerEn:
          'Peeling is optional—scrubbed sweet potato skins contain extra dietary fiber and hold the cubes together during sautéing.',
      },
      {
        questionEn: 'What toppings work best on this skillet?',
        answerEn:
          'Top with sliced avocado, plain Greek yogurt, fresh cilantro, and a squeeze of lime juice.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 8,
    cookMinutes: 17,
    calories: 470,
    proteinGrams: 45,
    netCarbsGrams: 32,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-glass-prep-set',
      nameEn: '10-Piece Borosilicate Glass Meal-Prep Container Set',
      brand: 'Pyrex Culinary',
      priceUsd: 68,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: '93% lean ground turkey', amount: 500, unit: 'g' },
      { item: 'Sweet potatoes, peeled & diced into 1.5cm cubes', amount: 350, unit: 'g' },
      { item: 'Diced red bell pepper, onion & garlic', amount: 200, unit: 'g' },
      { item: 'Low-sodium chicken broth (for steaming sweet potatoes)', amount: 80, unit: 'ml' },
      { item: 'Olive oil, ground cumin, smoked paprika & sea salt', amount: 20, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Brown Ground Turkey to 74°C (165°F)',
        instruction:
          'Sear ground turkey in olive oil over medium-high heat for 6 to 7 minutes with onion, garlic, cumin, and paprika until browned and 74°C (165°F).',
        timerSeconds: 420,
      },
      {
        title: 'Simmer Diced Sweet Potatoes & Peppers',
        instruction:
          'Add 1.5cm sweet potato cubes, diced bell pepper, and 80ml chicken broth. Cover and cook over medium-low heat for 10 minutes until tender.',
        timerSeconds: 600,
      },
      {
        title: 'Uncover & Finish with Fresh Herbs',
        instruction:
          'Uncover for 1 minute to evaporate remaining liquid, season to taste, and divide into bowls or cooled meal-prep containers.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'high-protein-cottage-cheese-egg-white-bites',
    slug: 'high-protein-baked-cottage-cheese-spinach-egg-bites',
    category: 'healthy-diet',
    subcategoryId: 'high-protein-meals',
    categoryLabelEn: 'Healthy & Diet · High-Protein Meals',
    titleEn: 'High-Protein Blended Cottage Cheese & Roasted Pepper Egg Bites',
    subtitleEn:
      'Velvety sous-vide-style breakfast egg bites made by blending cottage cheese with whole eggs, roasted red peppers, and spinach in a muffin tin.',
    wordCount: 920,
    introParagraphsEn: [
      'Blending full-fat or low-fat cottage cheese directly with whole eggs in a blender for 20 seconds aerates the protein curds and creates a silky, custard-like texture without heavy cream.',
      'Baked gently with a small water bath on the lower oven rack, a batch of 12 egg bites provides 4 days of grab-and-go high-protein breakfasts.',
    ],
    whyThisWorksEn: [
      'Blending cottage cheese adds extra casein and whey protein while keeping the egg bites velvety.',
      'Steam from a shallow pan of water in the oven prevents rubbery edges.',
      'Reheats in 35 seconds on busy weekday mornings.',
    ],
    chefTipsEn: [
      'Use a silicone muffin pan or lightly oiled parchment liners so the egg bites pop out cleanly.',
      'Place a shallow baking pan filled with 2cm of hot water on the bottom rack of your oven to create gentle steam.',
      'Cool for 10 minutes in the muffin tin before removing so the custard sets.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Bake egg dishes until set and an instant-read thermometer inserted into the center registers 71°C (160°F).',
    substitutions: [
      {
        originalEn: 'Cottage Cheese (225g)',
        substituteEn: 'Plain Greek Yogurt or Ricotta Cheese',
        chefNoteEn: 'Greek yogurt adds a subtle tangy note with high protein.',
      },
      {
        originalEn: 'Roasted Red Bell Peppers & Spinach (120g)',
        substituteEn: 'Sautéed Mushrooms, Broccoli, or Cooked Turkey Bacon',
        chefNoteEn: 'Pre-cook vegetables first so they do not release water into the eggs.',
      },
    ],
    faqs: [
      {
        questionEn: 'How long can I store baked egg bites in the refrigerator?',
        answerEn:
          'Store cooled egg bites in an airtight glass container in the refrigerator at 4°C (39°F) for up to 4 days.',
      },
      {
        questionEn: 'Can I freeze homemade cottage cheese egg bites?',
        answerEn:
          'Yes, freeze on a tray until solid, transfer to a freezer bag for up to 2 months, and thaw overnight in the refrigerator before warming.',
      },
      {
        questionEn: 'Why did my egg bites deflate slightly after coming out of the oven?',
        answerEn:
          'A slight settle is normal; baking at a moderate 160°C (325°F) with a steam pan prevents over-puffing and collapsing.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 8,
    cookMinutes: 22,
    calories: 290,
    proteinGrams: 28,
    netCarbsGrams: 4,
    image: '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    gearItem: {
      id: 'gear-glass-prep-set',
      nameEn: '10-Piece Borosilicate Glass Meal-Prep Container Set',
      brand: 'Pyrex Culinary',
      priceUsd: 68,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Large pasture-raised whole eggs', amount: 6, unit: 'pcs' },
      { item: 'Small-curd cottage cheese', amount: 225, unit: 'g' },
      { item: 'Shredded sharp cheddar or Gruyère cheese', amount: 60, unit: 'g' },
      { item: 'Diced roasted red bell peppers & chopped baby spinach', amount: 120, unit: 'g' },
      { item: 'Sea salt, black pepper & garlic powder', amount: 5, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Blend Eggs & Cottage Cheese Smooth',
        instruction:
          'Blend eggs, cottage cheese, salt, pepper, and garlic powder on medium speed for 20 seconds until smooth.',
        timerSeconds: 60,
      },
      {
        title: 'Divide Vegetables & Egg Mixture into Muffin Cups',
        instruction:
          'Divide diced roasted peppers, spinach, and shredded cheese evenly among 12 greased muffin cups and pour the blended egg mixture on top.',
        timerSeconds: 180,
      },
      {
        title: 'Steam-Bake at 160°C (325°F) to 71°C (160°F)',
        instruction:
          'Bake at 160°C (325°F) with a shallow pan of water on the lower rack for 20 to 22 minutes until set and 71°C (160°F) in the center.',
        timerSeconds: 1320,
      },
    ],
  },
  {
    id: 'vegan-crispy-sesame-tofu-broccoli-skillet',
    slug: 'vegan-crispy-pan-seared-sesame-ginger-tofu-and-broccoli',
    category: 'healthy-diet',
    subcategoryId: 'vegan-vegetarian',
    categoryLabelEn: 'Healthy & Diet · Vegan & Vegetarian',
    titleEn: 'Crispy Pan-Seared Sesame Ginger Tofu & Broccoli Skillet',
    subtitleEn:
      'Extra-firm tofu pressed dry, tossed in cornstarch, and pan-seared until golden crisp, then glazed in a ginger, garlic, and toasted sesame sauce.',
    wordCount: 950,
    introParagraphsEn: [
      'The key to crispy restaurant-style tofu in a home skillet is pressing out excess water for 10 minutes and dusting the cubes lightly with cornstarch before searing.',
      'Once golden on all sides, the starch coating locks onto our ginger garlic sesame glaze without turning soggy.',
    ],
    whyThisWorksEn: [
      'Pressing water from extra-firm tofu allows the cornstarch crust to blister and crisp.',
      '100% plant-based vegan dinner with 26g protein per serving.',
      'Cooks in one wide skillet in 20 minutes.',
    ],
    chefTipsEn: [
      'Use extra-firm or super-firm vacuum-packed tofu rather than soft or silken tofu.',
      'Wait to toss the tofu cubes with the liquid sesame sauce until right before serving so the crust stays crisp.',
      'Toast sesame seeds in a dry pan for 60 seconds until fragrant before garnishing.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Store leftover cooked tofu and broccoli in a sealed container in the refrigerator at 4°C (39°F) for up to 4 days.',
    substitutions: [
      {
        originalEn: 'Cornstarch Coating (20g)',
        substituteEn: 'Arrowroot Powder or Potato Starch (1:1 Ratio)',
        chefNoteEn: 'Arrowroot powder creates an equally crisp gluten-free crust.',
      },
      {
        originalEn: 'Extra-Firm Tofu (400g)',
        substituteEn: 'Cubed Tempeh or Shelled Edamame Beans',
        chefNoteEn: 'Tempeh adds extra fermented plant protein and fiber.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I press tofu without a special tofu press?',
        answerEn:
          'Wrap the tofu block in paper towels, place it between two flat plates, and set a heavy cast-iron skillet on top for 10 minutes.',
      },
      {
        questionEn: 'Can I cook the cornstarch-coated tofu in an Air Fryer?',
        answerEn:
          'Yes! Toss the coated tofu cubes in 1 tablespoon of oil and air-fry at 200°C (400°F) for 12 to 14 minutes, shaking halfway.',
      },
      {
        questionEn: 'How do I keep leftover tofu crispy for meal prep?',
        answerEn:
          'Pack the sesame ginger glaze in a separate small cup and pour it over the reheated tofu and broccoli right before eating.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 12,
    calories: 395,
    proteinGrams: 26,
    netCarbsGrams: 24,
    image: '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Matte Black Enameled Cast-Iron Skillet',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Extra-firm tofu, pressed dry & cubed into 2cm pieces', amount: 400, unit: 'g' },
      { item: 'Cornstarch (or arrowroot powder) for crisping', amount: 20, unit: 'g' },
      { item: 'Fresh broccoli florets', amount: 300, unit: 'g' },
      { item: 'Low-sodium tamari, maple syrup, garlic & grated ginger', amount: 55, unit: 'ml' },
      { item: 'Toasted sesame oil & roasted sesame seeds', amount: 20, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Press, Cube & Dust Tofu in Cornstarch',
        instruction:
          'Cut pressed extra-firm tofu into 2cm cubes and toss gently in a bowl with cornstarch and a pinch of salt until lightly coated.',
        timerSeconds: 180,
      },
      {
        title: 'Pan-Sear Tofu Until Golden Crisp',
        instruction:
          'Sear tofu cubes in a hot skillet with 1 tablespoon oil for 6 to 8 minutes, turning to crisp all sides, then steam-sear broccoli florets.',
        timerSeconds: 450,
      },
      {
        title: 'Glaze with Ginger Sesame Sauce',
        instruction:
          'Pour the whisked tamari, ginger, garlic, and maple glaze into the hot skillet, toss for 60 seconds until glossy, and top with sesame seeds.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'no-bake-dark-chocolate-avocado-truffle-tart',
    slug: 'no-bake-dark-chocolate-espresso-ganache-tart-date-walnut-crust',
    category: 'desserts-baking',
    subcategoryId: 'no-bake-desserts',
    categoryLabelEn: 'Desserts & Baking · No-Bake Desserts',
    titleEn: 'No-Bake 70% Dark Chocolate Ganache Tart with Toasted Walnut Crust',
    subtitleEn:
      'Silky no-bake Belgian 70% dark chocolate ganache set inside a pressed Medjool date, cocoa, and toasted walnut tart shell.',
    wordCount: 940,
    introParagraphsEn: [
      'When you need a showstopping dinner party dessert without turning on the oven, a classic French dark chocolate ganache tart set over a toasted walnut and Medjool date crust takes just 15 minutes of active prep.',
      'Pouring warm coconut cream or dairy cream over finely chopped 70% dark chocolate creates a smooth emulsion that sets cleanly in the refrigerator.',
    ],
    whyThisWorksEn: [
      'Zero oven time required—sets in the refrigerator in 90 minutes.',
      'Naturally gluten-free walnut and Medjool date crust.',
      'Finely chopping the dark chocolate ensures it melts without graininess.',
    ],
    chefTipsEn: [
      'Use a serrated bread knife to chop 70% dark chocolate bars into fine shards so they melt completely when warm cream is poured over top.',
      'Let the cream sit on the chopped chocolate for 2 minutes before stirring gently from the center outward.',
      'Slice the chilled tart with a chef knife dipped in warm water and wiped dry between cuts.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Keep ganache tarts refrigerated at 4°C (39°F) in an airtight container for up to 5 days.',
    substitutions: [
      {
        originalEn: 'Heavy Cream (240ml)',
        substituteEn: 'Full-Fat Canned Coconut Cream (240ml — for 100% Dairy-Free / Vegan Tart)',
        chefNoteEn: 'Coconut cream sets just as firmly as dairy cream with 70% dark chocolate.',
      },
      {
        originalEn: 'Toasted Walnuts (200g)',
        substituteEn: 'Roasted Almonds, Pecans, or Hulled Sunflower Seeds (for Nut-Free)',
        chefNoteEn: 'Pulse with pitted Medjool dates until the mixture holds together when pinched.',
      },
    ],
    faqs: [
      {
        questionEn: 'Why did my chocolate ganache separate or look oily?',
        answerEn:
          'Boiling the cream too aggressively or whisking too fast can separate cocoa butter. Warm the cream just to a gentle simmer and stir slowly with a silicone spatula.',
      },
      {
        questionEn: 'Can I make this no-bake chocolate tart 2 days before an event?',
        answerEn:
          'Yes, it slices even more cleanly after chilling overnight in the refrigerator.',
      },
      {
        questionEn: 'Can I freeze slices of dark chocolate ganache tart?',
        answerEn:
          'Yes, wrap slices tightly and freeze at -18°C for up to 2 months.',
      },
    ],
    stepGalleryImages: [
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 15,
    cookMinutes: 5,
    calories: 385,
    proteinGrams: 6,
    netCarbsGrams: 26,
    image: '/images/action_piping_cupcake_swirl_1795530073426.jpg',
    gearItem: {
      id: 'gear-piping-kit',
      nameEn: '9-Inch Non-Stick Fluted Tart Pan with Removable Bottom',
      brand: 'Ateco Pastry',
      priceUsd: 34,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: '70% dark chocolate, finely chopped', amount: 280, unit: 'g' },
      { item: 'Full-fat coconut cream or heavy whipping cream', amount: 240, unit: 'ml' },
      { item: 'Toasted walnuts or pecans', amount: 200, unit: 'g' },
      { item: 'Soft pitted Medjool dates & unsweetened cocoa powder', amount: 160, unit: 'g' },
      { item: 'Vanilla extract & flaky sea salt for garnish', amount: 8, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Press Walnut & Date Crust into Tart Pan',
        instruction:
          'Pulse toasted walnuts, pitted Medjool dates, cocoa powder, and a pinch of salt in a food processor, then press firmly into a 9-inch tart pan.',
        timerSeconds: 300,
      },
      {
        title: 'Steep Warm Cream Over Chopped 70% Dark Chocolate',
        instruction:
          'Pour warm simmering cream over finely chopped dark chocolate, wait 2 minutes, and stir gently from the center until glossy.',
        timerSeconds: 180,
      },
      {
        title: 'Pour Ganache & Chill for 90 Minutes',
        instruction:
          'Pour ganache into the crust, tap gently to level, chill at 4°C for 90 minutes until firm, and garnish with flaky sea salt.',
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'no-bake-lemon-berry-mascarpone-parfait-cups',
    slug: '10-minute-no-bake-lemon-berry-mascarpone-cheesecake-cups',
    category: 'desserts-baking',
    subcategoryId: 'no-bake-desserts',
    categoryLabelEn: 'Desserts & Baking · No-Bake Desserts',
    titleEn: '10-Minute No-Bake Lemon Berry Mascarpone Cheesecake Cups',
    subtitleEn:
      'Individual no-bake cheesecake jars layered with toasted oat biscuit crumbs, lemon-zested mascarpone cream, and fresh berries.',
    wordCount: 910,
    introParagraphsEn: [
      'Individual no-bake cheesecake cups deliver all the creamy citrus tang of a baked New York cheesecake in 10 minutes without water baths or overnight cooling.',
      'Because mascarpone has a naturally high butterfat content and mild sweetness, folding it with fresh lemon juice, lemon zest, and whipped cream sets into a spoonable mousse immediately.',
    ],
    whyThisWorksEn: [
      'Ready in 10 minutes with zero baking required.',
      'Portioned into individual glass jars for easy make-ahead entertaining.',
      'Fresh lemon juice naturally thickens the mascarpone cream.',
    ],
    chefTipsEn: [
      'Zest your lemons before juicing them, taking only the fragrant yellow outer peel and avoiding the bitter white pith.',
      'Chill your mixing bowl for 10 minutes in the refrigerator before whipping the cream.',
      'Assemble up to 24 hours ahead and keep covered in the refrigerator.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Refrigerate dairy mascarpone desserts at 4°C (39°F) immediately after assembly and consume within 3 days.',
    substitutions: [
      {
        originalEn: 'Italian Mascarpone Cheese (225g)',
        substituteEn: 'Full-Fat Cream Cheese (softened) or Thick Strained Greek Yogurt',
        chefNoteEn: 'Strained Greek yogurt cuts calories while boosting protein.',
      },
      {
        originalEn: 'Crushed Oat Biscuits / Graham Crackers (120g)',
        substituteEn: 'Toasted Almond Meal + Melted Butter (for Low-Carb / Gluten-Free)',
        chefNoteEn: 'Toast almond meal in a dry skillet for 2 minutes until golden.',
      },
    ],
    faqs: [
      {
        questionEn: 'Can I make these no-bake cheesecake cups the night before?',
        answerEn:
          'Yes! Chilling overnight in covered glass jars allows the lemon mascarpone layer to set even more cleanly.',
      },
      {
        questionEn: 'Can I use frozen berries instead of fresh berries?',
        answerEn:
          'If using frozen berries, simmer them briefly with 1 tablespoon of honey and cool into a berry compote so thaw water does not soak the biscuit base.',
      },
      {
        questionEn: 'Do these cheesecake cups need gelatin to set?',
        answerEn:
          'No gelatin is needed—the acidity of the lemon juice reacts with the mascarpone and whipped cream proteins to thicken naturally.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 0,
    calories: 330,
    proteinGrams: 7,
    netCarbsGrams: 24,
    image: '/images/recipe_mango_cupcakes_1795527116791.jpg',
    gearItem: {
      id: 'gear-piping-kit',
      nameEn: 'Set of 6 Glass Dessert Parfait Jars with Airtight Lids',
      brand: 'Pyrex Culinary',
      priceUsd: 29,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Chilled mascarpone cheese (or softened cream cheese)', amount: 225, unit: 'g' },
      { item: 'Cold heavy whipping cream & powdered sugar (45g)', amount: 180, unit: 'ml' },
      { item: 'Crushed oat biscuits tossed with 30g melted butter', amount: 150, unit: 'g' },
      { item: 'Fresh raspberries, blueberries & sliced strawberries', amount: 200, unit: 'g' },
      { item: 'Fresh lemon juice (30ml), grated lemon zest & vanilla', amount: 35, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Layer Buttered Biscuit Crumbs in Jars',
        instruction:
          'Toss crushed biscuits with melted butter and press 2 tablespoons into the base of 4 to 6 glass dessert jars.',
        timerSeconds: 180,
      },
      {
        title: 'Whip Lemon Mascarpone Cream',
        instruction:
          'Whisk mascarpone, heavy cream, powdered sugar, lemon zest, and lemon juice for 3 minutes until thick and billowy.',
        timerSeconds: 180,
      },
      {
        title: 'Pipe Cream & Top with Fresh Berries',
        instruction:
          'Spoon or pipe the lemon mascarpone filling over the crumb bases, top with fresh berries, and chill at 4°C until serving.',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'healthy-almond-flour-dark-chocolate-chip-cookies',
    slug: 'healthy-one-bowl-almond-flour-dark-chocolate-sea-salt-cookies',
    category: 'desserts-baking',
    subcategoryId: 'healthy-sweets',
    categoryLabelEn: 'Desserts & Baking · Healthy Sweets',
    titleEn: 'One-Bowl Almond Flour Dark Chocolate Chunk Cookies with Sea Salt',
    subtitleEn:
      'Naturally gluten-free, grain-free cookies baked with blanched almond flour, coconut oil, maple syrup, and 70% dark chocolate chunks.',
    wordCount: 930,
    introParagraphsEn: [
      'Blanched almond flour produces naturally tender, chewy chocolate chunk cookies in a single mixing bowl without refined wheat flour or complicated chill times.',
      'Finished with flaky sea salt right out of the oven, each cookie balances rich 70% dark chocolate with nutty toasted almond flavor.',
    ],
    whyThisWorksEn: [
      'Naturally gluten-free and mixed in one bowl in 8 minutes.',
      'Healthy monounsaturated fats from almond flour keep the centers soft for days.',
      'Bakes in just 11 to 12 minutes at 175°C (350°F).',
    ],
    chefTipsEn: [
      'Use fine blanched almond flour (made from peeled almonds) rather than coarse almond meal for the best cookie texture.',
      'Let the cookies cool directly on the baking sheet for 10 minutes before moving them—almond flour cookies firm up as they cool.',
      'Press two or three extra dark chocolate chunks onto the tops of each dough ball before baking.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Bake cookies involving whole eggs until set and golden around the edges (175°C / 350°F for 11–12 minutes).',
    substitutions: [
      {
        originalEn: 'Pure Maple Syrup or Coconut Sugar (75g)',
        substituteEn: 'Granulated Monkfruit / Erythritol Blend (for Keto Cookies)',
        chefNoteEn: 'Lowers net carbs to 3g per cookie.',
      },
      {
        originalEn: 'Melted Coconut Oil (60ml)',
        substituteEn: 'Melted Unsalted Butter or Creamy Almond Butter',
        chefNoteEn: 'Both work 1:1 by weight or volume.',
      },
    ],
    faqs: [
      {
        questionEn: 'Can I substitute coconut flour 1:1 for almond flour?',
        answerEn:
          'No! Coconut flour is extremely absorbent and requires four times more liquid and eggs than almond flour. Stick to blanched almond flour for this recipe.',
      },
      {
        questionEn: 'How should I store almond flour cookies?',
        answerEn:
          'Store in an airtight container at cool room temperature for 3 days, or refrigerate at 4°C for up to 7 days.',
      },
      {
        questionEn: 'Can I freeze balls of almond flour cookie dough?',
        answerEn:
          'Yes, freeze scooped dough balls on a tray, store in a freezer bag for up to 3 months, and bake directly from frozen adding 2 extra minutes.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 8,
    cookMinutes: 12,
    calories: 195,
    proteinGrams: 5,
    netCarbsGrams: 11,
    image: '/images/recipe_mango_cupcakes_1795527116791.jpg',
    gearItem: {
      id: 'gear-piping-kit',
      nameEn: 'Heavy-Duty Aluminum Half-Sheet Baking Pan & Silicone Mat',
      brand: 'Nordic Ware',
      priceUsd: 38,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Fine blanched almond flour', amount: 220, unit: 'g' },
      { item: '70% dark chocolate bar, chopped into chunks', amount: 110, unit: 'g' },
      { item: 'Melted coconut oil or unsalted butter', amount: 60, unit: 'ml' },
      { item: 'Coconut sugar or maple syrup', amount: 75, unit: 'g' },
      { item: 'Large egg (1 pc), vanilla extract, baking soda & flaky sea salt', amount: 60, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Whisk Wet Ingredients in One Bowl',
        instruction:
          'Whisk melted coconut oil, coconut sugar, egg, and vanilla extract in a medium bowl until smooth.',
        timerSeconds: 120,
      },
      {
        title: 'Fold in Almond Flour & Dark Chocolate Chunks',
        instruction:
          'Stir in blanched almond flour, 1/2 teaspoon baking soda, and chopped 70% dark chocolate until a soft dough forms.',
        timerSeconds: 180,
      },
      {
        title: 'Bake at 175°C (350°F) for 11–12 Minutes & Cool on Sheet',
        instruction:
          'Scoop 12 dough balls onto a parchment-lined baking sheet, flatten slightly, bake at 175°C (350°F) for 11 to 12 minutes, top with sea salt, and cool 10 minutes on the pan.',
        timerSeconds: 720,
      },
    ],
  },
  {
    id: 'healthy-greek-yogurt-berry-oat-muffins',
    slug: 'healthy-high-protein-greek-yogurt-blueberry-oat-muffins',
    category: 'desserts-baking',
    subcategoryId: 'healthy-sweets',
    categoryLabelEn: 'Desserts & Baking · Healthy Sweets',
    titleEn: 'Wholesome Greek Yogurt & Wild Blueberry Rolled Oat Muffins',
    subtitleEn:
      'Refined-sugar-free breakfast muffins made with rolled oats, strained Greek yogurt, honey, and fresh blueberries—no oil or butter required.',
    wordCount: 920,
    introParagraphsEn: [
      'Strained Greek yogurt replaces refined vegetable oil in these wholesome blueberry oat muffins, keeping the crumb moist while adding extra protein and calcium.',
      'Tossing the fresh blueberries in a teaspoon of oat flour before folding them into the batter keeps the berries suspended evenly instead of sinking to the bottom.',
    ],
    whyThisWorksEn: [
      'Greek yogurt provides natural moisture and tenderness without butter or oil.',
      'Rolled oats deliver slow-digesting beta-glucan soluble fiber.',
      'Freezes well for quick weekday breakfasts.',
    ],
    chefTipsEn: [
      'Pulse rolled oats in a blender for 15 seconds if you want to make your own fresh oat flour at home.',
      'Start baking at 200°C (400°F) for the first 5 minutes to create tall bakery domes, then lower the oven to 175°C (350°F) for the remaining 13 minutes.',
      'Cool muffins on a wire rack so the bottoms do not steam inside the tin.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Bake muffins until a tester inserted in the center comes out clean, and store cooled muffins in an airtight container in the refrigerator for up to 5 days.',
    substitutions: [
      {
        originalEn: 'Strained Plain Greek Yogurt (240g)',
        substituteEn: 'Blended Cottage Cheese or Unsweetened Applesauce',
        chefNoteEn: 'Blended cottage cheese keeps the protein content high.',
      },
      {
        originalEn: 'Fresh Blueberries (180g)',
        substituteEn: 'Frozen Wild Blueberries (do not thaw first) or Raspberries',
        chefNoteEn: 'Fold frozen berries in right before scooping so they do not streak the batter.',
      },
    ],
    faqs: [
      {
        questionEn: 'Why do you start baking muffins at a higher temperature first?',
        answerEn:
          'An initial 5-minute burst at 200°C (400°F) activates the baking powder rapidly to lift the muffin domes before the outer crust sets.',
      },
      {
        questionEn: 'How do I store and reheat oat muffins for meal prep?',
        answerEn:
          'Refrigerate in an airtight container for 5 days or freeze for 2 months. Warm for 15 seconds or toast cut halves in a skillet.',
      },
      {
        questionEn: 'Are rolled oats gluten-free?',
        answerEn:
          'Oats are naturally gluten-free, but always look for certified gluten-free oats if baking for celiac sensitivity.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 18,
    calories: 185,
    proteinGrams: 8,
    netCarbsGrams: 25,
    image: '/images/recipe_mango_cupcakes_1795527116791.jpg',
    gearItem: {
      id: 'gear-piping-kit',
      nameEn: '12-Cup Non-Stick Muffin & Cupcake Baking Pan',
      brand: 'Nordic Ware',
      priceUsd: 32,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Rolled oat flour & whole rolled oats', amount: 240, unit: 'g' },
      { item: 'Plain strained Greek yogurt', amount: 240, unit: 'g' },
      { item: 'Fresh or frozen wild blueberries', amount: 180, unit: 'g' },
      { item: 'Large eggs (2 pcs) & raw honey or maple syrup (80ml)', amount: 180, unit: 'ml' },
      { item: 'Baking powder, cinnamon, lemon zest & pinch of salt', amount: 12, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Whisk Greek Yogurt, Eggs & Honey',
        instruction:
          'Whisk Greek yogurt, eggs, honey, vanilla, and grated lemon zest in a large bowl until smooth.',
        timerSeconds: 120,
      },
      {
        title: 'Fold in Oat Flour & Blueberries',
        instruction:
          'Stir in oat flour, baking powder, cinnamon, and salt until just combined, then gently fold in the blueberries.',
        timerSeconds: 180,
      },
      {
        title: 'Bake 5 Mins at 200°C then 13 Mins at 175°C',
        instruction:
          'Divide into 12 lined muffin cups. Bake at 200°C (400°F) for 5 minutes, reduce oven temperature to 175°C (350°F), and bake 13 minutes more until golden.',
        timerSeconds: 1080,
      },
    ],
  },
  {
    id: 'brown-butter-banana-bread-pecan-loaf',
    slug: 'bakery-style-brown-butter-banana-bread-toasted-pecans',
    category: 'desserts-baking',
    subcategoryId: 'cakes-pastries',
    categoryLabelEn: 'Desserts & Baking · Cakes & Pastries',
    titleEn: 'Bakery-Style Brown Butter Banana Bread with Toasted Pecans',
    subtitleEn:
      'Moist, caramelized banana loaf made by browning unsalted butter until nutty and folding in overripe bananas, Greek yogurt, and toasted pecans.',
    wordCount: 950,
    introParagraphsEn: [
      'Browning your butter in a skillet for four minutes before mixing banana bread batter toasts the milk solids into a rich, hazelnut-like aroma that elevates ripe bananas.',
      'Combined with a spoonful of Greek yogurt and crunchy toasted pecans, this one-loaf recipe slices cleanly and stays moist for four days.',
    ],
    whyThisWorksEn: [
      'Browned butter (beurre noisette) adds deep caramel flavor without extra sugar.',
      'Using melted brown butter means no stand mixer is needed—just a whisk and bowl.',
      'Freezes well in individual slices.',
    ],
    chefTipsEn: [
      'Use heavily speckled, dark-spotted bananas, which have converted their starches into natural fruit sugars.',
      'Browning butter in a light-colored stainless skillet makes it easy to see when the milk solids turn golden amber.',
      'Tent the loaf loosely with foil after 40 minutes if the top is browning faster than the center finishes baking.',
    ],
    usdaSafetyNoteEn:
      'Food Safety Note: Bake quick breads until a thermometer inserted into the center reads 93°C–96°C (200°F–205°F), and cool completely before wrapping.',
    substitutions: [
      {
        originalEn: 'Toasted Pecans (80g)',
        substituteEn: 'Toasted Walnuts or 70% Dark Chocolate Chunks',
        chefNoteEn: 'Or omit nuts altogether for a classic nut-free banana loaf.',
      },
      {
        originalEn: 'All-Purpose Flour (240g)',
        substituteEn: '1:1 Gluten-Free Measure-for-Measure Baking Flour',
        chefNoteEn: 'Works 1:1 in banana bread batters.',
      },
    ],
    faqs: [
      {
        questionEn: 'How can I ripen green or yellow bananas quickly for baking?',
        answerEn:
          'Place unpeeled yellow bananas on a baking sheet and bake at 150°C (300°F) for 15 to 20 minutes until the skins turn dark and the fruit softens. Cool before mashing.',
      },
      {
        questionEn: 'How do I store banana bread so it does not dry out?',
        answerEn:
          'Wrap cooled banana bread tightly in parchment and store in an airtight container at cool room temperature for 3 days or in the refrigerator for 6 days.',
      },
      {
        questionEn: 'Can I freeze individual slices of banana bread?',
        answerEn:
          'Yes! Place parchment squares between slices, seal in a freezer bag for up to 3 months, and toast slices directly from frozen.',
      },
    ],
    stepGalleryImages: [
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 12,
    cookMinutes: 50,
    calories: 295,
    proteinGrams: 6,
    netCarbsGrams: 36,
    image: '/images/action_piping_cupcake_swirl_1795530073426.jpg',
    gearItem: {
      id: 'gear-piping-kit',
      nameEn: '9x5-Inch Heavy-Gauge Aluminized Steel Loaf Pan',
      brand: 'Nordic Ware',
      priceUsd: 26,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Mashed overripe spotted bananas (about 3 large)', amount: 340, unit: 'g' },
      { item: 'Unsalted butter, browned & cooled slightly', amount: 115, unit: 'g' },
      { item: 'All-purpose flour, baking soda & cinnamon', amount: 245, unit: 'g' },
      { item: 'Dark brown sugar (130g), eggs (2 pcs) & Greek yogurt (60g)', amount: 290, unit: 'g' },
      { item: 'Coarsely chopped toasted pecans', amount: 80, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Brown the Butter & Mash Bananas',
        instruction:
          'Melt butter in a skillet over medium heat for 4 minutes, swirling until nutty amber brown specks form. Cool for 5 minutes, then whisk with mashed bananas, brown sugar, eggs, and yogurt.',
        timerSeconds: 300,
      },
      {
        title: 'Fold in Flour & Toasted Pecans',
        instruction:
          'Gently fold in flour, baking soda, cinnamon, salt, and toasted pecans with a spatula just until no dry flour streaks remain.',
        timerSeconds: 180,
      },
      {
        title: 'Bake at 175°C (350°F) for 50 Minutes',
        instruction:
          'Pour into a parchment-lined 9x5-inch loaf pan and bake at 175°C (350°F) for 50 to 55 minutes until a toothpick comes out clean.',
        timerSeconds: 3000,
      },
    ],
  },
  {
    id: 'freezer-meal-prep-guide-soups-grains-proteins',
    slug: 'ultimate-freezer-meal-prep-guide-how-to-freeze-and-thaw-cooked-food',
    category: 'kitchen-hacks',
    subcategoryId: 'meal-prep-guides',
    categoryLabelEn: 'Kitchen Hacks & Guides · Meal Prep Guides',
    titleEn: 'Complete Freezer Meal-Prep Handbook: Packaging, Shelf Life & Safe Thawing',
    subtitleEn:
      'Learn how to portion, freeze, and thaw cooked proteins, grains, sauces, and soups without freezer burn or texture loss.',
    wordCount: 1140,
    introParagraphsEn: [
      'A well-organized home freezer acts as an on-demand weeknight pantry. When cooked grains, braised meats, and skillet sauces are cooled rapidly and packaged with minimal headspace air, they retain their fresh flavor for two to three months at -18°C (0°F).',
      'This guide covers which foods freeze best, how to prevent ice-crystal freezer burn, and the three USDA-approved ways to thaw frozen meals safely.',
    ],
    whyThisWorksEn: [
      'Eliminating trapped air prevents ice sublimation (freezer burn).',
      'Freezing flat in portioned bags or stackable glass containers cuts thawing time in half.',
      'Follows official USDA cold-chain and thawing safety standards.',
    ],
    chefTipsEn: [
      'Cool cooked soups, rice, and proteins to room temperature within 60 to 90 minutes before placing them in the freezer so they do not warm neighboring frozen items.',
      'Leave 2cm (3/4 inch) of expansion headspace at the top of glass freezer jars when freezing liquids or soups.',
      'Label every container with a piece of painter’s tape showing the dish name, date frozen, and reheating instructions.',
    ],
    usdaSafetyNoteEn:
      'USDA Safe Thawing Rule: Never thaw frozen food at room temperature on the counter. Thaw safely in the refrigerator at 4°C (40°F), submerged in cold tap water changed every 30 minutes, or directly during cooking/reheating to 74°C (165°F).',
    substitutions: [
      {
        originalEn: 'Russet Potatoes in Freezer Soups',
        substituteEn: 'Sweet Potatoes, White Beans, Chickpeas, or Pearl Barley',
        chefNoteEn: 'High-starch white potatoes can turn grainy when frozen; beans and sweet potatoes hold their texture.',
      },
      {
        originalEn: 'Heavy Cream Added Before Freezing',
        substituteEn: 'Freeze soup base without dairy, then stir in cream during reheating',
        chefNoteEn: 'Prevents dairy emulsions from separating during thawing.',
      },
    ],
    faqs: [
      {
        questionEn: 'How long does cooked food stay safe in the freezer at -18°C (0°F)?',
        answerEn:
          'Food kept continuously frozen at -18°C (0°F) remains safe indefinitely, and maintains peak culinary quality for 2 to 3 months for cooked meats/poultry and 3 to 4 months for soups and sauces.',
      },
      {
        questionEn: 'Can I put glass meal-prep containers in the freezer?',
        answerEn:
          'Yes, tempered or borosilicate glass containers are freezer-safe as long as you cool the food first and leave 2cm of top headspace for liquid expansion.',
      },
      {
        questionEn: 'Can I refreeze meat or meals after thawing them in the refrigerator?',
        answerEn:
          'According to the USDA, food thawed safely inside the refrigerator at 4°C (40°F) can be safely refrozen, though cooking raw thawed meat before refreezing preserves the best texture.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 15,
    cookMinutes: 30,
    calories: 420,
    proteinGrams: 35,
    netCarbsGrams: 26,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-glass-prep-set',
      nameEn: '10-Piece Freezer-to-Oven Borosilicate Glass Container Set',
      brand: 'Pyrex Culinary',
      priceUsd: 68,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Cooked batch proteins (shredded chicken, turkey, or beef)', amount: 1000, unit: 'g' },
      { item: 'Cooked grains (jasmine rice, quinoa, or farro)', amount: 600, unit: 'g' },
      { item: 'Simmered tomato or bone-broth sauce bases', amount: 500, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Rapid Shallow-Tray Cooling (Under 60 Minutes)',
        instruction:
          'Spread freshly cooked grains and proteins on clean sheet pans to cool rapidly before packaging.',
        timerSeconds: 600,
      },
      {
        title: 'Portion with Minimal Air Headspace & Label',
        instruction:
          'Pack single-meal portions into freezer-safe glass containers (leaving 2cm headspace for liquids) and label with the date.',
        timerSeconds: 300,
      },
      {
        title: 'Freeze at -18°C (0°F) & Thaw in Refrigerator at 4°C',
        instruction:
          'Freeze flat at -18°C (0°F). Move desired portions to the 4°C refrigerator the night before eating and reheat to 74°C (165°F).',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'knife-skills-and-cutting-board-safety-guide',
    slug: 'essential-chef-knife-skills-honing-and-cutting-board-food-safety',
    category: 'kitchen-hacks',
    subcategoryId: 'cooking-tips',
    categoryLabelEn: 'Kitchen Hacks & Guides · Cooking Tips',
    titleEn: 'Chef Knife Skills, Honing vs. Sharpening & Cutting Board Food Safety',
    subtitleEn:
      'Cut prep time in half with the claw grip, uniform vegetable dicing, daily honing rod alignment, and USDA cross-contamination prevention.',
    wordCount: 1060,
    introParagraphsEn: [
      'A sharp 8-inch chef knife is the single most important tool in a home kitchen. Dull blades slip off onion and tomato skins, whereas a properly honed edge slices cleanly with minimal downward force.',
      'This guide covers the pinch grip and claw guide-hand technique, why uniform vegetable cuts ensure even roasting, and how to separate cutting boards for raw proteins and ready-to-eat produce.',
    ],
    whyThisWorksEn: [
      'Uniform 1.5cm or 2cm vegetable cuts finish roasting at the exact same minute.',
      'Anchoring your cutting board with a damp towel prevents slipping on countertops.',
      'Separate boards for raw poultry/meat and fresh produce prevent cross-contamination.',
    ],
    chefTipsEn: [
      'Place a damp paper towel or thin silicone mat underneath your wooden or plastic cutting board so it never slides while chopping.',
      'Use a honing steel for 15 seconds before each cooking session to realign the microscopic edge of your chef knife.',
      'Always scrape chopped ingredients off the board using the flat spine (back) of your knife rather than the sharp cutting edge.',
    ],
    usdaSafetyNoteEn:
      'USDA Cross-Contamination Guideline: Always use separate cutting boards for raw meat/poultry/seafood and fresh produce, and wash boards, knives, and hands thoroughly with hot soapy water after handling raw proteins.',
    substitutions: [
      {
        originalEn: '8-Inch Western Chef Knife',
        substituteEn: '7-Inch Japanese Santoku Knife',
        chefNoteEn: 'A Santoku blade is lighter and great for thin, precise vegetable slicing.',
      },
      {
        originalEn: 'End-Grain Maple Cutting Board (for Produce)',
        substituteEn: 'Dishwasher-Safe High-Density Polyethylene Board (for Raw Poultry)',
        chefNoteEn: 'Keep a dedicated dishwasher-safe board specifically for raw poultry and meat.',
      },
    ],
    faqs: [
      {
        questionEn: 'What is the difference between honing a knife and sharpening a knife?',
        answerEn:
          'Honing with a steel rod realigns a bent microscopic blade edge between uses without removing metal; sharpening on a whetstone (every 3 to 6 months) grinds a brand-new bevel edge.',
      },
      {
        questionEn: 'Should I put my chef knives in the dishwasher?',
        answerEn:
          'Never put chef knives in the dishwasher—high-pressure jets knock the blade edge against racks and harsh detergents dull high-carbon steel. Hand-wash and dry immediately.',
      },
      {
        questionEn: 'How do I dice an onion without crying?',
        answerEn:
          'Use a sharp knife (which crushes fewer cells), chill the onion for 15 minutes before cutting, and leave the root end intact while making horizontal and vertical cuts.',
      },
    ],
    stepGalleryImages: [
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
    ],
    authorName: 'CookReel Editorial Team',
    authorRoleEn: 'CookReel Culinary Contributors',
    prepMinutes: 10,
    cookMinutes: 0,
    calories: 120,
    proteinGrams: 4,
    netCarbsGrams: 18,
    image: '/images/hero_cookreel_studio_1795527112508.jpg',
    gearItem: {
      id: 'gear-damascus-knife',
      nameEn: '8-Inch Japanese 67-Layer Damascus Chef Knife',
      brand: 'Shun Premier',
      priceUsd: 175,
      affiliateStore: 'Williams Sonoma',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Yellow onions, carrots & celery stalks (Mirepoix practice)', amount: 450, unit: 'g' },
      { item: 'Fresh parsley & cilantro bunches', amount: 60, unit: 'g' },
      { item: 'Food-grade mineral oil (for wooden cutting board maintenance)', amount: 15, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Anchor the Cutting Board & Hone the Blade',
        instruction:
          'Lay a damp paper towel flat on the counter, set your cutting board on top, and draw your chef knife 5 times per side along a honing rod at a 15-degree angle.',
        timerSeconds: 90,
      },
      {
        title: 'Pinch Grip & Claw Guide Hand',
        instruction:
          'Pinch the blade heel between thumb and forefinger, curl your non-dominant fingertips inward like a claw with knuckles guiding the flat side of the blade.',
        timerSeconds: 180,
      },
      {
        title: 'Uniform Dice & Immediate Hand-Wash',
        instruction:
          'Slice vegetables into uniform 1.5cm cubes for even cooking, then hand-wash and dry your chef knife immediately.',
        timerSeconds: 120,
      },
    ],
  },
];

export type CookingQaTopic =
  | 'all'
  | 'meal_prep'
  | 'substitutions'
  | 'heat_skillet'
  | 'reheating_safety';

export interface CookingQaItem {
  id: string;
  topic: Exclude<CookingQaTopic, 'all'>;
  topicLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  proMetric: string;
  relatedRecipeId: string;
}

export const COOKING_AND_MEAL_PREP_QA: CookingQaItem[] = [
  {
    id: 'qa-1',
    topic: 'meal_prep',
    topicLabel: 'Meal Prep & Storage',
    question:
      'How do I keep meal-prepped chicken and roasted vegetables from getting soggy in the fridge?',
    shortAnswer:
      'Cook poultry to the safe USDA 74°C (165°F) temperature, vent steam uncovered for 20 minutes before sealing lids, and pack sauces separately.',
    detailedAnswer:
      'Sealing container lids while food is still hot traps water vapor that condenses on the underside of the lid and rains back onto your roasted vegetables. Always let cooked proteins and sheet-pan vegetables cool uncovered for 20 minutes, then seal in airtight glass containers and refrigerate at 4°C (39°F) or colder within 2 hours.',
    proMetric: 'USDA 74°C Poultry · 20-Min Steam Vent · 4°C Fridge',
    relatedRecipeId: 'sunday-meal-prep-high-protein-bowls',
  },
  {
    id: 'qa-2',
    topic: 'meal_prep',
    topicLabel: 'Meal Prep & Storage',
    question:
      'What is the best way to store fresh herbs (cilantro, parsley, basil) so they stay crisp for up to 2 weeks?',
    shortAnswer:
      'Store cilantro and parsley upright in a jar with 2cm cold water in the fridge; keep fresh basil at room temperature out of direct sun.',
    detailedAnswer:
      'Trim 1cm off the bottom stems of parsley or cilantro, ensure the leaves are completely dry, place upright in a jar with 2cm of water, and cover loosely in the refrigerator. Because basil is a cold-sensitive tropical herb that develops dark spots below 10°C, keep basil stems in water on the kitchen counter.',
    proMetric: '10–14 Day Shelf Life · Dry Leaves + 2cm Stem Water',
    relatedRecipeId: 'cooking-science-temperatures-deglazing-guide',
  },
  {
    id: 'qa-3',
    topic: 'meal_prep',
    topicLabel: 'Meal Prep & Storage',
    question:
      'Which cooked foods freeze well for monthly meal prep and which foods should not be frozen?',
    shortAnswer:
      'Cooked meats, tomato sauces, grains, and unfrosted baked goods freeze well at -18°C for 2–3 months; avoid freezing raw lettuce or plain dairy emulsions.',
    detailedAnswer:
      'High-water raw vegetables (lettuce, cucumbers) and un-stabilized cream sauces lose their structure when ice crystals expand. Freeze cooked rice, cooked poultry/beef, bean stews, and tomato-based sauces like shakshuka in airtight containers with minimal air headspace.',
    proMetric: '-18°C (0°F) Freezer · 2 to 3 Months Quality',
    relatedRecipeId: 'freezer-meal-prep-guide-soups-grains-proteins',
  },
  {
    id: 'qa-4',
    topic: 'substitutions',
    topicLabel: 'Ingredient Swaps',
    question:
      'What can I use instead of heavy whipping cream in pasta sauces, soups, or curries?',
    shortAnswer:
      'Whisk 180ml whole milk with 60g melted unsalted butter (plus 1 tsp cornstarch if simmering), or substitute full-fat canned coconut cream 1:1.',
    detailedAnswer:
      'Heavy whipping cream contains roughly 36% milkfat. Combining 180ml (3/4 cup) whole milk with 60g (1/4 cup) melted unsalted butter restores that fat-to-liquid ratio. For Italian pasta dishes like tagliatelle, emulsifying starchy pasta water with butter and finely grated Parmigiano off the heat creates a creamy sauce without cream.',
    proMetric: '1:1 Ratio · 180ml Whole Milk + 60g Melted Butter',
    relatedRecipeId: 'truffle-tagliatelle-pasta',
  },
  {
    id: 'qa-5',
    topic: 'substitutions',
    topicLabel: 'Ingredient Swaps',
    question:
      'How do I make a quick 5-minute buttermilk substitute for baking cakes, cupcakes, or muffins?',
    shortAnswer:
      'Stir 1 tablespoon (15ml) fresh lemon juice or white vinegar into 225ml warm whole milk and let stand for 5 minutes.',
    detailedAnswer:
      'The mild acidity reacts with baking soda to create lift while tenderizing gluten strands. Measure 15ml of lemon juice or white vinegar into a measuring cup, add whole milk to the 240ml (1 cup) mark, and wait 5 minutes until slightly thickened.',
    proMetric: '15ml Acid + 225ml Whole Milk · 5-Min Rest',
    relatedRecipeId: 'tropical-mango-berry-swirl-cupcakes',
  },
  {
    id: 'qa-6',
    topic: 'substitutions',
    topicLabel: 'Ingredient Swaps',
    question:
      'What is the conversion ratio when swapping fresh herbs for dried herbs in cooking?',
    shortAnswer:
      'Follow the 3-to-1 Rule: use 1 teaspoon (5ml) of dried herbs for every 1 tablespoon (15ml) of fresh chopped herbs.',
    detailedAnswer:
      'Drying removes moisture and concentrates aromatic oils, making dried rosemary, thyme, and oregano three times stronger by volume than fresh leaves. Add dried herbs early in cooking so they rehydrate; add fresh herbs at the very end.',
    proMetric: '3:1 Fresh-to-Dried Ratio (15ml Fresh = 5ml Dried)',
    relatedRecipeId: 'kitchen-guide-substitutes-cast-iron',
  },
  {
    id: 'qa-7',
    topic: 'heat_skillet',
    topicLabel: 'Heat, Skillets & Air Fryer',
    question:
      'How do I stop salmon skin, chicken, or steak from sticking to a cast-iron or stainless-steel skillet?',
    shortAnswer:
      'Preheat the dry pan until a water droplet glides, add oil, pat the protein completely dry with paper towels, and sear undisturbed.',
    detailedAnswer:
      'When a dry metal skillet reaches the Leidenfrost temperature (~193°C), a drop of water glides across the surface instead of sputtering. Add high-smoke-point oil, place bone-dry protein into the pan, and wait 4 to 6 minutes for a golden crust to form before flipping.',
    proMetric: 'Preheat Dry Pan · Bone-Dry Protein Surface',
    relatedRecipeId: 'crispy-salmon-skillet',
  },
  {
    id: 'qa-8',
    topic: 'heat_skillet',
    topicLabel: 'Heat, Skillets & Air Fryer',
    question:
      'How do I convert a conventional oven recipe into an Air Fryer recipe?',
    shortAnswer:
      'Reduce the oven temperature by 15°C (25°F) and reduce the total cooking time by about 20%.',
    detailedAnswer:
      'Countertop Air Fryers circulate hot air rapidly in a compact chamber. If an oven recipe calls for 215°C (425°F) for 30 minutes, set your Air Fryer to 200°C (400°F) for 22 to 24 minutes and verify doneness with a food thermometer.',
    proMetric: '-15°C (-25°F) Temp · -20% Cooking Time',
    relatedRecipeId: 'lemon-herb-roasted-chicken',
  },
  {
    id: 'qa-9',
    topic: 'heat_skillet',
    topicLabel: 'Heat, Skillets & Air Fryer',
    question:
      'What are the official USDA safe minimum internal temperatures for poultry, beef, pork, and salmon?',
    shortAnswer:
      'USDA Safe Minimums: All Poultry 74°C (165°F) · Ground Beef/Pork 71°C (160°F) · Whole Beef/Pork Steaks & Chops 63°C (145°F + 3-min rest) · Salmon/Fish 63°C (145°F).',
    detailedAnswer:
      'Using a digital instant-read food thermometer inserted into the thickest center of the food is the only reliable way to verify both food safety and juiciness. Always allow whole cuts of beef and pork to rest for 3 minutes after reaching 63°C (145°F).',
    proMetric: 'Poultry 74°C (165°F) · Beef/Pork/Fish 63°C (145°F)',
    relatedRecipeId: 'cooking-science-temperatures-deglazing-guide',
  },
  {
    id: 'qa-10',
    topic: 'reheating_safety',
    topicLabel: 'Defrosting & Reheating',
    question:
      'What is the fastest USDA-approved way to defrost frozen chicken, steak, or fish safely?',
    shortAnswer:
      'Submerge the leak-proof sealed package in cold tap water (changing water every 30 minutes), or thaw overnight in the refrigerator at 4°C.',
    detailedAnswer:
      'Never thaw raw meat or fish at room temperature on the kitchen counter. A cold tap-water bath conducts heat rapidly and safely thaws a 450g package of meat or fish in 20 to 30 minutes while keeping the surface out of the bacterial danger zone. Cook immediately after cold-water thawing.',
    proMetric: 'Cold Tap Water Bath · Cook Immediately After Thawing',
    relatedRecipeId: '15-minute-garlic-shrimp-zucchini-skillet',
  },
  {
    id: 'qa-11',
    topic: 'reheating_safety',
    topicLabel: 'Defrosting & Reheating',
    question:
      'How do I reheat leftover cooked salmon, steak, or crispy chicken without drying it out?',
    shortAnswer:
      'Reheat in an Air Fryer at 175°C (350°F) for 3–5 minutes or in a covered skillet over medium-low heat with a splash of broth.',
    detailedAnswer:
      'High-power microwaves heat unevenly and soften crispy skin. Warming leftovers in a 175°C (350°F) Air Fryer or covered skillet restores crisp edges while bringing leftovers safely back up to reheating temperature.',
    proMetric: '175°C (350°F) Air Fryer or Covered Skillet',
    relatedRecipeId: 'lemon-herb-roasted-chicken',
  },
  {
    id: 'qa-12',
    topic: 'reheating_safety',
    topicLabel: 'Defrosting & Reheating',
    question:
      'How do I store and reheat cooked rice or pasta for meal prep safely?',
    shortAnswer:
      'Cool cooked rice rapidly on a flat plate, refrigerate at 4°C within 1 hour of cooking, and consume within 3 to 4 days.',
    detailedAnswer:
      'To prevent heat-resistant Bacillus cereus spores from growing in warm cooked starch, never leave cooked rice sitting at room temperature. Cool it promptly, store in a shallow container at 4°C (39°F), and reheat thoroughly to 74°C (165°F) with 1 tablespoon of water.',
    proMetric: 'Refrigerate Within 60 Mins at 4°C · Reheat to 74°C',
    relatedRecipeId: 'sunday-meal-prep-high-protein-bowls',
  },
  {
    id: 'qa-13',
    topic: 'substitutions',
    topicLabel: 'Ingredient Swaps',
    question:
      'How do I make cake flour at home using regular all-purpose flour?',
    shortAnswer:
      'For every 120g (1 cup) of all-purpose flour, remove 2 tablespoons (15g) of flour and replace with 2 tablespoons (15g) of cornstarch, then sift twice.',
    detailedAnswer:
      'All-purpose flour has 10% to 12% gluten protein, while cake flour has only 7% to 8%. Blending in cornstarch dilutes gluten formation so cupcakes and sponge cakes bake up light and tender.',
    proMetric: '105g All-Purpose Flour + 15g Cornstarch per Cup',
    relatedRecipeId: 'tropical-mango-berry-swirl-cupcakes',
  },
  {
    id: 'qa-14',
    topic: 'heat_skillet',
    topicLabel: 'Heat, Skillets & Air Fryer',
    question:
      'How do I clean burnt-on browned bits from an enameled or seasoned cast-iron skillet without damaging it?',
    shortAnswer:
      'Simmer 120ml water in the warm skillet for 2 minutes and scrape gently with a flat wooden spatula to lift stuck fond.',
    detailedAnswer:
      'De-glazing the pan with warm water right after cooking dissolves caramelized proteins effortlessly. For enameled cast iron, a paste of baking soda and warm water removes stubborn brown stains without scratching the porcelain enamel.',
    proMetric: '2-Min Warm Water Simmer + Wooden Spatula',
    relatedRecipeId: 'kitchen-guide-substitutes-cast-iron',
  },
  {
    id: 'qa-15',
    topic: 'meal_prep',
    topicLabel: 'Meal Prep & Storage',
    question:
      'How do I keep washed salad greens and spinach fresh in the fridge all week without turning slimy?',
    shortAnswer:
      'Spin greens bone-dry in a salad spinner and store in a rigid container lined top and bottom with dry paper towels.',
    detailedAnswer:
      'Surface moisture on bruised leaves accelerates decay. Lining a glass or BPA-free container with dry paper towels absorbs condensation and keeps washed spinach and romaine crisp for 7 to 10 days.',
    proMetric: 'Spin Dry + Paper Towel Liner · 4°C Crisper Drawer',
    relatedRecipeId: '15-minute-Mediterranean-chickpea-feta-skillet',
  },
  {
    id: 'qa-16',
    topic: 'reheating_safety',
    topicLabel: 'Defrosting & Reheating',
    question:
      'What is the "2-Hour Rule" for food safety when serving meals or cooling meal-prep batches?',
    shortAnswer:
      'Never leave cooked food or perishable groceries in the temperature danger zone (4°C to 60°C / 40°F to 140°F) for more than 2 hours (1 hour if above 32°C).',
    detailedAnswer:
      'Bacteria double in number in as little as 20 minutes between 4°C and 60°C. Divide large pots of soup or batch-cooked grains into shallow containers so they cool rapidly in the refrigerator.',
    proMetric: 'Max 2 Hours at Room Temp · Danger Zone 4°C–60°C',
    relatedRecipeId: 'freezer-meal-prep-guide-soups-grains-proteins',
  },
];

export type CookingQATopic =
  | 'meal_prep_storage'
  | 'cooking_science'
  | 'ingredient_substitutions'
  | 'air_fryer_equipment';

export interface CookingQAItem {
  id: string;
  topic: CookingQATopic;
  topicLabelEn: string;
  questionEn: string;
  shortAnswerEn: string;
  detailedStepsEn: string[];
  proTipEn: string;
  relatedRecipeSlug?: string;
}

export const QA_TOPIC_LABELS: { id: 'all' | CookingQATopic; labelEn: string }[] = [
  { id: 'all', labelEn: 'All Cooking & Prep Topics' },
  { id: 'meal_prep_storage', labelEn: 'Meal Prep & Food Storage' },
  { id: 'cooking_science', labelEn: 'Cooking Science & USDA Temps' },
  { id: 'ingredient_substitutions', labelEn: '1:1 Ingredient Substitutions' },
  { id: 'air_fryer_equipment', labelEn: 'Air Fryer & Skillet Techniques' },
];

const TOPIC_MAP: Record<Exclude<CookingQaTopic, 'all'>, CookingQATopic> = {
  meal_prep: 'meal_prep_storage',
  substitutions: 'ingredient_substitutions',
  heat_skillet: 'air_fryer_equipment',
  reheating_safety: 'cooking_science',
};

export const COOKING_QA_KNOWLEDGE_BASE: CookingQAItem[] =
  COOKING_AND_MEAL_PREP_QA.map((item) => {
    const matchedRecipe = COOKREEL_RECIPES.find(
      (r) => r.id === item.relatedRecipeId
    );
    return {
      id: item.id,
      topic: TOPIC_MAP[item.topic],
      topicLabelEn: item.topicLabel,
      questionEn: item.question,
      shortAnswerEn: item.shortAnswer,
      detailedStepsEn: [item.detailedAnswer],
      proTipEn: item.proMetric,
      relatedRecipeSlug:
        matchedRecipe?.slug || '15-minute-crispy-cast-iron-salmon-lemon-caper',
    };
  });

export const MEAL_PLAN_DAYS = [
  {
    dayEn: 'Monday',
    lunchEn: 'Mediterranean Chickpea, Spinach & Feta Bowl',
    dinnerEn: '15-Minute Crispy Cast-Iron Salmon with Lemon Caper Butter',
    totalKcal: 890,
    prepTime: '20m',
  },
  {
    dayEn: 'Tuesday',
    lunchEn: 'Leftover Flaked Salmon & Quinoa Power Salad',
    dinnerEn: 'Air Fryer Crispy Lemon Herb Chicken Thighs',
    totalKcal: 920,
    prepTime: '25m',
  },
  {
    dayEn: 'Wednesday',
    lunchEn: 'High-Protein Lemon Herb Chicken & Roasted Broccoli Box',
    dinnerEn: '15-Minute Garlic Lemon Shrimp & Crisp Zucchini Skillet',
    totalKcal: 860,
    prepTime: '18m',
  },
  {
    dayEn: 'Thursday',
    lunchEn: 'Keto Creamy Tuscan Garlic Chicken with Baby Spinach',
    dinnerEn: 'Keto Garlic Butter Cast-Iron Ribeye Steak',
    totalKcal: 1120,
    prepTime: '22m',
  },
  {
    dayEn: 'Friday',
    lunchEn: '15-Minute Low-Carb Shrimp & Egg Cauliflower Fried Rice',
    dinnerEn: '5-Ingredient Creamy Black Truffle & Parmigiano Tagliatelle',
    totalKcal: 980,
    prepTime: '20m',
  },
  {
    dayEn: 'Saturday',
    lunchEn: 'One-Skillet Mediterranean Spiced Tomato Shakshuka',
    dinnerEn: '5-Ingredient Pan-Seared Honey Mustard Pork Medallions',
    totalKcal: 840,
    prepTime: '24m',
  },
  {
    dayEn: 'Sunday',
    lunchEn: 'Sunday High-Protein 4-Day Meal-Prep Batch Assembly',
    dinnerEn: '12-Minute Air Fryer Honey Garlic Salmon Bites & Broccoli',
    totalKcal: 925,
    prepTime: '45m',
  },
];

export const LEGACY_CATEGORY_SLUG_MAP: Record<string, PrimaryCategorySlug> = {
  quick_easy: 'quick-easy',
  'quick-easy': 'quick-easy',
  healthy_diet: 'healthy-diet',
  'healthy-diet': 'healthy-diet',
  desserts_baking: 'desserts-baking',
  'desserts-baking': 'desserts-baking',
  kitchen_hacks: 'kitchen-hacks',
  'kitchen-hacks': 'kitchen-hacks',
};

export function normalizeCategorySlug(
  rawSlug: string
): PrimaryCategorySlug | null {
  const cleaned = (rawSlug || '').trim().toLowerCase();
  return LEGACY_CATEGORY_SLUG_MAP[cleaned] || null;
}

export const LEGACY_RECIPE_SLUG_ALIASES: Record<string, string> = {
  'keto-garlic-herb-butter-ribeye-steak-cast-iron':
    'keto-garlic-herb-butter-ribeye-steak-high-protein',
  'air-fryer-crispy-lemon-herb-chicken-thighs':
    'air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
  'complete-baking-cooking-ingredient-substitutions-guide':
    'ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide',
  'sunday-high-protein-meal-prep-blueprint':
    '60-minute-sunday-meal-prep-guide-5-high-protein-lunches',
  'mango-strawberry-sunset-cupcakes':
    'tropical-mango-berry-swirl-vanilla-bean-cupcakes',
};

export function findRecipeBySlug(
  rawSlug: string,
  recipeList: CulinaryRecipe[] = COOKREEL_RECIPES
): CulinaryRecipe | undefined {
  const cleaned = (rawSlug || '').trim().toLowerCase();
  const canonicalSlug = LEGACY_RECIPE_SLUG_ALIASES[cleaned] || cleaned;
  return (
    recipeList.find((r) => r.slug === canonicalSlug) ||
    recipeList.find((r) => r.id === canonicalSlug)
  );
}


