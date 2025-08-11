import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { AmendmentPage } from "../src/pages/amendmentPage.js";
import { formatAmendmentData } from "../src/utils/formatAmendmentData.js";
import { diffStructuredDoc } from "../src/utils/diffStructuredDoc.js";
import { writeDiffReport } from "../src/utils/writeDiffReport.js";
import config from "../config.js";

const docs = [
    { label: "amendment-1", url: config.first_amendment_url, type: "amendment", num: 1, baseline: "./data/amendments/amendment-1.json" },
    { label: "amendment-2", url: config.second_amendment_url, type: "amendment", num: 2, baseline: "./data/amendments/amendment-2.json" },
    { label: "amendment-3", url: config.third_amendment_url, type: "amendment", num: 3, baseline: "./data/amendments/amendment-3.json" },
    { label: "amendment-4", url: config.fourth_amendment_url, type: "amendment", num: 4, baseline: "./data/amendments/amendment-4.json" },
    { label: "amendment-5", url: config.fifth_amendment_url, type: "amendment", num: 5, baseline: "./data/amendments/amendment-5.json" },
    { label: "amendment-6", url: config.sixth_amendment_url, type: "amendment", num: 6, baseline: "./data/amendments/amendment-6.json" },
    { label: "amendment-7", url: config.seventh_amendment_url, type: "amendment", num: 7, baseline: "./data/amendments/amendment-7.json" },
    { label: "amendment-8", url: config.eighth_amendment_url, type: "amendment", num: 8, baseline: "./data/amendments/amendment-8.json" },
    { label: "amendment-9", url: config.ninth_amendment_url, type: "amendment", num: 9, baseline: "./data/amendments/amendment-9.json" },
    { label: "amendment-10", url: config.tenth_amendment_url, type: "amendment", num: 10, baseline: "./data/amendments/amendment-10.json" },
    { label: "amendment-11", url: config.eleventh_amendment_url, type: "amendment", num: 11, baseline: "./data/amendments/amendment-11.json" },
    { label: "amendment-12", url: config.twelfth_amendment_url, type: "amendment", num: 12, baseline: "./data/amendments/amendment-12.json" },
    { label: "amendment-13", url: config.thirteenth_amendment_url, type: "amendment", num: 13, baseline: "./data/amendments/amendment-13.json" },
    { label: "amendment-14", url: config.fourteenth_amendment_url, type: "amendment", num: 14, baseline: "./data/amendments/amendment-14.json" },
    { label: "amendment-15", url: config.fifteenth_amendment_url, type: "amendment", num: 15, baseline: "./data/amendments/amendment-15.json" },
    { label: "amendment-16", url: config.sixteenth_amendment_url, type: "amendment", num: 16, baseline: "./data/amendments/amendment-16.json" },
    { label: "amendment-17", url: config.seventeenth_amendment_url, type: "amendment", num: 17, baseline: "./data/amendments/amendment-17.json" },
    { label: "amendment-18", url: config.eighteenth_amendment_url, type: "amendment", num: 18, baseline: "./data/amendments/amendment-18.json" },
    { label: "amendment-19", url: config.nineteenth_amendment_url, type: "amendment", num: 19, baseline: "./data/amendments/amendment-19.json" },
    { label: "amendment-20", url: config.twentieth_amendment_url, type: "amendment", num: 20, baseline: "./data/amendments/amendment-20.json" },
    { label: "amendment-21", url: config.twenty_first_amendment_url, type: "amendment", num: 21, baseline: "./data/amendments/amendment-21.json" },
    { label: "amendment-22", url: config.twenty_second_amendment_url, type: "amendment", num: 22, baseline: "./data/amendments/amendment-22.json" },
    { label: "amendment-23", url: config.twenty_third_amendment_url, type: "amendment", num: 23, baseline: "./data/amendments/amendment-23.json" },
    { label: "amendment-24", url: config.twenty_fourth_amendment_url, type: "amendment", num: 24, baseline: "./data/amendments/amendment-24.json" },
    { label: "amendment-25", url: config.twenty_fifth_amendment_url, type: "amendment", num: 25, baseline: "./data/amendments/amendment-25.json" },
    { label: "amendment-26", url: config.twenty_sixth_amendment_url, type: "amendment", num: 26, baseline: "./data/amendments/amendment-26.json" },
    { label: "amendment-27", url: config.twenty_seventh_amendment_url, type: "amendment", num: 27, baseline: "./data/amendments/amendment-27.json" },
  
];

test.describe("Patriotic Diff™ vs baseline for Amendments", () => {
  for (const { label, url, num, baseline } of docs) {
    test(`Diff ${label}`, async ({ page }) => {
      await page.goto(url);

      const amendmentPage = new AmendmentPage(page);
      const rawSections = await amendmentPage.scrape();
      const current = formatAmendmentData(num, rawSections, url);

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