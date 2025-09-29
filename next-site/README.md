# Next.js version of 学习笔记

This directory contains a Next.js reimplementation of the existing Hugo site. All Hugo content under `content/` is reused, the theme SCSS has been ported, and KaTeX rendering now happens at build time so inline formulas no longer require the Hugo-specific passthrough hacks.

## Getting started

```bash
cd next-site
npm install
npm run dev
```

The dev server runs at http://localhost:3000 and statically pre-renders every markdown page found in `next-site/content`.

## Production build

```
cd next-site
npm run build
npm start
```

Static output is written to `.next`. Deploy with `next export` or your preferred Next.js host once you decide on deployment strategy.

## Project layout

- `app/[[...slug]]/page.tsx` — dynamic route that renders any markdown file or `_index.md` section.
- `components/` — React components that mirror the Hugo partials (sidebar, toolbar, theorem processor, Markdown renderer).
- `lib/content.ts` — filesystem helpers for loading markdown, building navigation, and generating tables of contents.
- `styles/` — SCSS files copied from the Hugo theme so the visual presentation stays identical.
- `public/` — static assets, fonts, KaTeX bundle, and icons brought over from the Hugo theme.

## Notes & next steps

- Sass currently relies on `@import`; migrating to the modern `@use` syntax will silence the build warnings.
- Search UI is present but not yet wired up with Fuse.js data. Add a build-time index (e.g. from `getAllSlugs`) and hydrate the client to match the Hugo behaviour.
- Prev/next links and comment widgets from the original theme are not yet ported; add them if you rely on those features.
- When you decommission Hugo, remove the old theme and top-level `hugo.toml` or keep them as reference until the Next.js site fully replaces it.
