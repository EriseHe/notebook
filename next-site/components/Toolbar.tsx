"use client";

import { useEffect } from "react";

interface ToolbarProps {
  initialShowToc: boolean;
}

export function Toolbar({ initialShowToc }: ToolbarProps) {
  useEffect(() => {
    const tocAside = document.getElementById("book-toc");
    if (tocAside) {
      if (initialShowToc) {
        tocAside.classList.remove("hidden");
      } else {
        tocAside.classList.add("hidden");
      }
    }

    const handleTocToggle = () => {
      const target = document.getElementById("book-toc");
      if (target) {
        target.classList.toggle("hidden");
      }
    };

    const fontState = {
      defaultSize: 16,
      currentSize: 16,
    };

    try {
      const stored = window.localStorage.getItem("bodyFontSize");
      if (stored) {
        const value = parseInt(stored, 10);
        if (!Number.isNaN(value)) {
          fontState.currentSize = value;
          document.documentElement.style.setProperty("--markdown-font-size", `${value}px`);
        }
      }
    } catch (error) {
      // no-op
    }

    const adjustFontSize = (delta: number) => {
      const nextSize = fontState.currentSize + delta;
      if (nextSize < 12 || nextSize > 24) return;
      fontState.currentSize = nextSize;
      document.documentElement.style.setProperty("--markdown-font-size", `${nextSize}px`);
      try {
        window.localStorage.setItem("bodyFontSize", String(nextSize));
      } catch (error) {
        // ignore
      }
    };

    const resetFontSize = () => {
      fontState.currentSize = fontState.defaultSize;
      document.documentElement.style.setProperty(
        "--markdown-font-size",
        `${fontState.defaultSize}px`
      );
      try {
        window.localStorage.removeItem("bodyFontSize");
      } catch (error) {
        // ignore
      }
    };

    const tocButton = document.getElementById("toc-toggle");
    const fontIncrease = document.getElementById("font-increase");
    const fontDecrease = document.getElementById("font-decrease");
    const fontReset = document.getElementById("font-reset");
    const fontToggle = document.getElementById("font-toggle");

    const increaseHandler = () => adjustFontSize(1);
    const decreaseHandler = () => adjustFontSize(-1);
    const toggleHandler = () => {
      const control = document.querySelector(".font-size-control");
      control?.classList.toggle("hovering");
    };

    tocButton?.addEventListener("click", handleTocToggle);
    fontIncrease?.addEventListener("click", increaseHandler);
    fontDecrease?.addEventListener("click", decreaseHandler);
    fontReset?.addEventListener("click", resetFontSize);
    fontToggle?.addEventListener("click", toggleHandler);

    return () => {
      tocButton?.removeEventListener("click", handleTocToggle);
      fontIncrease?.removeEventListener("click", increaseHandler);
      fontDecrease?.removeEventListener("click", decreaseHandler);
      fontReset?.removeEventListener("click", resetFontSize);
      fontToggle?.removeEventListener("click", toggleHandler);
    };
  }, [initialShowToc]);

  return (
    <>
      <div className="toolbar-trigger" />
      <aside className="toolbar">
        <button id="toc-toggle" className="toc-toggle-btn" type="button">
          <img src="/toc-icon.svg" alt="Toggle TOC" />
        </button>
        <div className="font-size-control">
          <button id="font-toggle" className="font-size-btn" type="button">
            A
          </button>
          <div className="font-size-buttons">
            <button id="font-increase" className="font-control-btn" type="button">
              +
            </button>
            <button id="font-reset" className="font-control-btn" type="button">
              A
            </button>
            <button id="font-decrease" className="font-control-btn" type="button">
              −
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Toolbar;
