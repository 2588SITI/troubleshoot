const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

async function extract() {
  const pdfPath = path.join(process.cwd(), 'public', 'assets', 'aistudio', 'CONVENTIONAL_TSD_af9c2421.pdf');
  console.log('Reading PDF from:', pdfPath);
  const dataBuffer = fs.readFileSync(pdfPath);
  const parser = new PDFParse({ data: dataBuffer });
  await parser.load();
  const textResult = await parser.getText();
  
  console.log('Extracted pages count:', textResult.pages.length);
  
  const pages = textResult.pages.map((p, idx) => {
    const rawText = p.text || '';
    return {
      page: idx + 1,
      text: rawText.trim(),
      charCount: rawText.trim().length,
      title: `Page ${idx + 1}`
    };
  });
  
  const jsonPath = path.join(process.cwd(), 'conventional_tsd_pages.json');
  fs.writeFileSync(jsonPath, JSON.stringify(pages, null, 2), 'utf8');
  console.log(`Saved ${pages.length} pages to ${jsonPath}`);
  
  const txtPath = path.join(process.cwd(), 'conventional_tsd_extracted.txt');
  const fullText = pages.map(p => `--- PAGE ${p.page} OF ${pages.length} ---\n${p.text}`).join('\n\n');
  fs.writeFileSync(txtPath, fullText, 'utf8');
  console.log(`Saved full text (${fullText.length} chars) to ${txtPath}`);
}

extract().catch(err => {
  console.error('Extraction failed:', err);
  process.exit(1);
});
