#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const CONTENT_DIR = path.resolve(__dirname, '..', 'content.en');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'static', 'tikz');

function* walk(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) yield* walk(p);
    else if (f.isFile() && f.name.endsWith('.md')) yield p;
  }
}

function extractTikzBlocks(markdown) {
  const blocks = [];
  const regex = /```tikz\n([\s\S]*?)```/g;
  let m;
  while ((m = regex.exec(markdown))) {
    blocks.push(m[1]);
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
  // Wait for TikZJax to render an SVG
  await page.waitForFunction(() => document.querySelector('svg') && document.querySelector('svg').outerHTML.includes('<svg'));
  const svg = await page.$eval('svg', el => el.outerHTML);
  await browser.close();
  return svg;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const map = {}; // markdown file -> array of generated svg filenames

  for (const mdPath of walk(CONTENT_DIR)) {
    const md = fs.readFileSync(mdPath, 'utf8');
    const blocks = extractTikzBlocks(md);
    if (blocks.length === 0) continue;

    const rel = path.relative(CONTENT_DIR, mdPath).replace(/[\\/]/g, '_').replace(/\.md$/i, '');
    map[mdPath] = [];
    for (const block of blocks) {
      const hash = require('crypto').createHash('sha1').update(block).digest('hex');
      const outName = `${hash}.svg`;
      // Skip if already exists
      const outPath = path.join(OUTPUT_DIR, outName);
      if (fs.existsSync(outPath)) { map[mdPath] = map[mdPath].concat(`/tikz/${outName}`); continue; }
      const svg = await renderTikzToSvg(block);
      fs.writeFileSync(path.join(OUTPUT_DIR, outName), svg, 'utf8');
      map[mdPath].push(`/tikz/${outName}`);
    }
  }

  // Write map for Hugo to use later if desired
  fs.writeFileSync(path.resolve(OUTPUT_DIR, 'index.json'), JSON.stringify(map, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


