const fs = require('fs');
const path = require('path');

function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('docs')) {
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function yamlEscape(str) {
  // Escape quotes properly for YAML
  if (str.includes('"')) return `'${str.replace(/'/g, "''")}'`;
  return `"${str}"`;
}

function setTitleToFilename(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath, '.md');
  const safeTitle = yamlEscape(filename);

  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!fmMatch) {
    // No frontmatter; create one with title
    const newContent = `---\ntitle: ${safeTitle}\n---\n\n${raw}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }

  const fm = fmMatch[1];
  const hasTitleLine = /^title:\s*(.*)$/m.test(fm);
  if (!hasTitleLine) {
    // Insert title at top of frontmatter
    const updatedFm = `title: ${safeTitle}\n` + fm;
    const newContent = raw.replace(/^---\n([\s\S]*?)\n---/, `---\n${updatedFm}\n---`);
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }

  // Has title line: replace only if empty
  const titleLine = fm.match(/^title:\s*(.*)$/m);
  const current = titleLine ? titleLine[1].trim() : '';
  if (current === '' || current === '""' || current === "''") {
    const newFm = fm.replace(/^title:\s*(.*)$/m, `title: ${safeTitle}`);
    const newContent = raw.replace(/^---\n([\s\S]*?)\n---/, `---\n${newFm}\n---`);
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }

  return false;
}

// Execute
const contentDir = path.join(__dirname, '..', 'content');
const files = findMarkdownFiles(contentDir);
let changed = 0;
for (const f of files) {
  if (setTitleToFilename(f)) changed++;
}
console.log(`Fixed titles for ${changed} file(s).`);



