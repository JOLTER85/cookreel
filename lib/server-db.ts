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
  status: 'approved' | 'pending_moderation';
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
const DB_FILE_PATH = path.resolve(DATA_DIR, 'cookreel-db-v6.json');

// Zero fabricated reviews on launch — only authentic user-submitted reviews are stored
const INITIAL_REVIEWS: RecipeReview[] = [];

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

export function verifyAntiSpamChallenge(
  numA: unknown,
  numB: unknown,
  answer: unknown,
  honeypot?: unknown
): boolean {
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return false;
  }
  const a = Number(numA);
  const b = Number(numB);
  const ans = Number(answer);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(ans)) {
    return false;
  }
  return a + b === ans;
}
