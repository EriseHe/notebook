#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIRS = [
  path.join(ROOT_DIR, 'content', 'notes'),
  path.join(ROOT_DIR, 'content', 'posts')
];
const OUTPUT_DIR = path.join(ROOT_DIR, 'static', 'tikz');
const EXTENSIONS = new Set(['.qmd', '.md']);

function* walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      yield* walk(full);
      continue;
    }
    if (item.isFile() && EXTENSIONS.has(path.extname(item.name).toLowerCase())) {
      yield full;
    }
  }
}

function extractTikzBlocks(markdown) {
  const blocks = [];
  const regex = /```tikz\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(markdown))) {
    blocks.push(match[1]);
  }
  return blocks;
}

async function renderTikzToSvg(code) {
  const html = `<!doctype html><html><head>
  <meta charset="utf-8"/>
  <script src="https://tikzjax.com/v1/tikzjax.js"></script>
  </head><body>
  <script type="text/tikz">\\begin{document}\n${code}\n\\end{document}</script>
  </body></html>`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => {
    const svg = document.querySelector('svg');
    return svg && svg.outerHTML.includes('<svg');
  });
  const svg = await page.$eval('svg', el => el.outerHTML);
  await browser.close();
  return svg;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  const summary = {};

  for (const base of CONTENT_DIRS) {
    if (!fs.existsSync(base)) continue;
    for (const filePath of walk(base)) {
      const source = fs.readFileSync(filePath, 'utf8');
      const blocks = extractTikzBlocks(source);
      if (blocks.length === 0) continue;

      const relPath = path.relative(ROOT_DIR, filePath);
      const key = relPath.replace(/[\\/]/g, '_').replace(/\.(qmd|md)$/i, '');
      summary[relPath] = [];

      for (const block of blocks) {
        const hash = crypto.createHash('sha1').update(block).digest('hex');
        const filename = `${hash}.svg`;
        const outputPath = path.join(OUTPUT_DIR, filename);
        if (!fs.existsSync(outputPath)) {
          const svg = await renderTikzToSvg(block);
          fs.writeFileSync(outputPath, svg, 'utf8');
        }
        summary[relPath].push(`/tikz/${filename}`);
      }
    }
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(summary, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
