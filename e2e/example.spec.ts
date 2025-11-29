import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/GBV/);
});

test('get started link', async ({ page }) => {
    await page.goto('/');

    // Check for a heading or main content
    await expect(page.locator('h1')).toBeVisible();
});
