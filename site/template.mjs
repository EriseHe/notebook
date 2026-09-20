import path from 'node:path';
import {
  cleanNumber,
  digest,
  escapeHtml as e,
  folderRoute,
  numberPrefix,
  siteUrl,
  stem,
} from './content.mjs';

const icon = (context, name) =>
  `<img src="${siteUrl(context.basePath, `assets/icons/${name}.svg`)}" alt="" width="20" height="20">`;
const titleParts = (title) =>
  `<span class="page-number">${e(numberPrefix(title))}</span><span>${e(numberPrefix(title) ? cleanNumber(title) : title)}</span>`;
function directoryRows(dir, context) {
  const items = [
    ...dir.children.map(
      (child) =>
        `<li><a href="${siteUrl(context.basePath, folderRoute(child))}"><span>${e(child.label)}</span><span class="chevron" aria-hidden="true">›</span></a></li>`,
    ),
    ...dir.pages.map(
      (page) =>
        `<li><a href="${siteUrl(context.basePath, page.route)}"><span>${e(page.title)}</span><span class="chevron" aria-hidden="true">›</span></a></li>`,
    ),
  ];
  return `<ul class="directory-list">${items.join('')}</ul>`;
}

export function directoryBody(dir, context) {
  const sections = dir.children.filter((child) => child.displayContent === false);
  if (!sections.length) return directoryRows(dir, context);
  const groups = sections.map(
    (child) =>
      `<section class="directory-section" data-directory-section="${e(child.rel)}"><h2><a href="${siteUrl(context.basePath, folderRoute(child))}"><span>${e(child.label)}</span><span class="chevron" aria-hidden="true">›</span></a></h2>${directoryRows(child, context)}</section>`,
  );
  const others = {
    children: dir.children.filter((child) => child.displayContent !== false),
    pages: dir.pages,
  };
  return (
    groups.join('') + (others.children.length || others.pages.length ? directoryRows(others, context) : '')
  );
}

function sectionOf(page, context) {
  return context.sections?.find((section) => page.rel.startsWith(`${section.rel}/`));
}

function sidebarRoot(page, context) {
  const section = sectionOf(page, context);
  if (!section) return null;
  let child = page.directory || page.folder || context.dirs.get(path.posix.dirname(page.rel));
  if (!child || child.displayContent === false) return null;
  while (child !== section) {
    const parent = context.dirs.get(path.posix.dirname(child.rel));
    if (!parent) break;
    if (parent.displayContent === false) return child;
    child = parent;
  }
  return section;
}

function topNavigation(page, context) {
  const section = sectionOf(page, context);
  return `<nav class="top-navigation" aria-label="Notebook sections">${context.sections
    .map((item) => {
      const label = item.label[0].toUpperCase() + item.label.slice(1);
      return `<a href="${siteUrl(context.basePath, folderRoute(item))}"${item === section ? ' aria-current="page"' : ''}>${e(label)}</a>`;
    })
    .join('')}</nav>`;
}

function sidebar(page, context) {
  const root = sidebarRoot(page, context);
  if (!root) return '';
  function children(dir) {
    const folders = dir.children
      .filter((child) => child.displayContent !== false)
      .map((child) => {
        const id = `folder-${digest(child.rel).slice(0, 12)}`;
        const activeBranch = page.rel.startsWith(`${child.rel}/`);
        const current =
          child.page?.rel === page.rel || (page.isDirectory && page.directory.rel === child.rel);
        const arrow = `<img src="${siteUrl(context.basePath, 'assets/icons/chevron.svg')}" width="12" height="12" alt="">`;
        const label = child.page
          ? `<button class="tree-toggle" aria-label="Fold ${e(child.label)}" aria-controls="${id}" aria-expanded="${activeBranch}">${arrow}</button><a class="note-link folder-link${current ? ' is-current' : ''}"${current ? ' aria-current="page"' : ''} href="${siteUrl(context.basePath, child.page.route)}">${e(child.label)}</a>`
          : `<button class="tree-toggle folder-label${current ? ' is-current' : ''}" aria-controls="${id}" aria-expanded="${activeBranch}"${current ? ' aria-current="page"' : ''}>${arrow}<span>${e(child.label)}</span></button>`;
        return `<li class="folder-node" data-folder="${e(child.rel)}" data-active-branch="${activeBranch}"><div class="folder-row">${label}</div><ul class="tree-children" id="${id}"${!activeBranch ? ' hidden' : ''}>${children(child)}</ul></li>`;
      });
    const files = dir.pages.map((item) => {
      const current = item.rel === page.rel;
      return `<li class="file-node"><a class="note-link${current ? ' is-current' : ''}"${current ? ' aria-current="page"' : ''} href="${siteUrl(context.basePath, item.route)}">${titleParts(stem(item.rel))}</a></li>`;
    });
    return [...folders, ...files].join('');
  }
  const current = page.folder === root || (page.isDirectory && page.directory === root);
  return `<nav aria-label="${e(root.label)} file hierarchy" data-sidebar-root="${e(root.rel)}"><a class="sidebar-root${current ? ' is-current' : ''}"${current ? ' aria-current="page"' : ''} href="${siteUrl(context.basePath, folderRoute(root))}">${e(root.label)}</a><ul class="notes-tree">${children(root)}</ul></nav>`;
}

function outline(page, context) {
  const rows = (page.headings || [])
    .map(
      (heading, index) =>
        `<li style="--depth:${heading.depth}"><a href="#${encodeURIComponent(heading.id)}"${index === 0 ? ' class="is-active" aria-current="location"' : ''}>${e(heading.display)}</a></li>`,
    )
    .join('');
  return `<div class="outline-document"><button id="outline-fold" class="outline-fold" aria-label="Collapse or expand outline entries" aria-expanded="true" aria-controls="outline-items"><img src="${siteUrl(context.basePath, 'assets/icons/chevron.svg')}" width="12" height="12" alt=""></button><a class="outline-title" href="#reader-title">${e(page.title)}</a></div><div class="outline-contents" id="outline-contents"><div id="outline-progress" class="outline-progress" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-controls="reading-viewport"><span class="outline-marker"></span></div><ol id="outline-items">${rows}</ol></div>`;
}

function pageNavigation(page, context) {
  const siblings = context.dirs.get(path.posix.dirname(page.rel))?.pages || [];
  const index = siblings.findIndex((item) => item.rel === page.rel);
  if (index < 0 || siblings.length < 2) return '';
  const previous = siblings[index - 1],
    next = siblings[index + 1];
  return `<nav class="page-navigation" aria-label="Previous and next pages">
    ${previous ? `<a rel="prev" href="${siteUrl(context.basePath, previous.route)}"><span>← Previous page</span><span>${e(previous.title)}</span></a>` : '<span class="unavailable" aria-disabled="true"><span>← Previous page</span><span>First page</span></span>'}
    ${next ? `<a rel="next" href="${siteUrl(context.basePath, next.route)}"><span>Next page →</span><span>${e(next.title)}</span></a>` : '<span class="unavailable" aria-disabled="true"><span>Next page →</span><span>No later page yet</span></span>'}
  </nav>`;
}

function breadcrumb(page, context) {
  if (page.isHome) return '';
  let rel = page.isDirectory
    ? path.posix.dirname(page.directory.rel)
    : page.isFolderNote
      ? path.posix.dirname(page.folder.rel)
      : path.posix.dirname(page.rel);
  const chain = [];
  while (context.dirs.has(rel)) {
    const dir = context.dirs.get(rel);
    // The top-level section already has a tab; breadcrumbs start one level below it.
    if (context.sections.includes(dir)) break;
    chain.unshift(`<a href="${siteUrl(context.basePath, folderRoute(dir))}">${e(dir.label)}</a>`);
    rel = path.posix.dirname(rel);
  }
  const source = String(page.meta?.source || '').match(/Evans\s*§\s*[\d.]+/i)?.[0];
  if (source) chain.push(`<span>${e(source)}</span>`);
  if (!chain.length) return '';
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${chain.join('<span aria-hidden="true"> / </span>')}</nav>`;
}

export function pageTemplate(page, context) {
  if (page.isFolderNote && page.folder.displayContent === false)
    page = { ...page, directory: page.folder, isDirectory: true, title: page.folder.label };
  if (page.isDirectory && context.sections.includes(page.directory))
    page = { ...page, title: page.directory.label[0].toUpperCase() + page.directory.label.slice(1) };
  const isDirectory = !!page.isDirectory;
  const hasSidebar = !!sidebarRoot(page, context);
  const hasOutline = !isDirectory && !!page.headings?.length;
  const metadata = page.meta?.date
    ? `<p class="article-meta">${e(String(page.meta.date).slice(0, 10))}${Array.isArray(page.meta.tags) ? ` · ${page.meta.tags.map(e).join(' · ')}` : ''}</p>`
    : '';
  const source = page.meta?.source ? `<p class="source-note">Source: ${e(page.meta.source)}</p>` : '';
  const body = page.isDirectory ? directoryBody(page.directory, context) : page.html?.trim();
  const emptyBody = isDirectory ? '<p>No notes in this collection yet.</p>' : '<p>This note is empty.</p>';
  const asset = (name) => siteUrl(context.basePath, `assets/${name}`);
  return `<!doctype html>
<html lang="${e(page.meta?.lang || 'zh-CN')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>${e(page.title === context.title ? page.title : `${page.title} — ${context.title}`)}</title>
<meta name="description" content="${e((page.plainText || 'Mathematics and physics study notes.').slice(0, 170))}">
<link rel="stylesheet" href="${asset('reader.css')}"><link rel="preload" href="${asset('fonts/texgyretermes-regular.otf')}" as="font" type="font/otf" crossorigin>
<script defer src="${asset('reader.js')}"></script>
${!isDirectory && page.html?.includes('class="math ') ? `<script src="${asset('math-config.js')}"></script><script defer id="MathJax-script" src="${asset('vendor/mathjax/tex-chtml-full.js')}"></script>` : ''}
</head><body data-layout="${isDirectory ? 'directory' : 'reader'}" data-has-notes="${hasSidebar}" data-has-outline="${hasOutline}" data-notes-open="${hasSidebar}" data-outline-open="${hasOutline}" data-search-index="${asset('search.json')}">
<a class="skip-link" href="#article-body">Skip to content</a>
<header class="toolbar"><div class="identity"><button class="icon-button" id="notes-toggle" aria-label="Toggle notes sidebar" aria-controls="notes-sidebar" aria-expanded="${hasSidebar}" ${!hasSidebar ? 'disabled' : ''}>${icon(context, 'sidebar')}</button><a class="brand" href="${siteUrl(context.basePath, '')}">${e(context.title)}</a></div>
${topNavigation(page, context)}
<div class="reading-tools"><button class="icon-button appearance-toggle" id="appearance-toggle" aria-label="Reading text size" aria-controls="appearance-dialog">Aa</button><button class="icon-button" id="search-toggle" aria-label="Search notes" aria-keyshortcuts="Control+k Meta+k">${icon(context, 'search')}</button><a class="icon-button github-link" href="${e(context.repository)}" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub repository">${icon(context, 'github')}</a><button class="icon-button" id="outline-toggle" aria-label="Toggle outline" aria-controls="outline-sidebar" aria-expanded="${hasOutline}" ${!hasOutline ? 'disabled' : ''}>${icon(context, 'outline')}</button></div></header>
<div class="reader-layout"><aside class="notes-sidebar" id="notes-sidebar" aria-label="Notes navigation">${hasSidebar ? sidebar(page, context) : ''}</aside>
<main class="reading-viewport" id="reading-viewport" tabindex="-1"><article class="article${isDirectory ? ' directory' : ''}"><header class="article-header">${breadcrumb(page, context)}<h1 id="reader-title">${e(page.title)}</h1>${metadata}</header><div id="article-body" class="${isDirectory ? 'directory-body' : 'prose'}">${body || emptyBody}</div>${!isDirectory && !page.isHome ? `<footer class="article-footer">${source}${pageNavigation(page, context)}</footer>` : ''}</article></main>
<aside class="outline-sidebar" id="outline-sidebar" aria-label="Current note outline">${hasOutline ? outline(page, context) : ''}</aside></div>
<button class="sidebar-scrim" tabindex="-1" aria-label="Close sidebar" hidden></button>
<dialog id="search-dialog" class="search-dialog" aria-labelledby="search-label"><form method="dialog" class="search-heading"><label id="search-label" for="search-input">Search notes</label><button value="close" aria-label="Close search">×</button></form><input id="search-input" type="search" placeholder="Title, topic, or phrase…" autocomplete="off"><p id="search-status" role="status">Search the published notes on this site.</p><ol id="search-results"></ol></dialog>
<dialog id="appearance-dialog" class="appearance-dialog" aria-labelledby="appearance-label"><form method="dialog"><h2 id="appearance-label">Reading appearance</h2><button aria-label="Close text settings">×</button></form><p class="settings-label">Typeface</p><div class="font-options"><button data-font="termes">Classic textbook<small>TeX Gyre Termes</small></button><button data-font="stix">STIX Two Text<small>Original reader</small></button></div><p class="settings-label">Text size</p><div class="size-options"><button data-size="18">Compact</button><button data-size="20">Comfortable</button><button data-size="22">Large</button></div></dialog>
</body></html>`;
}
