import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "学习笔记",
  description: "Erise's study notes rendered with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="stylesheet" href="/katex/katex.min.css" />
        <link rel="icon" href="/topo.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
