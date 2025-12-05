import { getRequestConfig } from 'next-intl/server';

/**
 * Configures the internationalization request.
 * Loads the appropriate messages based on the requested locale.
 * Defaults to 'en' if the locale is invalid or missing.
 */

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
    if (!locale || !['en', 'sw'].includes(locale)) {
        locale = 'en';
    }
    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
