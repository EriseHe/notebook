import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import GithubSlugger from "github-slugger";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { toHtml } from "hast-util-to-html";
import type { Root as MdastRoot, Heading as MdastHeading } from "mdast";
import type { Root as HastRoot } from "hast";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface HeadingEntry {
  id: string;
  depth: number;
  title: string;
}

export interface MarkdownResult {
  html: string;
  headings: HeadingEntry[];
}

export interface FrontMatter {
  title?: string;
  weight?: number;
  lecture?: number | string;
  bookCollapseSection?: boolean;
  bookFlatSection?: boolean;
  bookHidden?: boolean;
  bookHref?: string;
  ShowTitle?: boolean;
  showtitle?: boolean;
  BookToc?: boolean;
  BookToC?: boolean;
  [key: string]: unknown;
}

export interface PageData {
  slug: string[];
  urlPath: string;
  frontMatter: FrontMatter;
  content: MarkdownResult;
  isSection: boolean;
}

export interface NavItem {
  title: string;
  slug: string[];
  urlPath?: string;
  children: NavItem[];
  isSection: boolean;
  collapsible: boolean;
  flatSection: boolean;
  externalHref?: string;
  sortKey: string;
  frontMatter?: FrontMatter;
  hasIndex: boolean;
}

interface TraversalOptions {
  includeIndex: boolean;
}

const DEFAULT_TRAVERSAL_OPTIONS: TraversalOptions = {
  includeIndex: true,
};

function encodeUrlPath(slug: string[]): string {
  if (slug.length === 0) return "/";
  const encoded = slug
    .map((part) => part.split("/").map((piece) => encodeURIComponent(piece)).join("/"))
    .join("/");
  return `/${encoded}`;
}

function listDirSafe(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

function isDirectory(fullPath: string): boolean {
  try {
    return fs.statSync(fullPath).isDirectory();
  } catch (error) {
    return false;
  }
}

function isMarkdownFile(fileName: string): boolean {
  return fileName.endsWith(".md");
}

function readMarkdownFile(fullPath: string): { frontMatter: FrontMatter; markdown: string } {
  const file = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(file);
  return {
    frontMatter: (parsed.data as FrontMatter) || {},
    markdown: parsed.content,
  };
}

function computeOrderingKey(fileName: string, frontMatter: FrontMatter, title: string): string {
  let order = Number.MAX_SAFE_INTEGER;

  if (typeof frontMatter.weight === "number") {
    order = frontMatter.weight;
  } else if (frontMatter.lecture !== undefined) {
    const lectureNumber = Number(frontMatter.lecture);
    if (!Number.isNaN(lectureNumber)) {
      order = lectureNumber;
    }
  }

  if (order === Number.MAX_SAFE_INTEGER) {
    const numericPrefixMatch = fileName.match(/^(\d+)/);
    if (numericPrefixMatch) {
      order = parseInt(numericPrefixMatch[1], 10);
    }
  }

  const paddedOrder = String(order).padStart(8, "0");
  return `${paddedOrder}-${title.toLowerCase()}`;
}

function extractTitle(frontMatter: FrontMatter, fallback: string): string {
  if (frontMatter.title && typeof frontMatter.title === "string") {
    return frontMatter.title;
  }
  return fallback;
}

async function renderMarkdown(markdown: string): Promise<MarkdownResult> {
  const headings: HeadingEntry[] = [];
  const slugger = new GithubSlugger();

  const remarkCollectHeadings = () => (tree: MdastRoot) => {
    slugger.reset();
    visit(tree, "heading", (node: MdastHeading) => {
      if (node.depth === undefined || node.depth < 2 || node.depth > 6) {
        return;
      }
      const text = toString(node).trim();
      if (!text) return;
      const id = slugger.slug(text);
      if (!node.data) node.data = {};
      const data = node.data as Record<string, unknown> & {
        hProperties?: Record<string, unknown>;
      };
      data.hProperties = {
        ...(data.hProperties || {}),
        id,
      };
      headings.push({
        id,
        depth: node.depth,
        title: text,
      });
    });
  };

  const rehypePreserveParagraphSource = () => (tree: HastRoot) => {
    visit(tree, "element", (node) => {
      if (node.type !== "element") return;
      if (node.tagName !== "p") return;
      const raw = toHtml({ type: "root", children: node.children });
      node.properties = {
        ...(node.properties || {}),
        "data-raw": raw,
      };
    });
  };

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCollectHeadings)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "prepend",
      properties: { className: ["anchor"] },
    })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypePreserveParagraphSource)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return {
    html: String(file.value),
    headings,
  };
}

function buildNavTree(
  dirSegments: string[],
  options: TraversalOptions = DEFAULT_TRAVERSAL_OPTIONS
): NavItem | null {
  const relativeDir = path.join(...dirSegments);
  const fullDir = path.join(CONTENT_ROOT, relativeDir);
  if (!isDirectory(fullDir)) return null;

  const indexPath = path.join(fullDir, "_index.md");
  const hasIndex = fs.existsSync(indexPath);
  let indexFrontMatter: FrontMatter = {};
  let title = dirSegments.length ? dirSegments[dirSegments.length - 1] : "";

  if (hasIndex) {
    const { frontMatter } = readMarkdownFile(indexPath);
    indexFrontMatter = frontMatter;
    title = extractTitle(frontMatter, title);
    if (frontMatter.bookHidden) {
      return null;
    }
  } else if (!options.includeIndex) {
    return null;
  }

  const children: NavItem[] = [];

  const entries = listDirSafe(fullDir);
  entries
    .filter((name) => !name.startsWith("."))
    .forEach((name) => {
      const fullPath = path.join(fullDir, name);
      if (isDirectory(fullPath)) {
        const child = buildNavTree([...dirSegments, name], options);
        if (child) {
          children.push(child);
        }
        return;
      }
      if (!isMarkdownFile(name) || name === "_index.md") return;
      const { frontMatter } = readMarkdownFile(fullPath);
      if (frontMatter.bookHidden) return;

      const baseName = name.replace(/\.md$/, "");
      const pageTitle = extractTitle(frontMatter, baseName);
      const slug = [...dirSegments, baseName];
      const urlPath = encodeUrlPath(slug);
      children.push({
        title: pageTitle,
        slug,
        urlPath,
        children: [],
        isSection: false,
        collapsible: false,
        flatSection: Boolean(frontMatter.bookFlatSection),
        externalHref: frontMatter.bookHref,
        sortKey: computeOrderingKey(baseName, frontMatter, pageTitle),
        frontMatter,
        hasIndex: true,
      });
    });

  const sortedChildren = children.sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  return {
    title,
    slug: dirSegments,
    urlPath: hasIndex ? encodeUrlPath(dirSegments) : undefined,
    children: sortedChildren,
    isSection: true,
    collapsible: Boolean(indexFrontMatter.bookCollapseSection),
    flatSection: Boolean(indexFrontMatter.bookFlatSection),
    externalHref: indexFrontMatter.bookHref,
    sortKey: computeOrderingKey(
      dirSegments[dirSegments.length - 1] || "",
      indexFrontMatter,
      title
    ),
    frontMatter: indexFrontMatter,
    hasIndex,
  };
}

export function getSubjectNav(subject: string): NavItem | null {
  const subjectSegments = ["notes", subject];
  return buildNavTree(subjectSegments);
}

export function getAllNavSubjects(): string[] {
  const notesDir = path.join(CONTENT_ROOT, "notes");
  return listDirSafe(notesDir)
    .filter((entry) => !entry.startsWith("."))
    .filter((entry) => isDirectory(path.join(notesDir, entry)));
}

function collectAllMarkdownFiles(dir: string, acc: string[] = []): string[] {
  listDirSafe(dir)
    .filter((name) => !name.startsWith("."))
    .forEach((name) => {
      const fullPath = path.join(dir, name);
      if (isDirectory(fullPath)) {
        collectAllMarkdownFiles(fullPath, acc);
        return;
      }
      if (isMarkdownFile(name)) {
        acc.push(fullPath);
      }
    });
  return acc;
}

function relativeSlugFromPath(fullPath: string): string[] {
  const relative = path.relative(CONTENT_ROOT, fullPath);
  const parts = relative.split(path.sep);
  const fileName = parts.pop();
  if (!fileName) return [];
  if (fileName === "_index.md") {
    return parts;
  }
  const base = fileName.replace(/\.md$/, "");
  return [...parts, base];
}

export function getAllSlugs(): string[][] {
  const files = collectAllMarkdownFiles(CONTENT_ROOT);
  return files.map(relativeSlugFromPath);
}

export async function getPageData(slugSegments: string[] = []): Promise<PageData | null> {
  const slug = slugSegments.filter(Boolean);

  const attempts: { type: "section" | "page"; fullPath: string }[] = [];

  if (slug.length === 0) {
    attempts.push({ type: "section", fullPath: path.join(CONTENT_ROOT, "_index.md") });
  } else {
    const dirPath = path.join(CONTENT_ROOT, ...slug);
    attempts.push({ type: "section", fullPath: path.join(dirPath, "_index.md") });
    attempts.push({ type: "page", fullPath: `${dirPath}.md` });
  }

  for (const attempt of attempts) {
    if (!fs.existsSync(attempt.fullPath)) continue;
    const { frontMatter, markdown } = readMarkdownFile(attempt.fullPath);
    const content = await renderMarkdown(markdown);
    const urlPath = encodeUrlPath(slug);
    return {
      slug,
      urlPath,
      frontMatter,
      content,
      isSection: attempt.type === "section",
    };
  }

  return null;
}
