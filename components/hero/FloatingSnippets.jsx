"use client";

import { useEffect, useState } from "react";

const snippets = [
  {
    code: `const portfolio = {
  name: "Akhil Kumar Reddy Ambati",
  stack: ["React", "Next.js", "Node.js"]
};`,
    x: "8%",
    y: "15%",
    duration: 25,
    delay: 0,
  },
  {
    code: `export default function Portfolio() {
  return <Projects />;
}`,
    x: "80%",
    y: "12%",
    duration: 30,
    delay: 2,
  },
  {
    code: `app.use("/api/projects", projectRoutes);`,
    x: "5%",
    y: "75%",
    duration: 22,
    delay: 5,
  },
  {
    code: `const response = await fetch("/api/ai", {
  method: "POST",
  body: JSON.stringify({ prompt })
});`,
    x: "78%",
    y: "70%",
    duration: 28,
    delay: 1,
  },
  {
    code: `export async function GET() {
  const data = await getDbStats();
  return NextResponse.json(data);
}`,
    x: "45%",
    y: "85%",
    duration: 35,
    delay: 4,
  },
];

export default function FloatingSnippets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes drift {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .floating-snippet {
          animation: drift ease-in-out infinite;
        }
      `}</style>
      {snippets.map((snip, index) => (
        <div
          key={index}
          className="floating-snippet"
          style={{
            position: "absolute",
            left: snip.x,
            top: snip.y,
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            lineHeight: "1.5",
            color: "var(--text-secondary)",
            opacity: 0.04,
            whiteSpace: "pre",
            animationDuration: `${snip.duration}s`,
            animationDelay: `${snip.delay}s`,
            filter: "blur(0.5px)",
            userSelect: "none",
          }}
        >
          {snip.code.split("\n").map((line, lineIdx) => {
            // Simple syntax highlighting representation for floating blocks
            let highlightedLine = line
              .replace(/(const|let|var|export|default|function|return|import|from|async|await)/g, '<span class="syntax-keyword">$1</span>')
              .replace(/(true|false|null)/g, '<span class="syntax-number">$1</span>')
              .replace(/(["'`].*?["'`])/g, '<span class="syntax-string">$1</span>')
              .replace(/(\w+)(?=\s*\()/g, '<span class="syntax-function">$1</span>')
              .replace(/(&lt;\w+|&lt;\/\w+|&gt;|\/>)/g, '<span class="syntax-tag">$1</span>');

            return (
              <div
                key={lineIdx}
                dangerouslySetInnerHTML={{ __html: highlightedLine }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
