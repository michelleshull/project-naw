export class AmendmentPage {
  constructor(page) {
    this.page = page;
  }

 async scrape() {
  const sections = await this.page.$$eval('.constitution-body', sectionEls =>
    sectionEls
      .map(sectionEl => {
        const paragraphs = Array.from(sectionEl.querySelectorAll('p'))
          .map(p => p.textContent
            .replace(/\u00A0/g, ' ')  // remove non-breaking spaces
            .replace(/\s+/g, ' ')     // collapse multiple spaces/newlines
            .trim()
          )
          .filter(text => text.length > 0); // only real text survives
        return paragraphs.length > 0 ? paragraphs : null; // skip if empty
      })
      .filter(Boolean) // remove null (empty sections)
  );

  return sections; // Array of arrays of clean paragraph strings
  }
}