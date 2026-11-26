import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const rawHost =
    req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const hostname = rawHost.split(':')[0].toLowerCase();

  // Permanent 301 Redirect from historical subdomain tv.cookreel.com -> https://www.cookreel.com/videos
  if (hostname === 'tv.cookreel.com') {
    return NextResponse.redirect('https://www.cookreel.com/videos', {
      status: 301,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|videos/|googlebf7d373e6f63afbc.html).*)',
  ],
};
