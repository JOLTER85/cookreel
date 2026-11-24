import { NextRequest, NextResponse } from 'next/server';
import {
  readDatabase,
  writeDatabase,
  sanitizeText,
  RecipeReview,
} from '@/lib/server-db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recipeId = sanitizeText(body.recipeId, 80);
    const authorName = sanitizeText(body.authorName, 60) || 'Verified Home Chef';
    const comment = sanitizeText(body.comment, 500);
    const rating = Math.min(Math.max(Math.round(Number(body.rating) || 5), 1), 5);

    if (!recipeId || !comment || comment.length < 3) {
      return NextResponse.json(
        { error: 'Please enter a valid review comment.' },
        { status: 400 }
      );
    }

    const db = readDatabase();
    const recipeIndex = db.recipes.findIndex((r) => r.id === recipeId);
    if (recipeIndex === -1) {
      return NextResponse.json({ error: 'Recipe not found.' }, { status: 404 });
    }

    const newReview: RecipeReview = {
      id: `rev-${Date.now()}`,
      recipeId,
      authorName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    db.reviews = [newReview, ...db.reviews];

    // Recalculate recipe rating & review count
    const recipeReviews = db.reviews.filter((r) => r.recipeId === recipeId);
    const avg =
      recipeReviews.reduce((acc, r) => acc + r.rating, 0) /
      recipeReviews.length;
    db.recipes[recipeIndex].rating = Number(avg.toFixed(1));
    db.recipes[recipeIndex].reviewsCount += 1;

    writeDatabase(db);

    return NextResponse.json(
      {
        review: newReview,
        updatedRecipe: db.recipes[recipeIndex],
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
