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
};
