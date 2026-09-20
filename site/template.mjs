import path from 'node:path';
import { cleanNumber, escapeHtml as e, numberPrefix, siteUrl } from './content.mjs';

const icon = (context, name) =>
  `<img src="${siteUrl(context.basePath, `assets/icons/${name}.svg`)}" alt="" width="20" height="20">`;
const titleParts = (title) =>
  `<span class="page-number">${e(numberPrefix(title))}</span><span>${e(numberPrefix(title) ? cleanNumber(title) : title)}</span>`;
function directoryRows(dir, context) {
  const items = [
    ...dir.children.map(
      (child) =>
        `<li><a href="${siteUrl(context.basePath, child.route)}"><span>${e(child.title)}</span><span class="chevron" aria-hidden="true">›</span></a></li>`,
    ),
    ...dir.pages.map(
      (page) =>
        `<li><a href="${siteUrl(context.basePath, page.route)}"><span>${e(page.title)}</span><span class="chevron" aria-hidden="true">›</span></a></li>`,
    ),
  ];
  return `<ul class="directory-list">${items.join('')}</ul>`;
}

export function directoryBody(dir, context) {
  return (
    directoryRows(dir, context) +
    (dir.page?.html
      ? `<details class="directory-description"><summary>About this collection</summary><div class="prose">${dir.page.html}</div></details>`
      : '')
  );
}

export function libraryBody(context) {
  const groups = ['content/notes/理论', 'content/notes/计算', 'content/research', 'content/posts'];
  return (
    groups
      .map((key) => {
        const dir = context.dirs.get(key);
        if (!dir) return '';
        const title = {
          'content/notes/理论': 'Mathematics & Physics',
          'content/notes/计算': 'Computation',
          'content/research': 'Research',
          'content/posts': 'Posts',
        }[key];
        return `<section class="library-group"><h2>${e(title)}</h2>${directoryRows(dir, context)}</section>`;
      })
      .join('') +
    `<p class="library-about"><a href="${siteUrl(context.basePath, 'about.html')}">About these notes</a></p>`
  );
}

function sidebar(page, context) {
  const dir = context.dirs.get(path.posix.dirname(page.rel));
  if (!dir) return '';
  const parent = context.dirs.get(path.posix.dirname(dir.rel));
  const list = dir.pages
    .map(
      (item) =>
        `<li><a class="note-link${item === page ? ' is-current' : ''}" ${item === page ? 'aria-current="page"' : ''} href="${siteUrl(context.basePath, item.route)}">${titleParts(item.title)}</a></li>`,
    )
    .join('');
  return `<a class="all-notes" href="${siteUrl(context.basePath, 'index.html')}">‹ &nbsp;All notes</a>
    <a class="course-title" href="${siteUrl(context.basePath, dir.route)}">${e(dir.title)}</a>
    <ul class="notes-list">${list}</ul>
    ${dir.children.length ? `<div class="subcourses">${directoryRows({ ...dir, pages: [] }, context)}</div>` : ''}
    ${parent && parent.rel !== 'content/notes' ? `<a class="parent-course" href="${siteUrl(context.basePath, parent.route)}">‹ &nbsp;${e(parent.title)}</a>` : ''}`;
}

function outline(page, context) {
  const rows = (page.headings || [])
    .map(
      (heading, index) =>
        `<li style="--depth:${heading.depth}"><a href="#${encodeURIComponent(heading.id)}"${index === 0 ? ' class="is-active" aria-current="location"' : ''}>${e(heading.display)}</a></li>`,
    )
    .join('');
  return `<h2>Outline</h2><div class="outline-document"><button id="outline-fold" class="outline-fold" aria-label="Collapse or expand outline entries" aria-expanded="true" aria-controls="outline-items"><img src="${siteUrl(context.basePath, 'assets/icons/chevron.svg')}" width="12" height="12" alt=""></button><a class="outline-title" href="#reader-title">${e(page.title)}</a></div><ol id="outline-items">${rows}</ol>`;
}

function pageNavigation(page, context) {
  const siblings = context.dirs.get(path.posix.dirname(page.rel))?.pages || [];
  const index = siblings.indexOf(page);
  if (index < 0 || siblings.length < 2) return '';
  const previous = siblings[index - 1],
    next = siblings[index + 1];
  return `<nav class="page-navigation" aria-label="Previous and next pages">
    ${previous ? `<a rel="prev" href="${siteUrl(context.basePath, previous.route)}"><span>← Previous page</span><span>${e(previous.title)}</span></a>` : '<span class="unavailable" aria-disabled="true"><span>← Previous page</span><span>First page</span></span>'}
    ${next ? `<a rel="next" href="${siteUrl(context.basePath, next.route)}"><span>Next page →</span><span>${e(next.title)}</span></a>` : '<span class="unavailable" aria-disabled="true"><span>Next page →</span><span>No later page yet</span></span>'}
  </nav>`;
}

function breadcrumb(page, context) {
  const dir = context.dirs.get(path.posix.dirname(page.rel));
  if (page.isLibrary) return '';
  if (page.isDirectory) {
    const parent = context.dirs.get(path.posix.dirname(page.directory.rel));
    return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${siteUrl(context.basePath, parent?.route || 'index.html')}">‹ &nbsp;${e(parent?.title || 'All notes')}</a></nav>`;
  }
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${siteUrl(context.basePath, dir?.route || 'index.html')}">${e(dir?.title || 'All notes')}</a>${page.meta?.source && /Evans\s*§\s*[\d.]+/i.test(page.meta.source) ? `<span aria-hidden="true"> / </span><span>${e(page.meta.source.match(/Evans\s*§\s*[\d.]+/i)[0])}</span>` : ''}</nav>`;
}

export function pageTemplate(page, context) {
  const isDirectory = page.isDirectory || page.isLibrary;
  const hasSidebar = !isDirectory && !!context.dirs.get(path.posix.dirname(page.rel));
  const hasOutline = !isDirectory && !!page.headings?.length;
  const metadata = page.meta?.date
    ? `<p class="article-meta">${e(String(page.meta.date).slice(0, 10))}${Array.isArray(page.meta.tags) ? ` · ${page.meta.tags.map(e).join(' · ')}` : ''}</p>`
    : '';
  const source = page.meta?.source ? `<p class="source-note">Source: ${e(page.meta.source)}</p>` : '';
  const body = page.isLibrary
    ? libraryBody(context)
    : page.isDirectory
      ? directoryBody(page.directory, context)
      : page.html;
  const asset = (name) => siteUrl(context.basePath, `assets/${name}`);
  return `<!doctype html>
<html lang="${e(page.meta?.lang || 'zh-CN')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>${e(page.title)} — ${e(context.title)}</title>
<meta name="description" content="${e((page.plainText || 'Mathematics and physics study notes.').slice(0, 170))}">
<link rel="stylesheet" href="${asset('reader.css')}"><link rel="preload" href="${asset('fonts/stix-two-text-latin-400-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<script defer src="${asset('reader.js')}"></script>
${page.html?.includes('class="math ') ? `<script src="${asset('math-config.js')}"></script><script defer id="MathJax-script" src="${asset('vendor/mathjax/tex-chtml-full.js')}"></script>` : ''}
</head><body data-layout="${isDirectory ? 'directory' : 'reader'}" data-has-notes="${hasSidebar}" data-has-outline="${hasOutline}" data-notes-open="${hasSidebar}" data-outline-open="${hasOutline}" data-search-index="${asset('search.json')}">
<a class="skip-link" href="#article-body">Skip to content</a>
<header class="toolbar"><div class="identity"><button class="icon-button" id="notes-toggle" aria-label="Toggle notes sidebar" aria-controls="notes-sidebar" aria-expanded="${hasSidebar}" ${!hasSidebar ? 'disabled' : ''}>${icon(context, 'sidebar')}</button><a class="brand" href="${siteUrl(context.basePath, 'index.html')}">${e(context.title)}</a></div>
<div class="reading-tools"><button class="icon-button appearance-toggle" id="appearance-toggle" aria-label="Reading text size" aria-controls="appearance-dialog">Aa</button><button class="icon-button" id="search-toggle" aria-label="Search notes" aria-keyshortcuts="Control+k Meta+k">${icon(context, 'search')}</button><a class="icon-button github-link" href="${e(context.repository)}" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub repository">${icon(context, 'github')}</a><button class="icon-button" id="outline-toggle" aria-label="Toggle outline" aria-controls="outline-sidebar" aria-expanded="${hasOutline}" ${!hasOutline ? 'disabled' : ''}>${icon(context, 'outline')}</button></div></header>
<div class="reader-layout"><aside class="notes-sidebar" id="notes-sidebar" aria-label="Notes navigation">${hasSidebar ? sidebar(page, context) : ''}</aside>
<main class="reading-viewport" id="reading-viewport" tabindex="-1"><article class="article${isDirectory ? ' directory' : ''}"><header class="article-header">${breadcrumb(page, context)}<h1 id="reader-title">${e(page.title)}</h1>${page.isLibrary ? '<p class="article-meta">Mathematics, physics, and the ideas between them.</p>' : metadata}</header><div id="article-body" class="${isDirectory ? 'directory-body' : 'prose'}">${body || '<p>No notes in this collection yet.</p>'}</div>${!isDirectory ? `<footer class="article-footer">${source}${pageNavigation(page, context)}</footer>` : ''}</article></main>
<aside class="outline-sidebar" id="outline-sidebar" aria-label="Current note outline">${hasOutline ? outline(page, context) : ''}</aside></div>
<button class="sidebar-scrim" tabindex="-1" aria-label="Close sidebar" hidden></button>
<dialog id="search-dialog" class="search-dialog" aria-labelledby="search-label"><form method="dialog" class="search-heading"><label id="search-label" for="search-input">Search notes</label><button value="close" aria-label="Close search">×</button></form><input id="search-input" type="search" placeholder="Title, topic, or phrase…" autocomplete="off"><p id="search-status" role="status">Search the published notes on this site.</p><ol id="search-results"></ol></dialog>
<dialog id="appearance-dialog" class="appearance-dialog" aria-labelledby="appearance-label"><form method="dialog"><h2 id="appearance-label">Reading size</h2><button aria-label="Close text settings">×</button></form><div class="size-options"><button data-size="18">Compact</button><button data-size="20">Comfortable</button><button data-size="22">Large</button></div></dialog>
</body></html>`;
}
