import type { PageData } from "@/lib/content";
import Sidebar, { type SubjectNav } from "./Sidebar";
import Markdown from "./Markdown";
import TableOfContents from "./TableOfContents";
import Toolbar from "./Toolbar";
import Link from "next/link";

interface PageShellProps {
  page: PageData;
  subjects: SubjectNav[];
}

export function PageShell({ page, subjects }: PageShellProps) {
  const showTitle = resolveBoolean(page.frontMatter.ShowTitle ?? page.frontMatter.showtitle, true);
  const showToc = resolveBoolean(
    page.frontMatter.BookToc ?? page.frontMatter.BookToC,
    true
  );

  return (
    <>
      <input type="checkbox" className="hidden toggle" id="menu-control" />
      <input type="checkbox" className="hidden toggle" id="toc-control" />
      <main className="container">
        <div className="book-layout">
          <aside className="book-menu">
            <div className="book-menu-content">
              <Sidebar subjects={subjects} currentSlug={page.slug} />
            </div>
          </aside>

          <div className="book-page">
            <header className="book-header">
              <div className="flex align-center justify-between">
                <label htmlFor="menu-control">
                  <img src="/svg/menu.svg" className="book-icon" alt="Menu" />
                </label>
                <h3>{page.frontMatter.title ?? ""}</h3>
                <label htmlFor="toc-control">
                  {showToc ? (
                    <img src="/svg/toc.svg" className="book-icon" alt="Table of Contents" />
                  ) : (
                    <span />
                  )}
                </label>
              </div>
            </header>

            <article className="book-article">
              {showTitle && page.frontMatter.title ? (
                <h1 style={{ textAlign: "center", fontFamily: "Computer Modern, 'CMU Serif', serif" }}>
                  {page.frontMatter.title}
                </h1>
              ) : null}
              <Markdown html={page.content.html} />
            </article>

            <footer className="book-footer">
              <div className="flex flex-wrap justify-between">
                <div>
                  <Link className="flex align-center" href="https://github.com/EriseHe/notebook" target="_blank">
                    <img src="/svg/edit.svg" className="book-icon" alt="" />
                    <span>Edit on GitHub</span>
                  </Link>
                </div>
              </div>
            </footer>

            <label htmlFor="menu-control" className="hidden book-menu-overlay" />
          </div>

          {showToc ? (
            <aside id="book-toc" className="book-toc hidden">
              <div className="book-toc-content">
                <div className="toc-entries">
                  <TableOfContents headings={page.content.headings} />
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </main>
      <Toolbar initialShowToc={showToc} />
    </>
  );
}

function resolveBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return fallback;
}

export default PageShell;
