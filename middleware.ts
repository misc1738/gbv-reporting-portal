import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export default async function middleware(request: NextRequest) {
  // 1. Update Supabase session and check for auth
  // We need to await this because it might return a redirect response
  const response = await updateSession(request);

  // If updateSession returned a redirect, return it immediately
  if (response.headers.get('location')) {
    return response;
  }

  // 2. Run next-intl middleware
  const handleI18nRouting = createMiddleware({
    locales: ['en', 'sw'],
    defaultLocale: 'en'
  });

  const i18nResponse = handleI18nRouting(request);

  // 3. Merge cookies from Supabase response to i18n response to ensure session is preserved
  // This is critical because updateSession might have set cookies (refreshed token)
  const supabaseCookies = response.cookies.getAll();
  supabaseCookies.forEach((cookie) => {
    i18nResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  return i18nResponse;
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // Feel free to modify this pattern to include more paths.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
