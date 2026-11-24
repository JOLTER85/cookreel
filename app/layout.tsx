import type {Metadata} from 'next';
import {Fraunces, Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'CookReel – Short-Form Video Recipes & Culinary Guides',
  description:
    'Short-form video recipes, 15-minute weeknight dinners, keto & high-protein guides, and tested ingredient substitutions by CookReel Test Kitchen.',
  openGraph: {
    title: 'CookReel – Short-Form Video Recipes & Culinary Guides',
    description:
      'Short-form video recipes, 15-minute weeknight dinners, keto & high-protein guides, and tested ingredient substitutions by CookReel Test Kitchen.',
    type: 'website',
    siteName: 'CookReel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CookReel – Short-Form Video Recipes & Culinary Guides',
    description:
      'Short-form video recipes, 15-minute weeknight dinners, keto & high-protein guides, and tested ingredient substitutions by CookReel Test Kitchen.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CookReel – Short-Form Video Recipes & Culinary Guides',
    url: 'https://cookreel.com',
    description:
      'Short-form video recipes, 15-minute weeknight dinners, keto & high-protein guides, and tested ingredient substitutions by CookReel Test Kitchen.',
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schemaOrg)}}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#FAF9F6] text-slate-900 antialiased font-sans selection:bg-amber-700 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
