"use client";

export default function ChapterContent({ content }: { content: string }) {
  const paragraphs = content
    .split(/\n{1,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article>
      {paragraphs.map((p, i) =>
        p === "——" ? (
          <div key={i} className="my-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            * * *
          </div>
        ) : p.startsWith('"') || p.startsWith('“') || p.startsWith('「') ? (
          <p
            key={i}
            style={{
              fontSize: "18px",
              lineHeight: 2.2,
              letterSpacing: "0.5px",
              color: "var(--text-reading)",
              marginBottom: "1.6em",
            }}
          >
            {p}
          </p>
        ) : (
          <p
            key={i}
            style={{
              fontSize: "18px",
              lineHeight: 2.2,
              letterSpacing: "0.5px",
              color: "var(--text-reading)",
              textIndent: "2em",
              marginBottom: "1.6em",
            }}
          >
            {p}
          </p>
        )
      )}
    </article>
  );
}
