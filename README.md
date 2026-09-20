# Erise’s Notebook · Quiet Reader

An independent, textbook-style website for the existing Obsidian notes, implemented from the [Quiet Reader Figma design](https://www.figma.com/design/RjULRTUH4yd9FcAQriMuss?node-id=9-2).

This branch does **not** deploy or replace the current site. The existing Quarto configuration and `docs/` output remain intact. The new reader builds into `.quiet-reader/dist/`.

## Local preview

Use Node.js 22.12 or newer. From this branch’s directory:

```powershell
npm ci
npm run setup
npm run preview
```

Open [the local preview](http://127.0.0.1:4173/notebook/). The setup command downloads the official, checksum-verified Pandoc 3.11 binary into the ignored `.tools/` directory. You can instead set `PANDOC_PATH` to an existing Pandoc installation. An installed Pandoc must support the `wikilinks_title_after_pipe` extension.

To read the original Obsidian files while working in a separate worktree:

```powershell
npm run preview -- --content-root "D:\Github\notebook\content"
```

Keep editing in Obsidian. Saving a note triggers a rebuild; refresh the browser after it completes. The reader never writes titles, numbers, indexes, or metadata back into the vault. Content saved during a build is detected so it can be rebuilt consistently. Restart preview after changing the renderer’s JavaScript modules; Markdown, CSS, and browser scripts are re-read during rebuilds.

Other commands:

```powershell
npm run build
npm run build -- --content-root "D:\Github\notebook\content"
npm run preview -- --port 4174
npm run build -- --base-path /
npm test
npm run test:browser
npm run test:math
```

Browser tests use installed Chrome/Edge, `BROWSER_PATH`, or Puppeteer’s installed browser. To avoid downloading a second browser during installation, set `PUPPETEER_SKIP_DOWNLOAD=true` in your environment before `npm ci`.

## Reading experience

- Compact TeX Gyre Termes prose, 18px body / approximately 26px desktop line height, 28px page titles, and self-hosted LaTeX-style MathJax formulas. The Aa control switches between this traditional Times-family font and the original STIX Two Text. Chinese uses the available serif/Song-style system fallback. Termes is an approximation of a traditional mathematics textbook style, not an identification of Baby Rudin's original printing font.
- Notes, Posts, and Research are top-level tabs derived from the actual published folders, so they are not repeated in breadcrumbs. The left sidebar preserves the actual hierarchy within the selected subject, naturally sorts entries, and remembers folder expansion. Directory-only sections define where a new reading tree starts; for example, inside PDEs the sidebar starts at PDEs, not at Notes or 理论.
- Independent 300px left sidebar and 300px right outline, with no separating rule at the outline's left edge. Desktop article width remains 720px. Below 1400px the panels become drawers rather than squeezing the article; on phones the top navigation uses a second toolbar row.
- Gray/black course directories and sidebar links, with 16px horizontal padding inside directory rows. Only article links, reader breadcrumbs, previous/next links, and the active outline item use blue. Link hover underlines are globally disabled, with keyboard focus indicators retained. The main reading scrollbar is completely hidden; a small animated marker inside the TOC tracks progress continuously between headings. Long TOCs follow the marker, and reduced-motion preferences disable its animation. There is no redundant “Outline” heading or full-height vertical rule. Other scrollable panels keep their subtle auto-hiding native thumbs.
- Natural chapter ordering, previous/next navigation, GitHub link, local full-text search (`Ctrl/Cmd K`), text size controls, keyboard focus states, and a clean print layout.
- Original note text and authored headings are preserved. A note beginning with `##` starts at `1`, not `0.1`. In `3. Heat Equation.md`, the largest unnumbered heading becomes `3.1`. Existing numbers are retained. Set `number-headings: false` in frontmatter to disable generated numbers for one document.

## Markdown and Obsidian compatibility

The renderer uses Pandoc, the same Markdown engine as the existing Quarto site. It supports YAML frontmatter, inline/display LaTeX, aligned formulas, links, lists, tables, footnotes, code highlighting, raw HTML, highlighted text, and Obsidian callouts.

- `[[Note]]`, `[[Note#Heading|label]]`, and ordinary `.md` links become correct website links, including Chinese filenames and the `/notebook/` base path.
- `![[image.png|300]]`, local Markdown images, PDF embeds, note/heading/block embeds, `^block-id` references, and folded callouts (`[!note]-` / `[!note]+`) are supported. Embed cycles are bounded and reported. Standalone note embeds are expanded; inline note embeds become links.
- Existing heading anchors remain stable even when displayed numbers are added. Sidebar/outline labels never modify the source.
- `%% Obsidian comments %%` are omitted outside code and math.
- TeX extensions `physics`, `cancel`, `color`, `mathtools`, and `amscd` are bundled. Fonts and MathJax are local, not CDN dependencies. Existing remote images still depend on their original hosts.
- Obsidian-style manual equation tags inside `aligned`/`gathered` are adapted to MathJax-compatible notation in the rendered copy only; the source formulas and their labels stay unchanged.
- Code is displayed, **not executed**. Obsidian-only plugin views (such as Dataview queries or live TikZ rendering) are not executed by the website. The old optional `npm run render-tikz` utility remains available separately.

Only the old publication roots are included: `notes/理论`, `notes/计算`, `posts`, `research`, and `notes/index.md`. Hidden files, `.obsidian`, symlinked files, other vault folders, `_index.md`, and notes marked `draft: true`, `publish: false`, or `published: false` are excluded. Only attachments referenced by published pages are copied. The existing welcome/disclaimer page is preserved at `about.html`.

Folder notes follow the current Obsidian convention, `Folder/Folder.md`. Such a folder's label opens its Markdown while its arrow independently folds the children; the note is not repeated as a child item. A nonempty `index.md` is also rendered as a normal Markdown document, not hidden behind a generated listing. Pure folders (including empty legacy indexes) only fold in the sidebar and receive a generated listing when their directory URL is opened. Existing `index.html` URLs are preserved, including aliases to folder notes. No Markdown is rewritten to generate this tree.

### Directory-only sections

Set the boolean Obsidian property `display_content: false` in a folder's same-name Markdown note or `index.md` to make it a directory section:

```yaml
---
display_content: false
---
```

The setting has three effects: the folder opens a generated directory instead of its authored body; it does not appear in a reading sidebar; and entering one of its child subjects starts a new sidebar at that subject. Breadcrumbs provide the way back to the parent directory. On a parent landing page, directory-only children appear as sections with their immediate subitems. For example, Notes lists 理论 and 计算 as two sections, while entering PDEs shows its Markdown and a PDEs-only reading tree. An ordinary pure folder without this explicit setting still only folds in its subject's tree.

`site/folders.yaml` supplies the initial `false` defaults for Notes, 理论, and 计算 without modifying the existing vault. Keys are exact paths relative to `content/`; the renderer does not special-case those names. A folder note's own property takes precedence, followed by `index.md`, then this configuration. Set `display_content: true` to restore normal Markdown/folder rendering and sidebar participation; unlisted folders default to `true`. The settings file is re-read on every build. These are **display settings, not privacy controls or publication rules**: use `publish: false` for unpublished notes, and add any new publication root to `site/config.mjs` explicitly.

Missing or ambiguous links produce a readable non-clickable label and a diagnostic in `.quiet-reader/build-report.json`; the builder never guesses between equally plausible targets. Fix those links in Obsidian when convenient. Previously generated pages are removed from the output if they become private/deleted; source files are never removed.

The initial full-corpus audit checked 8,764 unique mathematical expressions. Three existing source-TeX syntax errors and three pre-existing unresolved links are listed in [the compatibility report](site/COMPATIBILITY.md). They were not silently corrected in the source. `npm run test:math` refreshes the detailed formula report in `.preview-artifacts/math-audit.json`; this is a diagnostic command, not a claim that authored formulas are mathematically correct.

## Review and deployment

The `codex/quiet-reader` workflow builds, tests, and uploads a review artifact only. It has no GitHub Pages write permissions. The existing Quarto deployment workflow is unchanged, so neither creating this branch nor pushing it switches the live site to the new design.

After review, switching production is a separate decision: deploy the contents of `.quiet-reader/dist/` and keep `basePath` in `site/config.mjs` consistent with the hosting path (currently `/notebook/`). Merely merging this branch will not switch the old Quarto deployment to Quiet Reader. No remote deployment has been performed as part of the rewrite.

Legacy commands are `npm run build:legacy` and `npm run preview:legacy`, and require Quarto. **The old Quarto pre-render scripts still edit note titles/indexes**, as before; use the new build commands for a read-only vault workflow.

Implementation lives in `site/`: `content.mjs` resolves published content, `render.mjs` adapts Pandoc/Obsidian syntax, `template.mjs` supplies page markup, `assets/` contains the Figma-derived UI, and `build.mjs`/`server.mjs` handle read-only builds and local previews. Dependency packages are installed from `package-lock.json`, not versioned in `node_modules/`.
