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
          <div key={i} className="my-10 text-center text-sm" style={{ color: "#bbb" }}>
            * * *
          </div>
        ) : p.startsWith('"') || p.startsWith('“') || p.startsWith('「') ? (
          <p
            key={i}
            style={{
              fontSize: "18px",
              lineHeight: 2.2,
              letterSpacing: "0.5px",
              color: "#3a3630",
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
              color: "#3a3630",
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
