import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  SITE_ARCHITECTURE,
  COOKREEL_RECIPES,
  SITE_ORIGIN,
  findRecipeBySlug,
  LEGACY_RECIPE_SLUG_ALIASES,
} from '@/lib/cookreel-data';
import { SiteHeader, SiteFooter } from '@/components/SiteHeaderFooter';
import { RecipeDetailClient } from '@/components/RecipeDetailClient';

export const dynamicParams = true;

export function generateStaticParams() {
  const canonicalSlugs = COOKREEL_RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
  const aliasSlugs = Object.keys(LEGACY_RECIPE_SLUG_ALIASES).map((slug) => ({
    slug,
  }));
  return [...canonicalSlugs, ...aliasSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const recipe = findRecipeBySlug(resolvedParams?.slug || '');

  if (!recipe) {
    return {
      title: 'Recipe Not Found | CookReel',
    };
  }

  const imageUrl = recipe.image.startsWith('http')
    ? recipe.image
    : `${SITE_ORIGIN}${recipe.image}`;

  return {
    title: `${recipe.titleEn} | CookReel`,
    description: recipe.subtitleEn,
    alternates: {
      canonical: `/recipes/${recipe.slug}`,
    },
    openGraph: {
      title: `${recipe.titleEn} | CookReel`,
      description: recipe.subtitleEn,
      url: `${SITE_ORIGIN}/recipes/${recipe.slug}`,
      type: 'article',
      siteName: 'CookReel',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: recipe.titleEn,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.titleEn} | CookReel`,
      description: recipe.subtitleEn,
      images: [imageUrl],
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const recipe = findRecipeBySlug(resolvedParams?.slug || '');

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = COOKREEL_RECIPES.filter(
    (r) => r.category === recipe.category && r.id !== recipe.id
  ).slice(0, 3);

  const categoryObj = SITE_ARCHITECTURE.find((c) => c.slug === recipe.category);
  const fullImageUrl = recipe.image.startsWith('http')
    ? recipe.image
    : `${SITE_ORIGIN}${recipe.image}`;

  const recipeNode: Record<string, unknown> = {
    '@type': 'Recipe',
    '@id': `${SITE_ORIGIN}/recipes/${recipe.slug}#recipe`,
    name: recipe.titleEn,
    description: recipe.subtitleEn,
    image: [
      fullImageUrl,
      ...(recipe.stepGalleryImages || []).map((img) =>
        img.startsWith('http') ? img : `${SITE_ORIGIN}${img}`
      ),
    ],
    author: {
      '@type': 'Organization',
      name: recipe.authorName,
      url: `${SITE_ORIGIN}/about`,
    },
    datePublished: '2026-11-15',
    prepTime: `PT${recipe.prepMinutes}M`,
    cookTime: `PT${recipe.cookMinutes}M`,
    totalTime: `PT${recipe.prepMinutes + recipe.cookMinutes}M`,
    recipeYield: '2 servings',
    recipeCategory: categoryObj?.labelEn || 'Main Course',
    recipeCuisine: 'International',
    keywords: `${recipe.titleEn}, ${recipe.categoryLabelEn}, step-by-step recipe, ingredient substitutions`,
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.calories} calories`,
      proteinContent: `${recipe.proteinGrams} g`,
      carbohydrateContent: `${recipe.netCarbsGrams} g`,
    },
    recipeIngredient: (recipe.ingredientsEn || []).map(
      (i) => `${i.amount} ${i.unit} ${i.item}`
    ),
    recipeInstructions: (recipe.stepsEn || []).map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.title,
      text: s.instruction,
      url: `${SITE_ORIGIN}/recipes/${recipe.slug}#step-${index + 1}`,
    })),
  };

  if (recipe.videoUrl) {
    recipeNode.video = {
      '@type': 'VideoObject',
      name: `${recipe.titleEn} — Step-by-Step Video Clip`,
      description: recipe.subtitleEn,
      thumbnailUrl: [fullImageUrl],
      contentUrl: `${SITE_ORIGIN}${recipe.videoUrl}`,
      uploadDate: '2026-11-15T08:00:00Z',
      duration: 'PT12S',
    };
  }

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      recipeNode,
      {
        '@type': 'FAQPage',
        '@id': `${SITE_ORIGIN}/recipes/${recipe.slug}#faq`,
        mainEntity: (recipe.faqs || []).map((f) => ({
          '@type': 'Question',
          name: f.questionEn,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answerEn,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_ORIGIN,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: categoryObj?.labelEn || 'Recipes',
            item: `${SITE_ORIGIN}/category/${recipe.category}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: recipe.titleEn,
            item: `${SITE_ORIGIN}/recipes/${recipe.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      <SiteHeader activePath={`/category/${recipe.category}`} />
      <main className="flex-1">
        <RecipeDetailClient
          recipe={recipe}
          initialReviews={[]}
          relatedRecipes={relatedRecipes}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
