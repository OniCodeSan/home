import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authEnabled, sessionToken, COOKIE_NAME } from '@/lib/auth';

// Protegge /admin e /preview. I siti pubblici (/[slug]) restano aperti.
export async function middleware(req: NextRequest) {
  if (!authEnabled()) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin/login')) return NextResponse.next();

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const expected = await sessionToken();
  if (cookie && cookie === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/admin/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*', '/preview/:path*'],
};
