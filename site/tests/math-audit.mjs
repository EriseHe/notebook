import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { build, repoRoot } from '../build.mjs';
import { startServer } from '../server.mjs';
import { encodePath, visitAst } from '../content.mjs';
import { normalizeMath } from '../render.mjs';

const result = await build({ contentRoot: process.env.NOTEBOOK_CONTENT_ROOT, onProgress: console.log });
const formulas = new Map();
for (const page of result.context.pages) {
  visitAst(page.ast.blocks, (node) => {
    if (node.t !== 'Math') return;
    const display = node.c[0].t === 'DisplayMath';
    const tex = display ? normalizeMath(node.c[1]) : node.c[1];
    const key = `${display}:${tex}`;
    if (!formulas.has(key)) formulas.set(key, { tex, display, pages: [] });
    formulas.get(key).pages.push(page.rel);
  });
}
const preview = await startServer({ ...result, port: 0 });
const browser = await puppeteer.launch({
  executablePath:
    process.env.BROWSER_PATH ||
    (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined),
  headless: true,
  args: process.env.CI ? ['--no-sandbox'] : [],
});
try {
  const page = await browser.newPage();
  await page.goto(
    preview.url +
      encodePath('content/notes/理论/PDEs/Partial Differential Equations/2. Transport equation.html'),
    { waitUntil: 'networkidle0' },
  );
  await page.evaluate(() => window.MathJax.startup.promise);
  const entries = [...formulas.values()],
    issues = [];
  for (let start = 0; start < entries.length; start += 150) {
    const batch = entries.slice(start, start + 150);
    const errors = await page.evaluate(async (items) => {
      const errors = [];
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        try {
          MathJax.texReset();
          const output = await MathJax.tex2chtmlPromise(item.tex, { display: item.display });
          const error = output.querySelector('mjx-merror');
          if (error) errors.push({ index, message: error.getAttribute('data-mjx-error') });
        } catch (error) {
          errors.push({ index, message: error.message });
        }
      }
      return errors;
    }, batch);
    for (const error of errors) issues.push({ ...batch[error.index], message: error.message });
    if (start % 1500 === 0)
      console.log(`Math audit: ${Math.min(start + 150, entries.length)}/${entries.length} expressions.`);
  }
  await fs.mkdir(path.join(repoRoot, '.preview-artifacts'), { recursive: true });
  await fs.writeFile(
    path.join(repoRoot, '.preview-artifacts', 'math-audit.json'),
    JSON.stringify({ uniqueExpressions: entries.length, issues }, null, 2),
  );
  console.log(
    `Math audit: ${entries.length} unique expressions, ${issues.length} source/renderer issues. See .preview-artifacts/math-audit.json.`,
  );
} finally {
  await browser.close();
  await preview.close();
}
