import { conventionalFaults } from '../src/dataConventional';

const results: any[] = [];
for (let i = 0; i < conventionalFaults.length; i++) {
  const f = conventionalFaults[i];
  const missingIndices: number[] = [];
  const missingLines: string[] = [];

  f.actions.forEach((a, idx) => {
    // If it's a section header like 【...】
    if (a.startsWith('【')) return;
    
    // Check if line contains English translation
    const hasDoubleParenEn = /\(\([A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>\?\!\*\$]+\)\)/.test(a);
    const hasEnglishWords = /[a-zA-Z]{3,}\s+[a-zA-Z]{3,}\s+[a-zA-Z]{3,}/.test(a);
    const startsWithEn = /^[A-Za-z0-9\s,.\/–—\-:;'"&%@#\+=\<\>]{10,}/.test(a);

    if (!hasDoubleParenEn && !hasEnglishWords && !startsWithEn) {
      missingIndices.push(idx);
      missingLines.push(a);
    }
  });

  if (missingLines.length > 0) {
    results.push({
      index: i,
      id: f.id,
      title: f.message.split('\n')[0],
      missingCount: missingLines.length,
      totalActions: f.actions.length,
      missingLines
    });
  }
}

console.log(`Total faults needing English additions: ${results.length}`);
results.forEach(r => {
  console.log(`\n=== [${r.index}] ${r.id}: ${r.title} (${r.missingCount}/${r.totalActions}) ===`);
  r.missingLines.slice(0, 3).forEach((line: string) => console.log('  - ' + line));
});
