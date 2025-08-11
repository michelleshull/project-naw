import fs from 'fs';
import path from 'path';

export function exportArticleMarkdown(articleData, outputDir) {
  const { article, sections } = articleData;

  let md = `# Article ${article}\n\n`;

  sections.forEach(section => {
    md += `## Section ${section.id}\n\n`;
    section.paragraphs.forEach(p => {
      md += `${p.text}\n\n`;
    });
  });

  const filePath = path.join(outputDir, `article-${article}.md`);
  fs.writeFileSync(filePath, md, 'utf8');
  console.log(`📄Article Markdown saved: ${filePath}`);
}
export function exportAmendmentMarkdown(amendmentData, outputDir) {
  const { amendment, sections } = amendmentData;

  let md = `# Amendment ${amendment}\n\n`;

  sections.forEach(section => {
    md += `## Section ${section.id}\n\n`;
    section.paragraphs.forEach(p => {
      md += `${p.text}\n\n`;
    });
  });

  const filePath = path.join(outputDir, `amendment-${amendment}.md`);
  fs.writeFileSync(filePath, md, 'utf8');
  console.log(`📄Amendment Markdown saved: ${filePath}`);
}