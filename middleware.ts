import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const rawHost =
    req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const hostname = rawHost.split(':')[0].toLowerCase();
  const pathname = req.nextUrl.pathname;

  // 1. Permanent 301 Redirect from http(s)://tv.cookreel.com/ and http(s)://tv.cookreel.com/today (and any tv.cookreel.com path) to the Homepage
  if (hostname === 'tv.cookreel.com') {
    return NextResponse.redirect('https://cookreel.com/', {
      status: 301,
    });
  }

  // 2. Permanent 301 Redirect for /today, /tv, and /tv/today on main domain directly to the Homepage (/)
  if (
    pathname === '/today' ||
    pathname.startsWith('/today/') ||
    pathname === '/tv' ||
    pathname.startsWith('/tv/')
  ) {
    const homeUrl = new URL('/', req.url);
    return NextResponse.redirect(homeUrl, {
      status: 301,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|media-clips/|googlebf7d373e6f63afbc.html).*)',
  ],
};
