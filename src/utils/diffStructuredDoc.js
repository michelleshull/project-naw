import { normalizeText } from "./normalizeText.js";

/**
 * a & b are the nested JSON like:
 * { article|amendment, sections: [ {id, paragraphs: [{id, text}]} ] }
 */
export function diffStructuredDoc(a, b) {
  const result = { added: [], removed: [], modified: [] };

  const byId = (arr) => Object.fromEntries(arr.map(x => [String(x.id), x]));
  const aSecs = byId(a.sections ?? []);
  const bSecs = byId(b.sections ?? []);

  // Sections removed or modified
  for (const sid of Object.keys(aSecs)) {
    const aS = aSecs[sid];
    const bS = bSecs[sid];
    if (!bS) {
      result.removed.push({ level: "section", id: sid });
      continue;
    }
    // Paragraphs
    const aPars = byId(aS.paragraphs ?? []);
    const bPars = byId(bS.paragraphs ?? []);
    for (const pid of Object.keys(aPars)) {
      const aP = aPars[pid];
      const bP = bPars[pid];
      if (!bP) {
        result.removed.push({ level: "paragraph", sectionId: sid, id: pid });
        continue;
      }
      const A = normalizeText(aP.text);
      const B = normalizeText(bP.text);
      if (A !== B) {
        result.modified.push({
          level: "paragraph",
          sectionId: sid,
          id: pid,
          before: aP.text,
          after: bP.text
        });
      }
    }
  }

  // Sections/paragraphs added
  for (const sid of Object.keys(bSecs)) {
    const aS = aSecs[sid];
    const bS = bSecs[sid];
    if (!aS) {
      result.added.push({ level: "section", id: sid });
      continue;
    }
    const aPars = byId(aS.paragraphs ?? []);
    const bPars = byId(bS.paragraphs ?? []);
    for (const pid of Object.keys(bPars)) {
      if (!aPars[pid]) {
        result.added.push({ level: "paragraph", sectionId: sid, id: pid, text: bPars[pid].text });
      }
    }
  }

  return result;
}