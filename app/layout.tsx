import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CookieConsentBanner } from '@/components/CookieConsentBanner';
import { SOCIAL_LINKS } from '@/lib/cookreel-data';
import { getSafeSiteUrl } from '@/lib/server-db';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

const siteUrl = getSafeSiteUrl();
const defaultOgImage = `${siteUrl}/images/hero_cookreel_studio_1795527112508.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'CookReel – Step-by-Step Video Recipes & Culinary Guides',
  description:
    'Step-by-step video recipes, 15-minute weeknight dinners, keto & high-protein meal guides, USDA safe cooking temperatures, and 1:1 ingredient substitutions by the CookReel Editorial Team.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CookReel – Step-by-Step Video Recipes & Culinary Guides',
    description:
      'Step-by-step video recipes, 15-minute weeknight dinners, keto & high-protein meal guides, USDA safe cooking temperatures, and 1:1 ingredient substitutions.',
    url: siteUrl,
    type: 'website',
    siteName: 'CookReel',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'CookReel Culinary Guides & Video Recipes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CookReel – Step-by-Step Video Recipes & Culinary Guides',
    description:
      'Step-by-step video recipes, 15-minute weeknight dinners, keto & high-protein meal guides, and 1:1 ingredient substitutions.',
    images: [defaultOgImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'CookReel – Step-by-Step Video Recipes & Culinary Guides',
        url: siteUrl,
        description:
          'Step-by-step video recipes, 15-minute weeknight dinners, keto & high-protein meal guides, and 1:1 ingredient substitutions.',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'CookReel',
        url: siteUrl,
        email: 'editorial@cookreel.com',
        logo: {
          '@type': 'ImageObject',
          url: defaultOgImage,
        },
        sameAs: SOCIAL_LINKS.map((s) => s.url),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#FAF9F6] text-slate-900 antialiased font-sans selection:bg-amber-700 selection:text-white"
      >
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
