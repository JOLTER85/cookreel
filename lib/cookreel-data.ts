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
  editorialGuideParagraphsEn: string[];
  featuredRecipeSlugs: string[];
  subcategories: SubcategoryMeta[];
}

export interface AuthorProfile {
  name: string;
  slug: string;
  yearsExperience: number;
  roleEn: string;
  credentialsEn: string;
  bioEn: string;
  specialtyEn: string;
  testingProtocolEn: string;
}

export const AUTHOR_PROFILES: Record<string, AuthorProfile> = {
  'Marcus Vance': {
    name: 'Marcus Vance',
    slug: 'marcus-vance',
    yearsExperience: 14,
    roleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    credentialsEn: '14 Years Commercial Kitchen & Skillet Recipe Development · ServSafe Food Protection Manager',
    bioEn:
      'Marcus Vance leads savory skillet, cast-iron searing, and high-protein weeknight recipe development at CookReel. After working on hot-line sauté and grill stations in Seattle and Chicago bistros, he specializes in translating commercial heat control, pan deglazing, and USDA temperature standards into repeatable 15-to-25-minute home kitchen methods.',
    specialtyEn: 'Cast-Iron Searing, Pan Emulsions & High-Protein Dinners',
    testingProtocolEn:
      'Every skillet and Air Fryer recipe is tested at least 3 times using standard home induction and gas burners, gram-scale measurements, and calibrated digital instant-read thermometers.',
  },
  'Elena Rostova': {
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    yearsExperience: 10,
    roleEn: 'Senior Recipe Developer & Food Science Editor',
    credentialsEn: 'B.S. Food Science & Culinary Nutrition · 10 Years Pastry, Emulsion & Meal-Prep Testing',
    bioEn:
      'Elena Rostova oversees baking chemistry, 1:1 ingredient substitution ratios, plant-forward Mediterranean recipes, and 4-day refrigerated meal-prep testing at CookReel. She verifies gram-to-US-cup conversions, starch-lipid pasta emulsions, and USDA FoodData Central macronutrient calculations across our recipe archive.',
    specialtyEn: 'Baking Science, 5-Ingredient Pasta Emulsions & Meal-Prep Storage',
    testingProtocolEn:
      'All baking ratios, substitution swaps, and meal-prep storage timelines are validated across multiple multi-day refrigeration and reheating cycles at 4°C (39°F).',
  },
};

export function getAuthorProfile(authorName: string): AuthorProfile {
  const cleaned = (authorName || '').replace(/^Chef\s+/i, '').trim();
  return AUTHOR_PROFILES[cleaned] || AUTHOR_PROFILES['Marcus Vance'];
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
  targetKeywordEn?: string;
  shortVideoConceptEn?: string;
  publishedMonthLabelEn?: string;
  internalLinks?: { slug: string; titleEn: string; contextEn: string }[];
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

export const SITE_ORIGIN = 'https://cookreel.com';
export const HERO_FEATURED_VIDEO_URL = '/media-clips/hero-cookreel-featured.mp4';

/**
 * Verified sharing & bookmarking channels for CookReel.com
 * (Does not point to unclaimed third-party social handles)
 */
export const SOCIAL_LINKS = [
  {
    name: 'Pin to Pinterest',
    platform: 'Pin to Pinterest',
    url: 'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fcookreel.com&media=https%3A%2F%2Fcookreel.com%2Fimages%2Fhero_cookreel_studio_1795527112508.jpg&description=CookReel%20Step-by-Step%20Video%20Recipes%20%26%20Culinary%20Guides',
    handle: 'Save Recipe Pin',
  },
  {
    name: 'Share on WhatsApp',
    platform: 'Share on WhatsApp',
    url: 'https://api.whatsapp.com/send?text=CookReel%20Step-by-Step%20Video%20Recipes%20https%3A%2F%2Fcookreel.com',
    handle: 'Send to Kitchen',
  },
  {
    name: 'Share on Facebook',
    platform: 'Share on Facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcookreel.com',
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
      'Weeknight dinners ready in 10 to 25 minutes—featuring crispy air fryer favorites, one-pan cast-iron skillets, and streamlined 5-ingredient meals.',
    editorialGuideParagraphsEn: [
      'Cooking a scratch dinner on a busy weeknight does not require compromising on crust development, pan sauces, or food safety. In our Quick & Easy culinary section, every recipe is engineered around three time-saving principles: high-surface-area cutting (such as slicing poultry into thin 1.5cm cutlets or cubing potatoes to 1.5cm), single-vessel heat transfer in a preheated cast-iron skillet or countertop Air Fryer, and 60-second pan deglazing that turns browned fond into a glossy emulsion while keeping cleanup to a single pan.',
      'Whether you only have five pantry staples for an Italian starch-emulsified tagliatelle or fifteen minutes to sear crispy-skin Atlantic salmon with Meyer lemon caper butter, each guide includes both metric gram weights and US cup/ounce equivalents, step-by-step interactive countdown timers, and official USDA safe internal temperature checkpoints. Start with our reader-favorite weeknight staples below or filter by 15-Minute Meals, 5-Ingredient Recipes, or Air Fryer Techniques.',
    ],
    featuredRecipeSlugs: [
      '15-minute-crispy-cast-iron-salmon-lemon-caper',
      '5-ingredient-tagliatelle-black-truffle-butter-parmigiano',
      'air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
      'one-pan-lemon-garlic-chicken-dinner-in-15-minutes',
    ],
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
      'Nutrient-dense recipes with USDA FoodData Central macro profiles—covering Keto, low-carb, high-protein, and plant-forward Mediterranean meals.',
    editorialGuideParagraphsEn: [
      'Sustainable healthy cooking relies on bold culinary technique rather than bland steamed ingredients. Our Healthy & Diet collection pairs complete macronutrient transparency—calculated from USDA FoodData Central ingredient weights for calories, complete protein, and net carbohydrates—with restaurant-level searing, spice blooming, and herb-infused pan reductions. From zero-carb garlic herb butter ribeye steaks to fiber-rich Mediterranean poached eggs in spiced tomato shakshuka and 20-minute red lentil soup, every dish is built to keep you satisfied.',
      'For readers preparing multi-day lunches, our high-protein and plant-forward recipes are specifically tested for 4-day refrigerator stability at 4°C (39°F), including steam-venting instructions and Air Fryer or covered-skillet reheating rules so lean proteins and crisp vegetables never turn rubbery or waterlogged. Explore our top-tested Keto, High-Protein, and Vegan & Vegetarian guides below.',
    ],
    featuredRecipeSlugs: [
      'keto-garlic-herb-butter-ribeye-steak-high-protein',
      'mediterranean-poached-eggs-spiced-tomato-pepper-shakshuka',
      'quick-15-minute-red-lentil-soup-with-lemon-and-cumin',
      'november-high-protein-white-bean-kale-roasted-garlic-soup',
    ],
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
      'Precision-tested cakes, swirled vanilla bean cupcakes, effortless no-bake treats, and naturally sweetened wholesome desserts.',
    editorialGuideParagraphsEn: [
      'Successful home baking comes down to accurate ingredient ratios, temperature control, and moisture balance. In our Desserts & Baking archive, Food Science Editor Elena Rostova develops every recipe using exact gram weights alongside US cup and ounce conversions so your batters and emulsions turn out consistently whether you are whipping a two-tone Alfonso mango and freeze-dried strawberry buttercream or pressing a no-bake 70% dark chocolate ganache tart into a toasted walnut shell.',
      'We also focus on practical weeknight and seasonal baking—such as our 25-minute cast-iron skillet Honeycrisp apple pecan crisp that jump-starts fruit tenderizing on the stovetop in foaming cinnamon butter, and one-bowl blanched almond flour cookies that require zero mixer setup. Each recipe includes verified dairy-free, egg-free, and gluten-free 1:1 substitution notes.',
    ],
    featuredRecipeSlugs: [
      'tropical-mango-berry-swirl-vanilla-bean-cupcakes',
      'november-spiced-cinnamon-apple-pecan-skillet-crisp-no-mixer',
      'no-bake-dark-chocolate-espresso-ganache-tart-date-walnut-crust',
      '10-minute-no-bake-lemon-berry-mascarpone-cheesecake-cups',
    ],
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
      'Practical culinary handbooks covering 1:1 ingredient substitutions, weekly meal-prep storage, cast-iron care, and USDA safe cooking temperatures.',
    editorialGuideParagraphsEn: [
      'Great home cooks rely on foundational kitchen science when an ingredient is missing from the pantry or when prepping five days of lunches in a single Sunday hour. Our Kitchen Hacks & Guides category serves as CookReel’s technical reference library—covering exact weight-and-volume baking and savory substitutions, cast-iron polymerization and deglazing maintenance, freezer headspace rules, and official USDA safe minimum internal temperatures.',
      'Every handbook is structured with quick-reference conversion metrics, step-by-step workflows, and direct links to the recipes where those techniques apply—helping you rescue a sauce without heavy cream, thaw proteins safely in cold water, or keep washed salad greens and fresh herbs crisp for up to two weeks.',
    ],
    featuredRecipeSlugs: [
      'ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide',
      '60-minute-sunday-meal-prep-guide-5-high-protein-lunches',
      'ultimate-freezer-meal-prep-guide-how-to-freeze-and-thaw-cooked-food',
      'essential-cooking-temperatures-pan-deglazing-and-herb-storage-guide',
    ],
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
      'USDA FoodData Central Nutrition (per 1 of 2 servings): 200g Atlantic salmon (416 kcal, 41g protein) + 15g unsalted butter (108 kcal) + 100g green asparagus & Meyer lemon caper pan jus (26 kcal, 2g protein, 4g net carbs) = 550 kcal · 43g Protein · 4g Net Carbs.',
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
        originalEn: 'Unsalted Dairy Butter (30g)',
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
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 550,
    proteinGrams: 43,
    netCarbsGrams: 4,
    videoDuration: '0:12',
    videoUrl: '/media-clips/crispy-salmon-skillet.mp4',
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
      { item: 'Unsalted butter', amount: 30, unit: 'g' },
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
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 5,
    cookMinutes: 9,
    calories: 610,
    proteinGrams: 54,
    netCarbsGrams: 1,
    videoDuration: '0:12',
    videoUrl: '/media-clips/garlic-butter-ribeye-steak.mp4',
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
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_truffle_pasta_1795527116427.jpg',
    ],
    authorName: 'Elena Rostova',
    authorRoleEn: 'Senior Recipe Developer & Food Science Editor',
    prepMinutes: 8,
    cookMinutes: 10,
    calories: 540,
    proteinGrams: 21,
    netCarbsGrams: 52,
    videoDuration: '0:12',
    videoUrl: '/media-clips/truffle-tagliatelle-pasta.mp4',
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
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 10,
    cookMinutes: 25,
    calories: 520,
    proteinGrams: 44,
    netCarbsGrams: 24,
    videoDuration: '0:12',
    videoUrl: '/media-clips/lemon-herb-roasted-chicken.mp4',
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
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    authorName: 'Elena Rostova',
    authorRoleEn: 'Senior Recipe Developer & Food Science Editor',
    prepMinutes: 10,
    cookMinutes: 18,
    calories: 380,
    proteinGrams: 22,
    netCarbsGrams: 18,
    videoDuration: '0:12',
    videoUrl: '/media-clips/mediterranean-spiced-shakshuka.mp4',
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
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
    ],
    authorName: 'Elena Rostova',
    authorRoleEn: 'Senior Recipe Developer & Food Science Editor',
    prepMinutes: 20,
    cookMinutes: 18,
    calories: 340,
    proteinGrams: 5,
    netCarbsGrams: 42,
    videoDuration: '0:12',
    videoUrl: '/media-clips/mango-strawberry-sunset-cupcakes.mp4',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
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
  // ============================================================================
  // 10 QUICK WEEKNIGHT DINNER LONG-TAIL SEO SERIES (With Short Video Clips,
  // Structured Recipe Cards & Multi-Recipe Internal Linking)
  // ============================================================================
  {
    id: 'one-pan-lemon-garlic-chicken-dinner-15-min',
    slug: 'one-pan-lemon-garlic-chicken-dinner-in-15-minutes',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 15-Minute One-Pan Dinners',
    titleEn: 'One-Pan Lemon Garlic Chicken Skillet Dinner in 15 Minutes',
    subtitleEn:
      'A fast, single-skillet weeknight chicken dinner with golden garlic-herb pan sauce, fresh lemon juice, and zero extra pots to wash.',
    targetKeywordEn: '15-minute one-pan chicken dinner',
    shortVideoConceptEn:
      'Fast sequential overhead shot adding sliced chicken cutlets, minced garlic, broth, and fresh lemon juice into the exact same hot skillet with zero extra dishes to wash.',
    internalLinks: [
      {
        slug: 'quick-oven-baked-spiced-chicken-and-potato-sheet-pan',
        titleEn: 'Quick Oven-Baked Spiced Chicken Breast & Potato Sheet Pan',
        contextEn: 'Prefer hands-off oven roasting? Try our one-pan spiced chicken and crispy diced potatoes sheet-pan dinner.',
      },
      {
        slug: 'quick-4-ingredient-crispy-chicken-cheese-quesadilla',
        titleEn: 'Crispy 4-Ingredient Chicken & Cheese Quesadilla',
        contextEn: 'Have leftover cooked lemon garlic chicken? Slice it thinly for these 10-minute crispy skillet quesadillas.',
      },
      {
        slug: 'air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
        titleEn: 'Crispy Air Fryer & One-Pan Lemon Herb Chicken Thighs',
        contextEn: 'Looking for bone-in dark meat? Check our golden chicken thighs guide.',
      },
    ],
    wordCount: 1180,
    introParagraphsEn: [
      'When you need a high-protein weeknight dinner on the table in 15 minutes without a sink full of dishes, slicing boneless chicken breasts horizontally into thin cutlets is the fastest technique in the kitchen. Thin 1.5cm cutlets sear to a golden crust in 4 minutes per side and cook evenly to the safe USDA internal temperature of 74°C (165°F).',
      'Everything in this recipe happens in a single 12-inch skillet: after searing the seasoned chicken cutlets, you deglaze the golden fond in the pan with garlic, chicken broth, butter, and fresh lemon juice to create a glossy pan sauce in 90 seconds.',
    ],
    whyThisWorksEn: [
      'Slicing chicken breasts into thin cutlets cuts cooking time from 20 minutes down to 8 minutes.',
      'Sequential one-pan cooking builds a rich garlic-lemon pan glaze with only one skillet to wash.',
      'Verified at 74°C (165°F) with an instant-read thermometer so chicken stays juicy.',
    ],
    chefTipsEn: [
      'Pat the chicken cutlets completely dry with paper towels before seasoning so they brown immediately instead of steaming.',
      'Lower the burner heat to medium-low before adding the minced garlic so the garlic turns fragrant and golden without scorching.',
      'Add cold unsalted butter off the heat and swirl the skillet continuously to emulsify the lemon-garlic sauce.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always verify poultry reaches a minimum internal temperature of 74°C (165°F) at the thickest part using a digital food thermometer.',
    substitutions: [
      {
        originalEn: 'Boneless Skinless Chicken Breast Cutlets (500g)',
        substituteEn: 'Boneless Skinless Chicken Tenders or Thighs (500g)',
        chefNoteEn: 'Chicken tenders require zero slicing and sear in 3.5 minutes per side.',
      },
      {
        originalEn: 'Low-Sodium Chicken Broth (120ml)',
        substituteEn: 'Vegetable Broth or Dry White Wine Substitution (105ml broth + 15ml lemon juice)',
        chefNoteEn: 'Deglazes the browned skillet fond equally well.',
      },
      {
        originalEn: 'Unsalted Butter (30g)',
        substituteEn: 'Extra-Virgin Olive Oil or Dairy-Free Plant Butter (30ml)',
        chefNoteEn: 'Creates a light Mediterranean lemon-garlic emulsion.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I keep chicken breast cutlets from drying out in a skillet?',
        answerEn:
          'Slice the breasts evenly to 1.5cm thickness, sear over medium-high heat for 4 minutes per side, and remove from the pan as soon as the internal temperature hits 74°C (165°F).',
      },
      {
        questionEn: 'Can I make this 15-minute one-pan chicken dinner ahead for meal prep?',
        answerEn:
          'Yes! Cool the cooked chicken and lemon-garlic pan sauce uncovered for 20 minutes, store in airtight glass containers at 4°C (39°F) for up to 4 days, and reheat gently with a splash of broth.',
      },
      {
        questionEn: 'What sides pair best with one-pan lemon garlic chicken?',
        answerEn:
          'Serve over our 10-Minute Egg & Vegetable Fried Rice, steamed broccoli, or crusty toasted sourdough.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 390,
    proteinGrams: 46,
    netCarbsGrams: 4,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Enameled Cast-Iron Everyday Skillet',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Thin-sliced boneless skinless chicken breast cutlets', amount: 500, unit: 'g' },
      { item: 'Extra-virgin olive oil (for high-heat searing)', amount: 15, unit: 'ml' },
      { item: 'Fresh garlic cloves, finely minced (4 cloves)', amount: 20, unit: 'g' },
      { item: 'Low-sodium chicken broth (for pan deglazing)', amount: 120, unit: 'ml' },
      { item: 'Freshly squeezed lemon juice & 1 tsp lemon zest', amount: 30, unit: 'ml' },
      { item: 'Cold unsalted butter & chopped fresh Italian parsley', amount: 35, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Season & Sear Chicken Cutlets in One Skillet',
        instruction:
          'Pat chicken cutlets dry, season with kosher salt, black pepper, and oregano, and sear in hot olive oil for 4 minutes per side until golden and 74°C (165°F) internally.',
        timerSeconds: 480,
      },
      {
        title: 'Sequential Garlic & Lemon Broth Deglaze',
        instruction:
          'In the exact same skillet, add minced garlic for 30 seconds, then pour in chicken broth and fresh lemon juice, scraping up the golden pan fond.',
        timerSeconds: 90,
      },
      {
        title: 'Swirl Cold Butter & Spoon Sauce Over Chicken',
        instruction:
          'Turn off the heat, swirl in cold butter and fresh parsley until glossy, and coat the chicken cutlets for 30 seconds before serving.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: '5-ingredient-spinach-cream-cheese-pasta-dinner',
    slug: '5-ingredient-creamy-spinach-and-cream-cheese-pasta-dinner',
    category: 'quick-easy',
    subcategoryId: '5-ingredient-recipes',
    categoryLabelEn: 'Quick & Easy · 5-Ingredient Pasta Dinners',
    titleEn: '5-Ingredient Creamy Spinach & Cream Cheese Pasta for Dinner',
    subtitleEn:
      'Turn 5 everyday pantry and fridge staples into a silky restaurant-style spinach cream pasta in 15 minutes using starchy pasta water.',
    targetKeywordEn: 'how to make 5-ingredient pasta for dinner',
    shortVideoConceptEn:
      'Clean tabletop display showing only the 5 ingredients side-by-side, followed by a fast 30-second sequence melting cream cheese with hot pasta water and wilting fresh baby spinach.',
    internalLinks: [
      {
        slug: 'quick-garlic-butter-shrimp-pasta-weeknight-dinner',
        titleEn: 'Quick Garlic Butter Shrimp Pasta for Weeknight Dinner',
        contextEn: 'Want to add seafood protein? See our 15-minute garlic butter shrimp pasta technique.',
      },
      {
        slug: '5-ingredient-tagliatelle-black-truffle-butter-parmigiano',
        titleEn: '5-Ingredient Tagliatelle with Black Truffle Butter & Parmigiano',
        contextEn: 'Explore another 5-ingredient pasta emulsion classic from our kitchen.',
      },
    ],
    wordCount: 1120,
    introParagraphsEn: [
      'Learning how to make a 5-ingredient pasta for dinner is the easiest way to skip jarred sauces forever. By combining softened cream cheese, freshly grated Parmigiano-Reggiano, garlic, and starchy boiling pasta water directly in the warm pan, you create a velvety sauce that clings to every ridge of pasta.',
      'Fresh baby spinach wilts directly in the residual heat of the pasta and cream sauce in less than 60 seconds, adding vibrant color and nutrients without needing a separate colander or sauté pan.',
    ],
    whyThisWorksEn: [
      'Uses only 5 core ingredients (pasta, cream cheese, baby spinach, Parmesan, and garlic).',
      'Starchy pasta cooking water emulsifies the cream cheese into a smooth sauce that never feels heavy.',
      'Baby spinach wilts directly in the warm skillet during the final 60-second toss.',
    ],
    chefTipsEn: [
      'Always scoop out 180ml (3/4 cup) of cloudy, starchy pasta water before draining your pasta—this liquid gold binds the cream cheese and Parmesan.',
      'Cut the block of cream cheese into small 2cm cubes so it melts into the warm pasta water in under 30 seconds.',
      'Season with freshly cracked black pepper and a pinch of nutmeg or red pepper flakes right before serving.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Refrigerate leftover cooked pasta dishes at 4°C (39°F) or below within 2 hours of cooking and reheat to 74°C (165°F) with a splash of milk or water.',
    substitutions: [
      {
        originalEn: 'Full-Fat Block Cream Cheese (120g)',
        substituteEn: 'Mascarpone Cheese (120g) or Boursin Garlic & Herb Cheese',
        chefNoteEn: 'Mascarpone melts even faster and adds a buttery Italian richness.',
      },
      {
        originalEn: 'Penne or Fusilli Pasta (250g)',
        substituteEn: 'Chickpea Protein Pasta or Whole-Wheat Rigatoni (250g)',
        chefNoteEn: 'Chickpea pasta boosts protein to 24g per serving.',
      },
      {
        originalEn: 'Fresh Baby Spinach (150g)',
        substituteEn: 'Frozen Chopped Spinach (150g, thawed and squeezed dry) or Baby Kale',
        chefNoteEn: 'Squeeze excess water from thawed spinach before stirring into the sauce.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I melt cream cheese into pasta sauce without lumps?',
        answerEn:
          'Cut softened cream cheese into small cubes and whisk it with 120ml of hot starchy pasta water over low heat for 30 seconds before tossing in the drained pasta.',
      },
      {
        questionEn: 'Can I add cooked chicken or shrimp to this 5-ingredient spinach pasta?',
        answerEn:
          'Absolutely. Fold in sliced One-Pan Lemon Garlic Chicken or Pan-Seared Garlic Butter Shrimp during the final toss.',
      },
      {
        questionEn: 'How do I reheat creamy spinach pasta the next day?',
        answerEn:
          'Add 2 tablespoons of milk or water per bowl before warming in a covered skillet or microwave, stirring halfway through so the cream sauce re-emulsifies.',
      },
    ],
    stepGalleryImages: [
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
      '/images/recipe_truffle_pasta_1795527116427.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 3,
    cookMinutes: 12,
    calories: 475,
    proteinGrams: 18,
    netCarbsGrams: 52,
    image: '/images/action_tossing_pasta_pan_1795530070327.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Stainless Steel Tri-Ply Saucier Pan',
      brand: 'All-Clad Culinary',
      priceUsd: 129,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Dry penne, fusilli, or tagliatelle pasta', amount: 250, unit: 'g' },
      { item: 'Softened full-fat cream cheese, cut into cubes', amount: 120, unit: 'g' },
      { item: 'Fresh triple-washed baby spinach leaves', amount: 150, unit: 'g' },
      { item: 'Freshly grated Parmigiano-Reggiano cheese', amount: 55, unit: 'g' },
      { item: 'Minced fresh garlic (3 cloves) & 150ml reserved starchy pasta water', amount: 165, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Boil Pasta Al Dente & Reserve Starchy Water',
        instruction:
          'Boil pasta in salted water for 1 minute less than package directions. Scoop out 150ml of hot starchy cooking water before draining.',
        timerSeconds: 540,
      },
      {
        title: 'Whisk Cream Cheese, Garlic & Hot Pasta Water',
        instruction:
          'In the warm pan over low heat, sauté minced garlic for 30 seconds, then whisk in cubed cream cheese and 100ml hot pasta water until silky.',
        timerSeconds: 90,
      },
      {
        title: 'Toss Pasta, Baby Spinach & Parmigiano',
        instruction:
          'Add hot pasta, fresh baby spinach, and grated Parmigiano, tossing vigorously for 60 seconds until the spinach wilts and the sauce coats every piece.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: '10-minute-air-fryer-crispy-honey-garlic-salmon-dinner',
    slug: '10-minute-air-fryer-crispy-honey-garlic-salmon-recipe',
    category: 'quick-easy',
    subcategoryId: 'air-fryer-recipes',
    categoryLabelEn: 'Quick & Easy · 10-Minute Air Fryer Dinners',
    titleEn: 'Crispy Honey-Garlic Salmon in the Air Fryer (10-Minute Recipe)',
    subtitleEn:
      'Caramelized honey-garlic crust on the outside and flaky, tender salmon inside—cooked in just 8 minutes in your Air Fryer basket.',
    targetKeywordEn: '10-minute air fryer salmon recipe',
    shortVideoConceptEn:
      'Quick close-up brushing the glossy honey-garlic-soy marinade onto salmon fillets, sliding the basket into the Air Fryer, and pulling out sizzling crispy-edged salmon 8 minutes later.',
    internalLinks: [
      {
        slug: '15-minute-crispy-cast-iron-salmon-lemon-caper',
        titleEn: '15-Minute Crispy Cast-Iron Salmon with Meyer Lemon Caper Butter',
        contextEn: 'Cooking on the stovetop instead of an Air Fryer? Follow our cold-start cast-iron crispy skin method.',
      },
      {
        slug: '10-minute-quick-egg-and-vegetable-fried-rice-dinner',
        titleEn: '10-Minute Egg & Vegetable Fried Rice for a Quick Dinner',
        contextEn: 'Serve these honey-garlic salmon fillets over our 10-minute leftover jasmine fried rice for a complete meal.',
      },
    ],
    wordCount: 1150,
    introParagraphsEn: [
      'This 10-minute Air Fryer salmon recipe delivers caramelized edges and moist, flaky fillets without turning on your oven or splattering oil across the stove. High-velocity convection heat at 200°C (400°F) blisters the honey, soy, and fresh garlic glaze in 7 to 9 minutes.',
      'To keep the honey glaze from scorching before the center reaches the safe USDA temperature of 63°C (145°F), we coat the fillets in half the marinade before air-frying and brush the remaining warm glaze over the top during the final 60 seconds.',
    ],
    whyThisWorksEn: [
      '200°C (400°F) Air Fryer convection caramelizes the honey-garlic glaze in 8 minutes flat.',
      'Two-stage glazing keeps sugars glossy and prevents burnt edges in the Air Fryer basket.',
      'Reaches the official USDA 63°C (145°F) seafood temperature while staying buttery inside.',
    ],
    chefTipsEn: [
      'Line the Air Fryer basket with perforated parchment paper or brush lightly with avocado oil so the salmon skin releases cleanly.',
      'Use fillets of equal thickness (around 2.5cm at the center) so both pieces finish cooking at the exact same minute.',
      'Check internal temperature at the 7-minute mark with a digital thermometer; pull at 63°C (145°F).',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook finfish and salmon to a minimum internal temperature of 63°C (145°F) measured at the thickest part, or until the flesh is opaque and flakes easily with a fork.',
    substitutions: [
      {
        originalEn: 'Raw Honey (30ml / 2 Tbsp)',
        substituteEn: 'Pure Maple Syrup (30ml) or Brown Sugar (25g + 10ml warm water)',
        chefNoteEn: 'Maple syrup caramelizes at the same temperature and adds a warm autumn note.',
      },
      {
        originalEn: 'Low-Sodium Soy Sauce (30ml)',
        substituteEn: 'Gluten-Free Tamari or Coconut Aminos (30ml)',
        chefNoteEn: '1:1 swap for gluten-free weeknight dinners.',
      },
      {
        originalEn: 'Fresh Atlantic or King Salmon Fillets (400g)',
        substituteEn: 'Steelhead Trout or Arctic Char Fillets (400g)',
        chefNoteEn: 'Trout fillets are slightly thinner and finish in 6 to 7 minutes at 200°C.',
      },
    ],
    faqs: [
      {
        questionEn: 'Do I need to flip salmon fillets in the Air Fryer?',
        answerEn:
          'No flipping is required! Place the salmon skin-side down in the preheated 200°C (400°F) Air Fryer basket; circulating air cooks the top and sides evenly in 8 minutes.',
      },
      {
        questionEn: 'How do I stop honey-glazed salmon from burning in the Air Fryer?',
        answerEn:
          'Toss the salmon in half the honey-garlic sauce before air-frying, then spoon the remaining warm glaze over the fillets during the last minute of cooking.',
      },
      {
        questionEn: 'Can I cook frozen salmon fillets in the Air Fryer?',
        answerEn:
          'Yes. Air-fry frozen fillets at 180°C (360°F) for 7 minutes to thaw, brush with the honey-garlic glaze, and cook for 6 to 7 more minutes until 63°C (145°F) internally.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_crispy_salmon_1795527113114.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 2,
    cookMinutes: 8,
    calories: 440,
    proteinGrams: 41,
    netCarbsGrams: 12,
    image: '/images/recipe_crispy_salmon_1795527113114.jpg',
    gearItem: {
      id: 'gear-instant-thermometer',
      nameEn: 'Waterproof Digital Instant-Read Meat & Seafood Thermometer',
      brand: 'ThermoWorks Culinary',
      priceUsd: 39,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Center-cut salmon fillets (2 fillets, pat dry)', amount: 400, unit: 'g' },
      { item: 'Raw honey & low-sodium soy sauce (1:1 glaze base)', amount: 60, unit: 'ml' },
      { item: 'Freshly minced garlic (3 cloves) & grated fresh ginger (5g)', amount: 20, unit: 'g' },
      { item: 'Fresh lemon juice or apple cider vinegar', amount: 15, unit: 'ml' },
      { item: 'Avocado oil & toasted sesame seeds for garnish', amount: 15, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Whisk 2-Minute Honey-Garlic Glaze & Coat Fillets',
        instruction:
          'Whisk honey, soy sauce, minced garlic, ginger, and lemon juice. Coat dry salmon fillets with half of the glaze.',
        timerSeconds: 120,
      },
      {
        title: 'Air Fry at 200°C (400°F) Skin-Side Down',
        instruction:
          'Place salmon skin-side down in the Air Fryer basket at 200°C (400°F) for 7 minutes until edges begin to caramelize.',
        timerSeconds: 420,
      },
      {
        title: 'Final Glaze Brush & 63°C (145°F) Verification',
        instruction:
          'Brush remaining honey-garlic glaze on top and air-fry 1 more minute until crispy and 63°C (145°F) in the center.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'crispy-ground-beef-and-cheese-tortilla-wraps',
    slug: 'crispy-ground-beef-and-melted-cheese-tortilla-wraps-dinner',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 15-Minute Skillet Dinners',
    titleEn: 'Crispy Ground Beef & Melted Cheese Tortilla Wraps',
    subtitleEn:
      'Seasoned ground beef, caramelized onions, and sharp cheddar folded into flour tortillas and pan-toasted seam-side down until golden and crunchy.',
    targetKeywordEn: 'quick tortilla and ground beef dinner',
    shortVideoConceptEn:
      'Step-by-step close-up folding the tortilla corners tightly over the seasoned beef and shredded cheddar, then pressing seam-side down in a hot cast-iron skillet until golden and pulling apart to reveal the melted cheese.',
    internalLinks: [
      {
        slug: 'quick-4-ingredient-crispy-chicken-cheese-quesadilla',
        titleEn: 'Crispy 4-Ingredient Chicken & Cheese Quesadilla',
        contextEn: 'Prefer poultry over ground beef? Try our 4-ingredient crispy chicken quesadilla next.',
      },
      {
        slug: 'crispy-skillet-tuna-melt-sandwich-for-quick-dinner',
        titleEn: 'Crispy Skillet Tuna Melt Sandwich for a Quick Dinner',
        contextEn: 'Love golden pan-toasted melted cheese dinners? Check our 12-minute skillet tuna melt.',
      },
    ],
    wordCount: 1140,
    introParagraphsEn: [
      'A quick tortilla and ground beef dinner hits every craving on a busy weeknight: savory spiced beef, gooey melted cheese, and a shatteringly crisp pan-toasted tortilla exterior. Using 90% lean ground beef means the filling browns in 6 minutes with minimal excess grease to drain.',
      'The secret to wraps that never pop open while flipping is sprinkling a thin layer of shredded cheddar directly along the inside flap of the tortilla and placing the wrap seam-side down in the hot skillet first—the melting cheese acts as culinary glue within 45 seconds.',
    ],
    whyThisWorksEn: [
      '90% lean ground beef browns in 6 minutes to the safe USDA 71°C (160°F) internal temperature.',
      'Toasting seam-side down first seals the tortilla shut with melted cheddar.',
      'Ready from fridge to plate in 15 minutes using one skillet.',
    ],
    chefTipsEn: [
      'Warm your flour tortillas for 10 seconds on a dry skillet before filling so they fold cleanly without cracking at the edges.',
      'Press gently on top of the wraps with a flat spatula while toasting so the heat penetrates evenly into the center cheese layer.',
      'Let the toasted wraps rest for 90 seconds on a wooden board before slicing diagonally so the cheese sets slightly.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always cook ground beef, pork, and lamb to a minimum internal temperature of 71°C (160°F) verified with a food thermometer.',
    substitutions: [
      {
        originalEn: '90% Lean Ground Beef (400g)',
        substituteEn: 'Lean Ground Turkey (cooked to 74°C / 165°F) or Black Beans (400g)',
        chefNoteEn: 'Ground turkey or black beans work 1:1 with the cumin-paprika seasoning.',
      },
      {
        originalEn: 'Sharp Cheddar & Monterey Jack Cheese (140g)',
        substituteEn: 'Low-Moisture Mozzarella or Pepper Jack Cheese (140g)',
        chefNoteEn: 'Grate cheese from a block rather than pre-shredded bags for smoother melting.',
      },
      {
        originalEn: 'Large Burrito-Size Flour Tortillas (4 tortillas)',
        substituteEn: 'High-Fiber Low-Carb Tortillas or Whole-Wheat Wraps',
        chefNoteEn: 'Low-carb tortillas toast up extra crispy in 90 seconds per side.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I keep tortilla wraps from getting soggy after filling?',
        answerEn:
          'Simmer off any excess liquid after seasoning the ground beef, place a barrier layer of shredded cheese directly on the tortilla before adding the warm beef, and pan-toast over medium heat.',
      },
      {
        questionEn: 'Can I air-fry these ground beef tortilla wraps instead of pan-toasting?',
        answerEn:
          'Yes! Brush the folded wraps lightly with oil and air-fry seam-side down at 190°C (375°F) for 5 to 6 minutes until golden brown.',
      },
      {
        questionEn: 'What dipping sauces go best with crispy beef tortilla wraps?',
        answerEn:
          'Serve with plain Greek yogurt mixed with lime juice, fresh pico de gallo, or smoky chipotle salsa.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 510,
    proteinGrams: 36,
    netCarbsGrams: 32,
    image: '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 12-Inch Cast-Iron Skillet',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: '90% lean ground beef', amount: 400, unit: 'g' },
      { item: 'Finely diced yellow onion & 2 minced garlic cloves', amount: 90, unit: 'g' },
      { item: 'Smoked paprika, ground cumin, oregano & kosher salt', amount: 12, unit: 'g' },
      { item: 'Tomato paste & 45ml water or beef broth', amount: 60, unit: 'ml' },
      { item: 'Freshly shredded sharp cheddar & Monterey Jack cheese', amount: 140, unit: 'g' },
      { item: 'Large 10-inch flour tortillas (4 count) & 10ml avocado oil', amount: 240, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Brown Ground Beef, Onion & Spices to 71°C (160°F)',
        instruction:
          'Brown ground beef and diced onion in a hot skillet for 6 minutes, stir in garlic, cumin, smoked paprika, and tomato paste with a splash of water until reaches 71°C (160°F).',
        timerSeconds: 360,
      },
      {
        title: 'Layer Cheese & Fold Tortilla Wraps Tightly',
        instruction:
          'Sprinkle shredded cheese down the center of each warm tortilla, top with seasoned beef and more cheese, and fold the sides and bottom tightly into a rectangular wrap.',
        timerSeconds: 120,
      },
      {
        title: 'Pan-Toast Seam-Side Down Until Golden & Melted',
        instruction:
          'Place wraps seam-side down in the wiped skillet with a drop of oil and toast for 2 minutes per side until deeply golden and the cheddar is melted.',
        timerSeconds: 240,
      },
    ],
  },
  {
    id: '10-minute-egg-and-vegetable-fried-rice-dinner',
    slug: '10-minute-quick-egg-and-vegetable-fried-rice-dinner',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 10-Minute Wok & Skillet Meals',
    titleEn: '10-Minute Egg & Vegetable Fried Rice for a Quick Dinner',
    subtitleEn:
      'Transform chilled leftover lunch rice into a sizzling, savory 10-minute dinner with fluffy scrambled eggs, crisp vegetables, and toasted sesame soy glaze.',
    targetKeywordEn: '10-minute quick fried rice for dinner',
    shortVideoConceptEn:
      'High-energy skillet clip breaking up cold leftover rice from lunch, pushing it aside to scramble eggs in 30 seconds, and tossing rapidly with colorful vegetables and soy-sesame sauce around the perimeter of the hot pan.',
    internalLinks: [
      {
        slug: '10-minute-air-fryer-crispy-honey-garlic-salmon-recipe',
        titleEn: 'Crispy Honey-Garlic Salmon in the Air Fryer (10-Minute Recipe)',
        contextEn: 'Top a bowl of this 10-minute egg fried rice with our caramelized Air Fryer honey-garlic salmon.',
      },
      {
        slug: 'keto-low-carb-garlic-ginger-shrimp-cauliflower-fried-rice',
        titleEn: '15-Minute Low-Carb Shrimp & Egg Cauliflower Fried Rice',
        contextEn: 'Following a ketogenic diet? Swap jasmine rice for our riced cauliflower version.',
      },
    ],
    wordCount: 1160,
    introParagraphsEn: [
      'Making a 10-minute quick fried rice for dinner is the smartest way to turn leftover cooked rice from lunch into a hot, satisfying meal. Chilled day-old rice has firm, retrograded starch granules that stay separate and toast evenly in a hot skillet without clumping.',
      'By pouring low-sodium soy sauce and toasted sesame oil directly against the searing-hot perimeter walls of the skillet rather than onto the cold rice, the sauce caramelizes instantaneously and infuses the grains with authentic wok-style aroma.',
    ],
    whyThisWorksEn: [
      'Chilled leftover rice has low surface moisture so every grain fries crisp and separate.',
      'Pushing vegetables to the side to scramble eggs directly in the same skillet saves a pan.',
      'Perimeter soy-sauce caramelization delivers restaurant flavor in 10 minutes flat.',
    ],
    chefTipsEn: [
      'If you only have freshly cooked warm rice, spread it in a thin layer on a baking sheet and place it in the freezer for 10 minutes to dry out surface steam before frying.',
      'Use a high-smoke-point neutral oil (avocado oil) for frying, and drizzle toasted sesame oil only during the final 30 seconds off the heat.',
      'Separate the white and green parts of your scallions—sauté the white stems with garlic first, and toss the raw green tops in at the very end.',
    ],
    usdaSafetyNoteEn:
      'USDA Cooked Rice Storage & Reheating Guideline: Always cool leftover cooked rice rapidly and refrigerate at 4°C (39°F) within 1 to 2 hours of cooking; reheat fried rice thoroughly to 74°C (165°F).',
    substitutions: [
      {
        originalEn: 'Chilled Cooked Jasmine or Long-Grain White Rice (450g)',
        substituteEn: 'Chilled Cooked Brown Rice, Basmati, or Riced Cauliflower (450g)',
        chefNoteEn: 'Riced cauliflower cuts net carbs by 75% and cooks in 5 minutes.',
      },
      {
        originalEn: '3 Large Whole Eggs (150g)',
        substituteEn: '150g Crumbled Extra-Firm Tofu or 200g Cooked Shrimp',
        chefNoteEn: 'Crumbled tofu scrambles with a pinch of turmeric just like eggs.',
      },
      {
        originalEn: 'Low-Sodium Soy Sauce (30ml)',
        substituteEn: 'Gluten-Free Tamari or Coconut Aminos (30ml)',
        chefNoteEn: 'Add 1/4 tsp kosher salt if using low-sodium coconut aminos.',
      },
    ],
    faqs: [
      {
        questionEn: 'Why does fried rice turn mushy when I make it at home?',
        answerEn:
          'Mushy fried rice happens when warm, freshly steamed rice is used or when cold liquid sauces are poured directly over the rice. Use chilled rice and drizzle soy sauce down the hot edges of the pan.',
      },
      {
        questionEn: 'How long can leftover cooked rice be stored in the fridge before making fried rice?',
        answerEn:
          'According to USDA guidelines, store cooked rice in an airtight container at 4°C (39°F) or below and use within 3 to 4 days.',
      },
      {
        questionEn: 'What vegetables cook fastest in 10-minute fried rice?',
        answerEn:
          'Frozen sweet peas, finely diced carrots, corn kernels, bell peppers, and sliced scallions cook to crisp-tender perfection in 2 to 3 minutes.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 3,
    cookMinutes: 7,
    calories: 385,
    proteinGrams: 16,
    netCarbsGrams: 46,
    image: '/images/action_searing_skillet_butter_1795530068462.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Carbon Steel Flat-Bottom Skillet Wok',
      brand: 'Joyce Chen Culinary',
      priceUsd: 59,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Chilled day-old cooked jasmine or basmati rice', amount: 450, unit: 'g' },
      { item: 'Large pasture-raised eggs, lightly beaten (3 eggs)', amount: 150, unit: 'g' },
      { item: 'Diced carrots, sweet green peas & sliced scallions', amount: 180, unit: 'g' },
      { item: 'Minced fresh garlic (2 cloves) & grated fresh ginger (5g)', amount: 15, unit: 'g' },
      { item: 'Low-sodium soy sauce & toasted sesame oil', amount: 35, unit: 'ml' },
      { item: 'High-smoke-point avocado oil', amount: 15, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Flash-Sauté Vegetables & Scramble Eggs in One Pan',
        instruction:
          'Stir-fry diced carrots, peas, scallion whites, and garlic in hot avocado oil for 2 minutes. Push to one side and scramble the beaten eggs in the empty space for 45 seconds.',
        timerSeconds: 165,
      },
      {
        title: 'Toss Chilled Rice Over High Heat',
        instruction:
          'Add chilled rice, breaking up any clumps with your spatula, and toss over medium-high heat for 3 minutes until grains pop and reach 74°C (165°F).',
        timerSeconds: 180,
      },
      {
        title: 'Caramelize Soy Sauce & Finish with Sesame Oil',
        instruction:
          'Pour soy sauce around the hot perimeter of the skillet, toss vigorously for 45 seconds, then remove from heat and stir in toasted sesame oil and green scallions.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'quick-oven-baked-spiced-chicken-and-potato-sheet-pan',
    slug: 'quick-oven-baked-spiced-chicken-and-potato-sheet-pan',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · Sheet-Pan Oven Dinners',
    titleEn: 'Quick Oven-Baked Spiced Chicken Breast & Potato Sheet Pan',
    subtitleEn:
      'Toss cubed chicken breasts and baby gold potatoes with smoky Mediterranean spices in one bag, spread on a sheet pan, and roast to golden perfection.',
    targetKeywordEn: 'quick chicken and potato sheet pan for oven',
    shortVideoConceptEn:
      'Quick hands-free prep clip tossing cubed chicken breasts, diced baby potatoes, olive oil, and smoky spices together inside a single zip-top bag or bowl, spreading onto a hot sheet pan, and pulling out golden roasted chicken and crispy potatoes.',
    internalLinks: [
      {
        slug: 'one-pan-lemon-garlic-chicken-dinner-in-15-minutes',
        titleEn: 'One-Pan Lemon Garlic Chicken Skillet Dinner in 15 Minutes',
        contextEn: 'Want to cook your lemon garlic chicken on the stovetop in 15 minutes instead of the oven? Use our one-skillet method.',
      },
      {
        slug: 'air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
        titleEn: 'Crispy Air Fryer & One-Pan Lemon Herb Chicken Thighs with Potatoes',
        contextEn: 'Prefer bone-in chicken thighs? See our Air Fryer and skillet chicken thigh guide.',
      },
    ],
    wordCount: 1190,
    introParagraphsEn: [
      'A quick chicken and potato sheet pan for the oven normally suffers from one flaw: potatoes take 40 minutes to roast while boneless chicken breasts dry out after 18 minutes. The solution is cutting your baby gold potatoes into bite-sized 1.5cm cubes while cutting the chicken breasts into slightly larger 3cm chunks.',
      'By tossing the potatoes and chicken with olive oil, garlic powder, smoked paprika, oregano, and lemon juice inside a single mixing bag or bowl and spreading them onto a preheated heavy rimmed baking sheet at 220°C (425°F), both the potatoes and chicken finish in exactly 18 to 20 minutes.',
    ],
    whyThisWorksEn: [
      '1.5cm potato cubes and 3cm chicken chunks finish roasting at the exact same 18-minute mark.',
      'One-bag spice coating coats every crevice evenly with minimal cleanup.',
      '220°C (425°F) high-heat roasting blisters potato exteriors while chicken reaches 74°C (165°F).',
    ],
    chefTipsEn: [
      'Place your empty rimmed baking sheet inside the oven while it preheats to 220°C (425°F) so the potatoes sizzle the moment they touch the metal.',
      'Leave at least 1cm of breathing room between pieces on the tray so heat circulates and crisps the potatoes instead of steaming them.',
      'Squeeze fresh lemon juice and scatter chopped parsley over the pan right after pulling it from the oven.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Verify roasted chicken pieces reach a minimum internal temperature of 74°C (165°F) with a food thermometer before serving; discard any bag used to marinate raw poultry.',
    substitutions: [
      {
        originalEn: 'Boneless Skinless Chicken Breasts (550g)',
        substituteEn: 'Boneless Skinless Chicken Thighs (550g)',
        chefNoteEn: 'Boneless thighs stay extra juicy at 220°C and roast in the same 18–20 minutes.',
      },
      {
        originalEn: 'Baby Yukon Gold Potatoes (450g)',
        substituteEn: 'Red-Skinned Baby Potatoes or Peeled Sweet Potato Cubes (450g)',
        chefNoteEn: 'No peeling needed for thin-skinned Yukon Gold or red potatoes.',
      },
      {
        originalEn: 'Smoked Paprika & Dried Oregano Blend (12g)',
        substituteEn: ' Za’atar, Cajun Seasoning, or Italian Herb Blend (12g)',
        chefNoteEn: '1:1 seasoning swap to vary your weekly meal prep flavors.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I get potatoes crispy on a sheet pan with chicken?',
        answerEn:
          'Dice the potatoes into small 1.5cm cubes, pat them dry, preheat the sheet pan at 220°C (425°F), and avoid overcrowding the tray.',
      },
      {
        questionEn: 'Do I need to boil the potatoes before baking this sheet-pan dinner?',
        answerEn:
          'No parboiling is needed when you cut thin-skinned baby gold potatoes into 1.5cm cubes and roast at 220°C (425°F).',
      },
      {
        questionEn: 'How long do leftovers keep for weekly lunches?',
        answerEn:
          'Cool uncovered for 20 minutes, seal in airtight containers, and refrigerate at 4°C (39°F) for up to 4 days. Reheat in the Air Fryer at 180°C for 4 minutes to restore crispness.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 7,
    cookMinutes: 18,
    calories: 445,
    proteinGrams: 44,
    netCarbsGrams: 28,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-braiser-pan',
      nameEn: 'Heavy-Gauge Aluminum Half-Sheet Baking Pan Set',
      brand: 'Nordic Ware Culinary',
      priceUsd: 38,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Boneless skinless chicken breasts, cut into 3cm chunks', amount: 550, unit: 'g' },
      { item: 'Baby Yukon Gold potatoes, cut into small 1.5cm cubes', amount: 450, unit: 'g' },
      { item: 'Extra-virgin olive oil', amount: 30, unit: 'ml' },
      { item: 'Smoked paprika, garlic powder, dried oregano & kosher salt', amount: 15, unit: 'g' },
      { item: 'Fresh lemon juice & chopped fresh parsley for finishing', amount: 25, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Dice Potatoes to 1.5cm & Chicken to 3cm',
        instruction:
          'Preheat oven (with sheet pan inside) to 220°C (425°F). Cut baby potatoes into small 1.5cm cubes and chicken breasts into 3cm bite-sized pieces.',
        timerSeconds: 240,
      },
      {
        title: 'One-Bag Olive Oil & Smoked Spice Toss',
        instruction:
          'Place chicken, potatoes, olive oil, smoked paprika, garlic powder, oregano, and salt into a large zip-top bag or bowl and shake for 60 seconds until coated.',
        timerSeconds: 90,
      },
      {
        title: 'Roast on Hot Sheet Pan for 18 Minutes to 74°C (165°F)',
        instruction:
          'Spread in a single uncrowded layer on the hot sheet pan and roast at 220°C (425°F) for 18 minutes until potatoes are crispy and chicken hits 74°C (165°F).',
        timerSeconds: 1080,
      },
    ],
  },
  {
    id: 'quick-garlic-butter-shrimp-pasta-weeknight-dinner',
    slug: 'quick-garlic-butter-shrimp-pasta-weeknight-dinner',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 15-Minute Seafood Pasta',
    titleEn: 'Quick Garlic Butter Shrimp Pasta for Weeknight Dinner',
    subtitleEn:
      'Succulent jumbo shrimp seared in garlic herb butter for just 2 minutes and tossed with al dente linguine, lemon juice, and Parmigiano.',
    targetKeywordEn: 'quick garlic butter shrimp pasta',
    shortVideoConceptEn:
      'Macro close-up searing pink jumbo shrimp in foaming garlic-herb butter for just 2 minutes, then tossing ribbons of pasta and starchy water directly into the bubbling skillet.',
    internalLinks: [
      {
        slug: '5-ingredient-creamy-spinach-and-cream-cheese-pasta-dinner',
        titleEn: '5-Ingredient Creamy Spinach & Cream Cheese Pasta for Dinner',
        contextEn: 'Craving a richer cream cheese and spinach sauce? Combine both pasta techniques!',
      },
      {
        slug: '15-minute-garlic-lemon-shrimp-and-zucchini-skillet',
        titleEn: '15-Minute Garlic Lemon Shrimp & Crisp Zucchini Skillet',
        contextEn: 'Looking for a low-carb keto version without pasta? Try our garlic shrimp and zucchini skillet.',
      },
    ],
    wordCount: 1130,
    introParagraphsEn: [
      'Nothing beats a quick garlic butter shrimp pasta when you want a restaurant-quality seafood dinner in 15 minutes. Jumbo peeled shrimp cook in just 60 to 90 seconds per side in a hot skillet—meaning by the time your linguine or spaghetti finishes boiling, your shrimp and garlic butter sauce are ready.',
      'To build a glossy scampi-style sauce without heavy cream, we emulsify cold unsalted butter, fresh lemon juice, and 120ml of starchy pasta cooking water together in the skillet before folding the pink shrimp back in.',
    ],
    whyThisWorksEn: [
      'Jumbo shrimp sear in just 2 to 3 minutes total to stay plump and tender.',
      'Starchy pasta water and cold butter create a glossy lemon-garlic emulsion.',
      'Complete seafood pasta dinner on the table in 15 minutes.',
    ],
    chefTipsEn: [
      'Pat thawed shrimp thoroughly dry with paper towels and season with a tiny pinch of baking soda and salt 5 minutes before searing for an extra snappy bite.',
      'Remove the shrimp onto a warm plate as soon as they curl into a loose “C” shape (63°C / 145°F)—tight “O” curls mean overcooked shrimp.',
      'Add fresh lemon zest and chopped parsley right at the end for bright coastal flavor.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook shrimp and shellfish until the flesh turns pearly and opaque and reaches a minimum internal temperature of 63°C (145°F).',
    substitutions: [
      {
        originalEn: 'Peeled & Deveined Jumbo Shrimp (400g)',
        substituteEn: 'Sea Scallops (400g) or Bite-Sized Salmon Cubes',
        chefNoteEn: 'Bay or sea scallops sear in the exact same 2–3 minute window.',
      },
      {
        originalEn: 'Dry Linguine or Spaghetti (250g)',
        substituteEn: 'Angel Hair Pasta (boils in 4 mins) or Gluten-Free Brown Rice Pasta',
        chefNoteEn: 'Angel hair cuts total dinner time down to 10 minutes.',
      },
      {
        originalEn: 'Unsalted Butter (45g)',
        substituteEn: '25g Unsalted Butter + 20ml Extra-Virgin Olive Oil',
        chefNoteEn: 'Combining olive oil and butter keeps the sauce fluid even as it cools.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I thaw frozen shrimp quickly for a 15-minute pasta dinner?',
        answerEn:
          'Place frozen peeled shrimp in a colander submerged in a bowl of cold tap water for 8 to 10 minutes, then pat completely dry on paper towels before searing.',
      },
      {
        questionEn: 'Why did my garlic butter pasta sauce separate and look greasy?',
        answerEn:
          'Melted butter separates if heated dry without water. Whisking 90–120ml of starchy pasta water with cold cubed butter off the heat creates a stable, creamy emulsion.',
      },
      {
        questionEn: 'Can I add white wine to this garlic butter shrimp pasta?',
        answerEn:
          'Yes, deglaze the pan with 60ml dry white wine (or 50ml chicken broth + 10ml lemon juice) right after sautéing the garlic.',
      },
    ],
    stepGalleryImages: [
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_truffle_pasta_1795527116427.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 465,
    proteinGrams: 38,
    netCarbsGrams: 48,
    image: '/images/recipe_truffle_pasta_1795527116427.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Tri-Ply Stainless Steel Skillet',
      brand: 'All-Clad Culinary',
      priceUsd: 129,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Dry linguine or spaghetti pasta', amount: 250, unit: 'g' },
      { item: 'Peeled & deveined jumbo shrimp, patted dry', amount: 400, unit: 'g' },
      { item: 'Unsalted butter (divided) & 15ml olive oil', amount: 60, unit: 'g' },
      { item: 'Fresh garlic cloves, thinly sliced or minced (5 cloves)', amount: 25, unit: 'g' },
      { item: 'Fresh lemon juice, zest & 120ml starchy pasta water', amount: 150, unit: 'ml' },
      { item: 'Grated Parmigiano-Reggiano, parsley & red pepper flakes', amount: 40, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Boil Linguine & Reserve Starchy Water',
        instruction:
          'Boil linguine in salted water until al dente (8 minutes) and reserve 120ml of starchy pasta water before draining.',
        timerSeconds: 480,
      },
      {
        title: '2-Minute High-Heat Garlic Butter Shrimp Sear',
        instruction:
          'Sear dry seasoned shrimp in olive oil and half the butter over medium-high heat for 60–90 seconds per side until pink and 63°C (145°F). Transfer shrimp to a plate.',
        timerSeconds: 150,
      },
      {
        title: 'Emulsify Garlic Butter Sauce & Toss Pasta',
        instruction:
          'Sauté garlic for 30 seconds, add pasta water and lemon juice, then toss in drained linguine, remaining cold butter, Parmigiano, and cooked shrimp for 60 seconds.',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: 'crispy-skillet-tuna-melt-sandwich-for-quick-dinner',
    slug: 'crispy-skillet-tuna-melt-sandwich-for-quick-dinner',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 10-Minute Skillet Sandwiches',
    titleEn: 'Crispy Skillet Tuna Melt Sandwich for a Quick Dinner',
    subtitleEn:
      'Pantry albacore tuna tossed with lemon, celery, and Dijon, layered with sharp aged cheddar on sourdough and pan-toasted in butter until golden.',
    targetKeywordEn: 'quick tuna and cheese dinner sandwich',
    shortVideoConceptEn:
      'Crisp ASMR knife cut slicing the pan-toasted sourdough tuna melt diagonally in half, pulling the two halves apart to show the golden crust and stretchy melted cheddar.',
    internalLinks: [
      {
        slug: 'crispy-ground-beef-and-melted-cheese-tortilla-wraps-dinner',
        titleEn: 'Crispy Ground Beef & Melted Cheese Tortilla Wraps',
        contextEn: 'Another 15-minute crispy pan-toasted melted cheese dinner favorite.',
      },
      {
        slug: 'quick-15-minute-red-lentil-soup-with-lemon-and-cumin',
        titleEn: 'Quick 15-Minute Red Lentil Soup with Lemon & Cumin',
        contextEn: 'Pair half a crispy tuna melt with a warm bowl of our 15-minute lemon red lentil soup.',
      },
    ],
    wordCount: 1110,
    introParagraphsEn: [
      'A quick tuna and cheese dinner sandwich turns two cans of pantry tuna into a hot, gourmet bistro meal in 10 minutes. The key to a tuna melt that stays crisp from edge to edge is draining the tuna thoroughly and layering a slice of sharp cheddar on BOTH sides of the tuna salad—creating a moisture barrier that protects the sourdough bread.',
      'Toasting the sandwich over medium-low heat in a cast-iron skillet with a lid loosely tented for the final 90 seconds melts the cheddar completely without scorching the buttered sourdough crust.',
    ],
    whyThisWorksEn: [
      'Double-sided cheese barrier locks the tuna filling inside and keeps the sourdough crisp.',
      'Greek yogurt + a touch of mayo and Dijon balances richness with high protein.',
      'Ready in 10 minutes using shelf-stable pantry tuna.',
    ],
    chefTipsEn: [
      'Press the lid of the tuna can firmly after opening to squeeze out all excess packing water or oil so the salad is never watery.',
      'Finely diced celery, red onion, or capers add essential crunch against the melted cheddar.',
      'Toast over medium-low heat (not high heat) so the interior cheddar reaches melting temperature simultaneously with the golden sourdough exterior.',
    ],
    usdaSafetyNoteEn:
      'USDA Pantry & Seafood Storage Guideline: Once opened, transfer unused canned tuna to a sealed glass or plastic container, refrigerate at 4°C (39°F) or below, and consume within 3 days.',
    substitutions: [
      {
        originalEn: 'Mayonnaise (30g / 2 Tbsp)',
        substituteEn: 'Full-Fat Plain Greek Yogurt (30g) or Mashed Avocado',
        chefNoteEn: 'Greek yogurt cuts saturated fat while adding tangy brightness.',
      },
      {
        originalEn: 'Sharp Aged Cheddar Slices (80g)',
        substituteEn: 'Gruyère, Swiss, or Provolone Cheese Slices (80g)',
        chefNoteEn: 'Gruyère and Swiss give a classic French bistro flavor profile.',
      },
      {
        originalEn: 'Thick-Cut Sourdough Bread (4 slices)',
        substituteEn: 'Whole-Grain Rye Bread or Low-Carb Tortilla Wraps',
        chefNoteEn: 'Sturdy artisanal slices hold up best in a cast-iron skillet.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I keep a skillet tuna melt from getting soggy?',
        answerEn:
          'Drain the canned tuna thoroughly, go light on the mayonnaise/yogurt binder, and place a slice of cheese directly against both inner faces of the bread to shield the crumb from moisture.',
      },
      {
        questionEn: 'Should I use water-packed or olive-oil-packed canned tuna?',
        answerEn:
          'Both work well! Olive-oil-packed albacore or skipjack tuna has a richer, flakier texture and requires less added mayonnaise.',
      },
      {
        questionEn: 'Can I make the tuna salad mixture ahead of time?',
        answerEn:
          'Yes, mix the drained tuna, celery, Dijon, and lemon juice up to 2 days ahead and store in a sealed container at 4°C (39°F), then assemble and grill fresh in 6 minutes.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 4,
    cookMinutes: 6,
    calories: 480,
    proteinGrams: 39,
    netCarbsGrams: 34,
    image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 12-Inch Cast-Iron Griddle & Skillet',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Solid albacore tuna, thoroughly drained (2 cans)', amount: 240, unit: 'g' },
      { item: 'Greek yogurt (or mayo), Dijon mustard & fresh lemon juice', amount: 45, unit: 'g' },
      { item: 'Finely diced celery stalk, capers & chopped parsley', amount: 40, unit: 'g' },
      { item: 'Sharp aged cheddar or Swiss cheese (4 slices)', amount: 90, unit: 'g' },
      { item: 'Thick-sliced sourdough bread (4 slices) & softened butter', amount: 180, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Flake Drained Tuna with Lemon, Dijon & Celery',
        instruction:
          'Drain tuna completely, then fold with Greek yogurt (or mayo), Dijon mustard, lemon juice, finely diced celery, and black pepper.',
        timerSeconds: 180,
      },
      {
        title: 'Double-Cheese Barrier Assembly on Sourdough',
        instruction:
          'Butter the outer faces of 4 sourdough slices. Place 1 cheese slice on the bottom bread, spread the tuna salad evenly, top with a second cheese slice, and close.',
        timerSeconds: 60,
      },
      {
        title: 'Pan-Toast Over Medium-Low Heat & Slice in Half',
        instruction:
          'Toast in a skillet over medium-low heat for 3 minutes per side (covering loosely for the final minute) until golden brown and cheese is molten. Slice diagonally.',
        timerSeconds: 360,
      },
    ],
  },
  {
    id: 'quick-15-minute-red-lentil-soup-with-lemon-and-cumin',
    slug: 'quick-15-minute-red-lentil-soup-with-lemon-and-cumin',
    category: 'healthy-diet',
    subcategoryId: 'vegan-vegetarian',
    categoryLabelEn: 'Healthy & Diet · 15-Minute Healthy Soups',
    titleEn: 'Quick 15-Minute Red Lentil Soup with Lemon & Toasted Cumin',
    subtitleEn:
      'Split red lentils simmer into a velvety, high-fiber Mediterranean soup in just 12 minutes—finished with warm cumin, turmeric, and fresh lemon juice.',
    targetKeywordEn: 'quick lentil soup for healthy dinner',
    shortVideoConceptEn:
      'Warm overhead shot blooming cumin and garlic in olive oil, simmering coral-red split lentils until golden and creamy, and ladling into a bowl with a fresh squeeze of lemon juice.',
    internalLinks: [
      {
        slug: 'crispy-skillet-tuna-melt-sandwich-for-quick-dinner',
        titleEn: 'Crispy Skillet Tuna Melt Sandwich for a Quick Dinner',
        contextEn: 'Serve a bowl of this 15-minute lemon lentil soup alongside a crispy half tuna melt.',
      },
      {
        slug: '15-minute-mediterranean-spiced-chickpea-spinach-feta-skillet',
        titleEn: '15-Minute Mediterranean Crispy Chickpea, Spinach & Feta Skillet',
        contextEn: 'Love 15-minute Mediterranean plant-protein dinners? Try our crispy chickpea and feta skillet.',
      },
      {
        slug: 'ultimate-freezer-meal-prep-guide-how-to-freeze-and-thaw-cooked-food',
        titleEn: 'Complete Freezer Meal-Prep Handbook',
        contextEn: 'Red lentil soup freezes beautifully for up to 3 months—see our freezer storage guide.',
      },
    ],
    wordCount: 1170,
    introParagraphsEn: [
      'Unlike brown or green lentils that take 40 minutes to soften, split red lentils have had their outer hulls removed so they cook to a naturally creamy texture in 12 minutes with zero soaking required. That makes this quick lentil soup for a healthy dinner one of the fastest plant-based meals you can cook on a weeknight.',
      'Blooming ground cumin, coriander, and turmeric in warm extra-virgin olive oil with onion and garlic for 60 seconds before pouring in the broth unlocks fat-soluble aromatics, while a generous squeeze of fresh lemon juice at the very end brightens the earthy lentils.',
    ],
    whyThisWorksEn: [
      'Split red lentils cook in 12 minutes without presoaking and thicken the broth naturally.',
      'Packs 18g of plant protein and 11g of dietary fiber per bowl.',
      'Finishing with fresh lemon juice off the heat preserves vitamin C and bright citrus flavor.',
    ],
    chefTipsEn: [
      'Rinse split red lentils in a fine-mesh strainer under cold running water for 20 seconds until the water runs clear to prevent excess foam.',
      'Add acidic ingredients like fresh lemon juice only AFTER the lentils are fully tender—acid added early can slow down legume softening.',
      'For an ultra-velvety texture, pulse the pot twice with an immersion blender (or whisk vigorously for 15 seconds) right before ladling.',
    ],
    usdaSafetyNoteEn:
      'USDA Soup Storage & Cooling Guideline: Divide hot soup into shallow containers so it cools quickly, refrigerate at 4°C (39°F) within 2 hours, and reheat to a rolling boil (74°C / 165°F).',
    substitutions: [
      {
        originalEn: 'Split Red Lentils (220g / 1 Cup)',
        substituteEn: 'Yellow Split Moong Dal (220g)',
        chefNoteEn: 'Yellow split lentils cook in the same 12–14 minute timeframe.',
      },
      {
        originalEn: 'Low-Sodium Vegetable Broth (950ml)',
        substituteEn: 'Low-Sodium Chicken Bone Broth (950ml)',
        chefNoteEn: 'Bone broth adds an extra 9g of collagen protein per serving.',
      },
      {
        originalEn: 'Fresh Lemon Juice (30ml)',
        substituteEn: 'Fresh Lime Juice (30ml) + 1/2 tsp Sumac',
        chefNoteEn: 'Sumac adds a tangy Levantine citrus note.',
      },
    ],
    faqs: [
      {
        questionEn: 'Do I need to soak red lentils before making 15-minute lentil soup?',
        answerEn:
          'No! Split red lentils are hulled and thin; simply rinse them in cold water and simmer directly in broth for 12 minutes.',
      },
      {
        questionEn: 'Why did my lentils stay hard in the soup?',
        answerEn:
          'Either old lentils were used or lemon juice/tomato acid was added at the beginning of cooking. Always simmer red lentils in broth first and stir in lemon juice at the end.',
      },
      {
        questionEn: 'Can I freeze this lemon red lentil soup?',
        answerEn:
          'Yes, red lentil soup is one of the best freezer meals. Cool completely, leave 2.5cm headspace in freezer containers, and freeze at -18°C (0°F) for up to 3 months.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/hero_cookreel_studio_1795527112508.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 3,
    cookMinutes: 12,
    calories: 320,
    proteinGrams: 18,
    netCarbsGrams: 42,
    image: '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    gearItem: {
      id: 'gear-enameled-skillet',
      nameEn: '4-Quart Enameled Cast-Iron Dutch Oven Soup Pot',
      brand: 'Staub Culinary',
      priceUsd: 165,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Split red lentils, rinsed in cold water', amount: 220, unit: 'g' },
      { item: 'Finely diced yellow onion, grated carrot & 3 minced garlic cloves', amount: 160, unit: 'g' },
      { item: 'Ground toasted cumin (2 tsp), turmeric (1/2 tsp) & smoked paprika', amount: 12, unit: 'g' },
      { item: 'Low-sodium vegetable or chicken broth', amount: 950, unit: 'ml' },
      { item: 'Freshly squeezed lemon juice & extra-virgin olive oil', amount: 45, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Bloom Onion, Garlic, Cumin & Turmeric in Olive Oil',
        instruction:
          'Sauté diced onion and grated carrot in olive oil for 2 minutes, then stir in minced garlic, ground cumin, and turmeric for 45 seconds until fragrant.',
        timerSeconds: 165,
      },
      {
        title: 'Simmer Rinsed Split Red Lentils for 12 Minutes',
        instruction:
          'Pour in rinsed red lentils and broth. Bring to a boil, cover partially, and simmer over medium-low heat for 12 minutes until lentils break down into a creamy soup.',
        timerSeconds: 720,
      },
      {
        title: 'Whisk Smooth & Squeeze Fresh Lemon Juice',
        instruction:
          'Remove from heat, whisk vigorously (or pulse briefly) for a velvety texture, and stir in fresh lemon juice and chopped parsley before ladling.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'quick-4-ingredient-crispy-chicken-cheese-quesadilla',
    slug: 'quick-4-ingredient-crispy-chicken-cheese-quesadilla',
    category: 'quick-easy',
    subcategoryId: '5-ingredient-recipes',
    categoryLabelEn: 'Quick & Easy · 4-Ingredient Skillet Meals',
    titleEn: 'Crispy 4-Ingredient Chicken & Cheese Quesadilla for Beginners',
    subtitleEn:
      'Learn how to make a golden, crispy chicken and melted cheese quesadilla in 10 minutes with just 4 ingredients and clean triangle slices.',
    targetKeywordEn: 'quick chicken quesadilla recipe for beginners',
    shortVideoConceptEn:
      'Beginner-friendly overhead shot layering cheese, seasoned shredded chicken, and more cheese onto half a tortilla, folding in half to toast golden brown, and slicing into 4 even triangles with a side of salsa.',
    internalLinks: [
      {
        slug: 'one-pan-lemon-garlic-chicken-dinner-in-15-minutes',
        titleEn: 'One-Pan Lemon Garlic Chicken Skillet Dinner in 15 Minutes',
        contextEn: 'Use leftover cooked chicken from our 15-minute lemon garlic chicken skillet inside these quesadillas.',
      },
      {
        slug: 'crispy-ground-beef-and-melted-cheese-tortilla-wraps-dinner',
        titleEn: 'Crispy Ground Beef & Melted Cheese Tortilla Wraps',
        contextEn: 'Want a hearty ground beef wrap variation? Check out our crispy beef and cheddar tortilla wraps.',
      },
    ],
    wordCount: 1130,
    introParagraphsEn: [
      'This quick chicken quesadilla recipe for beginners uses the “half-moon fold” technique so you never have to flip two separate stacked tortillas in a hot pan. By filling only one half of a large flour tortilla and folding the empty half over the top, you can flip the quesadilla in one smooth motion with zero spilled filling.',
      'With just 4 ingredients—flour tortillas, cooked shredded chicken, freshly grated Monterey Jack/Cheddar cheese, and your favorite salsa or taco seasoning—you get a shatteringly crisp exterior and molten cheese pull in 10 minutes.',
    ],
    whyThisWorksEn: [
      'Half-moon single-tortilla fold makes flipping effortless for beginners.',
      'Requires only 4 core ingredients and 10 minutes total time.',
      'Layering cheese both below and above the chicken glues the tortilla halves together.',
    ],
    chefTipsEn: [
      'Always put a layer of shredded cheese on the bottom tortilla, then the chicken, then a second layer of cheese on top so both sides stick together when folded.',
      'Cook over medium heat (not high heat) in a dry or lightly buttered skillet so the tortilla turns evenly golden while the center cheese melts.',
      'Use a pizza wheel or long chef knife to cut each half-moon quesadilla into 3 or 4 clean, equal triangles.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: If cooking raw chicken strips for the filling, verify they reach 74°C (165°F) first; when reheating pre-cooked shredded chicken inside the quesadilla, heat until steaming hot throughout.',
    substitutions: [
      {
        originalEn: 'Cooked Shredded or Diced Chicken Breast (250g)',
        substituteEn: 'Rotisserie Chicken, Turkey Breast, or Black Beans (250g)',
        chefNoteEn: 'Store-bought rotisserie chicken reduces prep time to 2 minutes.',
      },
      {
        originalEn: 'Monterey Jack & Mild Cheddar Cheese Blend (140g)',
        substituteEn: 'Oaxaca Cheese, Mozzarella, or Pepper Jack (140g)',
        chefNoteEn: 'Monterey Jack and Oaxaca have the highest meltability for classic cheese pulls.',
      },
      {
        originalEn: '10-Inch Flour Tortillas (2 large tortillas)',
        substituteEn: 'Corn Tortillas or Gluten-Free Cassava Tortillas',
        chefNoteEn: 'Warm corn tortillas first so they fold without splitting.',
      },
    ],
    faqs: [
      {
        questionEn: 'What is the easiest way to flip a quesadilla without the filling falling out?',
        answerEn:
          'Fill only half of a single tortilla and fold the other half over like a book (half-moon style). Slide your spatula under the folded edge and flip toward the open edge.',
      },
      {
        questionEn: 'Should I use butter or oil in the skillet for crispy quesadillas?',
        answerEn:
          'A thin 1-teaspoon swipe of unsalted butter or avocado oil in a cast-iron skillet produces golden, blistered crunch without greasiness.',
      },
      {
        questionEn: 'How do I keep cooked quesadillas crispy if making several batches?',
        answerEn:
          'Place finished quesadillas on a wire cooling rack set over a sheet pan in a warm 95°C (200°F) oven—stacking them on a cold plate traps steam and softens the crust.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 4,
    cookMinutes: 6,
    calories: 460,
    proteinGrams: 37,
    netCarbsGrams: 29,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 12-Inch Cast-Iron Griddle & Comal',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Cooked shredded or finely diced seasoned chicken breast', amount: 250, unit: 'g' },
      { item: 'Freshly shredded Monterey Jack & cheddar cheese', amount: 140, unit: 'g' },
      { item: 'Large 10-inch flour tortillas (2 tortillas)', amount: 130, unit: 'g' },
      { item: 'Fire-roasted tomato salsa & 10g butter for skillet', amount: 90, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Warm Tortilla & Layer Cheese-Chicken-Cheese on One Half',
        instruction:
          'Warm a large tortilla in a lightly buttered skillet over medium heat for 30 seconds. Sprinkle cheese on one half, add seasoned chicken, and top with a second layer of cheese.',
        timerSeconds: 90,
      },
      {
        title: 'Half-Moon Fold & Crisp 2 Minutes Per Side',
        instruction:
          'Fold the empty half of the tortilla over the filling, press gently with a spatula, and toast for 2 minutes per side until golden and crispy.',
        timerSeconds: 240,
      },
      {
        title: 'Rest 60 Seconds & Slice into Equal Triangles',
        instruction:
          'Transfer to a cutting board, rest 60 seconds so the melted cheese sets slightly, and slice into 4 even triangles. Serve warm with salsa.',
        timerSeconds: 60,
      },
    ],
  },
  // ============================================================================
  // LATEST & BEST OF NOVEMBER 2026 — SEASONAL & TRENDING WEEKNIGHT RECIPES (8 NEW GUIDES)
  // ============================================================================
  {
    id: 'november-maple-mustard-glazed-salmon-roasted-brussels-sprouts',
    slug: 'november-maple-mustard-glazed-salmon-roasted-brussels-sprouts',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · November 2026 Seasonal Skillet',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: '15-Minute Maple Dijon Glazed Salmon & Crispy Brussels Sprouts Skillet',
    subtitleEn:
      'Sear flaky wild salmon fillets and halved autumn Brussels sprouts in one cast-iron skillet, finished with a glossy pure maple syrup, Dijon mustard, and apple cider pan glaze.',
    targetKeywordEn: 'maple dijon salmon and brussels sprouts one pan november dinner',
    shortVideoConceptEn:
      'Overhead close-up placing halved Brussels sprouts cut-side down around two center salmon fillets in a cast-iron skillet, then brushing the bubbling maple-Dijon glaze over the fish during the final 90 seconds.',
    internalLinks: [
      {
        slug: '15-minute-crispy-cast-iron-salmon-lemon-caper',
        titleEn: '15-Minute Crispy Cast-Iron Salmon with Lemon Caper Butter',
        contextEn: 'Love crispy skillet salmon? Compare this autumn maple-Dijon glaze with our classic Mediterranean lemon caper butter technique.',
      },
      {
        slug: 'crispy-air-fryer-honey-garlic-salmon-in-10-minutes',
        titleEn: 'Crispy Honey Garlic Salmon in the Air Fryer in 10 Minutes',
        contextEn: 'Cooking in an Air Fryer instead of a skillet? Follow our 10-minute air fryer salmon guide.',
      },
    ],
    wordCount: 1220,
    introParagraphsEn: [
      'As chilly November evenings set in, nothing beats a one-pan dinner that pairs rich omega-3 salmon with deeply caramelized seasonal Brussels sprouts in just 15 minutes. By placing the halved Brussels sprouts cut-side down in the hot skillet alongside the salmon fillets, the sprouts blister and sweeten in the rendered salmon drippings.',
      'During the final 90 seconds of cooking, a simple 3-ingredient November glaze of pure Grade-A maple syrup, whole-grain Dijon mustard, and a splash of apple cider vinegar reduces into a glossy, savory-sweet coating that clings to both the flaky salmon and crispy sprouts.',
    ],
    whyThisWorksEn: [
      'Halved Brussels sprouts sear cut-side down in the same skillet—zero extra sheet pans to wash.',
      'Dijon mustard emulsifies the pure maple syrup so the glaze coats the fish without burning.',
      'Ready from prep to table in 15 minutes with 41g protein per serving.',
    ],
    chefTipsEn: [
      'Trim the dry base off the Brussels sprouts and slice them lengthwise so every piece has a flat surface for maximum cast-iron browning.',
      'Wait until the final 90 seconds to pour in the maple-Dijon glaze so the natural maple sugars caramelize into a lacquer without scorching.',
      'Finish with flaky sea salt and cracked black pepper right off the heat to balance the maple sweetness.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Cook salmon fillets to a safe minimum internal temperature of 63°C (145°F) at the thickest center point, where the flesh flakes easily with a fork.',
    substitutions: [
      {
        originalEn: 'Pure Maple Syrup (30ml / 2 tbsp)',
        substituteEn: 'Raw Honey or Sugar-Free Maple Syrup (30ml)',
        chefNoteEn: 'Raw honey produces an equally glossy glaze; keto maple syrup keeps net carbs under 6g.',
      },
      {
        originalEn: 'Fresh Brussels Sprouts, Halved (280g)',
        substituteEn: 'Broccoli Florets or Cubed Butternut Squash (280g)',
        chefNoteEn: 'Cut broccoli or squash into bite-sized 2cm florets so they tenderize in the same 10-minute cook window.',
      },
      {
        originalEn: 'Dijon Mustard (20g) + Apple Cider Vinegar (10ml)',
        substituteEn: 'Whole-Grain Stone-Ground Mustard + Fresh Lemon Juice',
        chefNoteEn: 'Provides the same bright acidity and mustard-seed texture.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I make Brussels sprouts tender inside and crispy outside in a skillet?',
        answerEn:
          'Sear them cut-side down undisturbed in hot oil for 5 minutes until charred, then add 2 tablespoons of water or broth and cover for 2 minutes before glazing.',
      },
      {
        questionEn: 'Can I bake this maple Dijon salmon on a sheet pan in the oven?',
        answerEn:
          'Yes! Roast the halved Brussels sprouts at 205°C (400°F) for 10 minutes first, push them to the edges, add the glazed salmon fillets, and roast 10 to 12 minutes more.',
      },
      {
        questionEn: 'Does maple syrup make the salmon taste overly sweet?',
        answerEn:
          'No—pairing 2 tablespoons of pure maple syrup with sharp Dijon mustard, garlic, and apple cider vinegar creates a balanced savory-tangy glaze.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_crispy_salmon_1795527113114.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 495,
    proteinGrams: 41,
    netCarbsGrams: 16,
    image: '/images/recipe_crispy_salmon_1795527113114.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 12-Inch Cast-Iron Skillet',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Center-cut wild or Atlantic salmon fillets (2 fillets)', amount: 360, unit: 'g' },
      { item: 'Fresh November Brussels sprouts, trimmed & halved lengthwise', amount: 280, unit: 'g' },
      { item: 'Pure Grade-A amber maple syrup', amount: 30, unit: 'ml' },
      { item: 'Smooth or whole-grain Dijon mustard', amount: 20, unit: 'g' },
      { item: 'Apple cider vinegar & 2 minced garlic cloves', amount: 15, unit: 'ml' },
      { item: 'Avocado or extra-virgin olive oil, kosher salt & black pepper', amount: 15, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Sear Salmon Skin-Side Down & Brussels Sprouts Cut-Side Down',
        instruction:
          'Heat oil in a 12-inch skillet over medium-high heat. Place salmon skin-side down in the center and arrange halved Brussels sprouts cut-side down around the perimeter. Sear 5 minutes.',
        timerSeconds: 300,
      },
      {
        title: 'Flip Salmon & Toss Brussels Sprouts with Garlic',
        instruction:
          'Flip the salmon fillets and stir the charred Brussels sprouts with minced garlic. Cook for 3 minutes until the sprouts are crisp-tender.',
        timerSeconds: 180,
      },
      {
        title: 'Brush Maple-Dijon Glaze & Verify 63°C (145°F)',
        instruction:
          'Whisk maple syrup, Dijon mustard, and apple cider vinegar. Pour over the salmon and sprouts, basting for 90 seconds until glossy and internal salmon temp reaches 63°C (145°F).',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: 'november-herb-butter-turkey-or-chicken-cutlets-cranberry-pan-sauce',
    slug: 'november-herb-butter-turkey-or-chicken-cutlets-cranberry-pan-sauce',
    category: 'quick-easy',
    subcategoryId: 'one-pan-dinners',
    categoryLabelEn: 'Quick & Easy · November Holiday Skillet',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: '20-Minute Pan-Seared Herb Butter Turkey & Chicken Cutlets with Cranberry Shallot Jus',
    subtitleEn:
      'All the festive flavor of a November Thanksgiving roast in 20 minutes—golden pan-seared turkey or chicken breast cutlets topped with a ruby cranberry, rosemary, and shallot pan sauce.',
    targetKeywordEn: 'quick pan seared turkey cutlets cranberry pan sauce weeknight dinner',
    shortVideoConceptEn:
      'Searing thin poultry cutlets golden in foaming rosemary butter, deglazing the pan with chicken stock and tart cranberries until they burst, and spooning the ruby sauce over the sliced cutlets.',
    internalLinks: [
      {
        slug: 'one-pan-lemon-garlic-chicken-dinner-in-15-minutes',
        titleEn: 'One-Pan Lemon Garlic Chicken Skillet Dinner in 15 Minutes',
        contextEn: 'Prefer a bright citrus pan sauce? Try our 15-minute one-pan lemon garlic chicken skillet.',
      },
      {
        slug: 'sheet-pan-spiced-chicken-breast-and-potatoes-oven-dinner',
        titleEn: 'Sheet-Pan Spiced Chicken Breast & Crispy Potatoes Oven Dinner',
        contextEn: 'Pair these cranberry-glazed cutlets with crispy oven-roasted potatoes from our sheet-pan guide.',
      },
    ],
    wordCount: 1190,
    introParagraphsEn: [
      'You do not need to roast a whole bird for four hours to enjoy the signature flavors of November on a Tuesday night. Thinly sliced turkey breast cutlets (or chicken breast cutlets) sear to golden perfection in just 4 minutes per side in a heavy skillet.',
      'Once the cutlets rest on a warm platter, finely diced shallots, fresh rosemary needles, chicken bone broth, and a handful of tart cranberries (fresh or dried) deglaze the savory browned pan drippings into a glossy, restaurant-grade November pan jus in under 6 minutes.',
    ],
    whyThisWorksEn: [
      'Delivers classic November turkey-and-cranberry flavor in 20 minutes without heating the oven.',
      'Thin 1.5cm cutlets cook evenly and stay remarkably juicy at 74°C (165°F).',
      'Cold butter whisked into the cranberry broth creates a velvety emulsion without flour.',
    ],
    chefTipsEn: [
      'Pat the turkey or chicken cutlets completely dry and season with kosher salt and rubbed sage 5 minutes before searing.',
      'If using fresh November cranberries, simmer them in the broth for 4 minutes until their skins pop and naturally thicken the sauce with pectin.',
      'Turn off the burner before swirling in the final tablespoon of cold butter so the ruby sauce shines.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always verify turkey or chicken breast cutlets reach an internal temperature of 74°C (165°F) with a digital food thermometer before serving.',
    substitutions: [
      {
        originalEn: 'Turkey Breast Cutlets (400g)',
        substituteEn: 'Thin-Sliced Chicken Breast Cutlets or Pork Loin Medallions (400g)',
        chefNoteEn: 'Chicken cutlets cook in the exact same 8-minute skillet window.',
      },
      {
        originalEn: 'Fresh or Frozen Cranberries (100g) + 15ml Maple/Honey',
        substituteEn: 'Whole-Berry Cranberry Sauce (90g) or Dried Cranberries (70g)',
        chefNoteEn: 'If using prepared cranberry sauce, omit the extra sweetener and whisk directly into the broth.',
      },
      {
        originalEn: 'Fresh Rosemary & Sage Leaves',
        substituteEn: 'Fresh Thyme Sprigs or 1 tsp Dried Poultry Seasoning',
        chefNoteEn: 'Poultry seasoning blends sage, thyme, and marjoram for instant autumn aroma.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I prevent turkey breast cutlets from drying out in a skillet?',
        answerEn:
          'Sear over medium-high heat for only 3.5 to 4 minutes per side and pull them from the skillet the moment an instant-read thermometer hits 74°C (165°F).',
      },
      {
        questionEn: 'Can I use leftover Thanksgiving cranberry sauce for the pan jus?',
        answerEn:
          'Yes! Whisk 3 tablespoons of leftover cranberry sauce with 120ml chicken broth and 1 teaspoon Dijon mustard directly in the hot skillet.',
      },
      {
        questionEn: 'What side dishes pair best with cranberry herb cutlets?',
        answerEn:
          'Creamy garlic mashed potatoes, roasted sweet potatoes, or steamed green beans soak up the tangy cranberry-shallot pan sauce wonderfully.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Elena Rostova',
    authorRoleEn: 'Senior Recipe Developer & Food Science Editor',
    prepMinutes: 6,
    cookMinutes: 14,
    calories: 430,
    proteinGrams: 44,
    netCarbsGrams: 14,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 12-Inch Cast-Iron Skillet',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Turkey breast cutlets or thin chicken breast cutlets', amount: 400, unit: 'g' },
      { item: 'Fresh or frozen cranberries (or 85g whole-berry cranberry sauce)', amount: 100, unit: 'g' },
      { item: 'Low-sodium chicken bone broth', amount: 140, unit: 'ml' },
      { item: 'Finely minced shallot & fresh rosemary/sage leaves', amount: 45, unit: 'g' },
      { item: 'Unsalted butter, divided (for searing & sauce finish)', amount: 28, unit: 'g' },
      { item: 'Pure honey or maple syrup & 1 tsp Dijon mustard', amount: 15, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Sear Seasoned Cutlets 4 Minutes Per Side to 74°C (165°F)',
        instruction:
          'Season turkey or chicken cutlets with salt, pepper, and sage. Sear in 14g butter and a splash of oil over medium-high heat for 4 minutes per side until 74°C (165°F). Transfer to a warm plate.',
        timerSeconds: 480,
      },
      {
        title: 'Sauté Shallots, Rosemary & Simmer Cranberries in Broth',
        instruction:
          'Add minced shallot and rosemary to the skillet for 60 seconds, then pour in chicken broth, cranberries, honey, and Dijon. Simmer 4 minutes until cranberries burst and thicken.',
        timerSeconds: 240,
      },
      {
        title: 'Swirl Cold Butter & Spoon Ruby Jus Over Cutlets',
        instruction:
          'Remove skillet from heat, swirl in the remaining 14g cold butter until glossy, and spoon generously over the rested cutlets.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'november-creamy-roasted-butternut-squash-sage-parmesan-pasta',
    slug: 'november-creamy-roasted-butternut-squash-sage-parmesan-pasta',
    category: 'quick-easy',
    subcategoryId: '5-ingredient-recipes',
    categoryLabelEn: 'Quick & Easy · November Autumn Pasta',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: 'Creamy Roasted Butternut Squash, Crispy Sage & Parmigiano Pasta in 20 Minutes',
    subtitleEn:
      'Velvety golden butternut squash and nutty brown-butter crispy sage leaves coat al dente pasta ribbons with aged Parmigiano-Reggiano—our #1 cozy November vegetarian pasta.',
    targetKeywordEn: 'creamy butternut squash sage pasta 20 minute november recipe',
    shortVideoConceptEn:
      'Frying whole fresh sage leaves in foaming brown butter for 15 seconds, blending tender roasted butternut squash with starchy pasta water and Parmigiano, and tossing with glossy pasta ribbons.',
    internalLinks: [
      {
        slug: '5-ingredient-creamy-spinach-pasta-weeknight-dinner',
        titleEn: '5-Ingredient Creamy Spinach & Cream Cheese Weeknight Pasta',
        contextEn: 'Need an even faster 12-minute greens pasta? Check out our 5-ingredient creamy spinach pasta.',
      },
      {
        slug: '5-ingredient-creamy-black-truffle-parmigiano-tagliatelle',
        titleEn: '5-Ingredient Creamy Black Truffle & Parmigiano Tagliatelle',
        contextEn: 'Explore our signature Parmigiano emulsion method in our black truffle tagliatelle guide.',
      },
    ],
    wordCount: 1175,
    introParagraphsEn: [
      'Butternut squash reaches its peak sweetness in November, making it the ultimate natural base for a rich, velvety pasta sauce that requires almost no heavy cream. When tender cooked squash is blended or mashed with starchy pasta cooking water, nutty brown butter, and freshly grated Parmigiano-Reggiano, it transforms into a silky golden sauce.',
      'To elevate the dish to trattoria quality in 20 minutes, whole fresh sage leaves are crisped in foaming butter before building the sauce, then crumbled on top for an aromatic, earthy crunch in every bite.',
    ],
    whyThisWorksEn: [
      'Uses naturally sweet November butternut squash and pasta water for creaminess without feeling heavy.',
      'Crisping fresh sage in brown butter infuses the entire sauce with toasted autumn aroma.',
      'Can be made in 20 minutes using pre-cubed fresh or steamed-in-bag butternut squash.',
    ],
    chefTipsEn: [
      'Buy pre-peeled, cubed butternut squash (or steam-in-bag squash) on busy weeknights to cut prep time down to 2 minutes.',
      'Watch the butter closely when crisping the sage leaves—once the milk solids turn hazelnut brown and smell nutty, add the squash immediately to stop the browning.',
      'A tiny pinch of freshly grated nutmeg brings out the natural caramel notes of November squash.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Refrigerate leftover butternut squash pasta in shallow airtight containers within 2 hours and reheat to 74°C (165°F) with a splash of milk or water.',
    substitutions: [
      {
        originalEn: 'Cubed Butternut Squash, Cooked Tender (350g)',
        substituteEn: '100% Pure Canned Pumpkin Puree or Honeynut Squash (320g)',
        chefNoteEn: 'Unsweetened canned pumpkin puree reduces cooking time to 12 minutes total.',
      },
      {
        originalEn: 'Aged Parmigiano-Reggiano (70g)',
        substituteEn: 'Pecorino Romano or Aged White Cheddar (70g)',
        chefNoteEn: 'Pecorino adds a sharper salty finish that contrasts beautifully with sweet squash.',
      },
      {
        originalEn: 'Tagliatelle, Fettuccine, or Rigatoni Pasta (250g)',
        substituteEn: 'Chickpea Protein Pasta or Gluten-Free Rigatoni (250g)',
        chefNoteEn: 'Chickpea pasta boosts total protein to 26g per serving.',
      },
    ],
    faqs: [
      {
        questionEn: 'Can I use canned pumpkin puree instead of fresh butternut squash?',
        answerEn:
          'Yes! Stir 1 cup (240g) of 100% pure unsweetened pumpkin puree directly into the brown-butter sage pan with 150ml starchy pasta water and Parmigiano.',
      },
      {
        questionEn: 'How do I keep the sage leaves crispy?',
        answerEn:
          'Fry the dry sage leaves in foaming butter for 15 to 20 seconds, then transfer them to a paper-towel-lined plate with a slotted spoon and garnish the pasta right before serving.',
      },
      {
        questionEn: 'What protein can I add to butternut squash pasta?',
        answerEn:
          'Crispy browned Italian chicken sausage, rotisserie shredded chicken, or toasted walnuts add wonderful texture and protein.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_truffle_pasta_1795527116427.jpg',
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Elena Rostova',
    authorRoleEn: 'Senior Recipe Developer & Food Science Editor',
    prepMinutes: 5,
    cookMinutes: 15,
    calories: 510,
    proteinGrams: 19,
    netCarbsGrams: 54,
    image: '/images/recipe_truffle_pasta_1795527116427.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Heavy Stainless Steel Saucier & Pasta Pan',
      brand: 'All-Clad Culinary',
      priceUsd: 95,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Dry tagliatelle, fettuccine, or rigatoni pasta', amount: 250, unit: 'g' },
      { item: 'Peeled & cubed November butternut squash (steamed or roasted tender)', amount: 350, unit: 'g' },
      { item: 'Unsalted butter & 14 whole fresh sage leaves', amount: 35, unit: 'g' },
      { item: 'Freshly grated Parmigiano-Reggiano cheese', amount: 70, unit: 'g' },
      { item: 'Minced garlic (2 cloves), pinch of nutmeg & black pepper', amount: 12, unit: 'g' },
      { item: 'Reserved starchy pasta cooking water', amount: 160, unit: 'ml' },
    ],
    stepsEn: [
      {
        title: 'Boil Pasta & Crisp Fresh Sage in Brown Butter',
        instruction:
          'Boil pasta in salted water until al dente, reserving 160ml pasta water. In a wide skillet, melt butter over medium heat until foaming and nutty, then crisp whole sage leaves for 20 seconds and set sage aside.',
        timerSeconds: 480,
      },
      {
        title: 'Mash or Blend Tender Squash with Garlic & Pasta Water',
        instruction:
          'Sauté garlic in the brown butter for 30 seconds, add the tender cooked butternut squash and 120ml pasta water, and mash (or blend smooth) into a velvety golden sauce.',
        timerSeconds: 240,
      },
      {
        title: 'Emulsify with Parmigiano & Top with Crispy Sage',
        instruction:
          'Toss hot drained pasta and grated Parmigiano into the squash sauce off the heat, adding extra pasta water as needed. Crown with crispy sage leaves and black pepper.',
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'november-keto-rosemary-garlic-butter-steak-bites-mushrooms',
    slug: 'november-keto-rosemary-garlic-butter-steak-bites-mushrooms',
    category: 'healthy-diet',
    subcategoryId: 'keto-low-carb',
    categoryLabelEn: 'Healthy & Diet · November Keto Skillet',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: '15-Minute Rosemary Garlic Butter Steak Bites & Caramelized Cremini Mushrooms',
    subtitleEn:
      'High-protein, low-carb cubed sirloin or ribeye steak bites seared in a smoking-hot cast-iron skillet with earthy November cremini mushrooms and rosemary garlic herb butter.',
    targetKeywordEn: 'garlic butter steak bites and mushrooms cast iron skillet november',
    shortVideoConceptEn:
      'Browning quartered cremini mushrooms first, searing 3cm steak cubes undisturbed for 90 seconds until a deep mahogany crust forms, and tossing together in foaming rosemary garlic butter.',
    internalLinks: [
      {
        slug: 'keto-garlic-herb-butter-ribeye-steak-high-protein',
        titleEn: 'Keto Garlic Herb Butter Cast-Iron Ribeye Steak (High-Protein)',
        contextEn: 'Cooking full whole ribeye steaks instead of bite-sized cubes? Follow our master cast-iron ribeye guide.',
      },
      {
        slug: 'one-pan-lemon-garlic-chicken-dinner-in-15-minutes',
        titleEn: 'One-Pan Lemon Garlic Chicken Skillet Dinner in 15 Minutes',
        contextEn: 'Looking for a lighter poultry version of bite-sized skillet protein? Try our 15-minute chicken bites.',
      },
    ],
    wordCount: 1185,
    introParagraphsEn: [
      'Earthy cremini mushrooms and fresh woody rosemary are signature November skillet ingredients that pair effortlessly with tender beef steak bites. By cutting ribeye or top sirloin into bite-sized 3cm cubes, you get four times more caramelized Maillard crust surface area and cut total cooking time down to under 4 minutes.',
      'The secret to restaurant-level steak bites and mushrooms is searing them in two quick stages in the same cast-iron skillet: brown the mushrooms first so their moisture evaporates, remove them, sear the steak cubes over high heat for 90 seconds per side, and reunite everything in foaming garlic-rosemary butter.',
    ],
    whyThisWorksEn: [
      'Two-stage single-skillet sear prevents mushroom moisture from steaming the steak bites.',
      'Delivers 49g complete protein and only 5g net carbs per serving.',
      'Ready in 15 minutes total for an effortless November keto weeknight dinner.',
    ],
    chefTipsEn: [
      'Do not salt the mushrooms until after they have turned golden brown—salting raw mushrooms early draws out water and slows browning.',
      'Pat the steak cubes bone-dry with paper towels and leave at least 1cm space between cubes so they sear rather than steam.',
      'Pull the skillet off the burner as soon as the garlic and rosemary butter coats the steak so the center stays tender medium-rare to medium.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Whole-muscle beef steak cuts and cubes are safe at a minimum internal temperature of 63°C (145°F) followed by a 3-minute rest.',
    substitutions: [
      {
        originalEn: 'Ribeye or Top Sirloin Steak, Cubed 3cm (450g)',
        substituteEn: 'New York Strip Steak or Beef Tenderloin Tips (450g)',
        chefNoteEn: 'Strip steak and tenderloin cook in the same 3-minute high-heat window.',
      },
      {
        originalEn: 'Cremini / Baby Bella Mushrooms, Halved (250g)',
        substituteEn: 'Shiitake, Oyster, or White Button Mushrooms (250g)',
        chefNoteEn: 'Cremini and shiitake offer the deepest umami flavor for autumn cooking.',
      },
      {
        originalEn: 'Grass-Fed Unsalted Butter (35g)',
        substituteEn: 'Clarified Ghee or Olive Oil + 1 tsp Worcestershire Sauce',
        chefNoteEn: 'Ghee provides a higher smoke point for cast-iron searing.',
      },
    ],
    faqs: [
      {
        questionEn: 'Why did my steak bites turn gray and chewy instead of browned?',
        answerEn:
          'Crowding too many steak cubes into the skillet at once or cooking them alongside raw watery mushrooms drops the pan temperature. Sear the mushrooms first, then sear the dry steak cubes in a single uncrowded layer.',
      },
      {
        questionEn: 'What is the best steak cut for 15-minute garlic butter steak bites?',
        answerEn:
          'Boneless ribeye, New York strip, or center-cut top sirloin are ideal because they are naturally tender for quick high-heat searing.',
      },
      {
        questionEn: 'What low-carb side dishes go best with steak bites and mushrooms?',
        answerEn:
          'Creamy cauliflower mash, garlic-roasted green beans, or seared asparagus make a complete keto plate.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 6,
    cookMinutes: 9,
    calories: 560,
    proteinGrams: 49,
    netCarbsGrams: 5,
    image: '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 12-Inch Cast-Iron Skillet',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Boneless ribeye or top sirloin steak, cut into 3cm cubes', amount: 450, unit: 'g' },
      { item: 'Fresh cremini (baby bella) mushrooms, wiped clean & halved', amount: 250, unit: 'g' },
      { item: 'Grass-fed unsalted butter', amount: 35, unit: 'g' },
      { item: 'Minced garlic (4 cloves) & 1 tbsp fresh chopped rosemary/thyme', amount: 20, unit: 'g' },
      { item: 'High-smoke-point avocado oil (for initial sear)', amount: 15, unit: 'ml' },
      { item: 'Coarse kosher salt & freshly cracked black pepper', amount: 6, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Brown Halved Cremini Mushrooms Undisturbed',
        instruction:
          'Heat half the avocado oil in a 12-inch cast-iron skillet over medium-high heat. Add halved mushrooms cut-side down and sear 4 minutes until deeply browned. Season with a pinch of salt and transfer to a plate.',
        timerSeconds: 240,
      },
      {
        title: 'High-Heat 90-Second Sear on Dry Steak Cubes',
        instruction:
          'Pat steak cubes dry, season generously with salt and pepper, add remaining oil to the hot skillet, and sear in a single layer for 90 seconds per side without moving them.',
        timerSeconds: 180,
      },
      {
        title: 'Toss with Foaming Rosemary Garlic Butter & Mushrooms',
        instruction:
          'Lower heat, add butter, minced garlic, rosemary, and the browned mushrooms back into the skillet. Toss for 60 seconds until glossy and steak reaches 63°C (145°F). Rest 3 minutes.',
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'november-thanksgiving-leftover-turkey-cranberry-brie-skillet-melt',
    slug: 'november-thanksgiving-leftover-turkey-cranberry-brie-skillet-melt',
    category: 'quick-easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · November Leftover Upgrade',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: '10-Minute Crispy Leftover Turkey, Melted Brie & Cranberry Sourdough Skillet Panini',
    subtitleEn:
      'Turn November holiday roast turkey or rotisserie chicken into a gourmet bistro sandwich with creamy triple-cream Brie, ruby cranberry relish, and golden butter-toasted sourdough.',
    targetKeywordEn: 'best november leftover turkey cranberry brie grilled cheese skillet',
    shortVideoConceptEn:
      'Spreading ruby cranberry sauce and Dijon onto sourdough, layering sliced roast turkey and thick slabs of Brie cheese, pressing in a buttered skillet, and slicing open for a molten Brie pull.',
    internalLinks: [
      {
        slug: 'quick-crispy-skillet-tuna-melt-sandwich-dinner',
        titleEn: '10-Minute Crispy Skillet Tuna Melt Sandwich with Cheddar',
        contextEn: 'Love crispy cast-iron skillet melts? Try our 10-minute classic cheddar tuna melt next.',
      },
      {
        slug: 'november-herb-butter-turkey-or-chicken-cutlets-cranberry-pan-sauce',
        titleEn: '20-Minute Pan-Seared Herb Butter Turkey & Chicken Cutlets with Cranberry Jus',
        contextEn: 'Use any extra pan-seared turkey cutlets from our 20-minute skillet guide inside this sandwich.',
      },
    ],
    wordCount: 1140,
    introParagraphsEn: [
      'Every November, the day-after Thanksgiving sandwich is often even more anticipated than the holiday feast itself. When thick slices of artisan sourdough are spread with a thin swipe of whole-grain Dijon on one side and tangy cranberry sauce on the other, then stacked with warm roasted turkey breast and creamy Brie cheese, the flavors hit every savory-sweet-tart note.',
      'Toasting the sandwich over medium-low heat in a cast-iron skillet while pressing gently with a smaller pan (or spatula) fuses the sourdough into a shatteringly crisp panini while the Brie melts into a warm velvet blanket around the turkey.',
    ],
    whyThisWorksEn: [
      'Transforms leftover November roast turkey or store-bought deli turkey into a 10-minute bistro meal.',
      'Layering Brie cheese on both sides of the turkey locks the filling together.',
      'A thin smear of Dijon mustard cuts through the richness of the Brie and sweetness of the cranberry.',
    ],
    chefTipsEn: [
      'Slice the Brie while it is still slightly chilled so you get clean 5mm slabs; leave the edible white rind on for extra flavor, or trim it if you prefer ultra-smooth melting.',
      'Warm the leftover turkey slices briefly in the skillet for 45 seconds before assembling the sandwich so the center is piping hot by the time the bread turns golden.',
      'Add a few crisp baby spinach leaves or thin green apple slices for fresh crunch.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Use refrigerated leftover cooked turkey within 3 to 4 days of roasting, and heat the sandwich filling until steaming hot throughout (74°C / 165°F).',
    substitutions: [
      {
        originalEn: 'Sliced Roast Turkey Breast (220g)',
        substituteEn: 'Shredded Rotisserie Chicken or Deli Smoked Turkey (220g)',
        chefNoteEn: 'Works year-round with rotisserie chicken or thick-cut deli turkey.',
      },
      {
        originalEn: 'Creamy Brie or Camembert Cheese (100g)',
        substituteEn: 'Havarti, Fontina, Provolone, or Aged White Cheddar (100g)',
        chefNoteEn: 'Havarti and Fontina offer the same buttery, high-moisture melt.',
      },
      {
        originalEn: 'Whole-Berry Cranberry Sauce (50g)',
        substituteEn: 'Fig Jam, Apricot Preserves, or Apple Butter (50g)',
        chefNoteEn: 'Fig jam or spiced November apple butter pairs phenomenally with Brie and poultry.',
      },
    ],
    faqs: [
      {
        questionEn: 'Should I cut the white rind off Brie cheese for a grilled cheese sandwich?',
        answerEn:
          'The white bloomy rind on Brie is 100% edible and adds subtle earthy flavor, though you can slice off the very top edge if you want a completely uniform molten texture.',
      },
      {
        questionEn: 'How do I keep the cranberry sauce from making the sourdough soggy?',
        answerEn:
          'Place a thin layer of cheese directly against the bread slice first, then spread the cranberry sauce over the turkey in the middle so the melted cheese acts as a moisture barrier.',
      },
      {
        questionEn: 'Can I make this turkey Brie melt in an Air Fryer?',
        answerEn:
          'Yes! Butter the outside of the sourdough, secure with a toothpick, and air fry at 190°C (375°F) for 6 minutes, flipping halfway through.',
      },
    ],
    stepGalleryImages: [
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 4,
    cookMinutes: 6,
    calories: 520,
    proteinGrams: 39,
    netCarbsGrams: 34,
    image: '/images/action_searing_skillet_butter_1795530068462.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 12-Inch Cast-Iron Skillet & Panini Press',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Cooked roasted turkey breast (or rotisserie chicken), sliced', amount: 220, unit: 'g' },
      { item: 'Triple-cream Brie or Havarti cheese, sliced into 5mm slabs', amount: 100, unit: 'g' },
      { item: 'Artisan sourdough bread slices (4 slices)', amount: 160, unit: 'g' },
      { item: 'Whole-berry cranberry sauce or cranberry orange relish', amount: 55, unit: 'g' },
      { item: 'Dijon mustard & fresh baby spinach or thyme leaves', amount: 20, unit: 'g' },
      { item: 'Softened unsalted butter for outer bread crust', amount: 20, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Warm Turkey Slices & Prep Sourdough with Dijon',
        instruction:
          'Warm sliced turkey in a skillet over medium heat for 45 seconds so it is hot throughout. Butter the outer faces of 4 sourdough slices and spread Dijon on the inner faces.',
        timerSeconds: 120,
      },
      {
        title: 'Layer Brie, Warm Turkey & Cranberry Sauce',
        instruction:
          'Layer half the Brie on the bottom bread slices, stack the warm turkey and cranberry sauce in the center, and top with the remaining Brie and top bread slice.',
        timerSeconds: 90,
      },
      {
        title: 'Press & Toast 3 Minutes Per Side Until Molten',
        instruction:
          'Toast in the skillet over medium-low heat for 3 minutes per side, pressing gently with a spatula until the sourdough is golden brown and the Brie is molten. Slice diagonally.',
        timerSeconds: 360,
      },
    ],
  },
  {
    id: 'november-high-protein-white-bean-kale-roasted-garlic-soup',
    slug: 'november-high-protein-white-bean-kale-roasted-garlic-soup',
    category: 'healthy-diet',
    subcategoryId: 'high-protein',
    categoryLabelEn: 'Healthy & Diet · November Warming Soup',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: '20-Minute Tuscan White Bean, Lacinato Kale & Parmesan Broth Soup',
    subtitleEn:
      'A nourishing November one-pot soup with creamy cannellini white beans, tender Lacinato kale, rosemary-garlic broth, and grated Parmigiano—naturally creamy with zero heavy cream.',
    targetKeywordEn: 'quick tuscan white bean and kale soup 20 minutes november',
    shortVideoConceptEn:
      'Sautéing garlic, rosemary, and mirepoix in olive oil, simmering cannellini beans in broth, mashing a third of the beans against the pot side for instant creaminess, and folding in dark green kale ribbons.',
    internalLinks: [
      {
        slug: 'quick-red-lentil-soup-with-lemon-and-cumin-healthy-dinner',
        titleEn: '20-Minute Red Lentil Soup with Fresh Lemon & Warm Cumin',
        contextEn: 'Love fast, protein-packed November soups? Try our 20-minute lemon cumin red lentil soup next.',
      },
      {
        slug: 'mediterranean-chickpea-feta-lunch-bowls',
        titleEn: 'No-Cook Mediterranean Chickpea, Cucumber & Feta Meal-Prep Bowls',
        contextEn: 'Pair a bowl of this Tuscan white bean soup with our Mediterranean chickpea salad for meal prep.',
      },
    ],
    wordCount: 1160,
    introParagraphsEn: [
      'Cold November nights call for a steaming bowl of Tuscan soup that feels rich and comforting while remaining light, high in fiber, and packed with plant and dairy protein. Instead of relying on heavy cream or flour roux, traditional Tuscan cooks mash roughly one-third of the cooked cannellini beans right against the wall of the soup pot.',
      'As the mashed white beans dissolve into the garlic, rosemary, and vegetable or chicken bone broth, they create a velvety body that coats ribbons of dark Lacinato (dinosaur) kale. Finishing each bowl with a squeeze of fresh lemon juice and grated Parmigiano-Reggiano wakes up every herbal flavor in 20 minutes.',
    ],
    whyThisWorksEn: [
      'Mashing 1/3 of the white beans thickens the broth naturally without dairy cream.',
      'Lacinato kale holds its tender bite for 4 days in the refrigerator without turning slimy.',
      'Ready in 20 minutes using pantry-friendly canned cannellini beans and bone broth.',
    ],
    chefTipsEn: [
      'If you have a leftover Parmesan cheese rind in your fridge, drop it into the simmering broth for 10 minutes—it infuses deep savory umami into the soup.',
      'Strip the tough center stems from the Lacinato kale before chopping the leaves into bite-sized ribbons so they wilt in just 3 minutes.',
      'Add a pinch of crushed red pepper flakes with the garlic and rosemary for gentle November warmth.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Bring broth-based soups to a full rolling boil (100°C / 212°F) during cooking, cool leftovers in shallow containers within 2 hours, and reheat to 74°C (165°F).',
    substitutions: [
      {
        originalEn: 'Cannellini White Beans, Rinsed & Drained (500g / 2 cans)',
        substituteEn: 'Great Northern Beans, Navy Beans, or Chickpeas (500g)',
        chefNoteEn: 'Great Northern and Navy beans mash just as smoothly as cannellini beans.',
      },
      {
        originalEn: 'Lacinato (Tuscan Dinosaur) Kale, Chopped (150g)',
        substituteEn: 'Baby Spinach, Swiss Chard, or Escarole (150g)',
        chefNoteEn: 'Baby spinach wilts in 60 seconds right at the end of cooking.',
      },
      {
        originalEn: 'Chicken Bone Broth or Vegetable Stock (800ml)',
        substituteEn: 'Turkey Bone Broth (great for November leftovers!)',
        chefNoteEn: 'Using chicken or turkey bone broth adds an extra 18g of collagen protein to the pot.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do you make white bean soup creamy without adding heavy cream?',
        answerEn:
          'Use the back of a wooden spoon or a potato masher to mash about 1 cup of the white beans directly in the pot—their natural starch thickens the broth immediately.',
      },
      {
        questionEn: 'Can I add sausage or shredded chicken to Tuscan white bean soup?',
        answerEn:
          'Absolutely! Brown 200g of Italian turkey sausage with the aromatics or stir in 200g of leftover shredded roast turkey or chicken during the final 3 minutes.',
      },
      {
        questionEn: 'Does Tuscan white bean and kale soup freeze well?',
        answerEn:
          'Yes—it freezes cleanly for up to 3 months in airtight freezer containers with 2cm headspace.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Elena Rostova',
    authorRoleEn: 'Senior Recipe Developer & Food Science Editor',
    prepMinutes: 5,
    cookMinutes: 15,
    calories: 385,
    proteinGrams: 24,
    netCarbsGrams: 41,
    image: '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Enameled Cast-Iron Dutch Oven (5.5-Quart)',
      brand: 'Le Creuset Culinary',
      priceUsd: 135,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Canned cannellini white beans, rinsed & drained (2 cans)', amount: 500, unit: 'g' },
      { item: 'Low-sodium chicken bone broth or rich vegetable stock', amount: 800, unit: 'ml' },
      { item: 'Fresh Lacinato (Tuscan) kale, stems removed & chopped', amount: 150, unit: 'g' },
      { item: 'Diced carrot, celery, onion & 4 minced garlic cloves', amount: 180, unit: 'g' },
      { item: 'Fresh chopped rosemary, thyme & pinch of red pepper flakes', amount: 10, unit: 'g' },
      { item: 'Grated Parmigiano-Reggiano, 15ml olive oil & squeeze of lemon', amount: 55, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Sauté Mirepoix, Garlic & Rosemary in Olive Oil',
        instruction:
          'Warm olive oil in a Dutch oven over medium heat. Sauté diced onion, carrot, celery, garlic, rosemary, and red pepper flakes for 4 minutes until fragrant and softened.',
        timerSeconds: 240,
      },
      {
        title: 'Simmer White Beans in Broth & Mash One-Third for Creaminess',
        instruction:
          'Add cannellini beans and broth. Bring to a simmer for 7 minutes, then press one-third of the beans against the side of the pot with a spoon to naturally thicken the soup.',
        timerSeconds: 420,
      },
      {
        title: 'Wilt Lacinato Kale & Finish with Lemon & Parmigiano',
        instruction:
          'Stir in the chopped kale leaves for 3 minutes until tender and bright green. Off the heat, stir in lemon juice and top bowls with grated Parmigiano.',
        timerSeconds: 180,
      },
    ],
  },
  {
    id: 'november-spiced-cinnamon-apple-pecan-skillet-crisp-no-mixer',
    slug: 'november-spiced-cinnamon-apple-pecan-skillet-crisp-no-mixer',
    category: 'desserts-baking',
    subcategoryId: 'quick-pastries',
    categoryLabelEn: 'Desserts & Baking · November Autumn Dessert',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: '25-Minute Warm Cinnamon Honeycrisp Apple & Toasted Pecan Cast-Iron Skillet Crisp',
    subtitleEn:
      'Skip rolling pie crust this November—sweet-tart Honeycrisp apples tossed with Ceylon cinnamon and maple bake under a crunchy brown-butter oat and pecan streusel in one skillet.',
    targetKeywordEn: 'quick cast iron apple pecan crisp november dessert recipe',
    shortVideoConceptEn:
      'Sautéing sliced Honeycrisp apples in cinnamon butter for 3 minutes to jump-start softening, scattering crunchy pecan-oat streusel over the top, and pulling the bubbling golden skillet from the oven.',
    internalLinks: [
      {
        slug: 'tropical-mango-berry-swirl-vanilla-bean-cupcakes',
        titleEn: 'Tropical Mango & Strawberry Swirl Vanilla Bean Cupcakes',
        contextEn: 'Planning a full dessert spread? Pair this warm autumn skillet crisp with our vanilla bean cupcakes.',
      },
      {
        slug: '15-minute-no-bake-lemon-berry-mascarpone-cheesecake-cups',
        titleEn: '15-Minute No-Bake Lemon Berry Mascarpone Cheesecake Cups',
        contextEn: 'Need a no-oven dessert option while your oven is full? Try our 15-minute no-bake cheesecake cups.',
      },
    ],
    wordCount: 1170,
    introParagraphsEn: [
      'Traditional apple pie takes well over an hour to chill, roll, blind-bake, and cool, whereas a cast-iron skillet apple pecan crisp delivers all the warm, spiced November nostalgia in just 25 minutes. The secret to cutting the bake time in half is giving the sliced Honeycrisp apples a 3-minute head start right on the stovetop in foaming cinnamon butter.',
      'Once the apples begin releasing their fragrant cider juices in the skillet, you scatter a single-bowl streusel of rolled oats, chopped pecans, brown sugar, and melted butter over the top and slide the hot skillet straight into the oven for 18 minutes until bubbling and golden.',
    ],
    whyThisWorksEn: [
      'Pre-sautéing the apples in the skillet for 3 minutes ensures tender fruit without a 50-minute bake.',
      'No pie crust or electric mixer required—just one bowl for the pecan-oat streusel.',
      'Cast iron retains heat so the apple crisp stays warm and bubbling at the dinner table.',
    ],
    chefTipsEn: [
      'Use firm, sweet-tart November apples like Honeycrisp, Granny Smith, or Pink Lady so the slices hold their shape without turning into applesauce.',
      'Chop the pecans coarsely so they toast evenly alongside the rolled oats during the 18-minute oven bake.',
      'Let the skillet rest for 5 minutes out of the oven so the bubbling apple juices thicken into a caramel syrup before scooping.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Always wash fresh apples thoroughly under running water before slicing, and use oven mitts when handling a 200°C (400°F) cast-iron skillet handle.',
    substitutions: [
      {
        originalEn: 'Honeycrisp or Granny Smith Apples, Sliced (600g / 4 apples)',
        substituteEn: 'Bosc Pears or a 50/50 Apple & Fresh Cranberry Mix (600g)',
        chefNoteEn: 'Adding a handful of fresh cranberries gives the crisp a festive ruby November color.',
      },
      {
        originalEn: 'Chopped Raw Pecans (65g)',
        substituteEn: 'Chopped Walnuts, Sliced Almonds, or Pumpkin Seeds (65g)',
        chefNoteEn: 'Pumpkin seeds (pepitas) make a delicious nut-free crunchy topping.',
      },
      {
        originalEn: 'Old-Fashioned Rolled Oats (80g) + All-Purpose Flour (40g)',
        substituteEn: 'Certified Gluten-Free Rolled Oats + Almond Flour (120g total)',
        chefNoteEn: 'Almond flour creates an extra-buttery, naturally gluten-free streusel.',
      },
    ],
    faqs: [
      {
        questionEn: 'Do I have to peel the apples for a skillet apple crisp?',
        answerEn:
          'Peeling is optional! Thin-skinned apples like Honeycrisp soften nicely with the peel left on (provided you slice them 5mm thin), adding extra fiber and rosy color.',
      },
      {
        questionEn: 'Why is my apple crisp topping soggy instead of crunchy?',
        answerEn:
          'Covering the warm crisp with foil traps steam and softens the oat topping. Bake uncovered and let it cool uncovered on a trivet.',
      },
      {
        questionEn: 'Can I prep the apple crisp ahead of Thanksgiving or a dinner party?',
        answerEn:
          'Yes—mix the dry pecan-oat topping in a bowl and slice the apples tossed with lemon juice up to 6 hours ahead, then assemble and bake right as dinner starts.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Elena Rostova',
    authorRoleEn: 'Senior Recipe Developer & Food Science Editor',
    prepMinutes: 7,
    cookMinutes: 18,
    calories: 340,
    proteinGrams: 5,
    netCarbsGrams: 46,
    image: '/images/recipe_mango_cupcakes_1795527116791.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Seasoned 10-Inch or 12-Inch Cast-Iron Baking Skillet',
      brand: 'Lodge Culinary',
      priceUsd: 49,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Honeycrisp or Granny Smith apples, cored & sliced 5mm thin', amount: 600, unit: 'g' },
      { item: 'Old-fashioned rolled oats & 40g all-purpose (or almond) flour', amount: 120, unit: 'g' },
      { item: 'Coarsely chopped raw pecans', amount: 65, unit: 'g' },
      { item: 'Unsalted butter, melted (divided for skillet & streusel)', amount: 60, unit: 'g' },
      { item: 'Pure maple syrup & dark brown sugar', amount: 55, unit: 'g' },
      { item: 'Ground Ceylon cinnamon, nutmeg, vanilla & lemon juice', amount: 15, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Sauté Sliced Apples 3 Minutes in Cinnamon Butter Skillet',
        instruction:
          'Preheat oven to 200°C (400°F). In an oven-safe skillet over medium heat, toss sliced apples with 15g butter, maple syrup, lemon juice, and cinnamon for 3 minutes until slightly softened.',
        timerSeconds: 180,
      },
      {
        title: 'Mix Pecan-Oat Streusel & Scatter Evenly Over Apples',
        instruction:
          'In a bowl, stir rolled oats, flour, brown sugar, chopped pecans, a pinch of salt, and 45g melted butter until clumpy. Scatter evenly over the warm apples.',
        timerSeconds: 120,
      },
      {
        title: 'Bake 18 Minutes at 200°C (400°F) Until Golden & Bubbling',
        instruction:
          'Transfer skillet to the oven and bake uncovered for 18 minutes until the pecan topping is toasted golden brown and the apple juices bubble around the edges.',
        timerSeconds: 1080,
      },
    ],
  },
  {
    id: 'november-sheet-pan-honey-thyme-chicken-thighs-sweet-potatoes',
    slug: 'november-sheet-pan-honey-thyme-chicken-thighs-sweet-potatoes',
    category: 'healthy-diet',
    subcategoryId: 'high-protein',
    categoryLabelEn: 'Healthy & Diet · November Sheet-Pan Meal Prep',
    publishedMonthLabelEn: 'November 2026 Featured',
    titleEn: 'One-Pan Honey Thyme Chicken Thighs, Roasted Sweet Potatoes & Red Onion',
    subtitleEn:
      'High-protein November sheet-pan dinner and 4-day meal prep—juicy herb-roasted chicken thighs, caramelized cubed sweet potatoes, and sweet red onion wedges glazed with thyme honey.',
    targetKeywordEn: 'sheet pan honey thyme chicken and sweet potatoes november dinner',
    shortVideoConceptEn:
      'Spreading seasoned chicken thighs, 2cm orange sweet potato cubes, and red onion wedges onto a preheated rimmed sheet pan, roasting until golden, and brushing with warm thyme-garlic honey.',
    internalLinks: [
      {
        slug: 'sheet-pan-spiced-chicken-breast-and-potatoes-oven-dinner',
        titleEn: 'Sheet-Pan Spiced Chicken Breast & Crispy Potatoes Oven Dinner',
        contextEn: 'Prefer white gold potatoes and chicken breast? Check out our classic spiced chicken and potato sheet pan.',
      },
      {
        slug: '60-minute-sunday-meal-prep-guide-5-high-protein-lunches',
        titleEn: '60-Minute Sunday High-Protein Meal-Prep Blueprint (5 Lunches)',
        contextEn: 'Portion this November sweet potato and chicken bake into glass containers using our Sunday meal-prep guide.',
      },
    ],
    wordCount: 1180,
    introParagraphsEn: [
      'Sweet potatoes are a powerhouse November staple rich in beta-carotene and complex carbohydrates that stay tender when reheated for weekday lunches. Pairing 2cm sweet potato cubes and red onion wedges with boneless chicken thighs on a single preheated rimmed sheet pan ensures everything finishes cooking at the exact same moment.',
      'During the final 2 minutes out of the oven, a light brush of raw honey infused with fresh thyme leaves and apple cider vinegar glazes the roasted chicken thighs and caramelized sweet potato edges with warm autumn aroma.',
    ],
    whyThisWorksEn: [
      'Complete balanced macro meal (43g protein, complex sweet potato carbs) on a single sheet pan.',
      'Boneless chicken thighs and 2cm sweet potato cubes both finish roasting in 22 minutes at 215°C (420°F).',
      'Reheats wonderfully for up to 4 days of November high-protein meal-prep lunches.',
    ],
    chefTipsEn: [
      'Cut the sweet potatoes into uniform 2cm (3/4-inch) cubes so they caramelize in the same 22-minute window as the chicken thighs.',
      'Preheat your empty metal sheet pan in the oven for 5 minutes before adding the oiledsweet potatoes and chicken for an instant bottom sear.',
      'Vent meal-prep containers uncovered for 15 minutes before snapping lids shut so condensation never softens the roasted sweet potatoes.',
    ],
    usdaSafetyNoteEn:
      'USDA Food Safety Guideline: Roast chicken thighs to a minimum internal temperature of 74°C (165°F)—dark-meat thighs become even more tender between 77°C and 80°C (170°F–175°F).',
    substitutions: [
      {
        originalEn: 'Boneless Skinless Chicken Thighs (500g)',
        substituteEn: 'Chicken Breasts (Cut in Half) or Turkey Tenderloin Medallions (500g)',
        chefNoteEn: 'If using chicken breast pieces, check temperature at 18 minutes so they stay juicy at 74°C.',
      },
      {
        originalEn: 'Orange Sweet Potatoes, Cubed 2cm (450g)',
        substituteEn: 'Cubed Butternut Squash or Baby Yukon Gold Potatoes (450g)',
        chefNoteEn: 'Butternut squash cubes roast in the exact same 22-minute timeframe.',
      },
      {
        originalEn: 'Raw Honey (25ml) + Fresh Thyme Leaves',
        substituteEn: 'Pure Maple Syrup + Fresh Rosemary or Dried Herbes de Provence',
        chefNoteEn: 'Maple and rosemary offer an equally classic November flavor profile.',
      },
    ],
    faqs: [
      {
        questionEn: 'Why did my roasted sweet potatoes turn soft instead of caramelized?',
        answerEn:
          'Avoid lining the sheet pan with silicone mats or crowding the cubes touching one another; bare preheated aluminum and 2cm airflow spacing let steam escape so the edges brown.',
      },
      {
        questionEn: 'Can I use bone-in, skin-on chicken thighs for this sheet-pan recipe?',
        answerEn:
          'Yes! Roast bone-in, skin-on thighs for 10 minutes first before adding the cubed sweet potatoes to the pan, then roast 22 minutes more until crispy.',
      },
      {
        questionEn: 'How long does honey thyme chicken and sweet potatoes last in the fridge?',
        answerEn:
          'Stored in airtight glass meal-prep containers at 4°C (40°F) or below, it stays fresh for up to 4 days.',
      },
    ],
    stepGalleryImages: [
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
    ],
    authorName: 'Marcus Vance',
    authorRoleEn: 'Executive Culinary Director & Cast-Iron Specialist',
    prepMinutes: 8,
    cookMinutes: 22,
    calories: 485,
    proteinGrams: 43,
    netCarbsGrams: 34,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: 'Heavy-Gauge Aluminum Half-Sheet Roasting Pan',
      brand: 'Nordic Ware Culinary',
      priceUsd: 38,
      affiliateStore: 'Culinary Gear Partner',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Boneless skinless chicken thighs, trimmed', amount: 500, unit: 'g' },
      { item: 'Fresh November sweet potatoes, peeled & cut into 2cm cubes', amount: 450, unit: 'g' },
      { item: 'Red onion, cut into 2cm wedges & 3 smashed garlic cloves', amount: 130, unit: 'g' },
      { item: 'Extra-virgin olive oil, smoked paprika, kosher salt & pepper', amount: 25, unit: 'ml' },
      { item: 'Raw honey & 10ml apple cider vinegar (for finishing glaze)', amount: 25, unit: 'ml' },
      { item: 'Fresh thyme leaves & chopped parsley', amount: 10, unit: 'g' },
    ],
    stepsEn: [
      {
        title: 'Toss Chicken Thighs, Cubed Sweet Potatoes & Red Onion with Herbs',
        instruction:
          'Preheat oven (with empty sheet pan inside) to 215°C (420°F). Toss chicken thighs, 2cm sweet potato cubes, and red onion wedges with olive oil, half the thyme, garlic, smoked paprika, salt, and pepper.',
        timerSeconds: 300,
      },
      {
        title: 'Spread on Hot Sheet Pan & Roast 22 Minutes at 215°C (420°F)',
        instruction:
          'Carefully arrange chicken and sweet potatoes in a single uncrowded layer on the hot sheet pan. Roast for 22 minutes, flipping sweet potatoes halfway, until chicken reaches 74°C (165°F).',
        timerSeconds: 1320,
      },
      {
        title: 'Brush Warm Honey-Thyme Cider Glaze & Serve',
        instruction:
          'Stir raw honey, apple cider vinegar, and remaining fresh thyme together. Brush over the hot chicken thighs and roasted sweet potatoes right out of the oven.',
        timerSeconds: 90,
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
  {
    id: 'qa-17',
    topic: 'heat_skillet',
    topicLabel: 'Popular Question · Air Fryer',
    question:
      'Can you put aluminum foil or perforated parchment paper inside an Air Fryer basket safely?',
    shortAnswer:
      'Yes, as long as the food weighs down the foil or parchment in the bottom basket and you never preheat the Air Fryer with loose paper inside.',
    detailedAnswer:
      'Never place bare parchment paper in a preheating Air Fryer alone because the high-velocity top fan will lift the paper into the heating element. Trim foil or perforated parchment slightly smaller than the basket so air still circulates around the perimeter, and weigh it down firmly with your food.',
    proMetric: 'Never Preheat Loose Paper · Leave Perimeter Air Vents Open',
    relatedRecipeId: 'lemon-herb-roasted-chicken',
  },
  {
    id: 'qa-18',
    topic: 'substitutions',
    topicLabel: 'Popular Question · High-Protein Swaps',
    question:
      'How do I substitute cottage cheese or Greek yogurt for heavy cream or mayo in high-protein sauces?',
    shortAnswer:
      'Blend full-fat or 2% cottage cheese in a high-speed blender for 45 seconds until silky smooth, then Temper it into warm sauces off the heat at a 1:1 ratio.',
    detailedAnswer:
      'Blended cottage cheese delivers 24g of protein per cup with a neutral, creamy texture. To prevent curdling in hot skillet sauces, remove the pan from the burner first, let it cool for 60 seconds, and whisk in the blended cottage cheese or strained Greek yogurt gradually.',
    proMetric: '45-Sec High-Speed Blend · Stir In Off Direct Heat',
    relatedRecipeId: 'high-protein-cottage-cheese-egg-white-bites',
  },
  {
    id: 'qa-19',
    topic: 'heat_skillet',
    topicLabel: 'Popular Question · Seafood Science',
    question:
      'What is the white stuff (albumin) that comes out of cooked salmon, and how do I prevent it?',
    shortAnswer:
      'Albumin is a water-soluble sarcoplasmic protein that begins coagulating at 49°C–54°C (120°F–130°F); intense direct heat makes muscle fibers contract rapidly and squeeze it to the surface, whereas a 10-minute 6% salt brine and gentle heat minimize it while reaching the USDA 63°C (145°F) safety minimum.',
    detailedAnswer:
      'Because albumin starts setting between 49°C and 54°C (120°F–130°F)—well below the official USDA safe minimum internal temperature of 63°C (145°F)—cooking salmon to 63°C does not prevent albumin by temperature alone; in fact, higher heat increases muscle fiber contraction and pushes more white protein out. To prevent surface albumin scientifically, soak fillets in a 6% salt-water brine (15g salt per 250ml cold water) for 10 minutes before drying (the salt partially dissolves surface myosin so muscle fibers seal smoothly without squeezing out albumin), sear 80% of the time skin-side down so the skin insulates the flesh from harsh thermal shock, and remove from the skillet right at the USDA-recommended 63°C (145°F).',
    proMetric: '10-Min 6% Salt Brine · Gentle Skin-Side Heat · USDA 63°C (145°F)',
    relatedRecipeId: 'crispy-salmon-skillet',
  },
  {
    id: 'qa-20',
    topic: 'reheating_safety',
    topicLabel: 'Popular Question · Poultry & USDA Temps',
    question:
      'Why is my chicken breast rubbery or dry even when cooked to 74°C (165°F), and how do I keep it juicy?',
    shortAnswer:
      'Thick chicken breasts overcook on the outside before the center hits 74°C; slicing them horizontally into even 1.5cm cutlets and resting 4 minutes keeps them tender.',
    detailedAnswer:
      'Whole chicken breasts taper from 4cm thick on one end to 1cm on the other. Slicing each breast horizontally into two uniform cutlets cuts cooking time in half so the exterior and interior reach the safe USDA minimum 74°C (165°F) at the same moment.',
    proMetric: '1.5cm Even Cutlets · Cook to USDA 74°C (165°F)',
    relatedRecipeId: 'keto-creamy-tuscan-garlic-chicken-skillet',
  },
  {
    id: 'qa-21',
    topic: 'meal_prep',
    topicLabel: 'Popular Question · Breakfast Meal Prep',
    question:
      'How long do hard-boiled eggs and baked cottage-cheese egg bites stay fresh in the refrigerator?',
    shortAnswer:
      'Unpeeled hard-boiled eggs keep for up to 7 days at 4°C (40°F); peeled boiled eggs and baked egg bites should be eaten within 4 to 5 days (or frozen for 2 months).',
    detailedAnswer:
      'Store hard-boiled eggs in their shells inside a covered container on an interior refrigerator shelf (not the door, where temperatures fluctuate). Once peeled, wrap a damp paper towel inside the airtight container so the egg whites stay tender.',
    proMetric: '7 Days Unpeeled · 4–5 Days Peeled/Egg Bites at 4°C',
    relatedRecipeId: 'high-protein-cottage-cheese-egg-white-bites',
  },
  {
    id: 'qa-22',
    topic: 'substitutions',
    topicLabel: 'Popular Question · Baking Swaps',
    question:
      'What is the best 1:1 substitute for eggs when baking cupcakes, banana bread, or cookies?',
    shortAnswer:
      'Use 1 tablespoon (10g) ground flaxseed whisked with 3 tablespoons (45ml) warm water for cookies/banana bread, or 60g unsweetened applesauce / mashed banana per egg in muffins.',
    detailedAnswer:
      'Let the flaxseed and warm water mixture rest for 5 minutes until gelatinous before mixing into cookie or loaf batters. For light vanilla cupcakes, 60g strained yogurt or 3ml vinegar + 4g baking soda provides lift without weighing down the crumb.',
    proMetric: '10g Ground Flax + 45ml Water = 1 Large Egg (50g)',
    relatedRecipeId: 'brown-butter-banana-bread-pecan-loaf',
  },
  {
    id: 'qa-23',
    topic: 'heat_skillet',
    topicLabel: 'Popular Question · Air Fryer Care',
    question:
      'Why is my Air Fryer smoking when cooking fatty meats, and how do I stop grease smoke immediately?',
    shortAnswer:
      'White smoke occurs when rendered fat drips into the hot bottom drawer; place 2 tablespoons (30ml) of water or a slice of bread in the lower drip pan underneath the basket.',
    detailedAnswer:
      'A thin film of water or a slice of bread in the bottom drawer (underneath the elevated crisper grate) catches dripping grease from ribeye steak, burgers, or chicken thighs so the fat cannot burn against the hot metal floor.',
    proMetric: '30ml Water in Lower Drip Drawer · Clean Heating Coil',
    relatedRecipeId: 'air-fryer-crispy-honey-garlic-salmon-bites',
  },
  {
    id: 'qa-24',
    topic: 'meal_prep',
    topicLabel: 'Popular Question · Produce Prep',
    question:
      'How do I chop potatoes, sweet potatoes, or apples a day ahead without them turning brown or gray?',
    shortAnswer:
      'Submerge peeled, cut raw potatoes completely in a bowl of cold water in the fridge for up to 24 hours; toss sliced apples in cold water with 15ml lemon juice for 3 minutes, then drain.',
    detailedAnswer:
      'Water blocks oxygen from reacting with polyphenol oxidase enzymes in raw potatoes. Before roasting or air-frying pre-soaked potatoes, drain them in a colander and pat completely dry on a kitchen towel so they crisp properly.',
    proMetric: 'Cold Water Submersion (Max 24h) · Pat Bone-Dry Before Cooking',
    relatedRecipeId: 'high-protein-turkey-sweet-potato-skillet',
  },
  {
    id: 'qa-25',
    topic: 'substitutions',
    topicLabel: 'Popular Question · Gluten-Free Baking',
    question:
      'Can I substitute almond flour or oat flour 1:1 for regular all-purpose wheat flour in baking?',
    shortAnswer:
      'Oat flour can replace all-purpose flour 1:1 by weight (grams) in muffins and quick breads, whereas almond flour lacks gluten and requires an extra egg or binder for structure.',
    detailedAnswer:
      'Because 1 cup of oat flour weighs ~90g while 1 cup of all-purpose flour weighs 120g, always swap by gram weight rather than measuring cups. When baking with 100% blanched almond flour, let cookies cool on the baking sheet for 10 minutes so the cocoa butter and natural oils firm up.',
    proMetric: 'Swap by Gram Weight (120g = 120g) · Cool Almond Cookies 10 Mins',
    relatedRecipeId: 'healthy-almond-flour-dark-chocolate-chip-cookies',
  },
  {
    id: 'qa-26',
    topic: 'reheating_safety',
    topicLabel: 'Popular Question · USDA Food Safety',
    question:
      'Should I wash raw chicken or turkey in the kitchen sink before cooking?',
    shortAnswer:
      'No—the USDA strongly advises NEVER washing raw chicken or poultry because splashing water spreads bacteria up to 90cm across sinks and countertops.',
    detailedAnswer:
      'Cooking poultry to the official USDA minimum internal temperature of 74°C (165°F) destroys all surface bacteria safely. If raw chicken has excess moisture in the package, blot it dry with disposable paper towels, discard the towels immediately, and wash your hands with warm soapy water for 20 seconds.',
    proMetric: 'USDA Rule: Never Rinse Raw Poultry · Blot Dry + Cook to 74°C',
    relatedRecipeId: 'lemon-herb-roasted-chicken',
  },
  {
    id: 'qa-27',
    topic: 'heat_skillet',
    topicLabel: 'Popular Question · Cooking Oils',
    question:
      'Which cooking oils have the highest smoke point for cast-iron steak searing vs. Air Frying?',
    shortAnswer:
      'Refined avocado oil (270°C / 520°F) and clarified butter/ghee (250°C / 485°F) are best for high-heat cast-iron searing; extra-virgin olive oil (190°C–205°C) is safe for everyday sautéing.',
    detailedAnswer:
      'Unrefined butter burns above 175°C (350°F) because of its milk solids. Start searing steaks or salmon in refined avocado oil or light olive oil first, then add whole unsalted butter, garlic, and herbs during the final 90 seconds of basting.',
    proMetric: 'Avocado Oil 270°C · Ghee 250°C · Butter Baste Last 90s',
    relatedRecipeId: 'garlic-butter-ribeye-steak',
  },
  {
    id: 'qa-28',
    topic: 'meal_prep',
    topicLabel: 'Popular Question · Freezer Pasta Prep',
    question:
      'How do I freeze and reheat pasta dishes or gnocchi for meal prep without the pasta turning mushy?',
    shortAnswer:
      'Undercook boiled pasta by 2 minutes (firm al dente), toss with sauce, cool rapidly, and freeze in airtight glass containers.',
    detailedAnswer:
      'Pasta continues absorbing liquid when reheated. Cooking pasta 2 minutes short of package time leaves a firm starch core that finishes hydrating during reheating. Or use pan-seared potato gnocchi, which stays firm without boiling.',
    proMetric: 'Cook Pasta 2 Mins Short of Al Dente · Reheat Covered to 74°C',
    relatedRecipeId: '5-ingredient-pesto-gnocchi-skillet',
  },
  {
    id: 'qa-29',
    topic: 'substitutions',
    topicLabel: 'Popular Question · Alcohol-Free Swaps',
    question:
      'What is the best non-alcoholic substitute for white or red wine when deglazing a skillet sauce?',
    shortAnswer:
      'Replace dry white wine 1:1 with low-sodium chicken or vegetable broth plus 1 tablespoon (15ml) fresh lemon juice or white wine vinegar per 120ml broth.',
    detailedAnswer:
      'Wine serves two culinary roles in a skillet: liquid to dissolve browned fond and acidity to balance rich butter or cream. Adding 15ml of lemon juice or vinegar to 120ml of savory broth replicates both the deglazing power and bright acidity without alcohol.',
    proMetric: '120ml Low-Sodium Broth + 15ml Fresh Lemon Juice or Vinegar',
    relatedRecipeId: 'cooking-science-temperatures-deglazing-guide',
  },
  {
    id: 'qa-30',
    topic: 'reheating_safety',
    topicLabel: 'Popular Question · Holiday & Roast Thawing',
    question:
      'How many hours per kilogram (or pound) does a frozen whole chicken or turkey take to thaw safely in the fridge?',
    shortAnswer:
      'Follow the USDA Refrigerator Thawing Rule: allow 24 hours in a 4°C (40°F) refrigerator for every 1.8 to 2.2 kg (4 to 5 lbs) of frozen poultry.',
    detailedAnswer:
      'Place the frozen bird in its original wrapper inside a rimmed baking tray on the lowest shelf of the refrigerator so condensation cannot drip onto other foods. Once thawed in the fridge, poultry stays safe for 1 to 2 days before roasting to 74°C (165°F).',
    proMetric: 'USDA Rule: 24 Hours per 2kg (4–5 lbs) at 4°C · Cook to 74°C',
    relatedRecipeId: 'freezer-meal-prep-guide-soups-grains-proteins',
  },
  {
    id: 'qa-31',
    topic: 'heat_skillet',
    topicLabel: 'Popular Question · Frozen-to-Air-Fryer',
    question:
      'Can I cook frozen salmon fillets or shrimp directly in the Air Fryer without thawing first?',
    shortAnswer:
      'Yes—rinse off any surface ice glaze under cold water, pat dry, brush with oil at 195°C (385°F) for 4 minutes to thaw the exterior, then season and air-fry 7–9 minutes more to 63°C (145°F).',
    detailedAnswer:
      'Seasoning slides off rock-hard frozen fish. A quick 4-minute initial heat stage melts the outer millimeter of the fillet so olive oil, garlic powder, and salt adhere evenly, followed by 7 to 9 minutes of air-frying until the center reaches 63°C (145°F).',
    proMetric: '4-Min Thaw Stage + 8-Min Crisp Stage at 195°C · USDA 63°C',
    relatedRecipeId: 'air-fryer-crispy-honey-garlic-salmon-bites',
  },
  {
    id: 'qa-32',
    topic: 'substitutions',
    topicLabel: 'Popular Question · Leavening Swaps',
    question:
      'How do I substitute baking powder for baking soda (or baking soda for baking powder) in a recipe?',
    shortAnswer:
      'To replace 1 teaspoon (5g) baking soda, use 3 teaspoons (15g) baking powder; to replace 1 teaspoon baking powder, use 1/4 teaspoon baking soda plus 1/2 teaspoon cream of tartar (or 5ml lemon juice).',
    detailedAnswer:
      'Pure baking soda (sodium bicarbonate) is three times stronger than baking powder and requires an acidic ingredient (like buttermilk, yogurt, lemon juice, or brown sugar) to activate. Double-acting baking powder already contains both sodium bicarbonate and a dry acid.',
    proMetric: '1 tsp Baking Soda = 3 tsp Baking Powder',
    relatedRecipeId: 'healthy-greek-yogurt-berry-oat-muffins',
  },
  {
    id: 'qa-33',
    topic: 'meal_prep',
    topicLabel: 'Popular Question · Soup & Broth Safety',
    question:
      'What is the safest way to cool a large pot of hot soup, stew, or chili before refrigerating?',
    shortAnswer:
      'Never put a deep pot of boiling-hot soup straight into the fridge; divide it into shallow containers (5cm deep) or set the pot in an ice-water sink bath for 20 minutes first.',
    detailedAnswer:
      'A large deep pot of hot liquid can take over 6 hours to cool inside a fridge, warming surrounding groceries and keeping the center of the soup in the bacterial danger zone (4°C–60°C). Dividing soup into shallow glass containers cools it below 21°C within 30 minutes so it can be safely refrigerated.',
    proMetric: 'Shallow 5cm Containers or 20-Min Ice Bath · Fridge at 4°C',
    relatedRecipeId: 'freezer-meal-prep-guide-soups-grains-proteins',
  },
  {
    id: 'qa-34',
    topic: 'heat_skillet',
    topicLabel: 'Popular Question · Cast-Iron Restoration',
    question:
      'Why is my seasoned cast-iron skillet sticky, and how do I re-season it in the oven?',
    shortAnswer:
      'Stickiness means too much oil was left on the pan during seasoning; scrub clean, wipe an ultra-thin layer of oil off with a dry cloth, and bake upside-down at 230°C (450°F) for 60 minutes.',
    detailedAnswer:
      'Thick pools of oil partially polymerize into tacky gum. When seasoning cast iron, rub 1 teaspoon of avocado or grapeseed oil over the warm pan, then buff it off with a clean paper towel until the metal looks almost matte before baking upside-down for 1 hour.',
    proMetric: 'Buff Oil Matte-Thin · Bake Upside-Down 60 Mins at 230°C',
    relatedRecipeId: 'kitchen-guide-substitutes-cast-iron',
  },
  {
    id: 'qa-35',
    topic: 'substitutions',
    topicLabel: 'Popular Question · Natural Sweeteners',
    question:
      'How do I replace refined white sugar with honey or maple syrup in baking without making the batter soggy?',
    shortAnswer:
      'For every 200g (1 cup) of granulated white sugar, use 170g (3/4 cup) honey or maple syrup, reduce other liquids in the recipe by 30ml (2 tablespoons), and lower oven temp by 15°C (25°F).',
    detailedAnswer:
      'Liquid honey and maple syrup are roughly 18% to 20% water and caramelize faster than white sucrose. Reducing the milk or water in the batter by 30ml and lowering the oven temperature slightly prevents over-browning while keeping the crumb light.',
    proMetric: '170g Honey per 200g Sugar · -30ml Liquid · -15°C Oven Temp',
    relatedRecipeId: 'healthy-greek-yogurt-berry-oat-muffins',
  },
  {
    id: 'qa-36',
    topic: 'heat_skillet',
    topicLabel: 'Popular Question · Sheet-Pan Roasting',
    question:
      'Why do my roasted vegetables turn soft and steamed instead of crispy, and how do I fix it?',
    shortAnswer:
      'Crowding vegetables on a cold sheet pan traps steam; preheat the empty metal sheet pan at 215°C (420°F) for 5 minutes and leave 2cm space between vegetable pieces.',
    detailedAnswer:
      'Cut broccoli, zucchini, or sweet potatoes into uniform 2cm pieces, dry them thoroughly after washing, toss with oil, and spread across two pans if needed so steam escapes immediately upon hitting the preheated metal surface.',
    proMetric: 'Preheat Sheet Pan at 215°C · Leave 2cm Airflow Space',
    relatedRecipeId: 'sunday-meal-prep-high-protein-bowls',
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
  isTrendingLast30Days?: boolean;
}

export const QA_TOPIC_LABELS: { id: 'all' | 'trending_30d' | CookingQATopic; labelEn: string }[] = [
  { id: 'all', labelEn: 'All 36 Cooking Q&As' },
  { id: 'trending_30d', labelEn: 'Popular Kitchen Questions (20)' },
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
    const numId = Number(item.id.replace('qa-', ''));
    const isTrending = Number.isFinite(numId) && numId >= 17;
    const sentences = item.detailedAnswer
      .split(/(?<=\.)\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    return {
      id: item.id,
      topic: TOPIC_MAP[item.topic],
      topicLabelEn: item.topicLabel,
      questionEn: item.question,
      shortAnswerEn: item.shortAnswer,
      detailedStepsEn:
        sentences.length > 1
          ? sentences
          : [item.shortAnswer, item.detailedAnswer],
      proTipEn: item.proMetric,
      relatedRecipeSlug:
        matchedRecipe?.slug || '15-minute-crispy-cast-iron-salmon-lemon-caper',
      isTrendingLast30Days: isTrending,
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


