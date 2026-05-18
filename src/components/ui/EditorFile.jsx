import { useMemo } from "react";
import { tokenize, tokenClass } from "../../utils/tokenize";
import { TypedLines } from "./TypedLines";

// Count leading whitespace (tabs expand to 2 cols) so wrap-continuation can
// be aligned beneath the first non-space char, mimicking VS Code wrappingIndent.
function leadingIndentWidth(tokens) {
  let count = 0;
  for (const tok of tokens) {
    for (const ch of tok.text) {
      if (ch === " ") count += 1;
      else if (ch === "\t") count += 2;
      else return count;
    }
  }
  return count;
}

function indentStyle(tokens) {
  const w = leadingIndentWidth(tokens);
  if (w === 0) return undefined;
  return { paddingLeft: `calc(16px + ${w}ch)`, textIndent: `-${w}ch` };
}

const URL_RE = /(https?:\/\/[^\s"<>)\]]+)/g;

// Render token text, wrapping any http(s) URLs as clickable links.
function renderTokenText(text, keyPrefix) {
  URL_RE.lastIndex = 0;
  if (!URL_RE.test(text)) return text;
  URL_RE.lastIndex = 0;
  const parts = [];
  let last = 0;
  let m;
  while ((m = URL_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={`${keyPrefix}-u${m.index}`}
        href={m[0]}
        target="_blank"
        rel="noreferrer noopener"
        className="code-link"
      >
        {m[0]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/**
 * EditorFile - VS Code-style file viewer with per-row line numbers.
 *
 * @param {string} code         - Raw file content (imported with ?raw)
 * @param {string} lang         - Language: md | ts | cs | json | vue | sh
 * @param {number} animateLastN - Last N lines use a typing animation
 * @param {object} snapshots    - Optional map { [lineIndex]: { component } } to
 *                                replace a directive line with a React component.
 */
export function EditorFile({ code, lang, animateLastN = 0, snapshots = {} }) {
  const lines = useMemo(() => tokenize(code, lang), [code, lang]);

  const staticLines = animateLastN > 0 ? lines.slice(0, -animateLastN) : lines;
  const animatedLines = animateLastN > 0 ? lines.slice(-animateLastN) : [];

  return (
    <div className="editor-file">
      {staticLines.map((tokens, i) => {
        const snap = snapshots[i];
        if (snap) {
          const Comp = snap.component;
          return (
            <div key={i} className="code-line snapshot-line">
              <span className="line-number" aria-hidden="true">
                {i + 1}
              </span>
              <div className="snapshot snapshot--wide">
                <Comp />
              </div>
            </div>
          );
        }
        return (
          <div key={i} className="code-line">
            <span className="line-number" aria-hidden="true">
              {i + 1}
            </span>
            <span className="line-content" style={indentStyle(tokens)}>
              {tokens.length === 0
                ? "​"
                : tokens.map((tok, j) => {
                    const cls = tokenClass(tok.type);
                    const content = renderTokenText(tok.text, `${i}-${j}`);
                    return cls ? (
                      <span key={j} className={cls}>
                        {content}
                      </span>
                    ) : (
                      <span key={j}>{content}</span>
                    );
                  })}
            </span>
          </div>
        );
      })}

      {animatedLines.length > 0 && (
        <TypedLines
          lines={animatedLines}
          lineOffset={staticLines.length}
          snapshots={snapshots}
        />
      )}
    </div>
  );
}
