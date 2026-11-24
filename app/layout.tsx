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
  title: 'CookReel Studio – Domain SEO Audit & Culinary Platform',
  description:
    'Forensic backlink audit, Google Disavow & 301 recovery blueprint, and shoppable video recipe monetization platform for cookreel.com.',
  openGraph: {
    title: 'CookReel Studio – Domain SEO Audit & Culinary Platform',
    description:
      'Forensic backlink audit, Google Disavow & 301 recovery blueprint, and shoppable video recipe monetization platform for cookreel.com.',
    type: 'website',
    siteName: 'CookReel Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CookReel Studio – Domain SEO Audit & Culinary Platform',
    description:
      'Forensic backlink audit, Google Disavow & 301 recovery blueprint, and shoppable video recipe monetization platform for cookreel.com.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CookReel Studio – Domain SEO Audit & Culinary Platform',
    url: 'https://cookreel.com',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description:
      'Complete Ahrefs backlink forensic analysis, disavow generator, 301 link equity recovery, and video recipe monetization architecture for cookreel.com.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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
