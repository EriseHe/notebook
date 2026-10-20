# Writing notes

The renderer uses Pandoc, the same Markdown engine as the existing Quarto site. It supports YAML frontmatter, inline/display LaTeX, aligned formulas, links, lists, tables, footnotes, code highlighting, raw HTML, highlighted text, and Obsidian callouts.

- `[[Note]]`, `[[Note#Heading|label]]`, and ordinary `.md` links become correct website links, including Chinese filenames and the `/notebook/` base path.
- `![[image.png|300]]`, local Markdown images, PDF embeds, note/heading/block embeds, `^block-id` references, and folded callouts (`[!note]-` / `[!note]+`) are supported. Embed cycles are bounded and reported. Standalone note embeds are expanded; inline note embeds become links.
- Existing heading anchors remain stable even when displayed numbers are added. Sidebar/outline labels never modify the source.
- `%% Obsidian comments %%` are omitted outside code and math.
- TeX extensions `physics`, `cancel`, `color`, `mathtools`, and `amscd` are bundled. Fonts and MathJax are local, not CDN dependencies. Existing remote images still depend on their original hosts.
- Obsidian-style manual equation tags inside `aligned`/`gathered` are adapted to MathJax-compatible notation in the rendered copy only; the source formulas and their labels stay unchanged.
- Code is displayed, **not executed**. Obsidian-only plugin views (such as Dataview queries or live TikZ rendering) are not executed by the website. Pre-render diagrams as image attachments when needed.

Only these publication roots are included: `notes/理论`, `notes/计算`, `posts`, `research`, and `notes/index.md`, plus the authored root `index.md`. Hidden files, `.obsidian`, symlinked files, other vault folders, `_index.md`, and notes marked `draft: true`, `publish: false`, or `published: false` are excluded. Only attachments referenced by published pages are copied.

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

The initial full-corpus audit checked 8,764 unique mathematical expressions. Three existing source-TeX syntax errors and three pre-existing unresolved links are listed in [the compatibility report](compatibility.md). They were not silently corrected in the source. `npm run test:math` refreshes the detailed formula report in `.preview-artifacts/math-audit.json`; this is a diagnostic command, not a claim that authored formulas are mathematically correct.


## Sidebar labels

The sidebar normally uses the note filename. Set `sidebar-title` in YAML frontmatter to change its displayed label without changing its URL. Folder headings use muted typography, a left folding arrow, and a thin guide alongside their children.
