export default {
  title: 'E.H. Notebook',
  repository: 'https://github.com/EriseHe/notebook',
  basePath: '/notebook/',
  contentDir: 'content',
  folderSettings: 'site/folders.yaml',
  // Match the old Quarto publication scope. Do not publish the whole vault.
  publishRoots: ['notes/理论', 'notes/计算', 'posts', 'research'],
  extraPages: ['notes/index.md'],
  excludeNames: ['_index.md', 'README.md'],
  // Preserve published URLs when a note receives a clearer filename in Obsidian.
  pageRoutes: {
    'notes/理论/Numerical Linear Algbera/3. LU Factorization and Zero Pivots.md':
      'content/notes/理论/Numerical Linear Algbera/3. Lecture.html',
  },
};
