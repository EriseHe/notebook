# Styling the reader

| File | Controls |
| --- | --- |
| `site/assets/reader.css` | Colors, fonts, spacing, responsive layout, print, and sidebar appearance |
| `site/assets/reader.js` | Panel toggles, folder folding, search, reading progress, and reader preferences |
| `site/template.mjs` | Page markup, navigation, sidebar labels, and outline |
| `site/assets/math-config.js` | MathJax configuration and LaTeX extensions |
| `site/assets/fonts/` | TeX Gyre Termes fonts and their licenses |
| `site/assets/icons/` | Functional toolbar and folding controls |

Start with the custom properties in `reader.css`. The article is centered with a maximum width of 960px; desktop sidebars are 300px each. Below 1400px the sidebars become overlay drawers. Hiding a desktop panel preserves the article’s position and width.

Folder headings use small muted uppercase text. Their folding arrow stays on the left; a 1px vertical guide marks their children, with a 6px gap after the group. Keep page and folder labels aligned.

Prose defaults to TeX Gyre Termes, with STIX Two Text available through the Aa control. MathJax and both font families are served locally. Preserve font licenses when updating assets.

`npm run preview` rebuilds after CSS, browser JavaScript, filters, or Markdown change. Restart it after editing renderer modules. Run `npm run test:browser` after changing layout or interactions; screenshots are written to `.preview-artifacts/`.
