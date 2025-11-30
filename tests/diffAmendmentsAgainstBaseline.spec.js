import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";
import { AmendmentPage } from "../src/pages/amendmentPage.js";
import { formatAmendmentData } from "../src/utils/formatAmendmentData.js";
import { diffStructuredDoc } from "../src/utils/diffStructuredDoc.js";
import { writeDiffReport } from "../src/utils/writeDiffReport.js";
import config from "../config.js";

const ordinalNumbers = new Map([
  [1, "first"],
  [2, "second"],
  [3, "third"],
  [4, "fourth"],
  [5, "fifth"],
  [6, "sixth"],
  [7, "seventh"],
  [8, "eighth"],
  [9, "ninth"],
  [10, "tenth"],
  [11, "eleventh"],
  [12, "twelfth"],
  [13, "thirteenth"],
  [14, "fourteenth"],
  [15, "fifteenth"],
  [16, "sixteenth"],
  [17, "seventeenth"],
  [18, "eighteenth"],
  [19, "nineteenth"],
  [20, "twentieth"],
  [21, "twenty_first"],
  [22, "twenty_second"],
  [23, "twenty_third"],
  [24, "twenty_fourth"],
  [25, "twenty_fifth"],
  [26, "twenty_sixth"],
  [27, "twenty_seventh"],
]);

function getAmendmentsDoc(number) {
  const label = `amendment-${number}`;
  const urlKey = `${ordinalNumbers.get(number)}_amendment_url`
  const baseline = `./data/amendments/amendment-${number}.json`

  return ({
    label,
    url: config[urlKey],
    type: "amendment",
    baseline
  })
}

test.describe("Patriotic Diff™ vs baseline for Amendments", () => {

  const docs = Array.from({ length: 27 }, (_, i) => i + 1).map(number => getAmendmentsDoc(number));

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