import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { load } from 'cheerio';
import config from '../config.mjs';
import { catalog, frontmatter, headingNumbers, resolveTarget, targetHref, within } from '../content.mjs';
import { stripComments, parsePage, renderPage, normalizeMath } from '../render.mjs';
import { findPandoc } from '../setup.mjs';
import { repoRoot, normalizeBasePath } from '../build.mjs';
import { startServer } from '../server.mjs';

test('frontmatter is separate, optional and not rewritten', () => {
  assert.deepEqual(frontmatter('## A\nText'), { meta: {}, body: '## A\nText' });
  assert.deepEqual(frontmatter('\uFEFF---\r\ntitle: Test\r\n---\r\n## A'), {
    meta: { title: 'Test' },
    body: '## A',
  });
  assert.throws(() => frontmatter('---\n[bad\n---\nText'), /Invalid YAML/);
});

test('relative heading numbering starts at 1 regardless of Markdown level', () => {
  const headings = [
    { level: 2, text: 'First' },
    { level: 4, text: 'Nested' },
    { level: 2, text: 'Second' },
  ];
  assert.deepEqual(
    headingNumbers(headings, 'Untitled.md').map((h) => h.display),
    ['1 First', '1.1 Nested', '2 Second'],
  );
  assert.deepEqual(
    headingNumbers(headings, '3. Heat Equation.md').map((h) => h.display),
    ['3.1 First', '3.1.1 Nested', '3.2 Second'],
  );
  assert.deepEqual(
    headingNumbers(
      [
        { level: 2, text: '3.7 Existing' },
        { level: 2, text: 'Next' },
      ],
      '3. Heat.md',
    ).map((h) => h.display),
    ['3.7 Existing', '3.8 Next'],
  );
  assert.deepEqual(
    headingNumbers(
      [
        { level: 2, text: 'One' },
        { level: 1, text: 'Two' },
        { level: 2, text: 'Three' },
      ],
      'N.md',
    ).map((h) => h.number),
    ['1', '2', '2.1'],
  );
});

test('Obsidian comments are stripped but code and math remain verbatim', () => {
  const body =
    'visible %% hidden %% text\n```js\nconst n = "%% code %%";\n```\n`%% inline %%` $x%%y$ \\(a%%b\\)';
  assert.equal(stripComments(body), body.replace('%% hidden %%', ''));
});

test('base paths cannot be schemes or traversal', () => {
  assert.equal(normalizeBasePath('/'), '/');
  assert.equal(normalizeBasePath('/notebook'), '/notebook/');
  for (const bad of ['https://host/', '//host/', '/../notes/', '/note?x=1'])
    assert.throws(() => normalizeBasePath(bad));
});

test('Obsidian aligned tags render in MathJax without changing mathematical content', () => {
  assert.equal(normalizeMath('x^2'), 'x^2');
  assert.equal(
    normalizeMath('\\begin{aligned}a&=b\\tag{3.1}\\end{aligned}'),
    '\\begin{aligned}a&=b\\end{aligned}\\tag{3.1}',
  );
  assert.equal(
    normalizeMath('\\begin{aligned}a&=b\\tag{\\text{A}}\\end{aligned}'),
    '\\begin{aligned}a&=b\\end{aligned}\\tag{\\text{A}}',
  );
  assert.equal(
    normalizeMath('\\begin{aligned}a&=b\\tag{1}\\\\c&=d\\tag{2}\\end{aligned}'),
    '\\begin{align*}a&=b\\tag{1}\\\\c&=d\\tag{2}\\end{align*}',
  );
});

test('links resolve Unicode notes, headings, blocks, assets and PDF page fragments', () => {
  const page = {
    rel: 'content/notes/理论/3. 热方程.md',
    route: 'content/notes/理论/3. 热方程.html',
    headings: [{ id: 'initial-data', text: 'Initial data', display: '3.1 Initial data' }],
  };
  const asset = { rel: 'content/notes/attachments/slide.pdf' };
  const context = {
    pages: [page],
    assets: [asset],
    dirs: new Map(),
    usedAssets: new Map(),
    basePath: '/notebook/',
  };
  const resolved = resolveTarget('3. 热方程#Initial data', page, context);
  assert.equal(resolved.page, page);
  assert.match(targetHref(resolved, context), /3\.%20%E7%83%AD%E6%96%B9%E7%A8%8B\.html#initial-data$/);
  assert.match(targetHref(resolveTarget('#^formula', page, context), context), /#formula$/);
  assert.match(
    targetHref(resolveTarget('slide.pdf?download=1#page=2', page, context), context),
    /slide\.pdf\?download=1#page=2$/,
  );
  assert.equal(context.usedAssets.size, 1);
  for (const target of ['javascript:alert(1)', 'file:///secret.md', '../../secret.md'])
    assert.equal(resolveTarget(target, page, context).missing, true);
});

test('real Pandoc pipeline preserves Obsidian semantics without touching sources', async (t) => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'notebook-reader-test-'));
  t.after(async () => {
    assert.ok(within(os.tmpdir(), temp) && path.basename(temp).startsWith('notebook-reader-test-'));
    await fs.rm(temp, { recursive: true, force: true });
  });
  const source = path.join(temp, 'content');
  const files = {
    'notes/理论/Course/3. Heat Equation.md':
      '---\ntitle: "3. Heat Equation"\n---\n## Initial data\n\n$x^2$ and ==highlight==.\n\n$$\nu_t=\\Delta u\n$$\n\n> [!theorem|3.1] Uniqueness\n> The body is here.\n\n> [!note]- A folded note\n> Inside.\n\n[[4. Next#Proof|the next proof]]\n\n![[figure.svg|120]]\n\n![[4. Next#Proof]]\n\n![[handout.pdf#page=2]]\n\nA block. ^my-block\n\n[[#^my-block|Return to block]]\n\n%%private comment%%\n\n| A | B |\n|---|---|\n| 1 | 2 |\n',
    'notes/理论/Course/4. Next.md': '## Proof\n\nEmbedded result $a=b$.\n\n![[3. Heat Equation]]\n',
    'notes/理论/Course/Draft.md': '---\ndraft: true\n---\nPrivate draft.',
    'notes/Clippings/Secret.md': 'Not published.',
    'notes/理论/Course/.obsidian/workspace.json': '{}',
    'notes/attachments/figure.svg': '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"></svg>',
    'notes/attachments/handout.pdf': '%PDF-1.4 test',
  };
  for (const [relative, body] of Object.entries(files)) {
    const file = path.join(source, relative);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, body);
  }
  const context = Object.assign(await catalog(config, temp, source), {
    repoRoot,
    cacheDir: path.join(temp, 'cache'),
    pandoc: await findPandoc(),
    basePath: '/notebook/',
  });
  assert.equal(context.pages.length, 2);
  assert.equal(context.assets.length, 2);
  for (const page of context.pages) await parsePage(page, context);
  for (const page of context.pages) await renderPage(page, context);
  const page = context.pages.find((p) => p.title === '3. Heat Equation');
  const $ = load(page.html);
  assert.equal($('h2').first().text(), '3.1 Initial data');
  assert.equal($('h2').first().attr('id'), 'initial-data');
  assert.equal($('mark').text(), 'highlight');
  assert.equal($('.math.display').length, 1);
  assert.match($('.math.inline').first().text(), /x\^2/);
  assert.match($('a.wikilink').first().attr('href'), /4\.%20Next\.html#proof$/);
  assert.equal($('img').attr('width'), '120');
  assert.match($('img').attr('src'), /content\/notes\/attachments\/figure.svg$/);
  assert.equal($('.theorem-badge').first().text(), 'Theorem 3.1');
  assert.match($('.theorem-content').first().text(), /The body is here/);
  assert.equal($('details[data-callout=note]').length, 1);
  assert.equal($('details[data-callout=note]').attr('open'), undefined);
  assert.match($('.note-embed').text(), /Embedded result/);
  assert.match($('object').attr('data'), /#page=2$/);
  assert.equal($('#my-block').text().trim(), 'A block.');
  assert.ok(!$.text().includes('private comment'));
  assert.equal($('.table-scroll table').length, 1);
  assert.ok(context.warnings.some((w) => w.reason === 'cyclic or over-deep embed'));
  assert.equal(context.usedAssets.size, 2);
  for (const [relative, body] of Object.entries(files))
    assert.equal(await fs.readFile(path.join(source, relative), 'utf8'), body);
});

test('preview server serves encoded deep links, correct MIME, 404, and prevents source escape', async (t) => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'notebook-reader-server-'));
  t.after(async () => {
    assert.ok(within(os.tmpdir(), temp) && path.basename(temp).startsWith('notebook-reader-server-'));
    await fs.rm(temp, { recursive: true, force: true });
  });
  await fs.writeFile(path.join(temp, 'index.html'), '<h1>Notes</h1>');
  await fs.writeFile(path.join(temp, '3. 热.md.html'), '<p>Unicode</p>');
  await fs.writeFile(path.join(temp, '404.html'), 'Missing');
  const server = await startServer({ outputDir: temp, port: 0 });
  t.after(() => server.close());
  assert.equal((await fetch(server.url)).status, 200);
  const page = await fetch(server.url + encodeURIComponent('3. 热.md.html'));
  assert.match(page.headers.get('content-type'), /text\/html/);
  assert.equal(await page.text(), '<p>Unicode</p>');
  assert.equal((await fetch(server.url + 'missing.html')).status, 404);
  assert.equal((await fetch(server.url + '.obsidian/workspace.json')).status, 403);
  assert.equal((await fetch(server.url + '%2e%2e%2fprivate.txt')).status, 403);
  assert.equal((await fetch(server.url, { method: 'POST' })).status, 405);
});
