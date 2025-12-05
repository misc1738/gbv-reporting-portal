/**
 * Middleware configuration for next-intl.
 * Handles locale detection and redirection based on the URL path.
 */
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'sw'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|sw)/:path*']
};
