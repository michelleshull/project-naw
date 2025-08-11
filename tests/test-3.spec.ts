import { test, expect } from '@playwright/test';
import { preamble_url } from '../config.js';

test('test', async ({ page }) => {
  await page.goto(config.preamble_url);
  await expect(page.getByRole('link', { name: 'Constitution Annotated' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Constitution of the United' })).toBeVisible();
  await expect(page.locator('h2')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Article I Explained' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Section 1', exact: true })).toBeVisible();
  await expect(page.getByRole('article')).toContainText('All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.');
  await expect(page.getByRole('heading', { name: 'Section 2' })).toBeVisible();
});