import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse as parseYaml } from 'yaml';

export const slash = (value) => value.replaceAll('\\', '/');
export const natural = new Intl.Collator(['en', 'zh-CN'], { numeric: true, sensitivity: 'base' });
export const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
export const digest = (value) => crypto.createHash('sha256').update(value).digest('hex');
export const encodePath = (value) => slash(value).split('/').map(encodeURIComponent).join('/');
export const decodePath = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};
export const stem = (value) => path.posix.basename(slash(value)).replace(/\.(md|qmd)$/i, '');
export const cleanNumber = (value) => String(value).replace(/^\d+(?:\.\d+)*\.?\s+/, '');
export const numberPrefix = (value) => String(value).match(/^(\d+(?:\.\d+)*)(?:\.\s*|\s+)/)?.[1] || '';
export const within = (root, file) => {
  const rel = path.relative(root, file);
  return rel === '' || (!rel.startsWith(`..${path.sep}`) && rel !== '..' && !path.isAbsolute(rel));
};
export const siteUrl = (base, route) => `${base.replace(/\/$/, '')}/${encodePath(route)}`;

export function frontmatter(raw, filename = '') {
  const text = raw.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return { meta: {}, body: text };
  try {
    const meta = parseYaml(match[1]) || {};
    if (typeof meta !== 'object' || Array.isArray(meta)) throw new Error('Frontmatter must be a mapping.');
    return { meta, body: text.slice(match[0].length) };
  } catch (error) {
    throw new Error(`Invalid YAML in ${filename}: ${error.message}`);
  }
}

export async function walkFiles(root) {
  const result = [];
  async function visit(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await visit(full);
      else if (entry.isFile()) result.push(full); // Do not follow symlinks out of the vault.
    }
  }
  await visit(root);
  return result.sort((a, b) => natural.compare(a, b));
}

export async function catalog(config, repoRoot, contentRoot) {
  const files = await walkFiles(contentRoot);
  const pages = [];
  const assets = [];
  for (const file of files) {
    const rel = slash(path.relative(contentRoot, file));
    if (!/\.(md|qmd)$/i.test(file)) {
      assets.push({ file, rel: `content/${rel}`, vaultRel: rel });
      continue;
    }
    const allowed =
      config.publishRoots.some((root) => rel.startsWith(`${root}/`)) || config.extraPages.includes(rel);
    if (!allowed || config.excludeNames.includes(path.basename(file))) continue;
    const raw = await fs.readFile(file, 'utf8');
    const { meta, body } = frontmatter(raw, rel);
    if (meta.draft === true || meta.publish === false || meta.published === false) continue;
    const isIndex = /(^|\/)index\.(md|qmd)$/i.test(rel);
    const fallback = isIndex ? path.posix.basename(path.posix.dirname(rel)) : stem(rel);
    pages.push({
      file,
      rel: `content/${rel}`,
      vaultRel: rel,
      route: `content/${rel.replace(/\.(md|qmd)$/i, '.html')}`,
      meta,
      body,
      hash: digest(raw),
      title: String(meta.title || fallback),
      isIndex,
    });
  }
  // Keep the original welcome/disclaimer document available without changing it.
  const aboutFile = path.join(repoRoot, 'index.md');
  try {
    const raw = await fs.readFile(aboutFile, 'utf8');
    const { meta, body } = frontmatter(raw, aboutFile);
    pages.push({
      file: aboutFile,
      rel: 'index.md',
      vaultRel: null,
      route: 'about.html',
      meta,
      body,
      hash: digest(raw),
      title: String(meta.title || 'About these notes'),
      isIndex: false,
      isAbout: true,
    });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const dirs = new Map();
  for (const page of pages.filter((page) => !page.isAbout)) {
    let dir = path.posix.dirname(page.rel);
    while (dir !== '.' && dir !== 'content') {
      if (!dirs.has(dir))
        dirs.set(dir, { rel: dir, route: `${dir}/index.html`, title: path.posix.basename(dir) });
      dir = path.posix.dirname(dir);
    }
  }
  for (const dir of dirs.values()) {
    dir.page = pages.find((page) => page.route === dir.route);
    dir.title = dir.page?.title || dir.title;
    dir.pages = pages
      .filter((page) => path.posix.dirname(page.rel) === dir.rel && !page.isIndex)
      .sort((a, b) => natural.compare(stem(a.rel), stem(b.rel)));
    dir.children = [...dirs.values()]
      .filter((child) => path.posix.dirname(child.rel) === dir.rel)
      .sort((a, b) => natural.compare(a.title, b.title));
  }
  return { pages, assets, dirs, contentRoot, repoRoot, warnings: [], usedAssets: new Map() };
}

export function textOf(value) {
  if (!value) return '';
  if (Array.isArray(value)) return value.map(textOf).join('');
  if (typeof value !== 'object') return '';
  if (value.t === 'Str') return value.c;
  if (['Space', 'SoftBreak', 'LineBreak'].includes(value.t)) return ' ';
  if (value.t === 'Math' || value.t === 'Code') return value.c[1];
  if (value.t === 'Link' || value.t === 'Image') return textOf(value.c[1]);
  if (value.t === 'Span') return textOf(value.c[1]);
  return textOf(value.c);
}

export function visitAst(value, fn) {
  if (Array.isArray(value)) {
    for (const child of value) visitAst(child, fn);
  } else if (value && typeof value === 'object') {
    fn(value);
    for (const child of Object.values(value)) if (typeof child === 'object') visitAst(child, fn);
  }
}

export function headingNumbers(headings, filename) {
  const prefix = numberPrefix(stem(filename));
  const levels = [];
  const counters = [];
  return headings.map((heading) => {
    while (levels.length && levels.at(-1) >= heading.level) levels.pop();
    const depth = levels.length;
    counters[depth] = (counters[depth] || 0) + 1;
    counters.length = depth + 1;
    levels.push(heading.level);
    const existing = numberPrefix(heading.text);
    if (existing) {
      const parts = existing.split('.');
      const relative =
        prefix && existing.startsWith(`${prefix}.`) ? parts.slice(prefix.split('.').length) : parts;
      if (relative.length === depth + 1)
        relative.forEach((part, index) => {
          counters[index] = Number(part);
        });
    }
    const number = existing || [prefix, ...counters].filter((value) => value !== '').join('.');
    return {
      ...heading,
      depth,
      number,
      display: existing ? heading.text : `${number} ${heading.text}`,
      tagLevel: Math.min(6, depth + 2),
    };
  });
}

function comparable(value) {
  return decodePath(value).normalize('NFC').toLocaleLowerCase().replaceAll('\\', '/');
}
export function resolveTarget(target, origin, context) {
  if (/^(https?:|mailto:|tel:|data:image\/)/i.test(target)) return { external: true, href: target };
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//'))
    return { missing: true, reason: 'unsupported URL scheme' };
  const hashIndex = target.indexOf('#');
  const fragment = hashIndex >= 0 ? decodePath(target.slice(hashIndex + 1)) : '';
  const beforeHash = hashIndex >= 0 ? target.slice(0, hashIndex) : target;
  const queryIndex = beforeHash.indexOf('?');
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : '';
  let pathname = decodePath(queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash);
  if (!pathname) return { page: origin, fragment, query };
  const base = context.basePath || '/notebook/';
  if (pathname.startsWith(base)) pathname = pathname.slice(base.length);
  pathname = slash(pathname).replace(/^\/+/, '');
  const originDir = path.posix.dirname(origin.rel);
  const candidates = [
    path.posix.normalize(path.posix.join(originDir, pathname)),
    pathname,
    `content/${pathname}`,
  ];
  for (const candidate of candidates) {
    const page = context.pages.find((page) =>
      [page.rel, page.route, page.rel.replace(/\.(md|qmd)$/i, '')].some(
        (value) => comparable(value) === comparable(candidate),
      ),
    );
    if (page) return { page, fragment, query };
    const dir = context.dirs.get(candidate.replace(/\/$/, ''));
    if (dir) return { directory: dir, fragment, query };
    const asset = context.assets.find((asset) => comparable(asset.rel) === comparable(candidate));
    if (asset) return { asset, fragment, query };
  }
  const name = comparable(path.posix.basename(pathname));
  let matches = [
    ...context.pages
      .filter((page) =>
        [path.posix.basename(page.rel), stem(page.rel), path.posix.basename(page.route)].some(
          (value) => comparable(value) === name,
        ),
      )
      .map((page) => ({ page, fragment, query })),
    ...context.assets
      .filter((asset) => comparable(path.posix.basename(asset.rel)) === name)
      .map((asset) => ({ asset, fragment, query })),
  ];
  if (matches.length > 1) {
    const score = (result) => {
      const rel = (result.page || result.asset).rel.split('/');
      const own = originDir.split('/');
      let shared = 0;
      while (shared < Math.min(rel.length, own.length) && rel[shared] === own[shared]) shared++;
      return shared;
    };
    matches.sort((a, b) => score(b) - score(a));
    if (score(matches[0]) > score(matches[1])) matches = matches.slice(0, 1);
  }
  return matches.length === 1
    ? matches[0]
    : { missing: true, reason: matches.length ? 'ambiguous target' : 'target not published or missing' };
}

export function targetHref(result, context) {
  if (result.external) return result.href;
  const item = result.page || result.directory || result.asset;
  if (!item) return null;
  let fragment = result.fragment || '';
  if (result.page && fragment) {
    const match = result.page.headings?.find((h) =>
      [h.id, h.text, h.display, cleanNumber(h.text)].some(
        (value) => comparable(value) === comparable(fragment),
      ),
    );
    fragment = match?.id || fragment.replace(/^\^/, '');
  }
  if (result.asset) context.usedAssets.set(result.asset.rel, result.asset);
  const encodedFragment = result.asset
    ? encodeURI(fragment).replaceAll('#', '%23')
    : encodeURIComponent(fragment);
  return (
    siteUrl(context.basePath, item.route || item.rel) +
    (result.query || '') +
    (fragment ? `#${encodedFragment}` : '')
  );
}
