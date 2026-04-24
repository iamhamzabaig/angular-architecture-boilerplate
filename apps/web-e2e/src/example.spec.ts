import { test, expect } from '@playwright/test';

test('redirects to login and authenticates', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /sign in to continue/i })).toBeVisible();
  await page.getByLabel(/email/i).fill('architect@example.com');
  await page.getByLabel(/password/i).fill('pass123');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page.getByText(/operational dashboard/i)).toBeVisible();
});
