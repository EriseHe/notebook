# Development and publication

## Implementation

`site/cli.mjs` handles build/preview commands. `content.mjs` discovers published notes and resolves links; `render.mjs` adapts Obsidian syntax through Pandoc and `site/filters/obsidian-callouts.lua`; `template.mjs` supplies page markup. `build.mjs` writes `.quiet-reader/dist/`, and `server.mjs` serves it locally. Publication scope and URL prefix are in `site/config.mjs`; folder display defaults are in `site/folders.yaml`.

Keep notes and attachments in their current locations to preserve URLs. `public/` contains original images used by older notes, not a generated site. Only referenced attachments are copied into the build. Personal `.obsidian/` folders remain local and are not versioned.

## Preview and checks

```sh
npm run preview -- --port 4174
npm run preview -- --content-root /absolute/path/to/content
npm run build -- --base-path /
npm test
npm run test:browser
npm run test:math
npm run format:check
```

With an external content root, the adjacent `index.md` supplies the homepage when available. Saving a note triggers a rebuild; refresh after it completes. Restart preview after changing renderer modules. Build reports are in `.quiet-reader/build-report.json`; screenshots and math diagnostics are in `.preview-artifacts/`.

Browser checks use installed Chrome/Edge or `BROWSER_PATH`. `test:math` is an optional corpus-wide TeX rendering audit; it does not check the mathematical correctness of the notes. The [initial compatibility report](compatibility.md) records known source issues.

`.github/workflows/check.yml` runs format, unit, and browser checks for pull requests or a manual run. It does not publish or run on source pushes.

## Publish the local build

GitHub Pages serves the root of `gh-pages`. Build and check locally, commit source to `main`, then publish the compiled output. Do not commit `.quiet-reader/` to `main`.

From the repository root on macOS/Linux:

```sh
npm run format:check
npm test
npm run test:browser

git fetch origin gh-pages
publish_dir=$(mktemp -d)
git worktree add --detach "$publish_dir" origin/gh-pages
rsync -a --delete --exclude=.git .quiet-reader/dist/ "$publish_dir/"
git -C "$publish_dir" add --all
git -C "$publish_dir" diff --cached --check
git -C "$publish_dir" commit -m "Publish notebook"
git -C "$publish_dir" push origin HEAD:gh-pages
git worktree remove "$publish_dir"
```

`test:browser` builds the full site first, so these commands publish the checked output. If there are no generated changes, skip the commit and push. GitHub’s managed Pages deployment serves the compiled files; it does not run the Node/Pandoc build. Keep the base path `/notebook/` unless the hosting URL changes.

The old Quarto implementation remains available on `codex/legacy-site-2026-09-20`; it is an archive, not an active build path.
