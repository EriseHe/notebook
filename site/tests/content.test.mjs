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
import { pageTemplate } from '../template.mjs';

test('frontmatter is separate, optional and not rewritten', () => {
  assert.deepEqual(frontmatter('## A\nText'), { meta: {}, body: '## A\nText' });
  assert.deepEqual(frontmatter('\uFEFF---\r\ntitle: Test\r\n---\r\n## A'), {
    meta: { title: 'Test' },
    body: '## A',
  });
  assert.throws(() => frontmatter('---\n[bad\n---\nText'), /Invalid YAML/);
});

test('folder notes render as documents; only pure folders get directory pages and tree-only buttons', async (t) => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'notebook-folder-test-'));
  t.after(async () => {
    assert.ok(within(os.tmpdir(), temp) && path.basename(temp).startsWith('notebook-folder-test-'));
    await fs.rm(temp, { recursive: true, force: true });
  });
  const fixtures = {
    'notes/理论/Pure/Child.md': 'A child document.',
    'notes/理论/Pure/index.md': '---\ntitle: Pure\n---\n',
    'notes/理论/Authored/Authored.md': '## Real content\n\nA genuine folder note.',
    'notes/理论/Authored/index.md': '---\ntitle: Authored\n---\n',
    'notes/理论/Authored/Second.md': 'Second note.',
    'notes/理论/Empty/Empty.md': '---\ntitle: Empty\n---\n',
    'notes/理论/Introduction/index.md': '## Introduction\n\nVisible index content.',
    'notes/理论/Introduction/Sub/One.md': 'Nested note.',
    'posts/First.md': 'A post.',
    'research/Project.md': 'Research.',
  };
  const source = path.join(temp, 'content');
  for (const [relative, body] of Object.entries(fixtures)) {
    const file = path.join(source, relative);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, body);
  }
  const context = Object.assign(await catalog(config, temp, source), config, {
    repoRoot,
    cacheDir: path.join(temp, 'cache'),
    pandoc: await findPandoc(),
  });
  for (const page of context.pages) await parsePage(page, context);
  for (const page of context.pages) await renderPage(page, context);
  assert.deepEqual(
    context.sections.map((section) => section.label),
    ['notes', 'posts', 'research'],
  );
  const authored = context.dirs.get('content/notes/理论/Authored');
  const pure = context.dirs.get('content/notes/理论/Pure');
  const intro = context.dirs.get('content/notes/理论/Introduction');
  const empty = context.dirs.get('content/notes/理论/Empty');
  assert.equal(pure.page, null);
  assert.equal(authored.page.rel, 'content/notes/理论/Authored/Authored.md');
  assert.deepEqual(
    authored.pages.map((page) => path.basename(page.rel)),
    ['Second.md'],
  );
  assert.equal(intro.page.rel, 'content/notes/理论/Introduction/index.md');
  assert.equal(empty.page.rel, 'content/notes/理论/Empty/Empty.md');
  const emptyHtml = load(pageTemplate(empty.page, context));
  assert.equal(emptyHtml('body').attr('data-layout'), 'reader');
  assert.match(emptyHtml('#article-body').text(), /This note is empty/);
  assert.match(
    targetHref(resolveTarget('Authored#Real content', authored.page, context), context),
    /Authored\/Authored.html#real-content$/,
  );
  const html = load(pageTemplate(authored.page, context));
  assert.equal(html('body').attr('data-layout'), 'reader');
  assert.match(html('#article-body').text(), /genuine folder note/);
  assert.equal(html('.directory-description').length, 0);
  assert.equal(html('[data-folder="content/notes/理论/Pure"] > .folder-row a').length, 0);
  assert.equal(html('[data-folder="content/notes/理论/Pure"] > .folder-row button').length, 1);
  assert.match(
    html('[data-folder="content/notes/理论/Authored"] > .folder-row a').attr('href'),
    /Authored\/Authored.html$/,
  );
  assert.equal(html('.notes-tree .folder-node .tree-children .file-node').length > 0, true);
  assert.deepEqual(
    html('.top-navigation a')
      .map((_, node) => html(node).text())
      .get(),
    ['Notes', 'Posts', 'Research'],
  );
  const introHtml = load(pageTemplate(intro.page, context));
  assert.match(introHtml('#article-body').text(), /Visible index content/);
  const pureHtml = load(
    pageTemplate(
      {
        directory: pure,
        rel: pure.rel + '/index.md',
        route: pure.route,
        title: pure.label,
        isDirectory: true,
      },
      context,
    ),
  );
  assert.equal(pureHtml('body').attr('data-layout'), 'directory');
  assert.match(pureHtml('#article-body').text(), /Child/);
  for (const [relative, body] of Object.entries(fixtures))
    assert.equal(await fs.readFile(path.join(source, relative), 'utf8'), body);
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

test('display_content defines configurable directory sections and scoped reading trees', async (t) => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'notebook-section-test-'));
  t.after(async () => {
    assert.ok(within(os.tmpdir(), temp) && path.basename(temp).startsWith('notebook-section-test-'));
    await fs.rm(temp, { recursive: true, force: true });
  });
  const source = path.join(temp, 'content');
  const fixtures = {
    'notes/index.md': 'The old landing-page text.',
    'notes/Alpha/index.md': 'An authored introduction replaced by a directory.',
    'notes/Alpha/Subject/Subject.md': '## Introduction\n\nA normal subject note.',
    'notes/Alpha/Subject/Chapter.md': '## A heading\n\nChapter text.',
    'notes/Alpha/Subject/Nested/More.md': 'A nested note.',
    'notes/Alpha/Subject/Group/Group.md': '---\ndisplay_content: false\n---\nHidden group introduction.',
    'notes/Alpha/Subject/Group/Deep/Item.md': 'Inside a nested directory section.',
    'notes/Beta/index.md': '---\ndisplay_content: false\n---\n',
    'notes/Beta/Computation/First.md': 'A computation note.',
    'notes/Gamma/index.md': '---\ndisplay_content: true\n---\nA restored normal Markdown page.',
    'notes/Gamma/First.md': 'A visible Gamma note.',
  };
  for (const [relative, body] of Object.entries(fixtures)) {
    const file = path.join(source, relative);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, body);
  }
  await fs.writeFile(
    path.join(temp, 'folders.yaml'),
    'notes:\n  display_content: false\nnotes/Alpha:\n  display_content: false\nnotes/Gamma:\n  display_content: false\n',
  );
  const settings = { ...config, publishRoots: ['notes'], folderSettings: 'folders.yaml' };
  const context = Object.assign(await catalog(settings, temp, source), settings, {
    repoRoot,
    cacheDir: path.join(temp, 'cache'),
    pandoc: await findPandoc(),
  });
  for (const page of context.pages) await parsePage(page, context);
  for (const page of context.pages) await renderPage(page, context);
  const dir = (relative) => context.dirs.get(`content/notes/${relative}`);
  const note = (relative) => context.pages.find((page) => page.rel === `content/notes/${relative}`);
  const landing = load(pageTemplate(note('index.md'), context));
  assert.equal(landing('body').attr('data-layout'), 'directory');
  assert.equal(landing('body').attr('data-has-notes'), 'false');
  assert.deepEqual(
    landing('.directory-section h2')
      .map((_, n) => landing(n).text().replace('›', ''))
      .get(),
    ['Alpha', 'Beta'],
  );
  assert.match(landing('[data-directory-section="content/notes/Alpha"]').text(), /Subject/);
  assert.match(landing('[data-directory-section="content/notes/Beta"]').text(), /Computation/);
  assert.ok(!landing('#article-body').text().includes('old landing-page text'));
  const alpha = load(pageTemplate(dir('Alpha').page, context));
  assert.equal(alpha('body').attr('data-layout'), 'directory');
  assert.equal(alpha('.notes-tree').length, 0);
  assert.equal(alpha('.breadcrumb').length, 0, 'Top-level tab names are not repeated in breadcrumbs');
  const chapter = load(pageTemplate(note('Alpha/Subject/Chapter.md'), context));
  assert.equal(chapter('[data-sidebar-root]').attr('data-sidebar-root'), 'content/notes/Alpha/Subject');
  assert.equal(chapter('.sidebar-root').text(), 'Subject');
  assert.equal(chapter('.notes-sidebar [data-folder="content/notes/Alpha"]').length, 0);
  assert.equal(chapter('.notes-sidebar [data-folder="content/notes/Alpha/Subject/Group"]').length, 0);
  assert.deepEqual(
    chapter('.breadcrumb a')
      .map((_, n) => chapter(n).text())
      .get(),
    ['Alpha', 'Subject'],
  );
  const deep = load(pageTemplate(note('Alpha/Subject/Group/Deep/Item.md'), context));
  assert.equal(
    deep('[data-sidebar-root]').attr('data-sidebar-root'),
    'content/notes/Alpha/Subject/Group/Deep',
  );
  const hiddenNote = load(pageTemplate(dir('Alpha/Subject/Group').page, context));
  assert.equal(hiddenNote('body').attr('data-layout'), 'directory');
  assert.ok(!hiddenNote('#article-body').text().includes('Hidden group introduction'));
  assert.match(
    targetHref(resolveTarget('Group', note('Alpha/Subject/Chapter.md'), context), context),
    /Group\/index.html$/,
  );
  assert.equal(dir('Gamma').displayContent, true, 'Explicit Obsidian properties override site defaults');
  const gamma = load(pageTemplate(dir('Gamma').page, context));
  assert.equal(gamma('body').attr('data-layout'), 'reader');
  assert.equal(gamma('.sidebar-root').text(), 'Gamma');
  assert.match(gamma('#article-body').text(), /restored normal Markdown/);
  for (const [relative, body] of Object.entries(fixtures))
    assert.equal(await fs.readFile(path.join(source, relative), 'utf8'), body);
  await fs.writeFile(path.join(source, 'notes/Beta/index.md'), '---\ndisplay_content: "false"\n---\n');
  await assert.rejects(catalog(settings, temp, source), /display_content must be true or false/);
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
