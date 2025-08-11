import { test, expect } from '@playwright/test';
import config from '../config.js';


test('test', async ({ page }) => {
  await page.goto(config.preamble_url);
  await expect(page.getByRole('link', { name: 'Constitution Annotated' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Constitution of the United' })).toBeVisible();
  await expect(page.getByText('Home > Constitution of the')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The Preamble' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'The Preamble Explained' })).toBeVisible();
  await expect(page.getByRole('article')).toContainText('We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.');
});