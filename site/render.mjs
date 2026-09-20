import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { load } from 'cheerio';
import {
  digest,
  escapeHtml,
  headingNumbers,
  numberPrefix,
  resolveTarget,
  targetHref,
  textOf,
  visitAst,
} from './content.mjs';

export function runPandoc(executable, args, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '',
      stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    child.stderr.on('data', (data) => {
      stderr += data;
    });
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0 ? resolve(stdout) : reject(new Error(`Pandoc exited ${code}: ${stderr}`)),
    );
    child.stdin.on('error', reject);
    child.stdin.end(input);
  });
}

// Obsidian comments are removed only outside code and mathematical expressions.
export function stripComments(source) {
  let result = '',
    i = 0;
  while (i < source.length) {
    const remaining = source.slice(i);
    const atLineStart = i === 0 || source[i - 1] === '\n';
    const fence = atLineStart && remaining.match(/^ {0,3}(`{3,}|~{3,})[^\n]*\n/);
    if (fence) {
      const close = new RegExp(`\\n {0,3}${fence[1][0]}{${fence[1].length},}[^\\n]*(?:\\n|$)`).exec(
        remaining.slice(fence[0].length),
      );
      const length = close ? fence[0].length + close.index + close[0].length : remaining.length;
      result += remaining.slice(0, length);
      i += length;
      continue;
    }
    const delimiter = remaining.startsWith('\\[')
      ? ['\\[', '\\]']
      : remaining.startsWith('\\(')
        ? ['\\(', '\\)']
        : remaining.startsWith('$$')
          ? ['$$', '$$']
          : remaining[0] === '$' && source[i - 1] !== '\\'
            ? ['$', '$']
            : remaining.match(/^`+/)
              ? [remaining.match(/^`+/)[0], remaining.match(/^`+/)[0]]
              : null;
    if (delimiter) {
      let end = source.indexOf(delimiter[1], i + delimiter[0].length);
      while (end >= 0 && source[end - 1] === '\\' && delimiter[1][0] !== '\\')
        end = source.indexOf(delimiter[1], end + delimiter[1].length);
      if (end >= 0) {
        const next = end + delimiter[1].length;
        result += source.slice(i, next);
        i = next;
        continue;
      }
    }
    if (remaining.startsWith('%%')) {
      const end = source.indexOf('%%', i + 2);
      i = end < 0 ? source.length : end + 2;
      continue;
    }
    result += source[i++];
  }
  return result;
}

const reader =
  'markdown+wikilinks_title_after_pipe+lists_without_preceding_blankline+tex_math_single_backslash+mark-implicit_figures';

// Obsidian accepts a manual tag inside aligned/gathered. MathJax requires the
// tag outside that inner environment. Only change the rendering copy, never TeX
// in the source. Multiple row tags use the corresponding non-numbered AMS form.
export function normalizeMath(tex) {
  const outer = tex.match(/^\s*\\begin\{(aligned|gathered)\}([\s\S]*)\\end\{\1\}\s*$/);
  if (!outer) return tex;
  const tags = [];
  const pattern = /\\tag\*?\s*\{/g;
  let match;
  while ((match = pattern.exec(outer[2]))) {
    let depth = 1,
      end = pattern.lastIndex;
    for (; end < outer[2].length && depth; end++) {
      if (outer[2][end] === '\\') {
        end++;
        continue;
      }
      if (outer[2][end] === '{') depth++;
      if (outer[2][end] === '}') depth--;
    }
    if (depth) return tex;
    tags.push({ start: match.index, end, text: outer[2].slice(match.index, end) });
    pattern.lastIndex = end;
  }
  if (!tags.length) return tex;
  if (tags.length > 1) {
    const environment = outer[1] === 'aligned' ? 'align*' : 'gather*';
    return `\\begin{${environment}}${outer[2]}\\end{${environment}}`;
  }
  const tag = tags[0];
  return `\\begin{${outer[1]}}${outer[2].slice(0, tag.start)}${outer[2].slice(tag.end)}\\end{${outer[1]}}${tag.text}`;
}

export async function parsePage(page, context) {
  const cacheKey = digest(`${context.pandocVersion || 'pandoc-3.11'}|${reader}|comments-v1|${page.body}`);
  const cacheFile = path.join(context.cacheDir, `${cacheKey}.json`);
  try {
    page.ast = JSON.parse(await fs.readFile(cacheFile, 'utf8'));
  } catch {
    page.ast = JSON.parse(
      await runPandoc(context.pandoc, ['-f', reader, '-t', 'json'], stripComments(page.body)),
    );
    await fs.mkdir(context.cacheDir, { recursive: true });
    await fs.writeFile(cacheFile, JSON.stringify(page.ast));
  }
  // Preserve original anchor IDs while presenting a normalized heading hierarchy.
  const headers = page.ast.blocks.filter((block) => block.t === 'Header');
  const raw = headers.map((node) => ({ node, level: node.c[0], id: node.c[1][0], text: textOf(node.c[2]) }));
  page.headings = headingNumbers(raw, page.rel);
  for (const heading of page.headings) {
    heading.node.c[0] = heading.tagLevel;
    if (
      !numberPrefix(heading.text) &&
      page.meta['number-headings'] !== false &&
      !page.isIndex &&
      !page.isAbout
    ) {
      heading.node.c[2].unshift({ t: 'Str', c: heading.number }, { t: 'Space' });
    } else if (page.isIndex || page.isAbout || page.meta['number-headings'] === false)
      heading.display = heading.text;
    heading.node.c[1][2].push(['data-original-heading', heading.text]);
  }
  page.plainText = textOf(page.ast.blocks).replace(/\s+/g, ' ').trim();
}

function warning(context, page, target, reason) {
  const message = { page: page.rel, target, reason };
  if (!context.warnings.some((w) => w.page === message.page && w.target === target && w.reason === reason))
    context.warnings.push(message);
}

function selectEmbed(page, fragment) {
  if (!fragment) return page.ast.blocks;
  if (fragment.startsWith('^')) {
    const id = fragment.slice(1);
    const index = page.ast.blocks.findIndex((block) => textOf(block).endsWith(`^${id}`));
    if (index < 0) return [];
    return textOf(page.ast.blocks[index]).trim() === `^${id}` && index > 0
      ? [page.ast.blocks[index - 1]]
      : [page.ast.blocks[index]];
  }
  const heading = page.headings.find((h) => [h.id, h.text, h.display].includes(fragment));
  if (!heading) return [];
  const start = page.ast.blocks.findIndex((block) => block.t === 'Header' && block.c[1][0] === heading.id);
  let end = start + 1;
  while (
    end < page.ast.blocks.length &&
    !(page.ast.blocks[end].t === 'Header' && page.ast.blocks[end].c[0] <= heading.tagLevel)
  )
    end++;
  return page.ast.blocks.slice(start, end);
}

function transformBlocks(blocks, page, context, chain = [page.rel]) {
  const result = [];
  for (const original of blocks) {
    const block = structuredClone(original);
    if (block.t === 'Para' && block.c.length === 1 && block.c[0].t === 'Image') {
      const image = block.c[0];
      const target = resolveTarget(image.c[2][0], page, context);
      if (target.page) {
        if (chain.includes(target.page.rel) || chain.length >= 5) {
          warning(context, page, image.c[2][0], 'cyclic or over-deep embed');
          result.push({
            t: 'Para',
            c: [
              {
                t: 'Link',
                c: [
                  ['', ['embed-fallback'], []],
                  [{ t: 'Str', c: `Embedded note: ${target.page.title}` }],
                  [targetHref(target, context), ''],
                ],
              },
            ],
          });
          continue;
        }
        const selected = selectEmbed(target.page, target.fragment);
        if (!selected.length) warning(context, page, image.c[2][0], 'embedded heading or block not found');
        const children = transformBlocks(selected, target.page, context, [...chain, target.page.rel]);
        const prefix = `embed-${digest(`${page.rel}:${result.length}:${image.c[2][0]}`).slice(0, 8)}-`;
        visitAst(children, (node) => {
          if (node.t === 'Header') node.c[1][0] = prefix + node.c[1][0];
        });
        result.push({
          t: 'Div',
          c: [
            ['', ['note-embed'], []],
            [
              {
                t: 'Para',
                c: [
                  {
                    t: 'Link',
                    c: [
                      ['', ['embed-source'], []],
                      [{ t: 'Str', c: target.page.title }],
                      [targetHref(target, context), ''],
                    ],
                  },
                ],
              },
              ...children,
            ],
          ],
        });
        continue;
      }
    }
    // A standalone block ID annotates the preceding block, as in Obsidian.
    if (block.t === 'Para' && /^\^[A-Za-z0-9-]+$/.test(textOf(block.c).trim()) && result.length) {
      const id = textOf(block.c).trim().slice(1);
      result.push({ t: 'Div', c: [[id, [], []], [result.pop()]] });
      continue;
    }
    if (['Para', 'Plain'].includes(block.t)) {
      const last = block.c.at(-1);
      if (last?.t === 'Str' && /^\^[A-Za-z0-9-]+$/.test(last.c)) {
        const id = last.c.slice(1);
        block.c.pop();
        if (block.c.at(-1)?.t === 'Space') block.c.pop();
        result.push({ t: 'Div', c: [[id, [], []], [transformInlineLinks(block, page, context)]] });
        continue;
      }
    }
    result.push(transformInlineLinks(block, page, context));
  }
  return result;
}

function transformInlineLinks(block, page, context) {
  visitAst(block, (node) => {
    if (node.t === 'Math' && node.c[0].t === 'DisplayMath') node.c[1] = normalizeMath(node.c[1]);
    if (!['Link', 'Image'].includes(node.t)) return;
    const original = node.c[2][0];
    const target = resolveTarget(original, page, context);
    if (target.missing) {
      warning(context, page, original, target.reason);
      const label = textOf(node.c[1]) || original;
      if (node.t === 'Image') {
        node.t = 'RawInline';
        node.c = [
          'html',
          `<span class="missing-asset" role="note">Image unavailable: ${escapeHtml(label)}</span>`,
        ];
      } else {
        node.t = 'Span';
        node.c = [
          ['', ['unresolved-link'], [['title', `${target.reason}: ${original}`]]],
          [{ t: 'Str', c: label }],
        ];
      }
      return;
    }
    if (node.t === 'Image') {
      const label = textOf(node.c[1]);
      const dimensions = label.match(/^(\d+)(?:x(\d+))?$/);
      if (dimensions) {
        node.c[0][2].push(['width', dimensions[1]]);
        if (dimensions[2]) node.c[0][2].push(['height', dimensions[2]]);
        node.c[1] = [{ t: 'Str', c: path.posix.basename(original) }];
      }
      if (target.page || target.directory) node.t = 'Link';
      else if (target.asset && /\.pdf$/i.test(target.asset.rel)) {
        node.t = 'RawInline';
        node.c = [
          'html',
          `<object class="pdf-embed" data="${escapeHtml(targetHref(target, context))}" type="application/pdf"><a href="${escapeHtml(targetHref(target, context))}">Open PDF</a></object>`,
        ];
        return;
      }
    }
    node.c[2][0] = targetHref(target, context);
  });
  return block;
}

export async function renderPage(page, context) {
  const ast = { ...page.ast, blocks: transformBlocks(page.ast.blocks, page, context) };
  const body = await runPandoc(
    context.pandoc,
    [
      '-f',
      'json',
      '-t',
      'html5',
      '--wrap=none',
      '--mathjax',
      '--lua-filter',
      path.join(context.repoRoot, 'filters/obsidian-callouts.lua'),
    ],
    JSON.stringify(ast),
  );
  const $ = load(body, {}, false);
  $('img').attr('loading', 'lazy').attr('decoding', 'async');
  $('table').wrap(
    '<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable table"></div>',
  );
  // Raw HTML from the existing notes keeps working, including local attachments.
  $('img[src],video[src],audio[src],source[src],a[href]').each((_, element) => {
    const node = $(element);
    const attr = node.attr('src') !== undefined ? 'src' : 'href';
    const original = node.attr(attr);
    if (
      !original ||
      original.startsWith(context.basePath) ||
      original.startsWith('#') ||
      /^(https?:|mailto:|tel:|data:)/i.test(original)
    )
      return;
    const target = resolveTarget(original, page, context);
    if (!target.missing) node.attr(attr, targetHref(target, context));
    else {
      warning(context, page, original, target.reason);
      node.removeAttr(attr).addClass('unresolved-link');
    }
  });
  $('[data-fold]').each((_, element) => {
    const node = $(element);
    const heading = node.children('.theorem-header').first();
    const details = $('<details class="math-theorem"></details>').attr(
      'data-callout',
      node.attr('data-callout'),
    );
    if (node.attr('data-fold') === '+') details.attr('open', '');
    details
      .append($('<summary></summary>').html(heading.html() || ''))
      .append(node.children('.theorem-content'));
    node.replaceWith(details);
  });
  page.html = $.html();
  return page.html;
}
