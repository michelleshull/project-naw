import { test, expect } from "@playwright/test";
import { ArticlePage } from "../src/pages/articlePage.js";
import { formatArticleData } from "../src/utils/formatArticleData.js";
import { diffStructuredDoc } from "../src/utils/diffStructuredDoc.js";
import { writeDiffReport } from "../src/utils/writeDiffReport.js";
import config from "../config.js";
import fs from "fs";
import path from "path";

const docs = [
  
  { label: "Preamble", url: config.preamble_url, type: "article", num: 0, baseline: "./data/articles/article-0.json" },
  { label: "article-1", url: config.article_I_url, type: "article", num: 1, baseline: "./data/articles/article-1.json" },
  { label: "article-2", url: config.article_II_url, type: "article", num: 2, baseline: "./data/articles/article-2.json" },
  { label: "article-3", url: config.article_III_url, type: "article", num: 3, baseline: "./data/articles/article-3.json" },
  { label: "article-4", url: config.article_IV_url, type: "article", num: 4, baseline: "./data/articles/article-4.json" },
  { label: "article-5", url: config.article_V_url, type: "article", num: 5, baseline: "./data/articles/article-5.json" },
  { label: "article-6", url: config.article_VI_url, type: "article", num: 6, baseline: "./data/articles/article-6.json" },
  { label: "article-7", url: config.article_VII_url, type: "article", num: 7, baseline: "./data/articles/article-7.json" },

];

test.describe("Patriotic Diff™ vs baseline for Articles", () => {
  for (const { label, url, num, baseline } of docs) {
    test(`Diff ${label}`, async ({ page }) => {
      await page.goto(url);

      const articlePage = new ArticlePage(page);
      const rawSections = await articlePage.scrape();
      const current = formatArticleData(num, rawSections, url);

      if (!fs.existsSync(baseline)) {
        // First run: write baseline and pass
        fs.mkdirSync(path.dirname(baseline), { recursive: true });
        fs.writeFileSync(baseline, JSON.stringify(current, null, 2));
        console.log(`📌 Baseline created for ${label}: ${baseline}`);
        return;
      }

      const prev = JSON.parse(fs.readFileSync(baseline, "utf8"));
      const diff = diffStructuredDoc(prev, current);
      const hasChanges = diff.added.length || diff.removed.length || diff.modified.length;

      if (hasChanges) {
        const report = writeDiffReport({ docLabel: label, baselinePath: baseline, diff });

        if (process.env.UPDATE_BASELINE === "1") {
          fs.writeFileSync(baseline, JSON.stringify(current, null, 2));
          console.log(`✅ Baseline updated for ${label}. See report: ${report}`);
        } else {
          console.log(`❗ Differences detected for ${label}. See report: ${report}`);
          expect(hasChanges, "Differences detected. Run with UPDATE_BASELINE=1 to approve.").toBeFalsy();
        }
      } else {
        console.log(`✅ No differences for ${label}`);
      }
    });
  }
});