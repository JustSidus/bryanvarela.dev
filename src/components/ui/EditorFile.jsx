import { useMemo, useState } from 'react'
import { tokenize, tokenClass } from '../../utils/tokenize'
import { TypedLines } from './TypedLines'

function SnapshotImage({ src, alt }) {
  const [error, setError] = useState(false)

  return (
    <div className="snapshot">
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setError(true)}
        />
      )}
      {error && (
        <div className="snapshot-fallback">
          <span className="snapshot-badge">UI SNAPSHOT</span>
          <span className="snapshot-label">{alt}</span>
        </div>
      )}
    </div>
  )
}

/**
 * EditorFile — VS Code-style file viewer with per-row line numbers.
 *
 * Each .code-line is a flex row: [line-number | line-content].
 * This guarantees the line number stays top-aligned even if word-wrap is on.
 *
 * @param {string} code        - Raw file content (imported with ?raw)
 * @param {string} lang        - Language: md | ts | cs | json | vue | sh
 * @param {number} animateLastN - Last N lines use a typing animation
 * @param {object} snapshots   - Optional map of { [lineIndex]: Snapshot }
 *        Snapshot: { type: 'image', src, alt } | { type: 'component', component, alt }
 */
export function EditorFile({ code, lang, animateLastN = 0, snapshots = {} }) {
  const lines = useMemo(() => tokenize(code, lang), [code, lang])

  const staticLines = animateLastN > 0 ? lines.slice(0, -animateLastN) : lines
  const animatedLines = animateLastN > 0 ? lines.slice(-animateLastN) : []

  return (
    <div className="editor-file">
      {staticLines.map((tokens, i) => {
        const snap = snapshots[i]
        if (snap) {
          if (snap.type === 'component') {
            const Comp = snap.component
            return (
              <div key={i} className="code-line snapshot-line">
                <span className="line-number" aria-hidden="true">·</span>
                <div className="snapshot snapshot--wide">
                  <Comp />
                </div>
              </div>
            )
          }
          return (
            <div key={i} className="code-line snapshot-line">
              <span className="line-number" aria-hidden="true">·</span>
              <SnapshotImage src={snap.src} alt={snap.alt} />
            </div>
          )
        }
        return (
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
                  })}
            </span>
          </div>
        )
      })}

      {animatedLines.length > 0 && (
        <TypedLines
          lines={animatedLines}
          lineOffset={staticLines.length}
          snapshots={snapshots}
        />
      )}
    </div>
  )
}
