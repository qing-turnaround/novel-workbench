"use client";

import Markdown from "react-markdown";

export default function ChapterContent({ content }: { content: string }) {
  return (
    <article className="prose prose-invert max-w-none leading-8">
      <Markdown>{content}</Markdown>
    </article>
  );
}
