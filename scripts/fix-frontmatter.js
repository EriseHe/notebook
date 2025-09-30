#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const KEYS = ['date', 'description', 'subtitle', 'summary', 'published'];

function* walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) {
      yield* walk(p);
    } else {
      yield p;
    }
  }
}

function fixYamlLines(text) {
  const pattern = new RegExp(`^(${KEYS.join('|')}):\\s*$`, 'gm');
  return text.replace(pattern, (_m, key) => `${key}: ""`);
}

function fixMarkdown(file) {
  const src = fs.readFileSync(file, 'utf8');
  if (!src.startsWith('---')) return false;
  let end = src.indexOf('\n---', 3);
  let header, rest;
  if (end === -1) {
    // try to close header at the first blank line or start of content
    const lines = src.split('\n');
    let closeAt = -1;
    for (let i = 1; i < Math.min(lines.length, 200); i++) {
      if (lines[i].trim() === '') { closeAt = i; break; }
    }
    if (closeAt === -1) closeAt = 1;
    lines.splice(closeAt, 0, '---');
    const rebuilt = lines.join('\n');
    end = rebuilt.indexOf('\n---', 3);
    header = rebuilt.slice(0, end + 4);
    rest = rebuilt.slice(end + 4);
    const fixed = fixYamlLines(header);
    fs.writeFileSync(file, fixed + rest, 'utf8');
    return true;
  } else {
    header = src.slice(0, end + 4);
    rest = src.slice(end + 4);
    const fixed = fixYamlLines(header);
    if (fixed !== header) {
      fs.writeFileSync(file, fixed + rest, 'utf8');
      return true;
    }
    return false;
  }
}

function fixIpynb(file) {
  const raw = fs.readFileSync(file, 'utf8');
  let nb;
  try { nb = JSON.parse(raw); } catch { return false; }
  if (!Array.isArray(nb.cells)) return false;
  let changed = false;
  for (const cell of nb.cells) {
    if (cell.cell_type !== 'markdown' || !cell.source) continue;
    const sourceRaw = Array.isArray(cell.source) ? cell.source.join('') : String(cell.source);
    const source = sourceRaw;
    const startsYaml = /^\s*---/.test(source);
    if (!startsYaml) continue;
    let endIdx = source.indexOf('\n---', 3);
    let head, body;
    if (endIdx === -1) {
      // insert closing --- at first blank line or after first line
      const lines = source.split('\n');
      let closeAt = -1;
      for (let i = 1; i < Math.min(lines.length, 200); i++) {
        if (lines[i].trim() === '') { closeAt = i; break; }
      }
      if (closeAt === -1) closeAt = 1;
      lines.splice(closeAt, 0, '---');
      const rebuilt = lines.join('\n');
      endIdx = rebuilt.indexOf('\n---', 3);
      head = rebuilt.slice(0, endIdx + 4);
      body = rebuilt.slice(endIdx + 4);
      const fixedHead = fixYamlLines(head);
      const newSource = fixedHead + body;
      cell.source = newSource.split(/(?<=\n)/);
      changed = true;
    } else {
      head = source.slice(0, endIdx + 4);
      body = source.slice(endIdx + 4);
      const fixedHead = fixYamlLines(head);
      if (fixedHead !== head) {
        const newSource = fixedHead + body;
        cell.source = newSource.split(/(?<=\n)/);
        changed = true;
      }
    }
  }
  if (changed) {
    fs.writeFileSync(file, JSON.stringify(nb, null, 1), 'utf8');
  }
  return changed;
}

function main() {
  let fixedCount = 0;
  const changedFiles = [];
  for (const file of walk(CONTENT)) {
    if (file.endsWith('.md')) {
      if (fixMarkdown(file)) { fixedCount++; changedFiles.push(file); }
    } else if (file.endsWith('.ipynb')) {
      if (fixIpynb(file)) { fixedCount++; changedFiles.push(file); }
    }
  }
  console.log(`Fixed front matter in ${fixedCount} files.`);
  if (changedFiles.length) {
    for (const f of changedFiles) console.log(` - ${path.relative(ROOT, f)}`);
  }
}

main();


