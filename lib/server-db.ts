import fs from 'fs';
import os from 'os';
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

const INITIAL_REVIEWS: RecipeReview[] = [];

const globalForDb = globalThis as unknown as {
  __cookreelMemoryDb?: CookReelDatabase;
};

function createDefaultDatabase(): CookReelDatabase {
  return {
    recipes: [...COOKREEL_RECIPES],
    reviews: [...INITIAL_REVIEWS],
    orders: [],
    subscribers: [],
    inquiries: [],
  };
}

function normalizeRecipes(rawRecipes: unknown): CulinaryRecipe[] {
  if (!Array.isArray(rawRecipes) || rawRecipes.length === 0) {
    return [...COOKREEL_RECIPES];
  }
  const validRecipes = rawRecipes.filter(
    (r): r is CulinaryRecipe =>
      Boolean(
        r &&
          typeof r === 'object' &&
          typeof (r as CulinaryRecipe).id === 'string' &&
          typeof (r as CulinaryRecipe).slug === 'string' &&
          typeof (r as CulinaryRecipe).titleEn === 'string' &&
          Array.isArray((r as CulinaryRecipe).stepsEn) &&
          Array.isArray((r as CulinaryRecipe).substitutions) &&
          Array.isArray((r as CulinaryRecipe).ingredientsEn) &&
          Array.isArray((r as CulinaryRecipe).faqs) &&
          Array.isArray((r as CulinaryRecipe).stepGalleryImages) &&
          (r as CulinaryRecipe).gearItem &&
          typeof (r as CulinaryRecipe).gearItem.nameEn === 'string'
      )
  );
  return validRecipes.length > 0 ? validRecipes : [...COOKREEL_RECIPES];
}

function getWritableDbPath(): string | null {
  const candidates = [
    path.resolve(process.cwd(), 'data', 'cookreel-db-v6.json'),
    path.resolve(os.tmpdir(), 'cookreel-db-v6.json'),
  ];

  for (const filePath of candidates) {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (fs.existsSync(filePath)) {
        fs.accessSync(filePath, fs.constants.R_OK);
        return filePath;
      }
      // Test if directory is writable
      const initialDb =
        globalForDb.__cookreelMemoryDb || createDefaultDatabase();
      fs.writeFileSync(filePath, JSON.stringify(initialDb, null, 2), 'utf-8');
      return filePath;
    } catch {
      // Directory is read-only (e.g., Vercel / Cloud Run serverless container), try next candidate
      continue;
    }
  }
  return null;
}

export function readDatabase(): CookReelDatabase {
  if (!globalForDb.__cookreelMemoryDb) {
    globalForDb.__cookreelMemoryDb = createDefaultDatabase();
  }

  try {
    const dbFilePath = getWritableDbPath();
    if (!dbFilePath || !fs.existsSync(dbFilePath)) {
      return globalForDb.__cookreelMemoryDb;
    }
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<CookReelDatabase>;
    const normalized: CookReelDatabase = {
      recipes: normalizeRecipes(parsed.recipes),
      reviews: Array.isArray(parsed.reviews)
        ? parsed.reviews
        : globalForDb.__cookreelMemoryDb.reviews,
      orders: Array.isArray(parsed.orders)
        ? parsed.orders
        : globalForDb.__cookreelMemoryDb.orders,
      subscribers: Array.isArray(parsed.subscribers)
        ? parsed.subscribers
        : globalForDb.__cookreelMemoryDb.subscribers,
      inquiries: Array.isArray(parsed.inquiries)
        ? parsed.inquiries
        : globalForDb.__cookreelMemoryDb.inquiries,
    };
    globalForDb.__cookreelMemoryDb = normalized;
    return normalized;
  } catch {
    return globalForDb.__cookreelMemoryDb;
  }
}

export function writeDatabase(db: CookReelDatabase): void {
  globalForDb.__cookreelMemoryDb = db;
  try {
    const dbFilePath = getWritableDbPath();
    if (dbFilePath) {
      fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf-8');
    }
  } catch {
    // Gracefully keep state in globalThis.__cookreelMemoryDb when filesystem is read-only
  }
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
    cat === 'quick-easy' ||
    cat === 'healthy-diet' ||
    cat === 'desserts-baking' ||
    cat === 'kitchen-hacks'
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

export function getSafeSiteUrl(): string {
  const raw = process.env.APP_URL?.trim();
  if (raw) {
    try {
      const candidate = raw.startsWith('http://') || raw.startsWith('https://')
        ? raw
        : `https://${raw}`;
      return new URL(candidate).origin;
    } catch {
      return 'https://www.cookreel.com';
    }
  }
  return 'https://www.cookreel.com';
}
