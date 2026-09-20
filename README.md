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

- Compact STIX Two Text prose, 18px body / 27px line height, 28px page titles, and self-hosted LaTeX-style MathJax formulas.
- Independent left notes sidebar and right Obsidian-like outline; both remember desktop preferences. On small screens they open as separate drawers.
- Gray/black course directories and sidebar links. Only article links, reader breadcrumbs, previous/next links, and the active outline item use blue.
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

Only the old publication roots are included: `notes/理论`, `notes/计算`, `posts`, `research`, and `notes/index.md`. Hidden files, `.obsidian`, symlinked files, other vault folders, `_index.md`, and notes marked `draft: true`, `publish: false`, or `published: false` are excluded. Only attachments referenced by published pages are copied. The existing welcome/disclaimer page is preserved at `about.html`; existing collection introductions remain under “About this collection”.

Missing or ambiguous links produce a readable non-clickable label and a diagnostic in `.quiet-reader/build-report.json`; the builder never guesses between equally plausible targets. Fix those links in Obsidian when convenient. Previously generated pages are removed from the output if they become private/deleted; source files are never removed.

The initial full-corpus audit checked 8,764 unique mathematical expressions. Three existing source-TeX syntax errors and three pre-existing unresolved links are listed in [the compatibility report](site/COMPATIBILITY.md). They were not silently corrected in the source. `npm run test:math` refreshes the detailed formula report in `.preview-artifacts/math-audit.json`; this is a diagnostic command, not a claim that authored formulas are mathematically correct.

## Review and deployment

The `codex/quiet-reader` workflow builds, tests, and uploads a review artifact only. It has no GitHub Pages write permissions. The existing Quarto deployment workflow is unchanged, so neither creating this branch nor pushing it switches the live site to the new design.

After review, switching production is a separate decision: deploy the contents of `.quiet-reader/dist/` and keep `basePath` in `site/config.mjs` consistent with the hosting path (currently `/notebook/`). Merely merging this branch will not switch the old Quarto deployment to Quiet Reader. No remote deployment has been performed as part of the rewrite.

Legacy commands are `npm run build:legacy` and `npm run preview:legacy`, and require Quarto. **The old Quarto pre-render scripts still edit note titles/indexes**, as before; use the new build commands for a read-only vault workflow.

Implementation lives in `site/`: `content.mjs` resolves published content, `render.mjs` adapts Pandoc/Obsidian syntax, `template.mjs` supplies page markup, `assets/` contains the Figma-derived UI, and `build.mjs`/`server.mjs` handle read-only builds and local previews. Dependency packages are installed from `package-lock.json`, not versioned in `node_modules/`.
