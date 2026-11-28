import { NextResponse } from 'next/server';
import {
  COOKREEL_RECIPES,
  SITE_ORIGIN,
  HERO_FEATURED_VIDEO_URL,
} from '@/lib/cookreel-data';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const videoRecipes = COOKREEL_RECIPES.filter((r) => Boolean(r.videoUrl));
  const heroThumb = `${SITE_ORIGIN}/images/hero_cookreel_studio_1795527112508.jpg`;

  const videoHubEntries = [
    `    <video:video>
      <video:thumbnail_loc>${escapeXml(heroThumb)}</video:thumbnail_loc>
      <video:title>${escapeXml('CookReel Studio — Step-by-Step Visual Cooking Technique Reel')}</video:title>
      <video:description>${escapeXml('Short-form 12-second culinary technique clips demonstrating cast-iron pan searing, butter basting, pasta emulsification, and cupcake piping on CookReel.')}</video:description>
      <video:content_loc>${escapeXml(`${SITE_ORIGIN}${HERO_FEATURED_VIDEO_URL}`)}</video:content_loc>
      <video:duration>12</video:duration>
      <video:publication_date>2026-11-15T08:00:00Z</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`,
    ...videoRecipes.map(
      (r) => `    <video:video>
      <video:thumbnail_loc>${escapeXml(`${SITE_ORIGIN}${r.image}`)}</video:thumbnail_loc>
      <video:title>${escapeXml(`${r.titleEn} — Step-by-Step Visual Clip`)}</video:title>
      <video:description>${escapeXml(r.subtitleEn)}</video:description>
      <video:content_loc>${escapeXml(`${SITE_ORIGIN}${r.videoUrl}`)}</video:content_loc>
      <video:duration>12</video:duration>
      <video:publication_date>2026-11-15T08:00:00Z</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`
    ),
  ].join('\n');

  const recipeUrlEntries = videoRecipes
    .map(
      (r) => `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}/recipes/${r.slug}`)}</loc>
    <lastmod>2026-11-28T08:00:00Z</lastmod>
    <video:video>
      <video:thumbnail_loc>${escapeXml(`${SITE_ORIGIN}${r.image}`)}</video:thumbnail_loc>
      <video:title>${escapeXml(`${r.titleEn} — Step-by-Step Visual Clip`)}</video:title>
      <video:description>${escapeXml(r.subtitleEn)}</video:description>
      <video:content_loc>${escapeXml(`${SITE_ORIGIN}${r.videoUrl}`)}</video:content_loc>
      <video:duration>12</video:duration>
      <video:publication_date>2026-11-15T08:00:00Z</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}/videos`)}</loc>
    <lastmod>2026-11-28T08:00:00Z</lastmod>
${videoHubEntries}
  </url>
${recipeUrlEntries}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
