"use client";

import { useEffect } from "react";

type MarkdownProps = {
  html: string;
};

function processTheoremBlocks(root: ParentNode) {
  const blockquotes = root.querySelectorAll<HTMLQuoteElement>("blockquote");

  blockquotes.forEach((blockquote) => {
    const firstParagraph = blockquote.querySelector<HTMLParagraphElement>("p");
    if (!firstParagraph) return;

    const originalHTML = firstParagraph.getAttribute("data-raw") || firstParagraph.innerHTML;
    const textOnly = originalHTML.replace(/<[^>]*>/g, "").trim();
    const definitions = ["definition", "proposition", "lemma", "theorem", "assumption", "claim"];

    for (const type of definitions) {
      const markerRe = new RegExp(String.raw`^\s*\[!${type}\|(\*|[\w\.\-]+)\]\s*`, "i");
      const match = textOnly.match(markerRe);
      if (!match) continue;

      if (blockquote.classList.contains("math-theorem")) {
        break;
      }

      const hasNumber = match[1] !== "*";
      const number = hasNumber ? match[1] : "";

      const plainText = originalHTML.replace(/<[^>]*>/g, "");
      const lines = plainText.split(/\n/);
      const firstLine = lines[0] || "";
      const subtitle = firstLine.replace(markerRe, "").trim();

      const existingChildren = Array.from(blockquote.childNodes);
      blockquote.innerHTML = "";
      blockquote.classList.add("math-theorem", type);

      const header = document.createElement("div");
      header.className = "theorem-header";
      const left = document.createElement("span");
      const capitalised = type.charAt(0).toUpperCase() + type.slice(1);
      left.textContent = hasNumber ? `${capitalised} ${number}` : capitalised;
      header.appendChild(left);

      if (subtitle) {
        const right = document.createElement("span");
        right.className = "theorem-subtitle";
        right.textContent = ` (${subtitle})`;
        header.appendChild(right);
      }

      blockquote.appendChild(header);

      const content = document.createElement("div");
      content.className = "theorem-content";

      existingChildren.forEach((node) => {
        const clone = node.cloneNode(true);
        if (node === firstParagraph && clone instanceof HTMLElement) {
          const paragraphLines = plainText.split(/\n/);
          if (paragraphLines.length > 1) {
            const bodyLines = paragraphLines.slice(1);
            const body = bodyLines.join("\n").trim();
            if (body) {
              clone.innerHTML = "";
              clone.appendChild(document.createTextNode(body));
            } else {
              return;
            }
          } else {
            const cleaned = firstLine.replace(markerRe, "").trim();
            if (cleaned) {
              clone.innerHTML = "";
              clone.appendChild(document.createTextNode(cleaned));
            } else {
              return;
            }
          }
        }
        content.appendChild(clone);
      });

      blockquote.appendChild(content);
      break;
    }
  });
}

export function Markdown({ html }: MarkdownProps) {
  useEffect(() => {
    const root = document;
    processTheoremBlocks(root);
    enhanceCodeBlocks(root);
  }, [html]);

  return (
    <div
      className="markdown posts"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function enhanceCodeBlocks(root: ParentNode) {
  const codeBlocks = root.querySelectorAll<HTMLPreElement>("pre");

  codeBlocks.forEach((pre) => {
    if (pre.parentElement && pre.parentElement.classList.contains("code-block")) {
      return;
    }

    const code = pre.querySelector("code");
    if (!code || !pre.parentElement) return;

    const wrapper = document.createElement("div");
    wrapper.className = "code-block";

    pre.parentElement.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.className = "copy-button";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        const previous = button.textContent;
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = previous;
        }, 1500);
      } catch (error) {
        button.textContent = "Error";
        setTimeout(() => {
          button.textContent = "Copy";
        }, 1500);
      }
    });

    wrapper.appendChild(button);
  });
}

export default Markdown;
