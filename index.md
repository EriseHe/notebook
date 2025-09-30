---
title: "Introduction"
page-layout: full
sidebar: notes
---

# <div class="page-brand">Erise Note</div>

这个网页笔记完全是我为己所用的【**私人笔记**】。我将其发布的目的并不是为了展示笔记，而是出于一种“网页版”费曼学习法的目的，在想象所有人都是自己是听众的情况下进行知识传授，从而来结构化我的数学和物理知识体系。当然，在这种刻意的展示（presentation）中，若是有人能有所受益，那更是再好不过了，所以我便理所当然地将他们发布出来。

由于以上的原因，笔记里很多的一些证明并不完全严谨，可能会有错误，掺杂着不规整的私人语言，请酌情参考。

这个项目受启发于[Chaoskey](https://chaoskey.github.io/notes/docs/diffgeo/) 的微分几何学习笔记。

```
You always know where to go when nobody is nowhere.
```

### Build Commands

**To preview the site locally** (auto-reloads on file changes):

```bash
cd /Users/erisehe/Documents/GitHub/notebook
quarto preview --port 4200
```

Then open http://localhost:4200 in your browser.

**To build the site** (generates static files in `docs/`):

```bash
cd /Users/erisehe/Documents/GitHub/notebook
quarto render
```

**To fix any empty title fields** (run before building if needed):

```bash
cd /Users/erisehe/Documents/GitHub/notebook
node scripts/fix-empty-titles.js
```

**Note:** If you encounter build errors, first check for empty `title:` fields in markdown frontmatter and run the fix script above.
