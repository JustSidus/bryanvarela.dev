import { useMemo } from 'react'
import { tokenize, tokenClass } from '../../utils/tokenize'
import { TypedLines } from './TypedLines'

/**
 * EditorFile — VS Code-style file viewer with per-row line numbers.
 *
 * Each .code-line is a flex row: [line-number | line-content].
 * This guarantees the line number stays top-aligned even if word-wrap is on.
 *
 * @param {string} code        - Raw file content (imported with ?raw)
 * @param {string} lang        - Language: md | ts | cs | json | vue | sh
 * @param {number} animateLastN - Last N lines use a typing animation
 */
export function EditorFile({ code, lang, animateLastN = 0 }) {
  const lines = useMemo(() => tokenize(code, lang), [code, lang])

  const staticLines = animateLastN > 0 ? lines.slice(0, -animateLastN) : lines
  const animatedLines = animateLastN > 0 ? lines.slice(-animateLastN) : []

  return (
    <div className="editor-file">
      {staticLines.map((tokens, i) => (
        <div key={i} className="code-line">
          <span className="line-number" aria-hidden="true">{i + 1}</span>
          <span className="line-content">
            {tokens.length === 0
              ? '​'
              : tokens.map((tok, j) => {
                  const cls = tokenClass(tok.type)
                  return cls
                    ? <span key={j} className={cls}>{tok.text}</span>
                    : tok.text
                })
            }
          </span>
        </div>
      ))}

      {animatedLines.length > 0 && (
        <TypedLines
          lines={animatedLines}
          lineOffset={staticLines.length}
        />
      )}
    </div>
  )
}
