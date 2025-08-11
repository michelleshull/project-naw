export function normalizeText(s) {
  return (s ?? "")
    .replace(/\u00A0/g, " ")   // NBSP → space
    .replace(/\s+/g, " ")      // collapse runs
    .trim();
}