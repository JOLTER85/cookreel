import { NextRequest, NextResponse } from 'next/server';
import {
  readDatabase,
  writeDatabase,
  sanitizeText,
  RecipeReview,
  verifyAntiSpamChallenge,
} from '@/lib/server-db';

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
        { error: 'Please solve the anti-spam math verification correctly.' },
        { status: 400 }
      );
    }

    const recipeId = sanitizeText(body.recipeId, 80);
    const authorName = sanitizeText(body.authorName, 60) || 'Home Cook';
    const comment = sanitizeText(body.comment, 500);
    const rating = Math.min(Math.max(Math.round(Number(body.rating) || 5), 1), 5);

    if (!recipeId || !comment || comment.length < 5) {
      return NextResponse.json(
        { error: 'Please write a genuine review of at least 5 characters.' },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const recipeExists = db.recipes.some((r) => r.id === recipeId);
    if (!recipeExists) {
      return NextResponse.json({ error: 'Recipe not found.' }, { status: 404 });
    }

    const newReview: RecipeReview = {
      id: `rev-${Date.now()}`,
      recipeId,
      authorName,
      rating,
      comment,
      status: 'approved',
      createdAt: new Date().toISOString(),
    };

    db.reviews = [newReview, ...db.reviews];
    writeDatabase(db);

    return NextResponse.json(
      {
        review: newReview,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to submit review.' },
      { status: 500 }
    );
  }
}
