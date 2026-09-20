import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from './config.mjs';
import { catalog, digest, siteUrl, slash, walkFiles, within } from './content.mjs';
import { parsePage, renderPage, runPandoc } from './render.mjs';
import { pageTemplate } from './template.mjs';
import { findPandoc } from './setup.mjs';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function normalizeBasePath(value) {
  if (!/^\/(?!\/)[^?#\\]*$/.test(value) || value.split('/').some((part) => ['.', '..'].includes(part))) {
    throw new Error('base-path must be a pathname such as /notebook/ or /.');
  }
  return value.replace(/\/+$/, '') + '/';
}

async function concurrent(items, work, count = 4) {
  let index = 0;
  await Promise.all(
    Array.from({ length: Math.min(count, items.length) }, async () => {
      while (index < items.length) {
        const item = items[index++];
        try {
          await work(item);
        } catch (error) {
          throw new Error(`${item.rel || item}: ${error.message}`, { cause: error });
        }
      }
    }),
  );
}

export async function build(options = {}) {
  const started = Date.now();
  const settings = { ...config, ...options.config };
  const root = options.repoRoot || repoRoot;
  const contentRoot = await fs.realpath(path.resolve(root, options.contentRoot || settings.contentDir));
  const basePath = normalizeBasePath(options.basePath || settings.basePath);
  // All generated files stay in this dedicated tree; never allow a vault/docs/root target.
  const outputDir = path.join(root, '.quiet-reader', 'dist');
  await fs.mkdir(outputDir, { recursive: true });
  const realOutput = await fs.realpath(outputDir);
  if (realOutput !== outputDir || within(contentRoot, realOutput) || within(realOutput, contentRoot)) {
    throw new Error(
      'Output must be the non-symlinked .quiet-reader/dist directory, outside the content source.',
    );
  }
  const pandoc = options.pandoc || (await findPandoc());
  const pandocVersion = (await runPandoc(pandoc, ['--version'], '')).split('\n')[0].trim();
  const context = Object.assign(await catalog(settings, root, contentRoot), settings, {
    basePath,
    outputDir,
    pandoc,
    pandocVersion,
    cacheDir: path.join(root, '.quiet-reader', 'cache'),
  });
  // Legacy /public attachments are only copied when a published note refers to them.
  const publicRoots = new Set([path.join(root, 'public'), path.resolve(contentRoot, '..', 'public')]);
  for (const publicRoot of publicRoots) {
    for (const file of await walkFiles(publicRoot)) {
      const relative = slash(path.relative(publicRoot, file));
      if (!/\.(png|jpe?g|gif|webp|avif|svg|pdf|mp[34]|webm|ogg|wav|csv)$/i.test(relative)) continue;
      if (!context.assets.some((asset) => asset.rel === `public/${relative}`))
        context.assets.push({ file, rel: `public/${relative}` });
    }
  }
  options.onProgress?.(`Reading ${context.pages.length} Markdown documents…`);
  await concurrent(context.pages, (page) => parsePage(page, context));
  options.onProgress?.('Rendering formulas, links, callouts, and attachments…');
  await concurrent(context.pages, (page) => renderPage(page, context));

  const manifestFile = path.join(root, '.quiet-reader', 'manifest.json');
  let previous = [];
  try {
    previous = JSON.parse(await fs.readFile(manifestFile, 'utf8')).files || [];
  } catch {}
  const generated = new Set();
  const safeTarget = (relative) => {
    const target = path.resolve(outputDir, relative);
    if (!within(outputDir, target) || target === outputDir)
      throw new Error(`Unsafe generated path: ${relative}`);
    return target;
  };
  async function write(relative, data) {
    const target = safeTarget(relative);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, data);
    generated.add(slash(relative));
  }
  async function copy(file, relative) {
    const target = safeTarget(relative);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.copyFile(file, target);
    generated.add(slash(relative));
  }
  const routes = new Set();
  async function emit(page) {
    const key = page.route.toLocaleLowerCase().normalize('NFC');
    if (routes.has(key)) throw new Error(`Two documents publish to the same URL: ${page.route}`);
    routes.add(key);
    await write(page.route, pageTemplate(page, context));
  }
  for (const page of context.pages.filter((page) => !page.isIndex)) await emit(page);
  for (const directory of context.dirs.values()) {
    const document = directory.indexPage?.body.trim() ? directory.indexPage : directory.page;
    if (document && directory.displayContent !== false) await emit({ ...document, route: directory.route });
    else
      await emit({
        directory,
        rel: `${directory.rel}/index.md`,
        route: directory.route,
        title: directory.label,
        isDirectory: true,
      });
  }
  await emit({ rel: 'index.md', route: 'index.html', title: 'Notebook', isLibrary: true });
  await write(
    '404.html',
    pageTemplate(
      {
        rel: '404.md',
        title: 'Page not found',
        meta: {},
        html: `<p>This note may have moved. <a href="${siteUrl(basePath, 'index.html')}">Browse all notes</a> or use search to find it.</p>`,
      },
      context,
    ),
  );
  await write('.nojekyll', '');

  const assetsDir = path.join(root, 'site', 'assets');
  for (const file of await walkFiles(assetsDir))
    await copy(file, `assets/${slash(path.relative(assetsDir, file))}`);
  const fontRoot = path.join(root, 'node_modules', '@fontsource', 'stix-two-text');
  for (const variant of ['400-normal', '400-italic', '600-normal', '700-normal']) {
    const name = `stix-two-text-latin-${variant}.woff2`;
    await copy(path.join(fontRoot, 'files', name), `assets/fonts/${name}`);
  }
  await copy(path.join(fontRoot, 'LICENSE'), 'assets/fonts/LICENSE.txt');
  const mathRoot = path.join(root, 'node_modules', 'mathjax');
  for (const file of await walkFiles(path.join(mathRoot, 'es5'))) {
    await copy(file, `assets/vendor/mathjax/${slash(path.relative(path.join(mathRoot, 'es5'), file))}`);
  }
  await copy(path.join(mathRoot, 'LICENSE'), 'assets/vendor/mathjax/LICENSE.txt');
  for (const asset of context.usedAssets.values()) await copy(asset.file, asset.rel);
  const search = context.pages
    .filter((page) => page.folder?.displayContent !== false)
    .filter((page) => !page.isIndex || page.body.trim())
    .map((page) => ({
      title: page.title,
      url: siteUrl(basePath, page.route),
      course: context.dirs.get(path.posix.dirname(page.rel))?.title || 'Notebook',
      text: page.plainText,
    }));
  await write('assets/search.json', JSON.stringify(search));

  // Refuse a mixed snapshot if the author saved a note midway through the build.
  for (const page of context.pages) {
    if (digest(await fs.readFile(page.file, 'utf8')) !== page.hash)
      throw new Error(`Source changed during build; rebuild to include the latest edit: ${page.rel}`);
  }
  // Only prune files listed by our previous successful build, never arbitrary source files.
  for (const relative of previous) {
    if (!generated.has(relative))
      await fs.unlink(safeTarget(relative)).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
      });
  }
  const report = {
    pages: context.pages.length,
    directories: context.dirs.size,
    htmlPages: routes.size,
    attachments: context.usedAssets.size,
    sourceUnchanged: true,
    pandocVersion,
    durationMs: Date.now() - started,
    warnings: context.warnings,
  };
  await fs.writeFile(manifestFile, JSON.stringify({ files: [...generated].sort() }, null, 2));
  await fs.writeFile(path.join(root, '.quiet-reader', 'build-report.json'), JSON.stringify(report, null, 2));
  options.onProgress?.(
    `Built ${report.htmlPages} pages and ${report.attachments} attachments in ${(report.durationMs / 1000).toFixed(1)}s. Source notes unchanged.`,
  );
  if (report.warnings.length)
    options.onProgress?.(
      `${report.warnings.length} source-link warnings: see .quiet-reader/build-report.json.`,
    );
  return { context, report, outputDir, basePath };
}
