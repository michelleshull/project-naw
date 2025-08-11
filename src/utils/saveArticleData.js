import fs from 'fs';
import path from 'path';
import { exportAmendmentMarkdown, exportArticleMarkdown } from './exportMarkdown.js';

export function saveArticleData(articleData, options = {}) {
  const {
    jsonDir = './data/articles',
    markdownDir = './data/articlesMarkdown'
  } = options;

  fs.mkdirSync(jsonDir, { recursive: true });
  fs.mkdirSync(markdownDir, { recursive: true });

  const jsonFile = path.join(jsonDir, `article-${articleData.article}.json`);
  fs.writeFileSync(jsonFile, JSON.stringify(articleData, null, 2), 'utf8');
  console.log(`💾 JSON saved: ${jsonFile}`);

  exportArticleMarkdown(articleData, markdownDir);
}

export function saveAmendmentData(amendmentData, options = {}) {
  const {
    jsonDir = './data/amendments',
    markdownDir = './data/amendmentsMarkdown'
  } = options;

  fs.mkdirSync(jsonDir, { recursive: true });
  fs.mkdirSync(markdownDir, { recursive: true });

  const jsonFile = path.join(jsonDir, `amendment-${amendmentData.amendment}.json`);
  fs.writeFileSync(jsonFile, JSON.stringify(amendmentData, null, 2), 'utf8');
  console.log(`💾 JSON saved: ${jsonFile}`);

  exportAmendmentMarkdown(amendmentData, markdownDir);
}