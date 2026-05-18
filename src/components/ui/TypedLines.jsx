import { useState, useEffect, useRef, useMemo } from "react";
import { tokenClass } from "../../utils/tokenize";

function tokensToText(tokens) {
  return tokens.map((t) => t.text).join("");
}

/**
 * TypedLines - renders lines with a character-by-character typing animation.
 * Starts when the component enters the viewport (IntersectionObserver).
 * Shows a blinking block cursor on the last line after typing finishes.
 */
export function TypedLines({ lines, lineOffset = 0 }) {
  const ref = useRef(null);
  const [visibleChars, setVisibleChars] = useState(0);

  const { plainLines, lineStarts, totalChars } = useMemo(() => {
    const pl = lines.map(tokensToText);
    const ls = [0];
    pl.forEach((l) => ls.push(ls[ls.length - 1] + l.length + 1)); // +1 for \n separator
    return { plainLines: pl, lineStarts: ls, totalChars: ls[pl.length] - 1 };
  }, [lines]);

  useEffect(() => {
    const el = ref.current;
    if (!el || totalChars === 0) return;

    let count = 0;
    const timers = [];
    let running = false;

    function type() {
      // advance 1–2 chars per tick for realistic feel
      count = Math.min(count + 1 + Math.floor(Math.random() * 2), totalChars);
      setVisibleChars(count);
      if (count < totalChars) {
        const id = setTimeout(type, 12 + Math.random() * 28);
        timers.push(id);
      }
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          obs.disconnect();
          const id = setTimeout(type, 350);
          timers.push(id);
        }
      },
      { threshold: 0.3 },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [totalChars]);

  const isDone = visibleChars >= totalChars;

  return (
    <div ref={ref}>
      {lines.map((tokens, lineIdx) => {
        const lineText = plainLines[lineIdx];
        const lineStart = lineStarts[lineIdx];
        const lineLen = lineText.length;
        const charsToShow = Math.max(
          0,
          Math.min(visibleChars - lineStart, lineLen),
        );
        const isTypingThisLine =
          visibleChars > lineStart && visibleChars < lineStart + lineLen;
        const isLastLine = lineIdx === lines.length - 1;
        const showCursor = isTypingThisLine || (isDone && isLastLine);

        let content;
        if (charsToShow >= lineLen && lineLen > 0) {
          // Fully typed - render with syntax highlighting
          content = tokens.map((tok, j) => {
            const cls = tokenClass(tok.type);
            return cls ? (
              <span key={j} className={cls}>
                {tok.text}
              </span>
            ) : (
              tok.text
            );
          });
        } else if (charsToShow > 0) {
          // Mid-type - plain text slice (no partial token coloring)
          content = lineText.slice(0, charsToShow);
        } else {
          content = "​"; // zero-width space to keep line height
        }

        return (
          <div key={lineIdx} className="code-line">
            <span className="line-number" aria-hidden="true">
              {lineOffset + lineIdx + 1}
            </span>
            <span className="line-content">
              {content}
              {showCursor && (
                <span
                  className={
                    isDone ? "typed-cursor typed-cursor--blink" : "typed-cursor"
                  }
                />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
