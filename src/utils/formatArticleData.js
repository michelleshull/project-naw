export function formatArticleData(articleNumber, rawSections, sourceUrl) {
  return {
    article: articleNumber,
    lastScraped: new Date().toISOString(),
    sourceUrl,
    sections: rawSections.map((paragraphs, sectionIndex) => ({
      id: sectionIndex + 1,
      paragraphs: paragraphs.map((text, paragraphIndex) => ({
        id: paragraphIndex + 1,
        text
      }))
    }))
  };
}