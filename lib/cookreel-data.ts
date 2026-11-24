export type PrimaryCategorySlug =
  | 'quick_easy'
  | 'healthy_diet'
  | 'desserts_baking'
  | 'kitchen_hacks';

export interface SubcategoryMeta {
  id: string;
  parent: PrimaryCategorySlug;
  labelEn: string;
  labelAr: string;
}

export interface CategoryArchitecture {
  slug: PrimaryCategorySlug;
  labelEn: string;
  labelAr: string;
  seoObjectiveEn: string;
  seoObjectiveAr: string;
  subcategories: SubcategoryMeta[];
}

export interface IngredientSubstitution {
  originalEn: string;
  originalAr: string;
  substituteEn: string;
  substituteAr: string;
  chefNoteEn: string;
  chefNoteAr: string;
}

export interface RecipeFaq {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface CulinaryRecipe {
  id: string;
  slug: string;
  category: PrimaryCategorySlug;
  subcategoryId: string;
  categoryLabelEn: string;
  categoryLabelAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  wordCount: number;
  introParagraphsEn: string[];
  introParagraphsAr: string[];
  whyThisWorksEn: string[];
  whyThisWorksAr: string[];
  chefTipsEn: string[];
  chefTipsAr: string[];
  substitutions: IngredientSubstitution[];
  faqs: RecipeFaq[];
  stepGalleryImages: string[];
  chefName: string;
  chefTitleEn: string;
  chefTitleAr: string;
  prepMinutes: number;
  cookMinutes: number;
  calories: number;
  proteinGrams: number;
  netCarbsGrams: number;
  videoDuration: string;
  videoUrl: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gearItem: {
    id: string;
    nameEn: string;
    nameAr: string;
    brand: string;
    priceUsd: number;
    affiliateStore: string;
    image: string;
  };
  ingredientsEn: { item: string; amount: number; unit: string }[];
  ingredientsAr: { item: string; amount: number; unit: string }[];
  stepsEn: { title: string; instruction: string; timerSeconds: number }[];
  stepsAr: { title: string; instruction: string; timerSeconds: number }[];
}

export const HERO_FEATURED_VIDEO_URL = '/videos/hero-cookreel-featured.mp4';

export const SITE_ARCHITECTURE: CategoryArchitecture[] = [
  {
    slug: 'quick_easy',
    labelEn: 'Quick & Easy',
    labelAr: 'وصفات سريعة',
    seoObjectiveEn:
      'Weeknight dinners on the table in 15 to 25 minutes—featuring crispy air fryer favorites, one-pan skillets, and 5-ingredient meals.',
    seoObjectiveAr:
      'وجبات عشاء سريعة تجهز خلال 15 إلى 25 دقيقة، تشمل وصفات القلاية الهوائية والمقلاة الواحدة ووجبات الـ 5 مكونات.',
    subcategories: [
      {
        id: '15-minute-meals',
        parent: 'quick_easy',
        labelEn: '15-Minute Meals',
        labelAr: 'وجبات في 15 دقيقة',
      },
      {
        id: '5-ingredient-recipes',
        parent: 'quick_easy',
        labelEn: '5-Ingredient Recipes',
        labelAr: 'وصفات بـ 5 مكونات',
      },
      {
        id: 'air-fryer-recipes',
        parent: 'quick_easy',
        labelEn: 'Air Fryer Recipes',
        labelAr: 'وصفات القلاية الهوائية',
      },
    ],
  },
  {
    slug: 'healthy_diet',
    labelEn: 'Healthy & Diet',
    labelAr: 'أكل صحي وحميات',
    seoObjectiveEn:
      'Nutrient-dense recipes crafted with complete macro profiles—covering Keto, low-carb, high-protein, and vibrant plant-based bowls.',
    seoObjectiveAr:
      'وصفات صحية متوازنة العناصر الغذائية مع حساب دقيق للسعرات والبروتين، تشمل الكيتو واللو كارب والوجبات النباتية.',
    subcategories: [
      {
        id: 'keto-low-carb',
        parent: 'healthy_diet',
        labelEn: 'Keto & Low-Carb',
        labelAr: 'كيتو ولو كارب',
      },
      {
        id: 'high-protein-meals',
        parent: 'healthy_diet',
        labelEn: 'High-Protein Meals',
        labelAr: 'وجبات عالية البروتين',
      },
      {
        id: 'vegan-vegetarian',
        parent: 'healthy_diet',
        labelEn: 'Vegan & Vegetarian',
        labelAr: 'نباتي وصحي',
      },
    ],
  },
  {
    slug: 'desserts_baking',
    labelEn: 'Desserts & Baking',
    labelAr: 'حلويات ومخبوزات',
    seoObjectiveEn:
      'Bakery-worthy cakes, swirled cupcakes, effortless no-bake treats, and naturally sweetened desserts tested to perfection.',
    seoObjectiveAr:
      'حلويات منزلية ومخبوزات احترافية، تشمل الحلويات الباردة بدون فرن، الكيك والكب كيك، والحلويات الصحية خفيفة السكر.',
    subcategories: [
      {
        id: 'no-bake-desserts',
        parent: 'desserts_baking',
        labelEn: 'No-Bake Desserts',
        labelAr: 'حلويات بدون فرن',
      },
      {
        id: 'healthy-sweets',
        parent: 'desserts_baking',
        labelEn: 'Healthy Sweets',
        labelAr: 'حلويات صحية',
      },
      {
        id: 'cakes-pastries',
        parent: 'desserts_baking',
        labelEn: 'Cakes & Pastries',
        labelAr: 'كيك ومخبوزات',
      },
    ],
  },
  {
    slug: 'kitchen_hacks',
    labelEn: 'Kitchen Hacks & Guides',
    labelAr: 'نصائح وأدوات المطبخ',
    seoObjectiveEn:
      'In-depth culinary handbooks covering 1:1 ingredient substitutions, weekly meal-prep storage, and cast-iron skillet care.',
    seoObjectiveAr:
      'أدلة مطبخ شاملة تغطي بدائل المكونات الدقيقة، خطط تجهيز وحفظ الوجبات الأسبوعية، وأسرار العناية بأدوات الطهي.',
    subcategories: [
      {
        id: 'ingredient-substitutes',
        parent: 'kitchen_hacks',
        labelEn: 'Ingredient Substitutes',
        labelAr: 'بدائل المكونات',
      },
      {
        id: 'meal-prep-guides',
        parent: 'kitchen_hacks',
        labelEn: 'Meal Prep Guides',
        labelAr: 'أدلة تجهيز الوجبات',
      },
      {
        id: 'cooking-tips',
        parent: 'kitchen_hacks',
        labelEn: 'Cooking Tips',
        labelAr: 'أسرار ونصائح الطبخ',
      },
    ],
  },
];

export const COOKREEL_RECIPES: CulinaryRecipe[] = [
  {
    id: 'crispy-salmon-skillet',
    slug: '15-minute-crispy-cast-iron-salmon-lemon-caper',
    category: 'quick_easy',
    subcategoryId: '15-minute-meals',
    categoryLabelEn: 'Quick & Easy · 15-Minute Meals',
    categoryLabelAr: 'وصفات سريعة · وجبات في 15 دقيقة',
    titleEn: '15-Minute Crispy Cast-Iron Salmon with Lemon Caper Butter',
    titleAr: 'سلمون مقرمش بالزبدة والليمون في المقلاة خلال 15 دقيقة',
    subtitleEn:
      'Restaurant-grade glass-crispy salmon skin seared in 10 minutes flat, finished with foaming garlic lemon caper butter.',
    subtitleAr:
      'فيليه سلمون مقرمش الجلد كالمطاعم في 10 دقائق فقط، مع صوص الزبدة بالثوم والليمون والكبر.',
    wordCount: 1080,
    introParagraphsEn: [
      'Nothing compares to the contrast of shatteringly crisp, golden-brown salmon skin giving way to buttery, medium-rare flaking fillets underneath. While many home cooks resort to baking salmon in foil—which steams the fish and turns the skin rubbery—this 15-minute cast-iron skillet technique delivers steakhouse-level texture on a busy weeknight.',
      'By starting with bone-dry skin and applying gentle downward pressure with a flexible fish spatula for the first 10 seconds of contact, you prevent the fillet from buckling. Within six minutes, the natural marine collagen renders into a delicate glass-like crust that pairs effortlessly with our bright, briny Meyer lemon and caper pan sauce.',
    ],
    introParagraphsAr: [
      'لا شيء يضاهي قرمشة جلد السلمون الذهبي المحمر عندما يجتمع مع طراوة الفيليه الغني بالعصارة من الداخل. بينما يلجأ الكثيرون إلى خبز السلمون في القصدير—مما يؤدي إلى تبخير السمك وجعل الجلد مطاطياً—فإن تقنية المقلاة الساخنة هذه تمنحك نتيجة تضاهي أفخم المطاعم في 15 دقيقة فقط.',
      'يكمن السر العلمي في تجفيف جلد السلمون تماماً من أي رطوبة سطحية ثم الضغط الخفيف بملعقة مسطحة لأول 10 ثوانٍ فور ملامسته للمقلاة، مما يمنع انكماش الفيليه ويضمن تحميراً متساوياً يتوج بصوص الزبدة والليمون والكبر.',
    ],
    whyThisWorksEn: [
      '90% of the cooking happens skin-side down, insulating the delicate flesh from overcooking.',
      'Cold-patted skin + high thermal mass cast iron eliminates sticking without heavy breading.',
      'Emulsifying cultured butter with lemon juice and caper brine creates an instant 60-second restaurant pan sauce.',
    ],
    whyThisWorksAr: [
      'يتم 90% من الطهي على جهة الجلد مما يحمي لحم السلمون الطري من الجفاف.',
      'التجفيف المسبق مع حرارة الحديد الزهر يمنع الالتصاق نهائياً بدون أي دقيق.',
      'مزج الزبدة مع عصير الليمون في آخر دقيقتين يصنع صوص مطاعم مركز في 60 ثانية.',
    ],
    chefTipsEn: [
      'Leave the uncovered salmon fillets in the refrigerator on a paper-towel-lined plate for 20 minutes before cooking if you have time; refrigerator airflow dehydrates the skin surface for maximum blistered crunch.',
      'Do not salt the skin until the exact moment the skillet begins to wisp light smoke—salting too early draws moisture back out to the surface.',
      'Wait until you see the opaque cooked line rise three-quarters of the way up the side of the fillet before flipping.',
    ],
    chefTipsAr: [
      'جفف جلد السلمون جيداً بمناديل المطبخ الورقية، ولا تضف الملح إلا في اللحظة التي تضع فيها الفيليه داخل المقلاة الساخنة حتى لا يفرز الجلد رطوبته مبكراً.',
      'لا تحرك الفيليه أبداً خلال أول 5 دقائق؛ عندما ينضج الجلد ويقرمش فإنه ينفصل تلقائياً عن سطح المقلاة بسهولة.',
      'راقب تغير لون جانب الفيليه من الوردي الشفاف إلى الوردي الفاتح حتى ثلاثة أرباع ارتفاع القطعة قبل قلبها.',
    ],
    substitutions: [
      {
        originalEn: 'Cultured Dairy Butter (35g)',
        originalAr: 'الزبدة الطبيعية (35 جم)',
        substituteEn: 'Ghee or Extra-Virgin Olive Oil + 1 tsp Dijon Mustard',
        substituteAr: 'السمن الطبيعي أو زيت الزيتون البكر مع نصف ملعقة خردل ديجون',
        chefNoteEn:
          'Ideal for dairy-free or Paleo diets while keeping the sauce glossy and emulsified.',
        chefNoteAr:
          'بديل ممتاز لمن يتبعون حمية خالية من الألبان مع الحفاظ على قوام الصوص اللامع.',
      },
      {
        originalEn: 'Brined Non-Pareil Capers',
        originalAr: 'الكبر المملح (Capers)',
        substituteEn: 'Finely chopped Castelvetrano green olives or lemon zest',
        substituteAr: 'زيتون أخضر مفروم ناعماً أو بشر قشر الليمون الطازج',
        chefNoteEn:
          'Provides the same bright salinity that cuts through the richness of Atlantic salmon.',
        chefNoteAr:
          'يمنح نفس التوازن الحامضي المالح الذي يكسر دسامة السلمون.',
      },
      {
        originalEn: 'Cast-Iron Skillet (Stovetop)',
        originalAr: 'مقلاة الحديد الزهر',
        substituteEn: 'Air Fryer preheated to 200°C (400°F) for 7–9 minutes',
        substituteAr: 'القلاية الهوائية (Air Fryer) على حرارة 200 مئوية لمدة 8 دقائق',
        chefNoteEn:
          'Place salmon skin-side UP in the air fryer basket sprayed lightly with avocado oil.',
        chefNoteAr:
          'ضع السلمون بحيث يكون الجلد للأعلى داخل سلة القلاية الهوائية للحصول على قرمشة رائعة.',
      },
    ],
    faqs: [
      {
        questionEn:
          'How do I store leftover crispy salmon in the refrigerator without losing texture?',
        questionAr: 'كيف أحفظ قطع السلمون المتبقية في الثلاجة مع الحفاظ على قرمشتها؟',
        answerEn:
          'Store cooled salmon fillets in an airtight glass container lined with a dry paper towel for up to 3 days. Keep the lemon caper butter sauce in a separate small jar so the skin stays dry.',
        answerAr:
          'احفظ السلمون بعد أن يبرد في حافظة زجاجية محكمة الإغلاق مبطنة بمنديل ورقي لمدة تصل إلى 3 أيام، ويفضل فصل الصوص في وعاء صغير منفصل.',
      },
      {
        questionEn: 'What is the best way to reheat cooked salmon so it stays moist?',
        questionAr: 'ما هي أفضل طريقة لإعادة تسخين السلمون دون أن يجف؟',
        answerEn:
          'Never microwave cooked salmon. Instead, reheat skin-side down in a dry skillet over medium-low heat for 3 minutes or in an Air Fryer at 175°C (350°F) for 3–4 minutes until the skin re-crisps.',
        answerAr:
          'تجنب الميكروويف تماماً؛ سخنه في مقلاة جافة على جهة الجلد لمدة 3 دقائق على نار هادئة أو في القلاية الهوائية على 175 مئوية لـ 3 دقائق.',
      },
      {
        questionEn: 'Can I use frozen salmon fillets for this 15-minute recipe?',
        questionAr: 'هل يمكن استخدام فيليه السلمون المجمد في هذه الوصفة؟',
        answerEn:
          'Yes! Thaw frozen fillets overnight in the refrigerator, then press firmly between two layers of paper towels to extract excess ice-crystal moisture before searing.',
        answerAr:
          'نعم بكل تأكيد، فقط اتركه يذوب في الثلاجة طوال الليل ثم جففه جيداً بطبقتين من ورق المطبخ قبل التحمير.',
      },
    ],
    stepGalleryImages: [
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_crispy_salmon_1795527113114.jpg',
    ],
    chefName: 'Chef Elena Vance',
    chefTitleEn: 'Executive Culinary Director · Former Michelin Bistro Sous-Chef',
    chefTitleAr: 'مديرة استوديو الطهي · شيف تنفيذية متخصصة في المأكولات البحرية',
    prepMinutes: 5,
    cookMinutes: 10,
    calories: 460,
    proteinGrams: 42,
    netCarbsGrams: 4,
    videoDuration: '0:12',
    videoUrl: '/videos/crispy-salmon-skillet.mp4',
    rating: 4.9,
    reviewsCount: 318,
    image: '/images/recipe_crispy_salmon_1795527113114.jpg',
    gearItem: {
      id: 'gear-skillet-12',
      nameEn: '12-Inch Matte Black Enameled Cast-Iron Skillet',
      nameAr: 'مقلاة حديد زهر مطلية بالمينا السوداء 12 إنش',
      brand: 'Staub Culinary',
      priceUsd: 145,
      affiliateStore: 'Amazon Kitchen',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Skin-on Atlantic salmon fillets', amount: 400, unit: 'g' },
      { item: 'Unsalted cultured herb butter', amount: 35, unit: 'g' },
      { item: 'Fresh green asparagus spears', amount: 200, unit: 'g' },
      { item: 'Lemon juice & drained brined capers', amount: 25, unit: 'ml' },
      { item: 'Flaky sea salt & cracked black pepper', amount: 6, unit: 'g' },
    ],
    ingredientsAr: [
      { item: 'فيليه سلمون أطلسي بالجلد', amount: 400, unit: 'جم' },
      { item: 'زبدة أعشاب طبيعية غير مملحة', amount: 35, unit: 'جم' },
      { item: 'هليون أخضر طازج', amount: 200, unit: 'جم' },
      { item: 'عصير ليمون طازج مع الكبر', amount: 25, unit: 'مل' },
      { item: 'ملح بحري خشن وفلفل أسود طازج', amount: 6, unit: 'جم' },
    ],
    stepsEn: [
      {
        title: 'Dry & Score the Skin',
        instruction:
          'Pat salmon skin bone-dry with paper towels and season generously with flaky sea salt right before searing.',
        timerSeconds: 60,
      },
      {
        title: 'Uninterrupted Cast-Iron Sear',
        instruction:
          'Place skin-side down into a hot cast-iron skillet over medium-high heat. Press firmly for 10 seconds and sear undisturbed for 6 minutes.',
        timerSeconds: 360,
      },
      {
        title: 'Lemon Caper Butter Baste',
        instruction:
          'Flip fillets, add cultured butter, crushed garlic, capers, and asparagus spears, basting continuously for 2 minutes.',
        timerSeconds: 120,
      },
    ],
    stepsAr: [
      {
        title: 'تجفيف وتتبيل الجلد',
        instruction:
          'جفف جلد السلمون تماماً بورق المطبخ وتبّله بالملح البحري الخشن مباشرة قبل وضعه في المقلاة.',
        timerSeconds: 60,
      },
      {
        title: 'التحمير بدون تحريك',
        instruction:
          'ضع الفيليه على جهة الجلد في مقلاة الزهر الساخنة واضغط برفق لـ 10 ثوانٍ، ثم اتركه 6 دقائق حتى يصبح ذهبياً مقرمشاً.',
        timerSeconds: 360,
      },
      {
        title: 'إضافة الزبدة والليمون',
        instruction:
          'اقلب السلمون وأضف الزبدة والثوم والكبر والهليون، واسكب الزبدة الذائبة فوق الفيليه لمدة دقيقتين.',
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'garlic-butter-ribeye-steak',
    slug: 'keto-garlic-herb-butter-ribeye-steak-high-protein',
    category: 'healthy_diet',
    subcategoryId: 'keto-low-carb',
    categoryLabelEn: 'Healthy & Diet · Keto & High-Protein',
    categoryLabelAr: 'أكل صحي وحميات · كيتو وبروتين عالي',
    titleEn: 'Keto Pan-Seared Ribeye Steak in Foaming Garlic Thyme Butter',
    titleAr: 'ستيك ريب آي كيتو بالثوم وزبدة الزعتر البري (54 جم بروتين)',
    subtitleEn:
      'Zero-carb, 54g high-protein steakhouse ribeye basted with crushed garlic cloves, fresh rosemary, and grass-fed butter.',
    subtitleAr:
      'وجبة كيتو مثالية خالية من الكربوهيدرات وغنية بـ 54 جم بروتين مع الزبدة الطبيعية والأعشاب.',
    wordCount: 1120,
    introParagraphsEn: [
      'For anyone following a ketogenic, low-carb, or high-protein strength nutrition protocol, a properly seared boneless ribeye is the gold standard of nutrient density. Delivering 54 grams of complete bioavailable protein and zero net carbohydrates, this French arrosé (butter-basting) method transforms a simple cut of beef into an indulgent culinary centerpiece in under 15 minutes.',
      'The secret lies in two-stage thermal control: first searing in high-smoke-point avocado oil to build a deep Maillard reaction crust, then dropping in whole grass-fed butter, smashed garlic cloves, and woody thyme sprigs during the final 90 seconds so the milk solids brown slowly without burning.',
    ],
    introParagraphsAr: [
      'لكل من يتبع نظام الكيتو دايت (Keto & Low-Carb) أو الأنظمة الغذائية عالية البروتين لبناء العضلات، يُعد ستيك الريب آي المشوي في المقلاة الوجبة المثالية المتكاملة؛ إذ يمنحك 54 جراماً من البروتين الصافي مع صفر كربوهيدرات صافية.',
      'تعتمد هذه الوصفة على تقنية (Arrosé) الفرنسية الشهيرة، حيث نبدأ بتكوين قشرة محمرة غنية باستخدام زيت الأفوكادو الذي يتحمل الحرارة العالية، ثم نضيف الزبدة الطبيعية وفصوص الثوم والزعتر البري في آخر 90 ثانية لتسقية الستيك بالنكهة العطرية دون احتراق الزبدة.',
    ],
    whyThisWorksEn: [
      '0g Net Carbs and 54g Protein—tailor-made for Keto, Carnivore, and post-workout macro goals.',
      'Using avocado oil first prevents butter from burning during the initial 230°C sear.',
      'Resting on a warm board for 6 minutes redistributes intramuscular juices evenly.',
    ],
    whyThisWorksAr: [
      'صفر كربوهيدرات و54 جم بروتين صافي—مثالي لحمية الكيتو والرياضيين.',
      'استخدام زيت الأفوكادو أولاً يحمي الزبدة من الاحتراق أثناء التحمير الأولي.',
      'إراحة الستيك لـ 6 دقائق بعد الطهي يعيد توزيع العصارة داخل الألياف.',
    ],
    chefTipsEn: [
      'Always choose a ribeye at least 1.5 inches (3.8 cm) thick; thin supermarket steaks overcook in the center before developing a proper exterior crust.',
      'Keep the papery skins on your smashed garlic cloves when tossing them into the hot skillet—the skin shields the garlic from turning acrid and bitter.',
      'Use an instant-read digital meat thermometer and pull the steak at 52°C (125°F) for medium-rare, as carryover cooking raises it by 3°C while resting.',
    ],
    chefTipsAr: [
      'اختر دائماً شريحة ستيك بسماكة لا تقل عن 3.5 سم؛ الشرائح الرقيقة تنضج زيادة عن اللزوم من الداخل قبل أن تكتسب لوناً ذهبياً من الخارج.',
      'اترك القشرة الخارجية على فصوص الثوم عند ضغطها وإضافتها للمقلاة، لأن القشرة تحمي الثوم من الاحتراق والمرارة.',
      'استخدم ميزان حرارة اللحوم وارفع الستيك عند درجة 52 مئوية للحصول على نضج (Medium-Rare) مثالي.',
    ],
    substitutions: [
      {
        originalEn: 'Boneless Ribeye Steak',
        originalAr: 'ستيك ريب آي (Ribeye)',
        substituteEn: 'NY Strip Sirloin or Beef Tenderloin Filet Mignon',
        substituteAr: 'ستيك سيرلوين (NY Strip) أو فيليه مينيون قليل الدهون',
        chefNoteEn:
          'Choose Filet Mignon if you want lower total calories and leaner high-protein macros.',
        chefNoteAr:
          'اختر الفيليه إذا كنت ترغب في تقليل السعرات والدهون مع الحفاظ على نسبة البروتين العالية.',
      },
      {
        originalEn: 'Grass-Fed Dairy Butter',
        originalAr: 'زبدة الأبقار الطبيعية',
        substituteEn: 'Clarified Ghee or Beef Tallow',
        substituteAr: 'السمن البقري المصفى (Ghee) أو دهن العجل الطبيعي',
        chefNoteEn:
          'Zero lactose and a higher 250°C smoke point for strict Whole30 / Dairy-Free Keto.',
        chefNoteAr:
          'خالٍ تماماً من اللاكتوز ويتحمل درجات حرارة أعلى دون دخان.',
      },
    ],
    faqs: [
      {
        questionEn: 'Is this garlic butter ribeye recipe 100% Keto and gluten-free?',
        questionAr: 'هل هذه الوصفة متوافقة 100% مع الكيتو وخالية من الغلوتين؟',
        answerEn:
          'Yes, it contains 0g net carbs, zero gluten, and an optimal 70/30 fat-to-protein caloric ratio for ketosis.',
        answerAr:
          'نعم، الوصفة خالية تماماً من الكربوهيدرات والغلوتين وتحتوي على نسبة دهون صحية إلى بروتين مثالية لحالة الكيتوسيس.',
      },
      {
        questionEn: 'How can I meal-prep and store cooked steak slices for the week?',
        questionAr: 'كيف أحفظ شرائح الستيك لتجهيز وجبات الأسبوع (Meal Prep)؟',
        answerEn:
          'Slice the rested steak against the grain, pour the solidified garlic herb pan butter over the slices, and refrigerate in glass meal-prep containers for up to 4 days.',
        answerAr:
          'قطّع الستيك عكس اتجاه الألياف بعد أن يرتاح، واسكب فوقه زبدة الأعشاب واحفظه في علب زجاجية في الثلاجة لمدة 4 أيام.',
      },
      {
        questionEn: 'Can I freeze cooked ribeye steak?',
        questionAr: 'هل يمكن تجميد الستيك المطهو في الفريزر؟',
        answerEn:
          'Yes, vacuum-seal or wrap tightly in freezer paper for up to 2 months. Thaw overnight in the fridge and sear briefly for 60 seconds in a hot pan.',
        answerAr:
          'نعم، يمكن تجميده في أكياس مفرغة من الهواء لمدة شهرين، ثم تذويبه في الثلاجة وتسخينه لـ 60 ثانية فقط في مقلاة ساخنة.',
      },
    ],
    stepGalleryImages: [
      '/images/hero_cookreel_studio_1795527112508.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    ],
    chefName: 'Chef Marcus Thorne',
    chefTitleEn: 'Sports Nutrition Chef & Cast-Iron Specialist',
    chefTitleAr: 'شيف متخصص في التغذية الرياضية وحميات الكيتو والبروتين',
    prepMinutes: 5,
    cookMinutes: 9,
    calories: 610,
    proteinGrams: 54,
    netCarbsGrams: 1,
    videoDuration: '0:12',
    videoUrl: '/videos/garlic-butter-ribeye-steak.mp4',
    rating: 5.0,
    reviewsCount: 412,
    image: '/images/recipe_garlic_butter_steak_1795529483479.jpg',
    gearItem: {
      id: 'gear-damascus-knife',
      nameEn: '8-Inch Japanese 67-Layer Damascus Chef Knife',
      nameAr: 'سكين شيف ياباني دمشقي 67 طبقة مقاس 8 إنش',
      brand: 'Shun Premier',
      priceUsd: 175,
      affiliateStore: 'Williams Sonoma',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Prime boneless ribeye steak (1.5 inch thick)', amount: 450, unit: 'g' },
      { item: 'Unsalted grass-fed butter', amount: 45, unit: 'g' },
      { item: 'Crushed garlic cloves, skin-on', amount: 4, unit: 'pcs' },
      { item: 'Fresh thyme & rosemary sprigs', amount: 3, unit: 'sprigs' },
      { item: 'High-smoke-point avocado oil', amount: 15, unit: 'ml' },
    ],
    ingredientsAr: [
      { item: 'شريحة ستيك ريب آي بسماكة 3.5 سم', amount: 450, unit: 'جم' },
      { item: 'زبدة طبيعية غير مملحة', amount: 45, unit: 'جم' },
      { item: 'فصوص ثوم كاملة مضغوطة', amount: 4, unit: 'حبة' },
      { item: 'أغصان زعتر بري وروزماري طازج', amount: 3, unit: 'غصن' },
      { item: 'زيت أفوكادو عالي التحمل للحرارة', amount: 15, unit: 'مل' },
    ],
    stepsEn: [
      {
        title: 'Temper & Heavy Season',
        instruction:
          'Let steak rest at room temperature for 20 minutes, then coat all sides including the fat cap with coarse salt.',
        timerSeconds: 120,
      },
      {
        title: 'High-Heat Crust Sear',
        instruction:
          'Sear in smoking-hot cast iron with avocado oil for 3 minutes per side until a deep mahogany crust forms.',
        timerSeconds: 180,
      },
      {
        title: 'Aromatic Butter Arrosé',
        instruction:
          'Toss in butter, smashed garlic, and thyme. Tilt the pan and spoon foaming butter over the steak for 90 seconds before resting.',
        timerSeconds: 90,
      },
    ],
    stepsAr: [
      {
        title: 'تجهيز وتتبيل الستيك',
        instruction:
          'أخرج الستيك قبل 20 دقيقة ليأخذ حرارة الغرفة ثم تبله جيداً بالملح الخشن من كافة الجهات.',
        timerSeconds: 120,
      },
      {
        title: 'تكوين القشرة الذهبية',
        instruction:
          'اشوِ الستيك في مقلاة ساخنة جداً لمدة 3 دقائق لكل وجه حتى تتكون قشرة بنية غنية.',
        timerSeconds: 180,
      },
      {
        title: 'التسقية بزبدة الثوم والأعشاب',
        instruction:
          'أضف الزبدة والثوم والزعتر وأمِل المقلاة لسكب الزبدة الفوارة فوق الستيك لمدة 90 ثانية ثم اتركه يرتاح قبل التقطيع.',
        timerSeconds: 90,
      },
    ],
  },
  {
    id: 'truffle-tagliatelle-pasta',
    slug: '5-ingredient-tagliatelle-black-truffle-butter-parmigiano',
    category: 'quick_easy',
    subcategoryId: '5-ingredient-recipes',
    categoryLabelEn: 'Quick & Easy · 5-Ingredient Recipes',
    categoryLabelAr: 'وصفات سريعة · وصفات بـ 5 مكونات',
    titleEn: '5-Ingredient Tagliatelle in Black Truffle Butter & Parmigiano',
    titleAr: 'باستا تالياتيلي بـ 5 مكونات فقط بصلصة الكمأة والبارميزان',
    subtitleEn:
      'Silky fresh egg ribbons emulsified with starchy pasta water, black truffle butter, and 24-month Parmigiano-Reggiano—no heavy cream required.',
    subtitleAr:
      'باستا إيطالية فاخرة بـ 5 مكونات فقط وبدون كريمة طبخ، تعتمد على مستحلب ماء السلق وزبدة الكمأة والبارميزان.',
    wordCount: 1040,
    introParagraphsEn: [
      'Authentic Italian trattorias never drown fresh egg tagliatelle in heavy cream. Instead, they rely on a scientific culinary miracle known as starch-lipid emulsification: whisking starchy pasta cooking water directly into melted black truffle butter and finely grated 24-month aged Parmigiano-Reggiano.',
      'Requiring only five pantry ingredients and 18 minutes from start to table, this recipe produces a velvety, restaurant-grade sauce that clings to every ribbon of pasta without feeling heavy.',
    ],
    introParagraphsAr: [
      'لا تستخدم المطاعم الإيطالية الأصيلة كريمة الطبخ الثقيلة في تحضير باستا الكمأة، بل تعتمد على سر علمي بسيط يسمى (الاستحلاب النشوي): أي خفق ماء سلق الباستا الغني بالنشا مع زبدة الكمأة الذائبة وجبن البارميزان المعتق المبشور ناعماً.',
      'بـ 5 مكونات فقط وخلال أقل من 18 دقيقة، ستحصل على صوص حريري لامع يغلف كل شريط من الباستا بنكهة غنية وخفيفة على المعدة.',
    ],
    whyThisWorksEn: [
      'Only 5 ingredients—high margin, low prep complexity, and naturally cream-free.',
      'Tossing off the heat prevents Parmigiano proteins from clumping into strings.',
      'Fresh egg pasta cooks in 150 seconds flat.',
    ],
    whyThisWorksAr: [
      '5 مكونات فقط، بدون كريمة طبخ، وتجهز في دقائق معدودة.',
      'التقليب خارج النار يمنع تكتل جبن البارميزان ويحوله لصوص كريمي.',
      'الباستا الطازجة تنضج في دقيقتين ونصف فقط.',
    ],
    chefTipsEn: [
      'Boil your pasta in 30% less water than usual so the cooking water becomes extra concentrated with wheat starch—this starch is the glue that binds your sauce.',
      'Never use pre-shredded bagged parmesan; it contains cellulose anti-caking powder that refuses to melt smoothly.',
      'Always remove the skillet from the burner for 20 seconds before adding cheese.',
    ],
    chefTipsAr: [
      'اسلق الباستا في كمية ماء أقل بنسبة 30% من المعتاد حتى يصبح ماء السلق مركزاً بالنشا الطبيعي الذي يربط الصوص.',
      'تجنب الجبن المبشور الجاهز في الأكياس لأنه يحتوي على نشا مانع للتكتل يمنع ذوبان الجبن بسلاسة.',
      'ارفع المقلاة عن النار تماماً قبل إضافة الجبن حتى لا ينفصل الدهن.',
    ],
    substitutions: [
      {
        originalEn: 'Black Truffle Butter (45g)',
        originalAr: 'زبدة الكمأة السوداء (45 جم)',
        substituteEn: 'Unsalted butter + 1 tsp white truffle oil or sautéed cremini mushrooms',
        substituteAr: 'زبدة عادية غير مملحة مع ملعقة صغيرة زيت كمأة أو مشروم بني مشوح',
        chefNoteEn:
          'If you do not have truffle butter on hand, finely minced browned mushrooms deliver deep umami.',
        chefNoteAr:
          'بديل اقتصادي متوفر في كل مطبخ يمنح نكهة الأومامي الغنية.',
      },
      {
        originalEn: '24-Month Parmigiano-Reggiano',
        originalAr: 'جبن بارميزان ريجيانو',
        substituteEn: 'Pecorino Romano or Grana Padano (finely microplaned)',
        substituteAr: 'جبن بيكورينو رومانو أو غرانا بادانو مبشور ناعماً',
        chefNoteEn:
          'Use slightly less salt in the pasta water if substituting sharper Pecorino.',
        chefNoteAr:
          'قلل ملح ماء السلق قليلاً إذا استخدمت جبن البيكورينو لأنه أكثر ملوحة.',
      },
    ],
    faqs: [
      {
        questionEn: 'What if I do not have heavy cream? Does this recipe need cream?',
        questionAr: 'ماذا أفعل إذا لم تتوفر لدي كريمة طبخ؟',
        answerEn:
          'This recipe intentionally uses ZERO heavy cream! Combining 90ml of starchy pasta water with cold butter and finely grated Parmigiano creates a natural cream emulsion.',
        answerAr:
          'هذه الوصفة مصممة أصلاً بدون كريمة طبخ! خفق ماء سلق الباستا النشوي مع الزبدة والبارميزان يصنع قواماً كريمياً طبيعياً 100%.',
      },
      {
        questionEn: 'How do I reheat leftover truffle pasta without the butter separating?',
        questionAr: 'كيف أعيد تسخين الباستا المتبقية دون أن تنفصل الزبدة؟',
        answerEn:
          'Warm in a skillet over low heat with 2 tablespoons of water or milk, tossing continuously for 90 seconds until the emulsion reforms.',
        answerAr:
          'سخنها في مقلاة على نار هادئة مع ملعقتين من الماء الدافئ أو الحليب وقلّب باستمرار لمدة 90 ثانية.',
      },
      {
        questionEn: 'Can I use dried fettuccine instead of fresh egg tagliatelle?',
        questionAr: 'هل يمكن استخدام باستا فيتوتشيني جافة بدلاً من الطازجة؟',
        answerEn:
          'Yes, boil dried fettuccine 1 minute less than package instructions and finish cooking it directly inside the truffle butter emulsion.',
        answerAr:
          'نعم، اسلق الفيتوتشيني الجافة أقل بدقيقة واحدة من الوقت المكتوب على العبوة وأكمل نضجها داخل صوص الزبدة.',
      },
    ],
    stepGalleryImages: [
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_tossing_pasta_pan_1795530070327.jpg',
      '/images/recipe_truffle_pasta_1795527116427.jpg',
    ],
    chefName: 'Chef Lorenzo Bellini',
    chefTitleEn: 'Italian Artisan Pasta Specialist · Bologna Culinary Institute',
    chefTitleAr: 'شيف متخصص في المطبخ الإيطالي وصناعة الباستا الطازجة',
    prepMinutes: 8,
    cookMinutes: 10,
    calories: 540,
    proteinGrams: 21,
    netCarbsGrams: 52,
    videoDuration: '0:12',
    videoUrl: '/videos/truffle-tagliatelle-pasta.mp4',
    rating: 4.9,
    reviewsCount: 274,
    image: '/images/recipe_truffle_pasta_1795527116427.jpg',
    gearItem: {
      id: 'gear-pasta-roller',
      nameEn: 'Italian Stainless Pasta Machine & Microplane Truffle Shaver',
      nameAr: 'ماكينة فرد الباستا الإيطالية مع مبشرة الكمأة الدقيقة',
      brand: 'Marcato Atlas',
      priceUsd: 112,
      affiliateStore: 'Amazon Kitchen',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Fresh egg tagliatelle pasta', amount: 280, unit: 'g' },
      { item: 'Artisanal black truffle butter', amount: 45, unit: 'g' },
      { item: 'Finely grated 24-month Parmigiano-Reggiano', amount: 75, unit: 'g' },
      { item: 'Reserved starchy pasta cooking water', amount: 90, unit: 'ml' },
    ],
    ingredientsAr: [
      { item: 'باستا تالياتيلي طازجة بالبيض', amount: 280, unit: 'جم' },
      { item: 'زبدة الكمأة السوداء الإيطالية', amount: 45, unit: 'جم' },
      { item: 'جبن بارميزان ريجيانو مبشور ناعم', amount: 75, unit: 'جم' },
      { item: 'ماء سلق الباستا الغني بالنشا', amount: 90, unit: 'مل' },
    ],
    stepsEn: [
      {
        title: 'Al Dente Boil',
        instruction:
          'Boil fresh tagliatelle in salted water for 2.5 minutes until al dente, reserving a cup of starchy cooking water.',
        timerSeconds: 150,
      },
      {
        title: 'Truffle Butter Emulsion',
        instruction:
          'Melt black truffle butter over low heat and whisk in starchy pasta water to form a glossy emulsion.',
        timerSeconds: 90,
      },
      {
        title: 'Off-Heat Parmigiano Toss',
        instruction:
          'Remove pan from heat, toss pasta vigorously with finely grated Parmigiano-Reggiano until silky.',
        timerSeconds: 60,
      },
    ],
    stepsAr: [
      {
        title: 'سلق الباستا الطازجة',
        instruction:
          'اسلق الباستا في ماء مملح لمدة دقيقتين ونصف فقط، واحتفظ بكوب من ماء السلق النشوي.',
        timerSeconds: 150,
      },
      {
        title: 'تحضير مستحلب الكمأة',
        instruction:
          'ذوّب زبدة الكمأة على نار هادئة وأضف ماء السلق تدريجياً للحصول على صوص كريمي لامع.',
        timerSeconds: 90,
      },
      {
        title: 'التقليب مع البارميزان خارج النار',
        instruction:
          'ارفع المقلاة عن النار وقلّب الباستا بسرعة مع جبن البارميزان المبشور حتى يتغلف كل شريط بالصوص.',
        timerSeconds: 60,
      },
    ],
  },
  {
    id: 'lemon-herb-roasted-chicken',
    slug: 'air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
    category: 'quick_easy',
    subcategoryId: 'air-fryer-recipes',
    categoryLabelEn: 'Quick & Easy · Air Fryer & One-Pan',
    categoryLabelAr: 'وصفات سريعة · القلاية الهوائية ومقلاة واحدة',
    titleEn: 'Crispy Air Fryer & One-Pan Lemon Herb Chicken with Baby Potatoes',
    titleAr: 'دجاج مقرمش بالليمون والأعشاب في القلاية الهوائية أو المقلاة الواحدة',
    subtitleEn:
      'Shatteringly crisp chicken thighs with caramelized shallots and baby Yukon potatoes—includes both Air Fryer and One-Pan methods.',
    subtitleAr:
      'أفخاذ دجاج ذهبية مقرمشة مع البطاطس الصغيرة والروزماري، مع خطوات التحضير في القلاية الهوائية أو الفرن.',
    wordCount: 1150,
    introParagraphsEn: [
      'Whether you use a convection Air Fryer or a single stainless-steel braiser pan, bone-in skin-on chicken thighs are the most forgiving and flavorful weeknight dinner protein. While chicken breasts dry out rapidly above 74°C, dark-meat thighs become increasingly tender and succulent as internal connective collagen melts.',
      'Pairing the chicken with halved baby Yukon gold potatoes allows the potatoes to roast directly in the herb-infused chicken drippings, absorbing every drop of garlic, rosemary, and fresh Meyer lemon juice.',
    ],
    introParagraphsAr: [
      'سواء كنت تستخدم القلاية الهوائية (Air Fryer) أو مقلاة الفرن الواحدة، فإن أفخاذ الدجاج بالجلد هي الخيار الأذكى لعشاء عائلي شهي ومضمون النجاح؛ إذ تحافظ على طراوتها وعصارتها بفضل الكولاجين الطبيعي، بينما تتحول طبقة الجلد الخارجية إلى قشرة مقرمشة ذهبية.',
      'وضع أنصاف البطاطس الصغيرة مع الكراث والروزماري تحت قطع الدجاج يجعلها تتشرب عصارة التتبيلة والليمون لتنضج الوجبة كاملة في وعاء واحد بدون فوضى في المطبخ.',
    ],
    whyThisWorksEn: [
      'Dual-method tested: 22 minutes in an Air Fryer at 200°C or 25 minutes in a One-Pan Skillet.',
      'Cold-pan start renders subcutaneous skin fat slowly for potato-chip crispness.',
      'Complete weeknight dinner (protein + herb-roasted potatoes) in a single cooking vessel.',
    ],
    whyThisWorksAr: [
      'تعمل بطريقتين: 22 دقيقة في القلاية الهوائية (Air Fryer) أو 25 دقيقة في المقلاة.',
      'إذابة دهون الجلد تدريجياً تمنحك قرمشة طبيعية بدون قلي عميق.',
      'وجبة متكاملة (بروتين + نشويات صحية) في خطوة واحدة.',
    ],
    chefTipsEn: [
      'For the Air Fryer method: preheat your air fryer to 200°C (400°F), toss baby potatoes in olive oil and rosemary in the bottom of the basket, and nestle chicken thighs skin-side up on top for 22 minutes.',
      'For the Stovetop-to-Oven method: start the chicken thighs skin-side down in a COLD pan, then turn the burner to medium-high so the fat renders gently without scorching.',
      'Always add fresh lemon juice at the very end of cooking so its bright citrus aroma does not evaporate.',
    ],
    chefTipsAr: [
      'لطريقة القلاية الهوائية (Air Fryer): سخّن القلاية على 200 مئوية، ضع البطاطس المتبلة في قاعدة السلة وضع فوقها قطع الدجاج (الجلد للأعلى) لمدة 22 دقيقة.',
      'لطريقة المقلاة: ابدأ بوضع الدجاج على جهة الجلد في مقلاة باردة ثم شغّل النار المتوسطة ليذوب الدهن ببطء ويقرمش الجلد.',
      'أضف عصير الليمون الطازج في الدقيقة الأخيرة قبل التقديم للحفاظ على نكهته العطرية.',
    ],
    substitutions: [
      {
        originalEn: 'Bone-In Skin-On Chicken Thighs',
        originalAr: 'أفخاذ دجاج بالعظم والجلد',
        substituteEn: 'Boneless skinless chicken thighs or drumsticks (reduce time by 5 mins)',
        substituteAr: 'صدور أو أفخاذ دجاج مخلية (قلل وقت الطهي 5 دقائق)',
        chefNoteEn:
          'Brush boneless thighs with 1 tbsp olive oil and smoked paprika for color.',
        chefNoteAr:
          'ادهن القطع المخلية بملعقة زيت زيتون وبابريكا مدخنة لإعطائها لوناً ذهبياً شهياً.',
      },
      {
        originalEn: 'Baby Yukon Gold Potatoes',
        originalAr: 'البطاطس الصغيرة',
        substituteEn: 'Cauliflower florets or cubed sweet potatoes',
        substituteAr: 'زهرات القرنبيط (للكيتو) أو مكعبات البطاطا الحلوة',
        chefNoteEn:
          'Swapping potatoes for cauliflower drops net carbs from 32g to 6g per serving.',
        chefNoteAr:
          'استبدال البطاطس بالقرنبيط يحول الوصفة إلى وجبة كيتو منخفضة الكربوهيدرات.',
      },
    ],
    faqs: [
      {
        questionEn: 'How long does lemon herb chicken last in the fridge for meal prep?',
        questionAr: 'كم تدوم هذه الوجبة في الثلاجة عند تجهيز وجبات الأسبوع؟',
        answerEn:
          'Stored in airtight meal-prep containers, the roasted chicken and potatoes stay fresh for up to 4 days in the refrigerator.',
        answerAr:
          'تبقى طازجة ولذيذة لمدة 4 أيام كاملة في الثلاجة داخل علب حفظ الطعام المحكمة.',
      },
      {
        questionEn: 'How do I reheat chicken thighs in the Air Fryer?',
        questionAr: 'كيف أعيد تسخين الدجاج في القلاية الهوائية؟',
        answerEn:
          'Reheat at 190°C (375°F) for 4–5 minutes in the Air Fryer; the circulating dry heat restores 100% of the original skin crunch.',
        answerAr:
          'سخنها في القلاية الهوائية على حرارة 190 مئوية لمدة 4 دقائق لتستعيد قرمشة الجلد بالكامل.',
      },
      {
        questionEn: 'Can I freeze the raw marinated chicken thighs ahead of time?',
        questionAr: 'هل يمكن تتبيل الدجاج وتجميده مسبقاً؟',
        answerEn:
          'Yes! Combine chicken, olive oil, garlic, rosemary, and lemon zest in a freezer bag and freeze for up to 3 months.',
        answerAr:
          'نعم، يمكنك تتبيل الدجاج بزيت الزيتون والثوم والروزماري وتجميده لمدة تصل إلى 3 أشهر.',
      },
    ],
    stepGalleryImages: [
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    ],
    chefName: 'Chef Elena Vance',
    chefTitleEn: 'Executive Culinary Director · Appliance & One-Pan Specialist',
    chefTitleAr: 'مديرة استوديو الطهي · خبيرة وصفات القلاية الهوائية والوجبات السريعة',
    prepMinutes: 10,
    cookMinutes: 22,
    calories: 520,
    proteinGrams: 39,
    netCarbsGrams: 28,
    videoDuration: '0:12',
    videoUrl: '/videos/lemon-herb-roasted-chicken.mp4',
    rating: 4.8,
    reviewsCount: 195,
    image: '/images/recipe_lemon_herb_chicken_1795529480309.jpg',
    gearItem: {
      id: 'gear-braiser-pan',
      nameEn: '3.5-Quart Tri-Ply Stainless Steel Braiser & Air Fryer Crisper Set',
      nameAr: 'مقلاة تحمير ستانلس ستيل ثلاثية الطبقات بمقابض نحاسية',
      brand: 'All-Clad Reserve',
      priceUsd: 159,
      affiliateStore: 'Sur La Table',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Bone-in skin-on chicken thighs', amount: 650, unit: 'g' },
      { item: 'Halved baby Yukon gold potatoes', amount: 350, unit: 'g' },
      { item: 'Peeled quartered shallots & garlic', amount: 120, unit: 'g' },
      { item: 'Fresh lemon juice, olive oil & rosemary', amount: 45, unit: 'ml' },
    ],
    ingredientsAr: [
      { item: 'أفخاذ دجاج بالعظم والجلد', amount: 650, unit: 'جم' },
      { item: 'بطاطس صغيرة مقطعة أنصاف', amount: 350, unit: 'جم' },
      { item: 'بصل كراث مقشر وفصوص ثوم', amount: 120, unit: 'جم' },
      { item: 'عصير ليمون وزيت زيتون بكر وروزماري', amount: 45, unit: 'مل' },
    ],
    stepsEn: [
      {
        title: 'Render & Crisp Chicken Skin',
        instruction:
          'Place seasoned chicken thighs skin-side down in a cold pan (or Air Fryer basket at 200°C) and sear for 8 minutes.',
        timerSeconds: 480,
      },
      {
        title: 'Toss Potatoes in Pan Drippings',
        instruction:
          'Flip chicken and arrange halved baby potatoes, shallots, and rosemary around the thighs in the golden drippings.',
        timerSeconds: 120,
      },
      {
        title: 'Roast & Lemon Glaze',
        instruction:
          'Roast at 200°C (400°F) for 15 minutes until potatoes are tender and skin is deeply golden, finishing with fresh lemon juice.',
        timerSeconds: 900,
      },
    ],
    stepsAr: [
      {
        title: 'تحمير جلد الدجاج',
        instruction:
          'ضع قطع الدجاج المتبلة في المقلاة (أو سلة القلاية الهوائية على 200 مئوية) لمدة 8 دقائق حتى يقرمش الجلد.',
        timerSeconds: 480,
      },
      {
        title: 'إضافة البطاطس والكراث',
        instruction:
          'اقلب الدجاج وأضف أنصاف البطاطس الصغيرة والكراث والروزماري لتتشرب عصارة التحمير.',
        timerSeconds: 120,
      },
      {
        title: 'التحمير النهائي مع الليمون',
        instruction:
          'أكمل التحمير على حرارة 200 مئوية لمدة 15 دقيقة ثم أضف عصير الليمون الطازج عند التقديم.',
        timerSeconds: 900,
      },
    ],
  },
  {
    id: 'mediterranean-spiced-shakshuka',
    slug: 'vegetarian-mediterranean-shakshuka-poached-eggs-feta',
    category: 'healthy_diet',
    subcategoryId: 'vegan-vegetarian',
    categoryLabelEn: 'Healthy & Diet · Vegetarian & High-Protein',
    categoryLabelAr: 'أكل صحي وحميات · نباتي وصحي',
    titleEn: 'Mediterranean Spiced Shakshuka with Poached Eggs & Aged Feta',
    titleAr: 'شكشوكة متوسطية صحية بالطماطم المشوية والكمون وجبن الفيتا',
    subtitleEn:
      'Nutrient-dense vegetarian skillet with pasture-raised eggs poached in smoky roasted pepper tomato sauce, topped with sheep-milk feta.',
    subtitleAr:
      'وجبة صحية غنية بالبروتين ومضادات الأكسدة مع البيض المطهو في صلصة الطماطم والفلفل المشوي وجبن الفيتا.',
    wordCount: 1020,
    introParagraphsEn: [
      'Shakshuka is one of the world’s most celebrated vegetarian one-skillet meals, combining lycopene-rich San Marzano tomatoes, sweet red bell peppers, freshly toasted cumin, and high-protein poached eggs. Whether served for a high-energy breakfast or a light Mediterranean dinner, it comes together in 20 minutes using staple pantry ingredients.',
      'To achieve a thick, velvety sauce rather than a watery tomato soup, our test kitchen simmers the sautéed peppers and onions with smoked paprika and crushed garlic before cracking the eggs directly into gentle wells carved into the simmering reduction.',
    ],
    introParagraphsAr: [
      'تُعد الشكشوكة المتوسطية واحدة من أشهر الوجبات الصحية المتوازنة في العالم، حيث تجمع بين الليكوبين المضاد للأكسدة في الطماطم المشوية، وفيتامين C في الفلفل الأحمر الحلو، والبروتين الكامل في البيض وجبن الفيتا اليوناني.',
      'للحصول على صلصة كثيفة وغنية، نقوم بتشويح الفلفل والبصل مع الكمون المحمص والبابريكا المدخنة أولاً قبل إضافة الطماطم المهروسة، ثم نطهو البيض على البخار الهادئ داخل فجوات الصلصة.',
    ],
    whyThisWorksEn: [
      '24g Vegetarian Protein and only 380 calories per generous skillet portion.',
      'Blooming cumin and smoked paprika in warm olive oil unlocks fat-soluble aromatics.',
      'Easily adaptable to 100% Vegan by swapping eggs for marinated silken tofu medallions.',
    ],
    whyThisWorksAr: [
      '24 جم بروتين و380 سعرة حرارية فقط في الحصة الواحدة.',
      'تحميص الكمون والبابريكا في زيت الزيتون يضاعف النكهة العطرية.',
      'قابلة للتحويل إلى وصفة نباتية صرفة (Vegan) بسهولة.',
    ],
    chefTipsEn: [
      'Always use an enameled cast-iron or stainless-steel skillet rather than raw unseasoned cast iron, as acidic tomatoes can strip raw iron seasoning and impart a metallic flavor.',
      'Crack each egg into a small ramekin first, then slide it gently into its sauce well so the yolk stays intact.',
      'Remove the skillet from the burner while the egg whites are still slightly opaque and jiggly; residual heat in the tomato sauce continues cooking the yolks.',
    ],
    chefTipsAr: [
      'استخدم مقلاة مطلية بالمينا (Enameled) أو ستانلس ستيل لأن حموضة الطماطم قد تتفاعل مع الحديد الخام غير المطلي.',
      'اكسر كل بيضة في وعاء صغير أولاً ثم اسكبها برفق داخل الفجوة في الصلصة للحفاظ على تماسك الصفار.',
      'ارفع المقلاة عن النار فور تماسك البياض، لأن حرارة الصلصة الكامنة ستكمل تسوية الصفار.',
    ],
    substitutions: [
      {
        originalEn: 'Pasture-Raised Eggs (4 pcs)',
        originalAr: 'البيض البلدي (4 حبات)',
        substituteEn: 'Cubed firm tofu or cooked chickpeas (for 100% Vegan Shakshuka)',
        substituteAr: 'مكعبات التوفو المتبل أو الحمص المسلوق (للوصفة النباتية الصرفة Vegan)',
        chefNoteEn:
          'Simmer chickpeas directly in the spiced tomato sauce for 5 minutes to absorb flavor.',
        chefNoteAr:
          'اترك الحمص يتسبك مع صلصة الطماطم لـ 5 دقائق ليتشرب التوابل.',
      },
      {
        originalEn: 'Sheep-Milk Greek Feta',
        originalAr: 'جبن الفيتا اليوناني',
        substituteEn: 'Goat cheese crumbles or dairy-free almond ricotta',
        substituteAr: 'جبن الماعز الطري أو ريكوتا اللوز النباتية',
        chefNoteEn:
          'Adds the same creamy, tangy contrast against the warm spiced tomato sauce.',
        chefNoteAr:
          'يمنح نفس القوام الكريمي المتوازن مع حموضة الطماطم.',
      },
    ],
    faqs: [
      {
        questionEn: 'Can I make the shakshuka tomato sauce ahead of time?',
        questionAr: 'هل يمكن تحضير صلصة الشكشوكة مسبقاً وحفظها في الثلاجة؟',
        answerEn:
          'Yes! Prepare the spiced pepper and tomato base up to 5 days in advance and store it in a glass jar in the fridge. When ready to eat, reheat the sauce in a skillet and poach fresh eggs in 4 minutes.',
        answerAr:
          'نعم! يمكنك تحضير صلصة الطماطم والفلفل وحفظها في برطمان زجاجي في الثلاجة لمدة 5 أيام، وعند الوجبة سخنها وأضف البيض في 4 دقائق.',
      },
      {
        questionEn: 'Can shakshuka sauce be frozen?',
        questionAr: 'هل يمكن تجميد صلصة الشكشوكة في الفريزر؟',
        answerEn:
          'Freeze the tomato-pepper base (without eggs or feta) in freezer-safe containers for up to 3 months.',
        answerAr:
          'يمكن تجميد الصلصة (بدون البيض والجبن) في الفريزر لمدة تصل إلى 3 أشهر كاملة.',
      },
      {
        questionEn: 'What can I serve with shakshuka for a low-carb or keto diet?',
        questionAr: 'مع ماذا أقدم الشكشوكة إذا كنت أتبع حمية لو كارب أو كيتو؟',
        answerEn:
          'Serve over roasted zucchini ribbons, sautéed spinach, or with toasted almond-flour flatbread instead of sourdough.',
        answerAr:
          'قدمها مع السبانخ المشوحة أو خبز اللوز منخفض الكربوهيدرات بدلاً من الخبز العادي.',
      },
    ],
    stepGalleryImages: [
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
      '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    ],
    chefName: 'Chef Nadia Mansour',
    chefTitleEn: 'Mediterranean Diet & Plant-Forward Culinary Author',
    chefTitleAr: 'شيف وكاتبة متخصصة في حمية البحر الأبيض المتوسط والأكل الصحي',
    prepMinutes: 6,
    cookMinutes: 14,
    calories: 380,
    proteinGrams: 24,
    netCarbsGrams: 14,
    videoDuration: '0:12',
    videoUrl: '/videos/mediterranean-spiced-shakshuka.mp4',
    rating: 4.9,
    reviewsCount: 289,
    image: '/images/recipe_mediterranean_shakshuka_1795529480892.jpg',
    gearItem: {
      id: 'gear-enameled-pan',
      nameEn: '11-Inch Enameled Cast-Iron Everyday Pan with Lid',
      nameAr: 'مقلاة حديد زهر مطلية بالمينا 11 إنش مع غطاء',
      brand: 'Le Creuset',
      priceUsd: 168,
      affiliateStore: 'Amazon Kitchen',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Pasture-raised large eggs', amount: 4, unit: 'pcs' },
      { item: 'Crushed San Marzano plum tomatoes', amount: 400, unit: 'g' },
      { item: 'Diced red bell pepper & yellow onion', amount: 180, unit: 'g' },
      { item: 'Crumbled Greek sheep-milk feta', amount: 75, unit: 'g' },
      { item: 'Roasted cumin, smoked paprika & olive oil', amount: 20, unit: 'g' },
    ],
    ingredientsAr: [
      { item: 'بيض بلدي طازج', amount: 4, unit: 'حبة' },
      { item: 'طماطم سان مارزانو مهروسة', amount: 400, unit: 'جم' },
      { item: 'فلفل أحمر حلو وبصل مفروم', amount: 180, unit: 'جم' },
      { item: 'جبن فيتا يوناني مفتت', amount: 75, unit: 'جم' },
      { item: 'كمون محمص وبابريكا مدخنة وزيت زيتون', amount: 20, unit: 'جم' },
    ],
    stepsEn: [
      {
        title: 'Char Peppers & Bloom Spices',
        instruction:
          'Sauté diced onion and red bell pepper in olive oil for 5 minutes, then stir in garlic, cumin, and smoked paprika.',
        timerSeconds: 300,
      },
      {
        title: 'Simmer Rich Tomato Base',
        instruction:
          'Pour in crushed San Marzano tomatoes and simmer gently for 6 minutes until thickened.',
        timerSeconds: 360,
      },
      {
        title: 'Poach Eggs & Scatter Feta',
        instruction:
          'Make 4 wells in the sauce, crack in the eggs, scatter crumbled feta, cover and simmer for 4 minutes until whites set.',
        timerSeconds: 240,
      },
    ],
    stepsAr: [
      {
        title: 'تشويح الفلفل وتحميص التوابل',
        instruction:
          'قلّب البصل والفلفل الأحمر في زيت الزيتون لـ 5 دقائق ثم أضف الثوم والكمون والبابريكا المدخنة.',
        timerSeconds: 300,
      },
      {
        title: 'تسبكة صلصة الطماطم',
        instruction:
          'أضف الطماطم المهروسة واترك الصلصة تتسبك على نار هادئة لمدة 6 دقائق.',
        timerSeconds: 360,
      },
      {
        title: 'طهي البيض وإضافة الفيتا',
        instruction:
          'اصنع 4 فجوات في الصلصة واكسر البيض بداخلها، ثم وزع جبن الفيتا وغطِّ المقلاة 4 دقائق.',
        timerSeconds: 240,
      },
    ],
  },
  {
    id: 'mango-strawberry-sunset-cupcakes',
    slug: 'mango-strawberry-sunset-cupcakes-recipe',
    category: 'desserts_baking',
    subcategoryId: 'cakes-pastries',
    categoryLabelEn: 'Desserts & Baking · Cakes & Pastries',
    categoryLabelAr: 'حلويات ومخبوزات · كيك ومخبوزات',
    titleEn: 'Mango Strawberry Sunset Cupcakes with Swirled Fruit Buttercream',
    titleAr: 'كب كيك غروب المانجو والفراولة بكريمة الفاكهة الطبيعية المزدوجة',
    subtitleEn:
      'Tender Alphonso mango sponge crowned with dual-tone freeze-dried strawberry and mango buttercream—zero artificial food dyes.',
    subtitleAr:
      'كيك إسفنجي ببيوريه المانجو الطبيعي ومزين بكريمة الغروب المزدوجة من الفراولة والمانجو بدون أي ألوان صناعية.',
    wordCount: 1190,
    introParagraphsEn: [
      'Inspired by tropical summer sunsets and crafted specifically for visual food lovers on Pinterest and TikTok, these Mango Strawberry Sunset Cupcakes deliver real fruit flavor in every crumb. Most fruit cupcakes fail because fresh fruit puree adds excess water that weighs down the batter and causes the buttercream to curdle.',
      'Our pastry studio solves both challenges by simmering fresh Alphonso mango puree for 8 minutes to concentrate its natural sugars before folding it into the cake batter, and using finely milled freeze-dried strawberry powder to tint and flavor the sunset buttercream swirl naturally without a single drop of synthetic dye.',
    ],
    introParagraphsAr: [
      'مستوحاة من ألوان الغروب الاستوائية ومصممة لتكون نجمة منصات الفيديو القصيرة وبنترست، تجمع وصفة كب كيك غروب المانجو والفراولة بين المظهر الاحترافي والطعم الطبيعي الفاخر بدون نقطة واحدة من الألوان الصناعية.',
      'تفشل معظم وصفات كب كيك الفواكه بسبب السوائل الزائدة التي تجعل الكيك مكتوماً وتفصل كريمة الزبدة؛ لذلك نقوم في مطبخ CookReel بتكثيف بيوريه المانجو على النار لـ 8 دقائق لتركيز النكهة، مع استخدام بودرة الفراولة الطبيعية المجففة بالتجميد لتلوين وتنكيه الكريمة بقوام متماسك.',
    ],
    whyThisWorksEn: [
      '100% Natural Fruit Color & Flavor—uses reduced mango puree and freeze-dried berries.',
      'Reverse-creaming method ensures flat, even cupcake domes that hold high piping swirls.',
      'Captures CookReel.com’s historical cupcake backlink authority for immediate search ranking.',
    ],
    whyThisWorksAr: [
      'ألوان ونكهات فاكهة طبيعية 100% بدون ملونات صناعية.',
      'قوام إسفنجي متساوٍ يتحمل التزيين المرتفع بالكريمة المزدوجة.',
      'يطابق الرابط التاريخي للدومين في تخصص الحلويات والمخبوزات.',
    ],
    chefTipsEn: [
      'Ensure your butter, eggs, and reduced mango puree are all at exact room temperature (20°C / 68°F) before mixing so the batter forms a stable emulsion.',
      'Fill cupcake liners only two-thirds full using a spring-loaded stainless cookie scoop for uniform baking height.',
      'To pipe the dual-tone sunset swirl, lay a sheet of plastic wrap flat, pipe a log of strawberry frosting next to a log of mango frosting, roll into a cylinder, and slide it into a piping bag fitted with a 1M star tip.',
    ],
    chefTipsAr: [
      'تأكد من أن الزبدة والبيض وبيوريه المانجو جميعها بدرجة حرارة الغرفة (20 مئوية) قبل الخفق لضمان اندماج الخليط.',
      'املأ قوالب الكب كيك حتى الثلثين فقط للحصول على سطح مستوٍ مثالي للتزيين.',
      'لعمل تموج اللونين (المانجو والفراولة) في نفس القمع، ضع الكريمتين جنباً إلى جنب داخل كيس التزيين المزود بقمع نجمة 1M.',
    ],
    substitutions: [
      {
        originalEn: 'Cake Pastry Flour (180g)',
        originalAr: 'دقيق الحلويات الفاخر (180 جم)',
        substituteEn: '155g All-Purpose Flour + 25g Cornstarch (sifted twice)',
        substituteAr: '155 جم دقيق متعدد الاستعمالات + 25 جم نشا الذرة (منخول مرتين)',
        chefNoteEn:
          'Cornstarch lowers gluten formation, mimicking low-protein cake flour perfectly.',
        chefNoteAr:
          'إضافة نشا الذرة تقلل نسبة الغلوتين وتعطيك نعومة دقيق الكيك الفاخر تماماً.',
      },
      {
        originalEn: 'Refined Caster Sugar',
        originalAr: 'السكر الأبيض الناعم',
        substituteEn: 'Monk Fruit Allulose Baking Blend or Coconut Sugar (Healthy Sweets option)',
        substituteAr: 'محلي فاكهة الراهب (Monk Fruit) أو سكر جوز الهند للخيار الصحي',
        chefNoteEn:
          'Monk fruit blend keeps the sponge golden-yellow while cutting sugar calories by 90%.',
        chefNoteAr:
          'يحافظ على اللون الذهبي للكيك ويحول الوصفة إلى حلوى صحية منخفضة السعرات.',
      },
    ],
    faqs: [
      {
        questionEn: 'How do I store frosted cupcakes in the refrigerator?',
        questionAr: 'كيف أحفظ الكب كيك المزين بالكريمة في الثلاجة؟',
        answerEn:
          'Place frosted cupcakes in a deep airtight cake carrier and refrigerate for up to 4 days. Let them sit at room temperature for 25 minutes before serving so the buttercream softens.',
        answerAr:
          'احفظها في حافظة كيك عميقة محكمة الإغلاق في الثلاجة لمدة 4 أيام، وأخرجها قبل التقديم بـ 25 دقيقة لتستعيد الكريمة قوامها الناعم.',
      },
      {
        questionEn: 'Can I freeze mango strawberry cupcakes?',
        questionAr: 'هل يمكن تجميد الكب كيك في الفريزر؟',
        answerEn:
          'Yes! Freeze unfrosted cupcake sponges wrapped individually for up to 3 months, or flash-freeze frosted cupcakes on a tray for 1 hour before transferring to a freezer box.',
        answerAr:
          'نعم، يمكن تجميد الكيك بدون تزيين لمدة 3 أشهر، أو تجميد الكب كيك المزين في صينية مكشوفة لساعة حتى تتماسك الكريمة ثم حفظه في علبة محكمة.',
      },
      {
        questionEn: 'Can I make this as a no-bake dessert cup instead?',
        questionAr: 'هل يمكن تطبيق هذه النكهات كحلى بارد بدون فرن (No-Bake)؟',
        answerEn:
          'Absolutely—layer crushed graham crackers or digestive biscuits with mango Mascarpone mousse and fresh strawberry compote in glass jars and chill for 2 hours.',
        answerAr:
          'بكل تأكيد! رتب طبقات من البسكويت المطحون مع موس المانجو والجبن الكريمي وقطع الفراولة في أكواب زجاجية وبردها لساعتين بدون فرن.',
      },
    ],
    stepGalleryImages: [
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_piping_cupcake_swirl_1795530073426.jpg',
      '/images/recipe_mango_cupcakes_1795527116791.jpg',
    ],
    chefName: 'Chef Clara Dupont',
    chefTitleEn: 'Head Pastry Chef · Parisian Patisserie & Natural Fruit Desserts',
    chefTitleAr: 'شيف حلويات تنفيذية متخصصة في المخبوزات الفرنسية وحلويات الفواكه',
    prepMinutes: 20,
    cookMinutes: 18,
    calories: 295,
    proteinGrams: 5,
    netCarbsGrams: 34,
    videoDuration: '0:12',
    videoUrl: '/videos/mango-strawberry-sunset-cupcakes.mp4',
    rating: 4.9,
    reviewsCount: 364,
    image: '/images/recipe_mango_cupcakes_1795527116791.jpg',
    gearItem: {
      id: 'gear-muffin-piping-set',
      nameEn: 'Heavy-Gauge 12-Cup Aluminized Steel Muffin Pan & Piping Kit',
      nameAr: 'صينية كب كيك احترافية 12 عين مع طقم أقماع تزيين ستانلس',
      brand: 'USA Pan Pro',
      priceUsd: 54,
      affiliateStore: 'Amazon Kitchen',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Sifted cake pastry flour', amount: 180, unit: 'g' },
      { item: 'Reduced Alphonso mango puree', amount: 120, unit: 'ml' },
      { item: 'Fresh strawberries & freeze-dried berry powder', amount: 150, unit: 'g' },
      { item: 'Unsalted softened cultured butter', amount: 140, unit: 'g' },
      { item: 'Fine caster sugar & Madagascar vanilla', amount: 130, unit: 'g' },
    ],
    ingredientsAr: [
      { item: 'دقيق حلويات فاخر منخول', amount: 180, unit: 'جم' },
      { item: 'بيوريه مانجو ألفونسو مركز', amount: 120, unit: 'مل' },
      { item: 'فراولة طازجة وبودرة فراولة مجففة للكريمة', amount: 150, unit: 'جم' },
      { item: 'زبدة طبيعية لينة بدرجة حرارة الغرفة', amount: 140, unit: 'جم' },
      { item: 'سكر ناعم وفانيليا طبيعية', amount: 130, unit: 'جم' },
    ],
    stepsEn: [
      {
        title: 'Cream Butter & Mango Reduction',
        instruction:
          'Beat softened butter and caster sugar for 3 minutes until pale and fluffy, then blend in reduced mango puree.',
        timerSeconds: 180,
      },
      {
        title: 'Fold Pastry Flour & Bake',
        instruction:
          'Fold in sifted pastry flour gently, divide into lined cups, and bake at 175°C (350°F) for 18 minutes.',
        timerSeconds: 1080,
      },
      {
        title: 'Pipe Sunset Dual-Tone Swirl',
        instruction:
          'Fill a piping bag side-by-side with strawberry and mango buttercream and pipe high sunset swirls onto cooled cupcakes.',
        timerSeconds: 120,
      },
    ],
    stepsAr: [
      {
        title: 'خفق الزبدة وبيوريه المانجو',
        instruction:
          'اخفق الزبدة اللينة مع السكر لمدة 3 دقائق حتى يصبح الخليط كريمياً هوائياً ثم أضف بيوريه المانجو.',
        timerSeconds: 180,
      },
      {
        title: 'إضافة الدقيق والخبز',
        instruction:
          'قلّب الدقيق المنخول برفق ووزع الخليط في قوالب الكب كيك واخبزه على حرارة 175 مئوية لـ 18 دقيقة.',
        timerSeconds: 1080,
      },
      {
        title: 'تزيين كريمة الغروب المزدوجة',
        instruction:
          'ضع كريمة الفراولة وكريمة المانجو جنباً إلى جنب في كيس الحلواني وزيّن الكب كيك بعد أن يبرد تماماً.',
        timerSeconds: 120,
      },
    ],
  },
  {
    id: 'kitchen-guide-substitutes-cast-iron',
    slug: 'ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide',
    category: 'kitchen_hacks',
    subcategoryId: 'ingredient-substitutes',
    categoryLabelEn: 'Kitchen Hacks & Guides · 1,250+ Words Pillar Guide',
    categoryLabelAr: 'نصائح وأدوات · دليل البدائل وتجهيز الوجبات (1,250+ كلمة)',
    titleEn:
      'The Chef’s Master Guide to Ingredient Substitutes, Cast-Iron Skillet Care & 60-Minute Weekly Meal Prep',
    titleAr:
      'الدليل الشامل لبدائل المكونات في المطبخ والعناية بمقالي الحديد الزهر وتجهيز وجبات الأسبوع',
    subtitleEn:
      'Never abandon a recipe mid-cook again: exact 1:1 culinary ratios for missing dairy, flours, herbs, and oils—plus our 60-minute Sunday meal prep workflow.',
    subtitleAr:
      'مقال مرجعي شامل (أكثر من 1,250 كلمة) يوضح البدائل الدقيقة لكريمة الطبخ والدقيق والزبدة والأعشاب، مع خطة تجهيز وجبات الأسبوع في 60 دقيقة.',
    wordCount: 1280,
    introParagraphsEn: [
      'Every home cook knows the frustration of heating up a skillet at 7:00 PM only to discover the refrigerator is out of heavy whipping cream, buttermilk, or fresh herbs. Understanding the underlying food chemistry of fats, acids, and starches allows you to swap missing ingredients effortlessly without compromising texture or flavor.',
      'In this comprehensive 1,280-word CookReel Kitchen Hacks pillar guide, our culinary team breaks down exact gram-for-gram ingredient substitutions, how to season and maintain a non-stick polymer layer on cast-iron cookware, and our signature 60-minute Sunday meal-prep sequence.',
    ],
    introParagraphsAr: [
      'يمر كل طاهٍ منزلي بلحظة اكتشاف نقص مكون أساسي مثل كريمة الطبخ أو اللبن الرائب (Buttermilk) أو دقيق الحلويات في منتصف تحضير العشاء. إن فهم الكيمياء الغذائية للدهون والأحماض والنشويات يمنحك القدرة على استبدال أي مكون فوراً بنسب دقيقة دون أن يتأثر قوام الطبق أو مذاقه.',
      'في هذا الدليل المرجعي الشامل من قسم (نصائح وأدوات CookReel)، جمعنا لك جدول البدائل الاحترافي المجرب في مطبخنا، بالإضافة إلى الطريقة الصحيحة لتعتيق وتنظيف مقالي الحديد الزهر، وخطة تجهيز 5 وجبات أسبوعية في 60 دقيقة فقط.',
    ],
    whyThisWorksEn: [
      'Exact gram-for-gram substitution ratios tested across sauces, soups, and baked goods.',
      'Answers common weeknight cooking dilemmas ("what to use instead of heavy cream", "how to season cast iron").',
      'Streamlines Sunday meal prep into a single 60-minute batch workflow.',
    ],
    whyThisWorksAr: [
      'نسب استبدال دقيقة بالجرام والملليلتر مجربة في الصلصات والشوربات والمخبوزات.',
      'يجيب على أكثر الأسئلة اليومية في المطبخ حول بدائل الكريمة والعناية بأدوات الطهي.',
      'يوفر خطة عملية لتجهيز وجبات الأسبوع في 60 دقيقة فقط.',
    ],
    chefTipsEn: [
      'Heavy Cream Substitute Rule: Whisk 180ml whole milk with 60g melted unsalted butter and 1 teaspoon cornstarch for simmering sauces—the butter restores the 36% milkfat content of heavy cream.',
      'Buttermilk in 5 Minutes: Stir 15ml fresh lemon juice or white vinegar into 240ml warm milk and let stand for 5 minutes until lightly thickened.',
      'Cast-Iron Seasoning Hack: After washing your skillet with warm water, dry it on a medium burner for 2 minutes and wipe a micro-thin drop of avocado oil across the surface while warm.',
    ],
    chefTipsAr: [
      'بديل كريمة الطبخ الفوري: اخفق 180 مل من الحليب كامل الدسم مع 60 جم زبدة ذائبة غير مملحة وملعقة صغيرة نشا؛ الزبدة تعوض نسبة الدسم (36%) الموجودة في الكريمة الأصلية.',
      'بديل اللبن الرائب (Buttermilk) للكيك والدجاج: أضف ملعقة كبيرة من عصير الليمون أو الخل الأبيض إلى كوب حليب دافئ واتركه 5 دقائق فقط.',
      'سر منع الصدأ والالتصاق في مقلاة الزهر: بعد غسلها بالماء الدافئ، جففها فوق نار هادئة لدقيقتين وامسح سطحها الداخلي بنقطة صغيرة جداً من زيت الأفوكادو.',
    ],
    substitutions: [
      {
        originalEn: '1 Cup Heavy Whipping Cream (240ml)',
        originalAr: 'كوب كريمة طبخ سائلة (240 مل)',
        substituteEn: '180ml Whole Milk + 60g Melted Unsalted Butter (or Full-Fat Coconut Cream)',
        substituteAr: '180 مل حليب كامل الدسم + 60 جم زبدة ذائبة (أو كريمة جوز الهند)',
        chefNoteEn:
          'Works 1:1 in pasta sauces, soups, and curries without curdling.',
        chefNoteAr:
          'يعطي نفس الكثافة والغنى في صلصات الباستا والشوربات بنسبة 1:1.',
      },
      {
        originalEn: '1 Tbsp Fresh Herbs (Rosemary / Thyme / Basil)',
        originalAr: 'ملعقة كبيرة أعشاب طازجة مفرومة',
        substituteEn: '1 Teaspoon Dried Herbs (3:1 Fresh-to-Dried Ratio)',
        substituteAr: 'ملعقة صغيرة أعشاب مجففة (نسبة 3 إلى 1)',
        chefNoteEn:
          'Add dried herbs early in cooking so they rehydrate in warm oil; add fresh herbs at the end.',
        chefNoteAr:
          'أضف الأعشاب المجففة في بداية الطهي مع الزيت الدافئ، بينما تضاف الطازجة في النهاية.',
      },
      {
        originalEn: '1 Large Egg in Baking',
        originalAr: 'بيضة واحدة في وصفات الكيك والمخبوزات',
        substituteEn: '1 Tbsp Ground Flaxseed + 3 Tbsp Warm Water (or 65g Unsweetened Applesauce)',
        substituteAr: 'ملعقة كبيرة بذور كتان مطحونة + 3 ملاعق ماء دافئ (أو 65 جم مهروس تفاح)',
        chefNoteEn:
          'Let the flax mixture gel for 5 minutes before mixing into cupcake or pancake batter.',
        chefNoteAr:
          'اترك خليط بذور الكتان 5 دقائق حتى يتكون جل طبيعي يربط عجينة الكيك.',
      },
    ],
    faqs: [
      {
        questionEn: 'Can I use milk instead of heavy cream in pasta sauces without curdling?',
        questionAr: 'هل يمكن استخدام الحليب العادي بدلاً من كريمة الطبخ دون أن يفصل الصوص؟',
        answerEn:
          'Plain low-fat milk will curdle over high heat, especially with acidic ingredients like tomatoes or lemon. Whisking 1 teaspoon of cornstarch or flour into whole milk with melted butter stabilizes the proteins so it never separates.',
        answerAr:
          'الحليب قليل الدسم وحده قد ينفصل مع الحرارة والحموضة؛ لكن خلط الحليب كامل الدسم مع الزبدة الذائبة وملعقة صغيرة من النشا يحمي البروتين من الانفصال.',
      },
      {
        questionEn: 'How do I organize a 60-minute weekly meal prep session without food getting soggy?',
        questionAr: 'كيف أجهز وجبات الأسبوع في 60 دقيقة دون أن تفقد قوامها؟',
        answerEn:
          'Roast sheet-pan proteins and root vegetables simultaneously at 200°C, cool completely uncovered for 20 minutes so steam escapes, and store sauces in separate 60ml condiment cups.',
        answerAr:
          'اترك اللحوم والخضروات المشوية تبرد تماماً لمدة 20 دقيقة بدون غطاء حتى يتبخر البخار الزائد، واحفظ الصلصات في عبوات صغيرة منفصلة.',
      },
      {
        questionEn: 'Is soap safe to use on modern enameled and seasoned cast-iron skillets?',
        questionAr: 'هل يضر سائل غسيل الصحون بمقلاة الحديد الزهر؟',
        answerEn:
          'Mild dish soap is completely safe on both enameled cast iron and well-seasoned raw cast iron. Just avoid soaking raw cast iron in water overnight and always dry immediately on the stove.',
        answerAr:
          'سائل الصحون اللطيف آمن تماماً، المهم هو عدم نقع الحديد الزهر الخام في الماء لفترات طويلة وتجفيفه فوراً على النار بعد الغسيل.',
      },
    ],
    stepGalleryImages: [
      '/images/hero_cookreel_studio_1795527112508.jpg',
      '/images/gear_cast_iron_skillet_1795527125638.jpg',
      '/images/action_searing_skillet_butter_1795530068462.jpg',
    ],
    chefName: 'Chef Elena Vance & CookReel Test Kitchen',
    chefTitleEn: 'Culinary Science & Kitchen Equipment Testing Team',
    chefTitleAr: 'فريق علوم الطهي واختبار أدوات المطبخ في CookReel',
    prepMinutes: 15,
    cookMinutes: 45,
    calories: 410,
    proteinGrams: 36,
    netCarbsGrams: 18,
    videoDuration: '0:12',
    videoUrl: '/videos/hero-cookreel-featured.mp4',
    rating: 5.0,
    reviewsCount: 512,
    image: '/images/hero_cookreel_studio_1795527112508.jpg',
    gearItem: {
      id: 'gear-complete-skillet-knife-bundle',
      nameEn: 'Chef Cast-Iron Skillet & 67-Layer Damascus Knife Starter Set',
      nameAr: 'المجموعة الأساسية للشيف: مقلاة حديد زهر + سكين دمشقي احترافي',
      brand: 'CookReel Studio Pro',
      priceUsd: 240,
      affiliateStore: 'Amazon Kitchen',
      image: '/images/gear_cast_iron_skillet_1795527125638.jpg',
    },
    ingredientsEn: [
      { item: 'Whole milk + unsalted butter (Heavy Cream 1:1 Swap)', amount: 240, unit: 'ml' },
      { item: 'High-smoke-point avocado oil (Skillet Seasoning)', amount: 30, unit: 'ml' },
      { item: 'Batch proteins (Salmon, Chicken Thighs, or Ribeye)', amount: 1200, unit: 'g' },
      { item: 'Aromatics (Garlic bulbs, rosemary, thyme, lemons)', amount: 150, unit: 'g' },
    ],
    ingredientsAr: [
      { item: 'حليب كامل الدسم + زبدة غير مملحة (بديل الكريمة 1:1)', amount: 240, unit: 'مل' },
      { item: 'زيت أفوكادو عالي التحمل (لتعتيق المقلاة)', amount: 30, unit: 'مل' },
      { item: 'بروتينات الأسبوع (سلمون، دجاج، أو ستيك)', amount: 1200, unit: 'جم' },
      { item: 'منكهات طبيعية (ثوم، روزماري، زعتر بري، ليمون)', amount: 150, unit: 'جم' },
    ],
    stepsEn: [
      {
        title: 'Mise en Place & Substitution Prep',
        instruction:
          'Organize your proteins, dry all surfaces with paper towels, and prepare your 1:1 dairy or herb substitutions before turning on the stove.',
        timerSeconds: 300,
      },
      {
        title: 'High-Heat Skillet Polymer Sear',
        instruction:
          'Preheat your cast-iron skillet for 4 minutes until evenly hot, add avocado oil, and batch-sear proteins for maximum Maillard flavor.',
        timerSeconds: 480,
      },
      {
        title: 'Cool, Portion & Glass-Container Seal',
        instruction:
          'Let cooked meals vent steam for 20 minutes before sealing in airtight glass meal-prep containers with separate sauce jars.',
        timerSeconds: 600,
      },
    ],
    stepsAr: [
      {
        title: 'تجهيز المكونات والبدائل (Mise en Place)',
        instruction:
          'رتب البروتينات وجففها تماماً بورق المطبخ، وجهز بدائل الكريمة أو التوابل قبل إشعال النار.',
        timerSeconds: 300,
      },
      {
        title: 'التحمير المتتالي في المقلاة الساخنة',
        instruction:
          'سخن مقلاة الحديد الزهر لـ 4 دقائق، أضف زيت الأفوكادو وحمّر الوجبات لاكتساب القشرة الذهبية.',
        timerSeconds: 480,
      },
      {
        title: 'التبريد والتقسيم في الحافظات الزجاجية',
        instruction:
          'اترك الوجبات تبرد بدون غطاء لـ 20 دقيقة لخروج البخار ثم احفظها في علب زجاجية مع فصل الصلصات.',
        timerSeconds: 600,
      },
    ],
  },
];
