# E.H. Notebook

Personal notes published with Quiet Reader, a small Node.js/Pandoc website renderer. The Obsidian vault stays in `content/`; building the website does not edit notes.

[Read the notebook](https://erisehe.github.io/notebook/)

## Local use

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run setup
npm run preview
```

Open [the local preview](http://127.0.0.1:4173/notebook/). `setup` installs checksum-verified Pandoc into `.tools/`; an existing installation can be selected with `PANDOC_PATH`. Browser tests use an installed browser or `BROWSER_PATH`; set `PUPPETEER_SKIP_DOWNLOAD=true` before installing dependencies to skip downloading another browser.

```sh
npm run build         # Website in .quiet-reader/dist/
npm test              # Renderer and preview-server tests
npm run test:browser  # Full build, links, navigation, math, and responsive layout
npm run format:check
```

## Repository layout

| Path | Purpose |
| --- | --- |
| `content/` | Notes, posts, research, and their attachments |
| `index.md` | Authored homepage |
| `site/` | Renderer, preview server, assets, Lua filter, and tests |
| `public/` | Original image attachments retained for older notes |
| `docs/` | Authoring, development, styling, and compatibility documentation |
| `.github/workflows/check.yml` | Checks for pull requests and manual runs |

Generated output, dependencies, local tools, and personal Obsidian settings are ignored. `main` contains website source; `gh-pages` contains only the compiled website. Builds and publication are run locally, so source pushes do not start a GitHub Actions build.

## Documentation

- [Writing notes and controlling publication](docs/authoring.md)
- [Development, tests, and local publication](docs/development.md)
- [Styling the reader](docs/styling.md)
- [Initial Markdown compatibility audit](docs/compatibility.md)

The former Quarto site is preserved on `codex/legacy-site-2026-09-20`. Its old build scripts and Hugo/Quarto configuration are no longer part of the active source tree. The reader’s original [Figma design](https://www.figma.com/design/RjULRTUH4yd9FcAQriMuss?node-id=9-2) remains a visual reference.
