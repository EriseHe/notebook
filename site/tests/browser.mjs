import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { load } from 'cheerio';
import { build, repoRoot } from '../build.mjs';
import { startServer } from '../server.mjs';
import { encodePath, walkFiles, within } from '../content.mjs';
import { pageTemplate } from '../template.mjs';

const result = await build({ contentRoot: process.env.NOTEBOOK_CONTENT_ROOT, onProgress: console.log });
const preview = await startServer({ ...result, port: 0 });
const artifacts = path.join(repoRoot, '.preview-artifacts');
await fs.mkdir(artifacts, { recursive: true });
const candidates = [
  process.env.BROWSER_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
let executablePath;
for (const candidate of candidates.filter(Boolean)) {
  try {
    await fs.access(candidate);
    executablePath = candidate;
    break;
  } catch {}
}
const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: process.env.CI ? ['--no-sandbox'] : [],
});
const page = await browser.newPage();
const errors = [],
  failedLocal = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('response', (response) => {
  if (response.url().startsWith(preview.url) && response.status() >= 400)
    failedLocal.push(`${response.status()} ${response.url()}`);
});
const origin = new URL(preview.url).origin;
const pde = 'content/notes/理论/PDEs/Partial Differential Equations/2. Transport equation.html';
async function go(route, math = true) {
  await page.goto(preview.url + encodePath(route), { waitUntil: 'networkidle0' });
  if (math && (await page.$('#MathJax-script'))) await page.evaluate(() => window.MathJax.startup.promise);
  await page.evaluate(() => document.fonts.ready);
}

async function readingGeometry() {
  return page.evaluate(() => {
    const article = document.querySelector('.article').getBoundingClientRect();
    const viewport = document.querySelector('#reading-viewport');
    return {
      x: article.x,
      width: article.width,
      height: article.height,
      scrollTop: viewport.scrollTop,
      viewportWidth: viewport.clientWidth,
    };
  });
}

try {
  console.log('Checking all generated page and attachment links…');
  const htmlFiles = (await walkFiles(result.outputDir)).filter((file) => file.endsWith('.html'));
  const broken = [];
  for (const file of htmlFiles) {
    const $ = load(await fs.readFile(file, 'utf8'));
    for (const node of $('a[href],img[src],script[src],link[href],object[data]').toArray()) {
      const href = $(node).attr('href') || $(node).attr('src') || $(node).attr('data');
      if (!href?.startsWith(result.basePath)) continue;
      const target = path.resolve(
        result.outputDir,
        decodeURIComponent(new URL(href, origin).pathname.slice(result.basePath.length)),
      );
      if (!within(result.outputDir, target)) {
        broken.push(href);
        continue;
      }
      try {
        await fs.access(target);
      } catch {
        broken.push(`${path.relative(result.outputDir, file)} → ${href}`);
      }
    }
  }
  assert.deepEqual(broken, [], 'All emitted local links must point to generated files');
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await go(pde);
  assert.ok(await page.$('mjx-container'), 'Math is typeset, not raw TeX');
  assert.equal(await page.$$eval('mjx-merror', (nodes) => nodes.length), 0);
  assert.match(
    await page.$eval('.math-theorem[data-callout=danger]', (node) => node.textContent),
    /Wrong:[\s\S]*Correct:/,
  );
  const design = await page.evaluate(() => ({
    titleSize: getComputedStyle(document.querySelector('h1')).fontSize,
    bodySize: getComputedStyle(document.querySelector('.prose')).fontSize,
    font: getComputedStyle(document.querySelector('.prose')).fontFamily,
    leftWidth: document.querySelector('.notes-sidebar').getBoundingClientRect().width,
    rightWidth: document.querySelector('.outline-sidebar').getBoundingClientRect().width,
    articleWidth: document.querySelector('.article').getBoundingClientRect().width,
    sidebar: getComputedStyle(document.querySelector('.note-link.is-current')).color,
    breadcrumb: getComputedStyle(document.querySelector('.breadcrumb a')).color,
    inactiveOutline: getComputedStyle(document.querySelector('.outline-sidebar ol a:not(.is-active)')).color,
    activeOutline: getComputedStyle(document.querySelector('.outline-sidebar a.is-active')).color,
  }));
  assert.equal(design.titleSize, '28px');
  assert.equal(design.bodySize, '18px');
  assert.match(design.font, /TeX Gyre Termes/);
  assert.equal(design.leftWidth, 300);
  assert.equal(design.rightWidth, 300);
  assert.equal(await page.$eval('.note-link.is-current', (node) => getComputedStyle(node).paddingTop), '4px');
  assert.equal(
    await page.$eval('.note-link.is-current', (node) => getComputedStyle(node).paddingLeft),
    '8px',
  );
  const menuRow = await page.$eval('.note-link.is-current', (node) => ({
    height: node.getBoundingClientRect().height,
    minHeight: getComputedStyle(node).minHeight,
    lineHeight: getComputedStyle(node).lineHeight,
  }));
  assert.equal(menuRow.minHeight, '26px');
  assert.equal(menuRow.lineHeight, '18px');
  // Native UI fonts differ by OS; aligning the smaller number on the title's
  // baseline can add 1–2px without adding padding or making the menu loose.
  assert.ok(menuRow.height >= 26 && menuRow.height <= 28, 'Single-line menu rows stay compact');
  assert.equal(await page.$eval('.tree-children', (node) => getComputedStyle(node).paddingLeft), '10px');
  assert.equal(design.articleWidth, 720);
  assert.equal(design.sidebar, 'rgb(29, 29, 31)');
  assert.equal(design.inactiveOutline, 'rgb(110, 110, 115)');
  assert.equal(design.breadcrumb, 'rgb(0, 102, 204)');
  assert.equal(design.activeOutline, 'rgb(0, 102, 204)');
  assert.equal(await page.$eval('.outline-sidebar', (node) => getComputedStyle(node).borderLeftWidth), '0px');
  assert.equal(await page.$$eval('.outline-sidebar h2', (nodes) => nodes.length), 0);
  assert.deepEqual(await page.$$eval('.breadcrumb a', (nodes) => nodes.map((node) => node.textContent)), [
    '理论',
    'PDEs',
    'Partial Differential Equations',
  ]);
  assert.equal(
    await page.$eval('[data-sidebar-root]', (node) => node.dataset.sidebarRoot),
    'content/notes/理论/PDEs',
  );
  assert.equal(
    await page.$$eval(
      '.notes-sidebar [data-folder="content/notes/理论"], .notes-sidebar [data-folder="content/notes/计算"]',
      (nodes) => nodes.length,
    ),
    0,
  );
  assert.deepEqual(await page.$$eval('.top-navigation a', (nodes) => nodes.map((node) => node.textContent)), [
    'Notes',
    'Posts',
    'Research',
  ]);
  await page.hover('.breadcrumb a');
  assert.equal(
    await page.$eval('.breadcrumb a:hover', (node) => getComputedStyle(node).textDecorationLine),
    'none',
  );
  assert.equal(
    await page.$eval('.reading-viewport', (node) => getComputedStyle(node, '::-webkit-scrollbar').width),
    '0px',
  );
  assert.equal(
    await page.$eval('.reading-viewport', (node) => getComputedStyle(node).scrollbarWidth),
    'none',
  );
  assert.equal(await page.$eval('.github-link', (node) => node.href), 'https://github.com/EriseHe/notebook');
  await page.screenshot({ path: path.join(artifacts, 'reader-desktop.png') });
  const initialMarker = await page.$eval('#outline-progress', (node) =>
    parseFloat(node.style.getPropertyValue('--outline-offset')),
  );
  await page.$eval('#reading-viewport', (node) =>
    node.scrollTo({ top: (node.scrollHeight - node.clientHeight) * 0.4, behavior: 'instant' }),
  );
  await page.waitForFunction(
    () => document.querySelector('#outline-progress').getAttribute('aria-valuenow') === '40',
  );
  assert.ok(
    await page.$eval(
      '#outline-progress',
      (node, initial) => parseFloat(node.style.getPropertyValue('--outline-offset')) > initial,
      initialMarker,
    ),
  );
  await page.screenshot({ path: path.join(artifacts, 'reader-progress.png') });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  assert.equal(
    await page.$eval('.outline-marker', (node) => getComputedStyle(node).transitionDuration),
    '0s',
  );
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.$eval('#reading-viewport', (node) => node.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForFunction(
    () => document.querySelector('#outline-progress').getAttribute('aria-valuenow') === '0',
  );
  await page.click('#outline-fold');
  assert.equal(await page.$eval('#outline-items', (node) => node.hidden), true);
  assert.equal(await page.$eval('#outline-progress', (node) => node.hidden), true);
  await page.click('#outline-fold');

  const outlineTarget = await page.$$eval('.outline-sidebar ol a', (links) =>
    links.at(-1).getAttribute('href'),
  );
  await page.evaluate(() => document.querySelector('.outline-sidebar ol li:last-child a').click());
  await page.waitForFunction(
    (hash) => document.querySelector('.outline-sidebar a.is-active')?.getAttribute('href') === hash,
    {},
    outlineTarget,
  );
  await page.$eval('#reading-viewport', (node) => {
    node.style.scrollBehavior = 'auto';
    node.scrollTop = node.scrollHeight;
  });
  await page.waitForFunction(
    () => document.querySelector('#outline-progress').getAttribute('aria-valuenow') === '100',
  );
  await page.screenshot({ path: path.join(artifacts, 'reader-footer.png') });
  assert.equal(await page.$$eval('.page-navigation a[rel=next]', (nodes) => nodes.length), 0);
  assert.match(
    await page.$eval('.page-navigation a[rel=prev]', (node) => decodeURIComponent(node.pathname)),
    /1\. Notation and Classification\.html$/,
  );

  const fixedReadingGeometry = await readingGeometry();
  // Both open → left hidden → both hidden → right hidden → both open.
  for (const toggle of ['notes', 'outline', 'notes', 'outline']) {
    await page.click(`#${toggle}-toggle`);
    assert.deepEqual(
      await readingGeometry(),
      fixedReadingGeometry,
      'Sidebar toggles must not move, resize, reflow, or scroll the article',
    );
  }
  await page.click('#notes-toggle');
  assert.equal(await page.$eval('body', (node) => node.dataset.notesOpen), 'false');
  assert.equal(await page.$eval('body', (node) => node.dataset.outlineOpen), 'true');
  await page.reload({ waitUntil: 'networkidle0' });
  assert.equal(await page.$eval('body', (node) => node.dataset.notesOpen), 'false');
  await page.click('#notes-toggle');
  await page.click('#outline-toggle');
  assert.equal(await page.$eval('body', (node) => node.dataset.outlineOpen), 'false');
  assert.equal(await page.$eval('body', (node) => node.dataset.notesOpen), 'true');
  await page.click('#outline-toggle');
  await page.click('#appearance-toggle');
  await page.click('[data-font="stix"]');
  assert.match(await page.$eval('.prose', (node) => getComputedStyle(node).fontFamily), /^"STIX Two Text"/);
  await page.click('[data-font="termes"]');
  await page.click('[data-size="20"]');
  assert.equal(await page.$eval('.prose', (node) => getComputedStyle(node).fontSize), '20px');
  await page.click('[data-size="18"]');
  await page.keyboard.press('Escape');
  await page.keyboard.down('Control');
  await page.keyboard.press('k');
  await page.keyboard.up('Control');
  await page.type('#search-input', 'characteristic');
  await page.waitForSelector('#search-results a');
  assert.ok(
    await page.$$eval('#search-results a', (links) =>
      links.some((link) => link.textContent.includes('Transport equation')),
    ),
  );
  await page.screenshot({ path: path.join(artifacts, 'reader-search.png') });
  await page.keyboard.press('Escape');
  await page.$eval('#reading-viewport', (node) => node.scrollTo({ top: 0, behavior: 'instant' }));
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }),
    page.click('.breadcrumb a:last-of-type'),
  ]).catch(async (error) => {
    console.log(
      await page.evaluate(() => ({
        url: location.href,
        dialogs: [...document.querySelectorAll('dialog')].map((n) => [n.id, n.open]),
        link: document.querySelector('.breadcrumb a')?.outerHTML,
        scroll: document.querySelector('#reading-viewport')?.scrollTop,
      })),
    );
    await page.screenshot({ path: path.join(artifacts, 'navigation-debug.png') });
    throw error;
  });
  assert.equal(await page.$eval('body', (node) => node.dataset.layout), 'directory');
  assert.equal(
    await page.$eval('.directory-list a', (node) => getComputedStyle(node).color),
    'rgb(29, 29, 31)',
  );
  await go('index.html', false);
  assert.equal(await page.$eval('.brand', (node) => node.textContent), 'E.H. Notebook');
  assert.equal(await page.$eval('h1', (node) => node.textContent), 'E.H. Notebook');
  assert.match(await page.$eval('#article-body', (node) => node.textContent), /私人笔记/);
  assert.ok(!(await page.$eval('#article-body', (node) => node.textContent.includes('README'))));
  assert.deepEqual(
    await page.$$eval('.home-navigation a > span:first-child', (nodes) =>
      nodes.map((node) => node.textContent),
    ),
    ['Notes', 'Posts', 'Research'],
  );
  await page.hover('.directory-list a');
  assert.equal(await page.$eval('.directory-list a', (node) => getComputedStyle(node).paddingLeft), '16px');
  assert.equal(await page.$eval('.directory-list a', (node) => getComputedStyle(node).paddingRight), '16px');
  await page.screenshot({ path: path.join(artifacts, 'reader-home.png') });
  const homeLinks = await page.$$eval('.home-navigation a', (nodes) => nodes.map((node) => node.href));
  for (const href of homeLinks) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.$eval(`.home-navigation a[href="${new URL(href).pathname}"]`, (node) => node.click()),
    ]);
    assert.equal(page.url(), href);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }), page.click('.brand')]);
    assert.equal(page.url(), preview.url, 'The brand always returns to the authored root page');
    assert.ok(await page.$('.home-navigation'));
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('.top-navigation a:first-child'),
  ]);
  assert.equal(await page.$eval('body', (node) => node.dataset.layout), 'directory');
  assert.equal(await page.$eval('body', (node) => node.dataset.hasNotes), 'false');
  assert.deepEqual(
    await page.$$eval('.directory-section h2', (nodes) =>
      nodes.map((node) => node.textContent.replace('›', '')),
    ),
    ['理论', '计算'],
  );
  assert.ok(
    await page.$('[data-directory-section="content/notes/理论"] .directory-list a[href*="PDEs/index.html"]'),
  );
  await page.screenshot({ path: path.join(artifacts, 'reader-notes-sections.png') });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('[data-directory-section="content/notes/理论"] h2 a'),
  ]);
  assert.equal(await page.$eval('body', (node) => node.dataset.layout), 'directory');
  assert.equal(await page.$eval('body', (node) => node.dataset.hasNotes), 'false');
  assert.equal(await page.$$eval('.breadcrumb a', (nodes) => nodes.length), 0);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('.directory-list a[href*="PDEs/index.html"]'),
  ]);
  assert.equal(await page.$eval('body', (node) => node.dataset.layout), 'reader');
  assert.equal(await page.$eval('.sidebar-root', (node) => node.textContent), 'PDEs');
  assert.match(await page.$eval('#article-body', (node) => node.textContent), /偏微分方程/);
  assert.deepEqual(await page.$$eval('.breadcrumb a', (nodes) => nodes.map((node) => node.textContent)), [
    '理论',
  ]);
  await page.screenshot({ path: path.join(artifacts, 'reader-pde-root.png') });

  console.log('Checking actual folder-note pages, section navigation, and uncompressed reading width…');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('.top-navigation a:last-child'),
  ]);
  assert.equal(await page.$eval('body', (node) => node.dataset.layout), 'reader');
  assert.equal(await page.$eval('.top-navigation a[aria-current]', (node) => node.textContent), 'Research');
  assert.equal(await page.$$eval('#article-body > .directory-list', (nodes) => nodes.length), 0);
  assert.match(await page.$eval('#article-body', (node) => node.textContent), /Research/);
  const folderPath = 'content/notes/理论/PDEs/数值PDEs/3. Advection-Diffusion';
  await go(folderPath + '/index.html');
  assert.equal(await page.$eval('body', (node) => node.dataset.layout), 'reader');
  assert.ok(await page.$eval('#article-body', (node) => node.textContent.length > 300));
  assert.match(
    await page.$eval(`[data-folder="${folderPath}"] > .folder-row > a`, (node) =>
      decodeURIComponent(node.pathname),
    ),
    /3\. Advection-Diffusion\/3\. Advection-Diffusion\.html$/,
  );
  await page.screenshot({ path: path.join(artifacts, 'reader-folder-note.png') });
  const pureFolder = '[data-folder="content/notes/理论/PDEs/Partial Differential Equations"]';
  const before = page.url();
  await page.click(pureFolder + ' > .folder-row > .folder-label');
  assert.equal(page.url(), before, 'A pure folder folds, it does not open an invented Markdown document');
  assert.equal(await page.$eval(pureFolder + ' > .tree-children', (node) => node.hidden), false);
  await page.click(pureFolder + ' > .folder-row > .folder-label');
  assert.equal(await page.$eval(pureFolder + ' > .tree-children', (node) => node.hidden), true);
  await go('content/notes/理论/PDEs/经典二阶PDEs/Heat Equation/index.html');
  assert.equal(await page.$eval('body', (node) => node.dataset.layout), 'reader');
  assert.ok(await page.$eval('#article-body', (node) => node.textContent.length > 500));
  await go('content/notes/计算/量子力学讲义/波函数存在于在Hilbert空间中.html');
  assert.equal(await page.$$eval('mjx-merror', (nodes) => nodes.length), 0);
  await page.screenshot({ path: path.join(artifacts, 'reader-quantum.png') });
  await page.$eval('#reading-viewport', (node) => node.scrollTo({ top: 120, behavior: 'instant' }));
  await page.waitForFunction(() =>
    document.querySelector('#reading-viewport').classList.contains('is-scrolling'),
  );
  await page.waitForFunction(
    () => !document.querySelector('#reading-viewport').classList.contains('is-scrolling'),
  );
  assert.equal(
    await page.$eval(
      '#reading-viewport',
      (node) => getComputedStyle(node, '::-webkit-scrollbar-thumb').backgroundColor,
    ),
    'rgba(0, 0, 0, 0)',
  );
  await page.setViewport({ width: 1440, height: 700 });
  await page.$eval('#reading-viewport', (node) =>
    node.scrollTo({ top: node.scrollHeight, behavior: 'instant' }),
  );
  await page.waitForFunction(
    () => document.querySelector('#outline-progress').getAttribute('aria-valuenow') === '100',
  );
  await page.waitForFunction(() => {
    const marker = document.querySelector('.outline-marker').getBoundingClientRect();
    const toc = document.querySelector('#outline-sidebar').getBoundingClientRect();
    const active = document.querySelector('#outline-items a.is-active').getBoundingClientRect();
    return (
      marker.top >= toc.top &&
      marker.bottom <= toc.bottom &&
      Math.abs(marker.top + marker.height / 2 - active.top - active.height / 2) < 1
    );
  });
  assert.ok(
    await page.$eval('#outline-sidebar', (node) => node.scrollTop > 0),
    'Long outlines follow reading progress without moving the body',
  );
  await page.screenshot({ path: path.join(artifacts, 'reader-long-toc-progress.png') });
  await page.setViewport({ width: 1400, height: 1000 });
  assert.equal(await page.$eval('.article', (node) => node.getBoundingClientRect().width), 720);
  await page.setViewport({ width: 1366, height: 1000 });
  assert.equal(await page.$eval('.article', (node) => node.getBoundingClientRect().width), 720);
  assert.equal(await page.$eval('body', (node) => node.dataset.notesOpen), 'false');

  console.log('Checking mobile navigation and long mathematical pages…');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await go(pde);
  assert.equal(await page.$eval('body', (node) => node.dataset.notesOpen), 'false');
  assert.equal(await page.$eval('body', (node) => node.dataset.outlineOpen), 'false');
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.ok(await page.$eval('#reading-viewport', (node) => node.scrollWidth <= node.clientWidth));
  assert.equal(await page.$eval('.toolbar', (node) => node.getBoundingClientRect().height), 96);
  assert.ok(
    await page.$eval(
      '.top-navigation',
      (node) =>
        node.getBoundingClientRect().bottom <=
        document.querySelector('.toolbar').getBoundingClientRect().bottom,
    ),
  );
  await page.screenshot({ path: path.join(artifacts, 'reader-mobile.png') });
  const mobileReadingGeometry = await readingGeometry();
  await page.click('#outline-toggle');
  assert.deepEqual(
    await readingGeometry(),
    mobileReadingGeometry,
    'TOC drawer overlays the unchanged article',
  );
  assert.equal(await page.$eval('body', (node) => node.dataset.outlineOpen), 'true');
  await page.screenshot({ path: path.join(artifacts, 'reader-mobile-outline.png') });
  await page.click('#notes-toggle');
  assert.deepEqual(
    await readingGeometry(),
    mobileReadingGeometry,
    'Menu drawer overlays the unchanged article',
  );
  assert.equal(await page.$eval('body', (node) => node.dataset.outlineOpen), 'false');
  assert.equal(await page.$eval('body', (node) => node.dataset.notesOpen), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('body', (node) => node.dataset.notesOpen), 'false');
  const samples = [
    'content/notes/理论/PDEs/经典二阶PDEs/Heat Equation/The Fourier Series.html',
    'content/notes/理论/广义相对论/Ch. 10 — Particle Orbits.html',
  ];
  const mathIssues = [];
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  for (const route of samples) {
    await go(route);
    const issues = await page.$$eval('mjx-merror', (nodes) =>
      nodes.map((node) => ({ message: node.getAttribute('data-mjx-error'), tex: node.textContent })),
    );
    if (issues.length) mathIssues.push({ route, issues });
    const localImages = await page.$$eval('.prose img', (nodes) =>
      nodes
        .filter((node) => node.src.startsWith(location.origin))
        .map((node) => ({ src: node.src, okay: node.complete && node.naturalWidth > 0 })),
    );
    // Bring lazy-loaded images into the viewport before checking their intrinsic size.
    for (const image of await page.$$('.prose img')) {
      await image.scrollIntoView();
    }
    await page.waitForFunction(() =>
      [...document.querySelectorAll('.prose img')]
        .filter((node) => node.src.startsWith(location.origin))
        .every((node) => node.complete && node.naturalWidth > 0),
    );
    assert.ok(await page.$eval('#reading-viewport', (node) => node.scrollWidth <= node.clientWidth));
    console.log(
      `${route}: ${await page.$$eval('mjx-container', (nodes) => nodes.length)} formulas, ${localImages.length} local images.`,
    );
  }
  await go('about.html', false);
  await page.waitForFunction((home) => location.href === home, {}, preview.url);
  assert.equal(await page.$eval('h1', (node) => node.textContent), 'E.H. Notebook');

  console.log('Checking one centered layout across every panel-availability combination…');
  const layouts = [
    { route: pde, notes: 'true', outline: 'true' },
    { route: 'outline-only fixture', notes: 'false', outline: 'true', fixture: true },
    { route: 'content/notes/理论/PDEs/index.html', notes: 'true', outline: 'false' },
    { route: 'content/notes/index.html', notes: 'false', outline: 'false' },
    { route: 'index.html', notes: 'false', outline: 'false' },
  ];
  for (const width of [1440, 2560, 1366, 390]) {
    await page.setViewport({ width, height: 1000 });
    let sharedGeometry;
    for (const layout of layouts) {
      if (layout.fixture) {
        await page.setContent(
          pageTemplate(
            {
              rel: 'layout-fixture.md',
              title: 'Layout test',
              meta: {},
              html: '<h2 id="fixture-heading">A heading</h2><p>A document with an outline and no menu.</p>',
              headings: [{ id: 'fixture-heading', display: 'A heading', depth: 0 }],
            },
            result.context,
          ),
          { waitUntil: 'load' },
        );
        await page.evaluate(() => document.fonts.ready);
      } else await go(layout.route);
      assert.deepEqual(
        await page.$eval('body', (node) => ({
          notes: node.dataset.hasNotes,
          outline: node.dataset.hasOutline,
        })),
        { notes: layout.notes, outline: layout.outline },
      );
      const { x, width: articleWidth, viewportWidth } = await readingGeometry();
      const geometry = { x, width: articleWidth, viewportWidth };
      assert.ok(
        Math.abs(x + articleWidth / 2 - width / 2) < 0.5,
        `${layout.route} must be centered in a ${width}px window`,
      );
      assert.equal(articleWidth, width >= 768 ? 720 : width - 48);
      sharedGeometry ||= geometry;
      assert.deepEqual(
        geometry,
        sharedGeometry,
        'Absent panels must use exactly the same reading frame as present panels',
      );
      if (width === 1440 && layout.fixture) {
        await page.click('#outline-toggle');
        const hidden = await readingGeometry();
        assert.equal(hidden.x, x);
        assert.equal(hidden.width, articleWidth);
        await page.click('#outline-toggle');
      }
      if (width === 390 && layout.route === 'index.html')
        await page.screenshot({ path: path.join(artifacts, 'reader-home-mobile.png') });
    }
  }
  await fs.writeFile(
    path.join(artifacts, 'browser-report.json'),
    JSON.stringify(
      {
        design,
        mathIssues,
        errors,
        failedLocal,
        checkedLinks: htmlFiles.length,
        sourceReport: result.report,
      },
      null,
      2,
    ),
  );
  assert.deepEqual(errors, [], 'No browser runtime errors');
  assert.deepEqual(failedLocal, [], 'No missing local resources');
  assert.deepEqual(mathIssues, [], 'Representative notes must have no math errors');
  console.log(`Browser checks passed; ${htmlFiles.length} pages audited. Screenshots: .preview-artifacts/`);
} catch (error) {
  await page.screenshot({ path: path.join(artifacts, 'browser-failure.png') }).catch(() => {});
  throw error;
} finally {
  await browser.close();
  await preview.close();
}
