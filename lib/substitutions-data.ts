export type SubstitutionCategoryId =
  | 'all'
  | 'dairy-cream'
  | 'eggs-binders'
  | 'flours-thickeners'
  | 'herbs-aromatics'
  | 'fats-oils'
  | 'sweeteners-acids';

export interface MasterSubstitutionItem {
  id: string;
  category: Exclude<SubstitutionCategoryId, 'all'>;
  categoryLabel: string;
  originalIngredient: string;
  exactAmount: string;
  substituteRatio: string;
  metricBreakdown: string;
  bestFor: string;
  scienceAndImpact: string;
  relatedRecipeSlug: string;
  relatedRecipeTitle: string;
}

export const SUBSTITUTION_CATEGORIES: {
  id: SubstitutionCategoryId;
  label: string;
}[] = [
  { id: 'all', label: 'All Swaps (24+)' },
  { id: 'dairy-cream', label: 'Dairy, Milk & Cream' },
  { id: 'eggs-binders', label: 'Eggs & Baking Binders' },
  { id: 'flours-thickeners', label: 'Flours, Starches & Crumbs' },
  { id: 'herbs-aromatics', label: 'Herbs, Spices & Aromatics' },
  { id: 'fats-oils', label: 'Butter, Oils & Cooking Fats' },
  { id: 'sweeteners-acids', label: 'Acids, Wine & Sweeteners' },
];

export const MASTER_SUBSTITUTIONS_LIST: MasterSubstitutionItem[] = [
  // Dairy, Milk & Cream
  {
    id: 'sub-heavy-cream',
    category: 'dairy-cream',
    categoryLabel: 'Dairy, Milk & Cream',
    originalIngredient: 'Heavy Whipping Cream (36% Fat)',
    exactAmount: '1 Cup (240 ml)',
    substituteRatio: '180 ml Whole Milk + 60 g Melted Unsalted Butter',
    metricBreakdown: 'Add 5 g (1 tsp) cornstarch if simmering over high heat',
    bestFor: 'Creamy pasta sauces, soups, pan gravies & mashed potatoes',
    scienceAndImpact:
      'Restores the exact 36% milkfat content of heavy cream so garlic butter and Tuscan pan sauces emulsify smoothly without separating.',
    relatedRecipeSlug: '20-minute-creamy-tuscan-garlic-chicken-skillet',
    relatedRecipeTitle: '20-Minute Creamy Tuscan Garlic Chicken Skillet',
  },
  {
    id: 'sub-heavy-cream-dairy-free',
    category: 'dairy-cream',
    categoryLabel: 'Dairy, Milk & Cream',
    originalIngredient: 'Heavy Cream (Dairy-Free / Keto Option)',
    exactAmount: '1 Cup (240 ml)',
    substituteRatio: '240 ml Full-Fat Canned Coconut Cream (Chilled Solid Top)',
    metricBreakdown: '1:1 volume & weight replacement (240 ml)',
    bestFor: 'Curries, skillet chicken sauces, dairy-free soups & ganache',
    scienceAndImpact:
      'Full-fat coconut cream contains ~24–30% fat and zero lactose, thickening skillet sauces at a boil without curdling.',
    relatedRecipeSlug: '15-minute-crispy-tofu-broccoli-sesame-ginger-stir-fry',
    relatedRecipeTitle: '15-Minute Crispy Tofu & Broccoli Stir-Fry',
  },
  {
    id: 'sub-buttermilk',
    category: 'dairy-cream',
    categoryLabel: 'Dairy, Milk & Cream',
    originalIngredient: 'Cultured Buttermilk',
    exactAmount: '1 Cup (240 ml)',
    substituteRatio:
      '225 ml Warm Whole Milk + 15 ml Fresh Lemon Juice or White Vinegar',
    metricBreakdown: 'Stir and let rest for 5 minutes at room temperature',
    bestFor: 'Cupcakes, pancakes, biscuits & tender chicken marinades',
    scienceAndImpact:
      'The mild acid lowers the pH of milk, reacting with baking soda to create instant carbon dioxide lift and tender gluten strands.',
    relatedRecipeSlug: 'tropical-mango-berry-swirl-vanilla-bean-cupcakes',
    relatedRecipeTitle: 'Tropical Mango & Berry Swirl Vanilla Bean Cupcakes',
  },
  {
    id: 'sub-sour-cream',
    category: 'dairy-cream',
    categoryLabel: 'Dairy, Milk & Cream',
    originalIngredient: 'Full-Fat Sour Cream',
    exactAmount: '1 Cup (230 g)',
    substituteRatio: '230 g Full-Fat (5%) Plain Greek Yogurt',
    metricBreakdown: '1:1 gram-for-gram replacement',
    bestFor: 'Cheesecakes, dips, stroganoff sauces & moist coffee cakes',
    scienceAndImpact:
      'Matches the tangential lactic acidity and thick viscosity of sour cream while doubling protein content.',
    relatedRecipeSlug: 'burnt-basque-vanilla-bean-cheesecake-no-crust',
    relatedRecipeTitle: 'Creamy Burnt Basque Vanilla Bean Cheesecake',
  },
  {
    id: 'sub-mascarpone-cream-cheese',
    category: 'dairy-cream',
    categoryLabel: 'Dairy, Milk & Cream',
    originalIngredient: 'Mascarpone Cheese',
    exactAmount: '1 Cup (225 g)',
    substituteRatio:
      '190 g Softened Full-Fat Cream Cheese + 35 ml Heavy Cream',
    metricBreakdown: 'Whip together at room temperature until silky',
    bestFor: 'No-bake cheesecakes, tiramisu, frostings & creamy pasta',
    scienceAndImpact:
      'American cream cheese is slightly tangier and firmer than Italian mascarpone; blending in heavy cream softens the texture and balances acidity.',
    relatedRecipeSlug: 'no-bake-strawberry-cheesecake-parfait-cups',
    relatedRecipeTitle: '20-Minute No-Bake Strawberry Cheesecake Parfait Cups',
  },
  {
    id: 'sub-parmesan-pecorino',
    category: 'dairy-cream',
    categoryLabel: 'Dairy, Milk & Cream',
    originalIngredient: 'Parmigiano-Reggiano (Freshly Grated)',
    exactAmount: '1/2 Cup Grated (50 g)',
    substituteRatio: '40 g Grated Pecorino Romano or 50 g Aged Asiago',
    metricBreakdown:
      'Reduce added kosher salt by 1/4 tsp when using Pecorino',
    bestFor:
      'Pasta emulsions, garlic herb butter, meatballs & Caesar dressings',
    scienceAndImpact:
      'Pecorino Romano (sheep’s milk) melts at the same temperature as Parmigiano (65°C / 150°F) but carries higher natural salinity.',
    relatedRecipeSlug: '20-minute-creamy-tuscan-garlic-chicken-skillet',
    relatedRecipeTitle: '20-Minute Creamy Tuscan Garlic Chicken Skillet',
  },

  // Eggs & Baking Binders
  {
    id: 'sub-egg-flax',
    category: 'eggs-binders',
    categoryLabel: 'Eggs & Baking Binders',
    originalIngredient: '1 Large Whole Egg (in Baking)',
    exactAmount: '1 Large Egg (50 g out of shell)',
    substituteRatio:
      '1 Tbsp (10 g) Ground Flaxseed Meal + 3 Tbsp (45 ml) Warm Water',
    metricBreakdown: 'Whisk and rest 5 minutes until gelatinous (55 g total)',
    bestFor: 'Muffins, pancakes, brownies, cookies & oatmeal bakes',
    scienceAndImpact:
      'Flaxseed mucilage forms a natural hydrocolloid gel that binds flour and fat together in quick breads and cookies.',
    relatedRecipeSlug: 'one-bowl-fudgy-dark-chocolate-espresso-brownies',
    relatedRecipeTitle: 'One-Bowl Fudgy Dark Chocolate Espresso Brownies',
  },
  {
    id: 'sub-egg-applesauce',
    category: 'eggs-binders',
    categoryLabel: 'Eggs & Baking Binders',
    originalIngredient: '1 Large Whole Egg (Moisture Swap)',
    exactAmount: '1 Large Egg (50 g)',
    substituteRatio:
      '1/4 Cup (65 g) Unsweetened Applesauce + 1/2 tsp Baking Powder',
    metricBreakdown: '65 g fruit pectin puree per egg replaced',
    bestFor: 'Moist snack cakes, cupcakes & quick breads',
    scienceAndImpact:
      'Fruit pectin traps moisture in cake crumbs while the extra 1/2 teaspoon baking powder compensates for the lost leavening power of whole eggs.',
    relatedRecipeSlug: 'tropical-mango-berry-swirl-vanilla-bean-cupcakes',
    relatedRecipeTitle: 'Tropical Mango & Berry Swirl Vanilla Bean Cupcakes',
  },
  {
    id: 'sub-egg-meatballs',
    category: 'eggs-binders',
    categoryLabel: 'Eggs & Baking Binders',
    originalIngredient: '1 Large Egg (in Meatballs or Burgers)',
    exactAmount: '1 Large Egg (50 g)',
    substituteRatio:
      '30 g Whole Milk Ricotta or 30 ml Heavy Cream + 15 g Grated Parmesan',
    metricBreakdown: '45 g dairy-protein binder per 500 g ground meat',
    bestFor: 'Turkey meatballs, beef meatballs & herb meatloaf',
    scienceAndImpact:
      'Casein protein and melted cheese bind lean poultry or beef fibers without making the cooked meatballs rubbery.',
    relatedRecipeSlug: 'healthy-baked-garlic-herb-turkey-meatballs-zucchini',
    relatedRecipeTitle: 'Healthy Baked Garlic-Herb Turkey Meatballs',
  },
  {
    id: 'sub-egg-white-aquafaba',
    category: 'eggs-binders',
    categoryLabel: 'Eggs & Baking Binders',
    originalIngredient: '1 Large Egg White',
    exactAmount: '1 Egg White (30 ml / 30 g)',
    substituteRatio: '2 Tbsp (30 ml) Unsalted Chickpea Brine (Aquafaba)',
    metricBreakdown: 'Whip with 1/8 tsp cream of tartar for stiff peaks',
    bestFor: 'Meringues, mousse, macarons & crispy batter coatings',
    scienceAndImpact:
      'Soluble legume proteins and saponins trap air bubbles identically to egg albumen when whipped.',
    relatedRecipeSlug: 'molten-dark-chocolate-lava-cakes-for-two',
    relatedRecipeTitle: '20-Minute Molten Dark Chocolate Lava Cakes for Two',
  },

  // Flours, Starches & Crumbs
  {
    id: 'sub-cake-flour',
    category: 'flours-thickeners',
    categoryLabel: 'Flours, Starches & Crumbs',
    originalIngredient: 'Sifted Cake Flour (Low-Protein 8%)',
    exactAmount: '1 Cup (120 g)',
    substituteRatio: '104 g All-Purpose Flour + 16 g Cornstarch (Sifted Twice)',
    metricBreakdown:
      'Measure 120 g AP flour, remove 2 Tbsp (16 g), add 2 Tbsp (16 g) cornstarch',
    bestFor: 'Vanilla bean cupcakes, sponge cakes & tender pastries',
    scienceAndImpact:
      'Cornstarch dilutes the gluten-forming proteins in all-purpose flour from ~11.5% down to ~8.5%, producing a velvety bakery crumb.',
    relatedRecipeSlug: 'tropical-mango-berry-swirl-vanilla-bean-cupcakes',
    relatedRecipeTitle: 'Tropical Mango & Berry Swirl Vanilla Bean Cupcakes',
  },
  {
    id: 'sub-cornstarch',
    category: 'flours-thickeners',
    categoryLabel: 'Flours, Starches & Crumbs',
    originalIngredient: 'Cornstarch (for Glossy Stir-Fry & Pan Sauces)',
    exactAmount: '1 Tablespoon (8 g)',
    substituteRatio:
      '1 Tbsp (8 g) Arrowroot Powder or 1 Tbsp (8 g) Potato Starch',
    metricBreakdown:
      '1:1 weight swap mixed with 15 ml cold water before adding',
    bestFor: 'Stir-fry glazes, teriyaki sauces & fruit fillings',
    scienceAndImpact:
      'Arrowroot and potato starch gelatinize at lower temperatures (65°C) than flour and maintain a clear, glossy sheen even after freezing.',
    relatedRecipeSlug: '15-minute-crispy-tofu-broccoli-sesame-ginger-stir-fry',
    relatedRecipeTitle:
      '15-Minute Crispy Tofu & Broccoli Sesame-Ginger Stir-Fry',
  },
  {
    id: 'sub-breadcrumbs-keto',
    category: 'flours-thickeners',
    categoryLabel: 'Flours, Starches & Crumbs',
    originalIngredient: 'Panko or Italian Breadcrumbs',
    exactAmount: '1/2 Cup (50 g)',
    substituteRatio:
      '45 g Super-Fine Blanched Almond Flour or Crushed Pork Rinds',
    metricBreakdown:
      'Use 1:1 volume swap for meatball binders or crispy breading',
    bestFor:
      'Turkey meatballs, crispy baked chicken cutlets & low-carb casseroles',
    scienceAndImpact:
      'Almond flour absorbs meat juices to keep meatballs tender while slashing net carbs from 36g down to 4g per half-cup.',
    relatedRecipeSlug: 'healthy-baked-garlic-herb-turkey-meatballs-zucchini',
    relatedRecipeTitle: 'Healthy Baked Garlic-Herb Turkey Meatballs',
  },
  {
    id: 'sub-self-rising-flour',
    category: 'flours-thickeners',
    categoryLabel: 'Flours, Starches & Crumbs',
    originalIngredient: 'Self-Rising Flour',
    exactAmount: '1 Cup (120 g)',
    substituteRatio:
      '120 g All-Purpose Flour + 1.5 tsp (6 g) Baking Powder + 1/4 tsp (1.5 g) Fine Salt',
    metricBreakdown:
      'Whisk dry ingredients thoroughly for 30 seconds before measuring',
    bestFor: 'Quick biscuits, cobbler toppings & pancake batters',
    scienceAndImpact:
      'Replicates the exact commercial leavening and salt balance of pre-mixed self-rising flour.',
    relatedRecipeSlug:
      'ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide',
    relatedRecipeTitle:
      'Complete Guide to 1:1 Ingredient Substitutes & Cast-Iron Care',
  },
  {
    id: 'sub-baking-powder',
    category: 'flours-thickeners',
    categoryLabel: 'Flours, Starches & Crumbs',
    originalIngredient: 'Double-Acting Baking Powder',
    exactAmount: '1 Teaspoon (4 g)',
    substituteRatio:
      '1/4 tsp (1.2 g) Baking Soda + 1/2 tsp (1.7 g) Cream of Tartar + 1/4 tsp Cornstarch',
    metricBreakdown: 'Bake immediately after mixing batter',
    bestFor: 'Cookies, cupcakes, muffins & quick breads',
    scienceAndImpact:
      'Cream of tartar (tartaric acid) reacts immediately with alkaline baking soda when liquid is added to create leavening gas.',
    relatedRecipeSlug: 'brown-butter-sea-salt-chocolate-chunk-skillet-cookie',
    relatedRecipeTitle:
      '25-Minute Brown Butter Chocolate Chunk Skillet Cookie',
  },

  // Herbs, Spices & Aromatics
  {
    id: 'sub-fresh-to-dried-herbs',
    category: 'herbs-aromatics',
    categoryLabel: 'Herbs, Spices & Aromatics',
    originalIngredient:
      'Fresh Chopped Herbs (Thyme, Rosemary, Oregano, Dill)',
    exactAmount: '1 Tablespoon Fresh (15 ml / ~4 g)',
    substituteRatio: '1 Teaspoon Dried Herbs (5 ml / ~1.3 g) — 3:1 Ratio',
    metricBreakdown:
      'Add dried herbs during cooking; add fresh herbs at the end',
    bestFor:
      'Ribeye butter basting, roasted chicken thighs, salmon & pan sauces',
    scienceAndImpact:
      'Drying concentrates volatile essential oils by 300% by weight; adding dried herbs early lets them rehydrate in warm oil or broth.',
    relatedRecipeSlug:
      'air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
    relatedRecipeTitle:
      '20-Minute Air Fryer or Skillet Golden Lemon-Herb Chicken Thighs',
  },
  {
    id: 'sub-fresh-garlic',
    category: 'herbs-aromatics',
    categoryLabel: 'Herbs, Spices & Aromatics',
    originalIngredient: '1 Fresh Garlic Clove (Minced)',
    exactAmount: '1 Medium Clove (~5 g)',
    substituteRatio:
      '1/2 tsp (2.5 g) Jarred Minced Garlic or 1/4 tsp (0.8 g) Garlic Powder',
    metricBreakdown:
      'Stir garlic powder into liquid ingredients to prevent burning',
    bestFor:
      'Garlic butter shrimp, steak marinades, stir-fry sauces & dressings',
    scienceAndImpact:
      'Dehydrated garlic powder burns quickly in dry hot oil; dissolving it in broth or sauce first releases full savory allicin flavor.',
    relatedRecipeSlug: '15-minute-garlic-butter-shrimp-zucchini-skillet',
    relatedRecipeTitle: '15-Minute Garlic Butter Shrimp & Zucchini Skillet',
  },
  {
    id: 'sub-shallot',
    category: 'herbs-aromatics',
    categoryLabel: 'Herbs, Spices & Aromatics',
    originalIngredient: '1 Medium Shallot (Finely Diced)',
    exactAmount: '1 Shallot (~40 g)',
    substituteRatio:
      '35 g Finely Minced Yellow or Sweet Onion + 1 Small Clove Grated Garlic',
    metricBreakdown:
      'Sauté over medium-low heat with a pinch of salt for 2 minutes',
    bestFor: 'Lemon-caper pan sauces, vinaigrettes & Tuscan cream sauces',
    scienceAndImpact:
      'Shallots combine mild onion sweetness with subtle garlic aromatics; yellow onion plus a hint of garlic matches that flavor profile.',
    relatedRecipeSlug: '15-minute-crispy-cast-iron-salmon-lemon-caper',
    relatedRecipeTitle:
      '15-Minute Crispy Cast-Iron Salmon with Lemon-Caper Pan Sauce',
  },
  {
    id: 'sub-fresh-ginger',
    category: 'herbs-aromatics',
    categoryLabel: 'Herbs, Spices & Aromatics',
    originalIngredient: 'Fresh Grated Ginger Root',
    exactAmount: '1 Tablespoon Freshly Grated (15 g)',
    substituteRatio:
      '1/2 Teaspoon (1.2 g) Ground Dried Ginger + 2 ml Fresh Lemon Juice',
    metricBreakdown: '6:1 fresh-to-dried weight ratio',
    bestFor: 'Sesame-ginger stir-fry sauces, teriyaki salmon & marinades',
    scienceAndImpact:
      'Fresh ginger contains zingiberene and bright citrus notes; a drop of lemon juice restores the fresh brightness when using ground ginger.',
    relatedRecipeSlug: '15-minute-crispy-tofu-broccoli-sesame-ginger-stir-fry',
    relatedRecipeTitle:
      '15-Minute Crispy Tofu & Broccoli Sesame-Ginger Stir-Fry',
  },

  // Butter, Oils & Cooking Fats
  {
    id: 'sub-high-smoke-oil',
    category: 'fats-oils',
    categoryLabel: 'Butter, Oils & Cooking Fats',
    originalIngredient: 'Refined Avocado Oil (Smoke Point 270°C / 520°F)',
    exactAmount: '1 Tablespoon (15 ml)',
    substituteRatio:
      '15 ml Refined Grapeseed Oil, Ghee (Clarified Butter), or Light Olive Oil',
    metricBreakdown: '1:1 volume swap for high-heat cast-iron searing',
    bestFor:
      'Searing ribeye steaks, crispy salmon skin & seasoning cast iron',
    scienceAndImpact:
      'Prevents acrid smoke and burnt milk solids during 230°C (450°F) cast-iron searing; add whole butter only in the final 2 minutes for basting.',
    relatedRecipeSlug: 'keto-garlic-herb-butter-ribeye-steak-high-protein',
    relatedRecipeTitle:
      'Keto Garlic-Herb Butter Basted Ribeye Steak in Cast Iron',
  },
  {
    id: 'sub-unsalted-salted-butter',
    category: 'fats-oils',
    categoryLabel: 'Butter, Oils & Cooking Fats',
    originalIngredient: 'Unsalted Butter',
    exactAmount: '1/2 Cup / 1 Stick (113 g)',
    substituteRatio:
      '113 g Salted Butter (Reduce Recipe Added Salt by 1/4 tsp / 1.5 g)',
    metricBreakdown: '1:1 weight replacement with salt adjustment',
    bestFor: 'Skillet cookies, brownies, pan sauces & buttercreams',
    scienceAndImpact:
      'Commercial salted butter contains roughly 1.5g of salt per 113g stick; reducing added recipe salt prevents over-salting baked goods.',
    relatedRecipeSlug: 'brown-butter-sea-salt-chocolate-chunk-skillet-cookie',
    relatedRecipeTitle:
      '25-Minute Brown Butter Chocolate Chunk Skillet Cookie',
  },
  {
    id: 'sub-butter-dairy-free-baking',
    category: 'fats-oils',
    categoryLabel: 'Butter, Oils & Cooking Fats',
    originalIngredient: 'Melted Butter (in Brownies & Quick Breads)',
    exactAmount: '1/2 Cup Melted Butter (113 g)',
    substituteRatio:
      '95 g Virgin Coconut Oil or Extra-Virgin Olive Oil + 15 ml Water',
    metricBreakdown: '80% fat + 15% water matches dairy butter composition',
    bestFor: 'Fudgy brownies, lava cakes & muffins',
    scienceAndImpact:
      'Dairy butter is ~82% fat and ~16% water. Pure oils are 100% fat, so using 95g oil + 15ml water prevents greasy baked goods.',
    relatedRecipeSlug: 'one-bowl-fudgy-dark-chocolate-espresso-brownies',
    relatedRecipeTitle: 'One-Bowl Fudgy Dark Chocolate Espresso Brownies',
  },

  // Acids, Wine & Sweeteners
  {
    id: 'sub-white-wine-deglaze',
    category: 'sweeteners-acids',
    categoryLabel: 'Acids, Wine & Sweeteners',
    originalIngredient: 'Dry White Wine (for Deglazing Pan Sauces)',
    exactAmount: '1/2 Cup (120 ml)',
    substituteRatio:
      '105 ml Low-Sodium Chicken or Vegetable Broth + 15 ml Fresh Lemon Juice or White Wine Vinegar',
    metricBreakdown: '7 parts savory stock to 1 part bright citrus/vinegar acid',
    bestFor:
      'Lemon-caper salmon pan sauce, garlic butter shrimp & Tuscan chicken',
    scienceAndImpact:
      'Alcohol-free deglazing liquid that dissolves caramelized fond from the skillet while matching the tart acidity of Sauvignon Blanc or Pinot Grigio.',
    relatedRecipeSlug: '15-minute-crispy-cast-iron-salmon-lemon-caper',
    relatedRecipeTitle:
      '15-Minute Crispy Cast-Iron Salmon with Lemon-Caper Pan Sauce',
  },
  {
    id: 'sub-meyer-lemon',
    category: 'sweeteners-acids',
    categoryLabel: 'Acids, Wine & Sweeteners',
    originalIngredient: 'Fresh Meyer Lemon Juice',
    exactAmount: '2 Tablespoons (30 ml)',
    substituteRatio:
      '22 ml Standard Eureka Lemon Juice + 8 ml Fresh Mandarin or Orange Juice',
    metricBreakdown: '3 parts regular lemon juice to 1 part sweet citrus juice',
    bestFor: 'Crispy cast-iron salmon pan sauces, seafood dressings & glazes',
    scienceAndImpact:
      'Meyer lemons are a natural cross between a lemon and a mandarin orange; adding 25% orange juice softens the sharp citric bite.',
    relatedRecipeSlug: '15-minute-crispy-cast-iron-salmon-lemon-caper',
    relatedRecipeTitle:
      '15-Minute Crispy Cast-Iron Salmon with Lemon-Caper Pan Sauce',
  },
  {
    id: 'sub-brown-sugar',
    category: 'sweeteners-acids',
    categoryLabel: 'Acids, Wine & Sweeteners',
    originalIngredient: 'Light or Dark Brown Sugar (Packed)',
    exactAmount: '1 Cup Packed (200 g)',
    substituteRatio:
      '185 g White Granulated Sugar + 15 g (1 Tbsp) Unsulfured Molasses',
    metricBreakdown: 'Use 30 g (2 Tbsp) molasses for Dark Brown Sugar',
    bestFor: 'Chocolate chunk skillet cookies, BBQ glazes & teriyaki sauces',
    scienceAndImpact:
      'Molasses adds hygroscopic moisture and slightly acidic invert sugars that create chewy centers in skillet cookies.',
    relatedRecipeSlug: 'brown-butter-sea-salt-chocolate-chunk-skillet-cookie',
    relatedRecipeTitle:
      '25-Minute Brown Butter Chocolate Chunk Skillet Cookie',
  },
  {
    id: 'sub-honey-maple',
    category: 'sweeteners-acids',
    categoryLabel: 'Acids, Wine & Sweeteners',
    originalIngredient: 'Raw Honey (in Glazes & Marinades)',
    exactAmount: '2 Tablespoons (30 ml / 42 g)',
    substituteRatio:
      '30 ml Pure Maple Syrup or Agave Nectar (or 25 g Brown Sugar + 10 ml Warm Water)',
    metricBreakdown: '1:1 volume swap for glazes and dressings',
    bestFor:
      'Air fryer honey-garlic salmon bites, stir-fry sauces & vinaigrettes',
    scienceAndImpact:
      'Maple syrup caramelizes at the same temperature as honey (160°C / 320°F) in the Air Fryer while keeping the glaze plant-based.',
    relatedRecipeSlug: '12-minute-air-fryer-honey-garlic-salmon-bites',
    relatedRecipeTitle: '12-Minute Air Fryer Honey-Garlic Salmon Bites',
  },
  {
    id: 'sub-soy-sauce-tamari',
    category: 'sweeteners-acids',
    categoryLabel: 'Acids, Wine & Sweeteners',
    originalIngredient: 'Low-Sodium Soy Sauce',
    exactAmount: '2 Tablespoons (30 ml)',
    substituteRatio:
      '30 ml Gluten-Free Tamari or 30 ml Coconut Aminos + 1/8 tsp Kosher Salt',
    metricBreakdown: '1:1 volume replacement',
    bestFor: 'Tofu broccoli stir-fry, beef broccoli skillet & salmon glazes',
    scienceAndImpact:
      'Tamari provides identical umami glutamates without wheat gluten; coconut aminos is slightly sweeter and lower in sodium.',
    relatedRecipeSlug: '15-minute-crispy-tofu-broccoli-sesame-ginger-stir-fry',
    relatedRecipeTitle:
      '15-Minute Crispy Tofu & Broccoli Sesame-Ginger Stir-Fry',
  },
];
