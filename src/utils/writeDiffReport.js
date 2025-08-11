import fs from "fs";
import path from "path";
import { normalizeText } from "./normalizeText.js";

export function writeDiffReport({ docLabel, baselinePath, reportDir = "./data/diffs", diff }) {
  fs.mkdirSync(reportDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[-:]/g, "").slice(0,15); // YYYYMMDDTHHMM
  const file = path.join(reportDir, `${ts}-${docLabel}-diff.md`);

  const lines = [];
  lines.push(`# Diff Report: ${docLabel}`);
  lines.push("");
  lines.push(`**Baseline:** \`${baselinePath}\``);
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push("");
  const summary = [
    `Added: ${diff.added.length}`,
    `Removed: ${diff.removed.length}`,
    `Modified: ${diff.modified.length}`
  ].join(" • ");
  lines.push(`**Summary:** ${summary}`);
  lines.push("");

  if (diff.added.length) {
    lines.push("## ➕ Added");
    for (const item of diff.added) {
      if (item.level === "section") {
        lines.push(`- Section ${item.id} (entire section added)`);
      } else {
        lines.push(`- Section ${item.sectionId}, Paragraph ${item.id} (added)`);
        if (item.text) lines.push(`  - ${normalizeText(item.text)}`);
      }
    }
    lines.push("");
  }

  if (diff.removed.length) {
    lines.push("## ➖ Removed");
    for (const item of diff.removed) {
      if (item.level === "section") {
        lines.push(`- Section ${item.id} (entire section removed)`);
      } else {
        lines.push(`- Section ${item.sectionId}, Paragraph ${item.id} (removed)`);
      }
    }
    lines.push("");
  }

  if (diff.modified.length) {
    lines.push("## ✏️ Modified");
    for (const m of diff.modified) {
      lines.push(`- Section ${m.sectionId}, Paragraph ${m.id}`);
      lines.push(`  - **Before:** ${normalizeText(m.before)}`);
      lines.push(`  - **After:**  ${normalizeText(m.after)}`);
    }
    lines.push("");
  }

  fs.writeFileSync(file, lines.join("\n"), "utf8");
  console.log(`📝 Diff report written: ${file}`);
  return file;
}