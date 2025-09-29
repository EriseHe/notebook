import type { HeadingEntry } from "@/lib/content";

interface TocItem {
  id: string;
  title: string;
  depth: number;
  children: TocItem[];
}

function buildTocTree(headings: HeadingEntry[]): TocItem[] {
  const stack: TocItem[] = [];
  const roots: TocItem[] = [];

  headings.forEach((heading) => {
    const node: TocItem = { ...heading, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }

    stack.push(node);
  });

  return roots;
}

function TocList({ items }: { items: TocItem[] }) {
  if (!items.length) return null;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className={`toc-level-${item.depth}`}>
          <a href={`#${item.id}`}>{item.title}</a>
          <TocList items={item.children} />
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({ headings }: { headings: HeadingEntry[] }) {
  if (!headings.length) return null;
  const tree = buildTocTree(headings);

  return (
    <nav id="TableOfContents">
      <TocList items={tree} />
    </nav>
  );
}

export default TableOfContents;
