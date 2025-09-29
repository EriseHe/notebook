import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllSlugs,
  getAllNavSubjects,
  getPageData,
  getSubjectNav,
} from "@/lib/content";
import PageShell from "@/components/PageShell";

function orderedSubjects(): string[] {
  const subjects = getAllNavSubjects();
  const preferred = ["理论", "计算"];
  const ordered = [...preferred.filter((subject) => subjects.includes(subject))];
  subjects.forEach((subject) => {
    if (!ordered.includes(subject)) {
      ordered.push(subject);
    }
  });
  return ordered;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const page = await getPageData(params.slug ?? []);
  if (!page) {
    return { title: "学习笔记" };
  }
  const title = page.frontMatter.title || "学习笔记";
  return {
    title: `${title} | 学习笔记`,
  };
}

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = await getPageData(params.slug ?? []);
  if (!page) {
    notFound();
  }

  const subjects = orderedSubjects().map((subject) => ({
    subject,
    tree: getSubjectNav(subject),
  }));

  return <PageShell page={page} subjects={subjects} />;
}
