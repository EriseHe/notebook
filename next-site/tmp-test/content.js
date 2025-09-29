"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectNav = getSubjectNav;
exports.getAllNavSubjects = getAllNavSubjects;
exports.getAllSlugs = getAllSlugs;
exports.getPageData = getPageData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const unified_1 = require("unified");
const remark_parse_1 = __importDefault(require("remark-parse"));
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const remark_math_1 = __importDefault(require("remark-math"));
const remark_rehype_1 = __importDefault(require("remark-rehype"));
const rehype_raw_1 = __importDefault(require("rehype-raw"));
const rehype_slug_1 = __importDefault(require("rehype-slug"));
const rehype_autolink_headings_1 = __importDefault(require("rehype-autolink-headings"));
const rehype_katex_1 = __importDefault(require("rehype-katex"));
const rehype_highlight_1 = __importDefault(require("rehype-highlight"));
const rehype_stringify_1 = __importDefault(require("rehype-stringify"));
const github_slugger_1 = __importDefault(require("github-slugger"));
const unist_util_visit_1 = require("unist-util-visit");
const mdast_util_to_string_1 = require("mdast-util-to-string");
const hast_util_to_html_1 = require("hast-util-to-html");
const CONTENT_ROOT = path_1.default.join(process.cwd(), "content");
const DEFAULT_TRAVERSAL_OPTIONS = {
    includeIndex: true,
};
function encodeUrlPath(slug) {
    if (slug.length === 0)
        return "/";
    const encoded = slug
        .map((part) => part.split("/").map((piece) => encodeURIComponent(piece)).join("/"))
        .join("/");
    return `/${encoded}`;
}
function listDirSafe(dir) {
    if (!fs_1.default.existsSync(dir))
        return [];
    return fs_1.default.readdirSync(dir);
}
function isDirectory(fullPath) {
    try {
        return fs_1.default.statSync(fullPath).isDirectory();
    }
    catch (error) {
        return false;
    }
}
function isMarkdownFile(fileName) {
    return fileName.endsWith(".md");
}
function readMarkdownFile(fullPath) {
    const file = fs_1.default.readFileSync(fullPath, "utf8");
    const parsed = (0, gray_matter_1.default)(file);
    return {
        frontMatter: parsed.data || {},
        markdown: parsed.content,
    };
}
function computeOrderingKey(fileName, frontMatter, title) {
    let order = Number.MAX_SAFE_INTEGER;
    if (typeof frontMatter.weight === "number") {
        order = frontMatter.weight;
    }
    else if (frontMatter.lecture !== undefined) {
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
function extractTitle(frontMatter, fallback) {
    if (frontMatter.title && typeof frontMatter.title === "string") {
        return frontMatter.title;
    }
    return fallback;
}
async function renderMarkdown(markdown) {
    const headings = [];
    const slugger = new github_slugger_1.default();
    const remarkCollectHeadings = () => (tree) => {
        slugger.reset();
        (0, unist_util_visit_1.visit)(tree, "heading", (node) => {
            if (node.depth === undefined || node.depth < 2 || node.depth > 6) {
                return;
            }
            const text = (0, mdast_util_to_string_1.toString)(node).trim();
            if (!text)
                return;
            const id = slugger.slug(text);
            if (!node.data)
                node.data = {};
            const data = node.data;
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
    const rehypePreserveParagraphSource = () => (tree) => {
        (0, unist_util_visit_1.visit)(tree, "element", (node) => {
            if (node.type !== "element")
                return;
            if (node.tagName !== "p")
                return;
            const raw = (0, hast_util_to_html_1.toHtml)({ type: "root", children: node.children });
            node.properties = {
                ...(node.properties || {}),
                "data-raw": raw,
            };
        });
    };
    const file = await (0, unified_1.unified)()
        .use(remark_parse_1.default)
        .use(remark_gfm_1.default)
        .use(remark_math_1.default)
        .use(remarkCollectHeadings)
        .use(remark_rehype_1.default, { allowDangerousHtml: true })
        .use(rehype_raw_1.default)
        .use(rehype_slug_1.default)
        .use(rehype_autolink_headings_1.default, {
        behavior: "prepend",
        properties: { className: ["anchor"] },
    })
        .use(rehype_katex_1.default)
        .use(rehype_highlight_1.default)
        .use(rehypePreserveParagraphSource)
        .use(rehype_stringify_1.default, { allowDangerousHtml: true })
        .process(markdown);
    return {
        html: String(file.value),
        headings,
    };
}
function buildNavTree(dirSegments, options = DEFAULT_TRAVERSAL_OPTIONS) {
    const relativeDir = path_1.default.join(...dirSegments);
    const fullDir = path_1.default.join(CONTENT_ROOT, relativeDir);
    if (!isDirectory(fullDir))
        return null;
    const indexPath = path_1.default.join(fullDir, "_index.md");
    const hasIndex = fs_1.default.existsSync(indexPath);
    let indexFrontMatter = {};
    let title = dirSegments.length ? dirSegments[dirSegments.length - 1] : "";
    if (hasIndex) {
        const { frontMatter } = readMarkdownFile(indexPath);
        indexFrontMatter = frontMatter;
        title = extractTitle(frontMatter, title);
        if (frontMatter.bookHidden) {
            return null;
        }
    }
    else if (!options.includeIndex) {
        return null;
    }
    const children = [];
    const entries = listDirSafe(fullDir);
    entries
        .filter((name) => !name.startsWith("."))
        .forEach((name) => {
        const fullPath = path_1.default.join(fullDir, name);
        if (isDirectory(fullPath)) {
            const child = buildNavTree([...dirSegments, name], options);
            if (child) {
                children.push(child);
            }
            return;
        }
        if (!isMarkdownFile(name) || name === "_index.md")
            return;
        const { frontMatter } = readMarkdownFile(fullPath);
        if (frontMatter.bookHidden)
            return;
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
        sortKey: computeOrderingKey(dirSegments[dirSegments.length - 1] || "", indexFrontMatter, title),
        frontMatter: indexFrontMatter,
        hasIndex,
    };
}
function getSubjectNav(subject) {
    const subjectSegments = ["notes", subject];
    return buildNavTree(subjectSegments);
}
function getAllNavSubjects() {
    const notesDir = path_1.default.join(CONTENT_ROOT, "notes");
    return listDirSafe(notesDir)
        .filter((entry) => !entry.startsWith("."))
        .filter((entry) => isDirectory(path_1.default.join(notesDir, entry)));
}
function collectAllMarkdownFiles(dir, acc = []) {
    listDirSafe(dir)
        .filter((name) => !name.startsWith("."))
        .forEach((name) => {
        const fullPath = path_1.default.join(dir, name);
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
function relativeSlugFromPath(fullPath) {
    const relative = path_1.default.relative(CONTENT_ROOT, fullPath);
    const parts = relative.split(path_1.default.sep);
    const fileName = parts.pop();
    if (!fileName)
        return [];
    if (fileName === "_index.md") {
        return parts;
    }
    const base = fileName.replace(/\.md$/, "");
    return [...parts, base];
}
function getAllSlugs() {
    const files = collectAllMarkdownFiles(CONTENT_ROOT);
    return files.map(relativeSlugFromPath);
}
async function getPageData(slugSegments = []) {
    const slug = slugSegments.filter(Boolean);
    const attempts = [];
    if (slug.length === 0) {
        attempts.push({ type: "section", fullPath: path_1.default.join(CONTENT_ROOT, "_index.md") });
    }
    else {
        const dirPath = path_1.default.join(CONTENT_ROOT, ...slug);
        attempts.push({ type: "section", fullPath: path_1.default.join(dirPath, "_index.md") });
        attempts.push({ type: "page", fullPath: `${dirPath}.md` });
    }
    for (const attempt of attempts) {
        if (!fs_1.default.existsSync(attempt.fullPath))
            continue;
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
