"use client";

import { useEffect, useMemo, useState } from "react";
import type { NavItem } from "@/lib/content";
import Link from "next/link";

const SUBJECT_STORAGE_KEY = "activeSubjectTab";

export interface SubjectNav {
  subject: string;
  tree: NavItem | null;
}

export interface SidebarProps {
  subjects: SubjectNav[];
  currentSlug: string[];
}

function slugEquals(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((segment, index) => segment === b[index]);
}

function slugIsAncestor(ancestor: string[], target: string[]): boolean {
  if (ancestor.length === 0) return true;
  if (ancestor.length > target.length) return false;
  return ancestor.every((segment, index) => segment === target[index]);
}

function encodeId(slug: string[]): string {
  if (slug.length === 0) return "section-root";
  return `section-${slug.map((part) => encodeURIComponent(part)).join("-")}`;
}

interface NavTreeProps {
  node: NavItem;
  currentSlug: string[];
}

function NavTree({ node, currentSlug }: NavTreeProps) {
  if (!node) return null;
  const isCurrent = slugEquals(node.slug, currentSlug);
  const isAncestor = slugIsAncestor(node.slug, currentSlug);
  const hasLink = Boolean(node.urlPath);

  return (
    <>
      {node.isSection && node.collapsible ? (
        <>
          <input
            type="checkbox"
            id={encodeId(node.slug)}
            className="toggle"
            defaultChecked={isCurrent || isAncestor}
          />
          <label htmlFor={encodeId(node.slug)} className="flex justify-between">
            {node.externalHref ? (
              <a
                className={isCurrent ? "active" : undefined}
                href={node.externalHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {node.title}
              </a>
            ) : hasLink ? (
              <Link
                href={node.urlPath!}
                className={isCurrent ? "active" : undefined}
              >
                {node.title}
              </Link>
            ) : (
              <span className={isCurrent ? "active" : undefined}>{node.title}</span>
            )}
          </label>
        </>
      ) : node.externalHref ? (
        <a
          href={node.externalHref}
          className={isCurrent ? "active" : undefined}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.title}
        </a>
      ) : hasLink ? (
        <Link
          href={node.urlPath!}
          className={isCurrent ? "active" : undefined}
        >
          {node.title}
        </Link>
      ) : (
        <span className={isCurrent ? "active" : undefined}>{node.title}</span>
      )}

      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <li
              key={child.slug.join("/") || child.title}
              className={child.flatSection ? "book-section-flat" : undefined}
            >
              <NavTree node={child} currentSlug={currentSlug} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function Sidebar({ subjects, currentSlug }: SidebarProps) {
  const availableSubjects = useMemo(
    () => subjects.filter((subject) => subject.tree !== null),
    [subjects]
  );

  const [activeSubject, setActiveSubject] = useState<string>(() => {
    if (typeof window === "undefined") return availableSubjects[0]?.subject ?? "";
    return (
      window.localStorage.getItem(SUBJECT_STORAGE_KEY) ||
      availableSubjects[0]?.subject ||
      ""
    );
  });

  useEffect(() => {
    if (!availableSubjects.some((s) => s.subject === activeSubject)) {
      setActiveSubject(availableSubjects[0]?.subject ?? "");
    }
  }, [availableSubjects, activeSubject]);

  useEffect(() => {
    if (!activeSubject) return;
    try {
      window.localStorage.setItem(SUBJECT_STORAGE_KEY, activeSubject);
    } catch (error) {
      // ignore storage errors
    }
  }, [activeSubject]);

  if (availableSubjects.length === 0) {
    return null;
  }

  return (
    <nav>
      <h2 className="book-brand">
        <Link className="flex align-center justify-center" href="/">
          <span>学习笔记</span>
        </Link>
      </h2>

      <div className="book-search">
        <input
          type="text"
          id="book-search-input"
          placeholder="Search"
          aria-label="Search"
          maxLength={64}
        />
        <div className="book-search-spinner hidden" />
        <ul id="book-search-results" />
      </div>

      <div className="subject-menu">
        <div className="subject-tabs">
          {availableSubjects.map(({ subject }) => (
            <button
              key={subject}
              className={`subject-tab${subject === activeSubject ? " active" : ""}`}
              data-subject={subject}
              onClick={() => setActiveSubject(subject)}
              type="button"
            >
              {subject}
            </button>
          ))}
        </div>

        <div className="subject-content">
          {availableSubjects.map(({ subject, tree }) => (
            <div
              key={subject}
              className={`subject-panel${subject === activeSubject ? "" : " hidden"}`}
              data-subject={subject}
            >
              {tree ? (
                <ul>
                  {tree.children.map((child) => (
                    <li
                      key={child.slug.join("/") || child.title}
                      className={child.flatSection ? "book-section-flat" : undefined}
                    >
                      <NavTree node={child} currentSlug={currentSlug} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
