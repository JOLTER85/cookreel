import fs from 'fs';
import path from 'path';
import {
  COOKREEL_RECIPES,
  CulinaryRecipe,
  PrimaryCategorySlug,
} from '@/lib/cookreel-data';

export interface RecipeReview {
  id: string;
  recipeId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface KitchenOrder {
  orderId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: { id: string; name: string; brand: string; priceUsd: number; qty: number }[];
  totalUsd: number;
  status: 'Confirmed — Preparing Shipment';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface CookReelDatabase {
  recipes: CulinaryRecipe[];
  reviews: RecipeReview[];
  orders: KitchenOrder[];
  subscribers: { email: string; subscribedAt: string }[];
  inquiries: ContactInquiry[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE_PATH = path.resolve(DATA_DIR, 'cookreel-db-v2.json');

const INITIAL_REVIEWS: RecipeReview[] = [
  {
    id: 'rev-1',
    recipeId: 'crispy-salmon-skillet',
    authorName: 'Sarah Jenkins',
    rating: 5,
    comment:
      'Pressing the salmon skin for 10 seconds in the hot cast-iron skillet made it shatteringly crisp. Ready in 14 minutes flat!',
    createdAt: '2026-11-20T18:30:00Z',
  },
  {
    id: 'rev-2',
    recipeId: 'crispy-salmon-skillet',
    authorName: 'أحمد المنصور',
    rating: 5,
    comment:
      'أفضل طريقة لعمل السلمون بدون أن يلتصق بالمقلاة، وجدول بدائل المكونات ساعدني جداً عندما استبدلت الزبدة بزيت الزيتون.',
    createdAt: '2026-11-22T14:15:00Z',
  },
  {
    id: 'rev-3',
    recipeId: 'garlic-butter-ribeye-steak',
    authorName: 'David K.',
    rating: 5,
    comment:
      'The step timer kept me from overcooking the ribeye. Perfect medium-rare crust with 54g protein for my keto meal plan.',
    createdAt: '2026-11-21T20:10:00Z',
  },
  {
    id: 'rev-4',
    recipeId: 'mango-strawberry-sunset-cupcakes',
    authorName: 'Lina Haddad',
    rating: 5,
    comment:
      'Found this from an old recipe bookmark on WeCookRecipe and the dual-tone mango strawberry frosting is even better with the video reel!',
    createdAt: '2026-11-23T11:05:00Z',
  },
];

function ensureDbFile(): CookReelDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE_PATH)) {
    const initialDb: CookReelDatabase = {
      recipes: COOKREEL_RECIPES,
      reviews: INITIAL_REVIEWS,
      orders: [],
      subscribers: [],
      inquiries: [],
    };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
  try {
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as CookReelDatabase;
    return {
      recipes:
        Array.isArray(parsed.recipes) && parsed.recipes.length > 0
          ? parsed.recipes
          : COOKREEL_RECIPES,
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : INITIAL_REVIEWS,
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
    };
  } catch {
    return {
      recipes: COOKREEL_RECIPES,
      reviews: INITIAL_REVIEWS,
      orders: [],
      subscribers: [],
      inquiries: [],
    };
  }
}

export function readDatabase(): CookReelDatabase {
  return ensureDbFile();
}

export function writeDatabase(db: CookReelDatabase): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function isValidCategory(cat: unknown): cat is PrimaryCategorySlug {
  return (
    cat === 'quick_easy' ||
    cat === 'healthy_diet' ||
    cat === 'desserts_baking' ||
    cat === 'kitchen_hacks'
  );
}
