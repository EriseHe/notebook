const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const QUARTO_PATH = path.join(ROOT, '_quarto.yml');
const NOTES_ROOT = path.join(ROOT, 'content', 'notes');

const GROUPS = [
  { name: '理论', dir: path.join(NOTES_ROOT, '理论') },
  { name: '计算', dir: path.join(NOTES_ROOT, '计算') },
];

const START_MARKER = '# AUTO-GENERATED NOTES SIDEBAR START';
const END_MARKER = '# AUTO-GENERATED NOTES SIDEBAR END';

function fnv1a(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

function slugify(name) {
  const ascii = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  if (ascii) return ascii;
  return `u${fnv1a(name).toString(16)}`;
}

function listFirstLevelDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

function ensureIndexMarkdown(folderPath, title) {
  const indexPath = path.join(folderPath, 'index.md');
  if (fs.existsSync(indexPath)) return;
  const content = `---\ntitle: "${title}"\npage-layout: article\n---\n\n本目录收录「${title}」相关笔记。请使用左侧导航浏览。\n`;
  fs.writeFileSync(indexPath, content, 'utf8');
}

function ensureSidebarMetadata(folderPath, sidebarId) {
  const metaPath = path.join(folderPath, '_metadata.yml');
  if (!fs.existsSync(metaPath)) {
    fs.writeFileSync(metaPath, `sidebar: ${sidebarId}\n`, 'utf8');
    return;
  }
  const raw = fs.readFileSync(metaPath, 'utf8');
  if (/^sidebar:\s*/m.test(raw)) {
    const updated = raw.replace(/^sidebar:\s*.*$/m, `sidebar: ${sidebarId}`);
    if (updated !== raw) fs.writeFileSync(metaPath, updated, 'utf8');
    return;
  }
  const updated = `sidebar: ${sidebarId}\n${raw}`;
  fs.writeFileSync(metaPath, updated, 'utf8');
}

function buildSidebarBlock(groups, foldersByGroup, indent) {
  const lines = [];

  lines.push(`${indent}- id: notes`);
  lines.push(`${indent}  style: docked`);
  lines.push(`${indent}  search: true`);
  lines.push(`${indent}  contents:`);
  for (const group of groups) {
    if (!fs.existsSync(group.dir)) continue;
    lines.push(
      `${indent}  - auto: "content/notes/${group.name}/*/index.md"`
    );
  }

  for (const group of groups) {
    const groupSlug = slugify(group.name);
    const folders = foldersByGroup.get(group.name) || [];
    for (const folder of folders) {
      const folderSlug = slugify(folder);
      const sidebarId = `notes-${groupSlug}-${folderSlug}`;
      lines.push(`${indent}- id: ${sidebarId}`);
      lines.push(`${indent}  style: docked`);
      lines.push(`${indent}  search: true`);
      lines.push(`${indent}  collapse-level: 2`);
      lines.push(`${indent}  contents:`);
      lines.push(
        `${indent}  - auto: content/notes/${group.name}/${folder}/**/*.md`
      );
    }
  }

  return lines.join('\n');
}

function getSidebarIndent() {
  const raw = fs.readFileSync(QUARTO_PATH, 'utf8');
  const match = raw.match(/^(\s*)sidebar:\s*$/m);
  return match ? match[1] : '  ';
}

function updateQuartoSidebar(generatedBlock, indent) {
  const raw = fs.readFileSync(QUARTO_PATH, 'utf8');
  const pattern = new RegExp(
    `^[\\t ]*${START_MARKER}[\\s\\S]*?^[\\t ]*${END_MARKER}`,
    'm'
  );
  if (!pattern.test(raw)) {
    throw new Error(
      `Missing sidebar markers in _quarto.yml: ${START_MARKER} / ${END_MARKER}`
    );
  }
  const replacement = `${indent}${START_MARKER}\n${generatedBlock}\n${indent}${END_MARKER}`;
  const updated = raw.replace(pattern, replacement);
  if (updated !== raw) fs.writeFileSync(QUARTO_PATH, updated, 'utf8');
}

function main() {
  const foldersByGroup = new Map();

  for (const group of GROUPS) {
    const folders = listFirstLevelDirs(group.dir);
    foldersByGroup.set(group.name, folders);

    for (const folder of folders) {
      const folderPath = path.join(group.dir, folder);
      const groupSlug = slugify(group.name);
      const folderSlug = slugify(folder);
      const sidebarId = `notes-${groupSlug}-${folderSlug}`;

      ensureIndexMarkdown(folderPath, folder);
      ensureSidebarMetadata(folderPath, sidebarId);
    }
  }

  const indent = getSidebarIndent();
  const generated = buildSidebarBlock(GROUPS, foldersByGroup, indent);
  updateQuartoSidebar(generated, indent);

  console.log('Notes sidebar updated.');
}

main();
