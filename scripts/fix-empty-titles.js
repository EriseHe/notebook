const fs = require('fs');
const path = require('path');

function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function extractFirstHeading(content) {
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  return null;
}

function fixEmptyTitles(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file has frontmatter with empty title
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return false;
  
  const frontmatter = frontmatterMatch[1];
  
  // Check for empty title field
  if (!frontmatter.match(/^title:\s*$/m)) return false;
  
  console.log(`Found empty title in: ${filePath}`);
  
  // Try to extract title from first heading
  const contentAfterFrontmatter = content.substring(frontmatterMatch[0].length);
  let newTitle = extractFirstHeading(contentAfterFrontmatter);
  
  // If no heading found, use filename
  if (!newTitle) {
    newTitle = path.basename(filePath, '.md');
  }
  
  // Replace empty title with new title
  const newContent = content.replace(
    /^(---\n[\s\S]*?)^title:\s*$/m,
    `$1title: "${newTitle}"`
  );
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  ✓ Set title to: "${newTitle}"`);
  
  return true;
}

// Main execution
const contentDir = path.join(__dirname, '..', 'content');
const markdownFiles = findMarkdownFiles(contentDir);

let fixedCount = 0;
markdownFiles.forEach(file => {
  if (fixEmptyTitles(file)) {
    fixedCount++;
  }
});

console.log(`\n✓ Fixed ${fixedCount} file(s) with empty titles`);



