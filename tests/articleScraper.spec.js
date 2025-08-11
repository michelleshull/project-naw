import { test } from '@playwright/test';
import { ArticlePage } from '../src/pages/articlePage.js';
import { formatArticleData } from '../src/utils/formatArticleData.js';
import { saveArticleData } from '../src/utils/saveArticleData.js';
import config from '../config.js';

[
  { name: 'Preamble', url: config.preamble_url, articleNumber: 0 },
  { name: 'Article I', url: config.article_I_url, articleNumber: 1 },
  { name: 'Article II', url: config.article_II_url, articleNumber: 2 },
  { name: 'Article III', url: config.article_III_url, articleNumber: 3 },
  { name: 'Article IV', url: config.article_IV_url, articleNumber: 4 },
  { name: 'Article V', url: config.article_V_url, articleNumber: 5 },
  { name: 'Article VI', url: config.article_VI_url, articleNumber: 6 },
  { name: 'Article VII', url: config.article_VII_url, articleNumber: 7 },
].forEach(({ name, url, articleNumber }) => {
    test(`Scrape and save ${name}`, async ({ page }) => {
    await page.goto(url);

    const articlePage = new ArticlePage(page);
    const rawSections = await articlePage.scrape();

    const structuredData = formatArticleData(articleNumber, rawSections, url);

    saveArticleData(structuredData);

    console.log(`✅ ${name} scrape and export complete.`);
    });
});