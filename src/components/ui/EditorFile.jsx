import { useMemo } from 'react'
import { tokenize, tokenClass } from '../../utils/tokenize'

/**
 * EditorFile — renders raw file content with a proper VS Code-style gutter.
 *
 * Layout: flex row → [gutter | code-area]
 * The gutter is fixed-width, non-selectable, line numbers vertically aligned
 * to the first text row even when a line wraps.
 *
 * @param {string} code  - Raw file content (imported with ?raw)
 * @param {string} lang  - Language id: md | ts | cs | json | vue | sh
 */
export function EditorFile({ code, lang }) {
  const lines = useMemo(() => tokenize(code, lang), [code, lang])

  return (
    <div className="editor-file">
      <div className="editor-gutter" aria-hidden="true">
        {lines.map((_, i) => (
          <div key={i} className="gutter-num">{i + 1}</div>
        ))}
      </div>
      <div className="editor-code">
        {lines.map((tokens, i) => (
          <div key={i} className="code-line">
            {tokens.length === 0
              ? <span className="code-blank"> </span>
              : tokens.map((tok, j) => {
                  const cls = tokenClass(tok.type)
                  return cls
                    ? <span key={j} className={cls}>{tok.text}</span>
                    : tok.text
                })
            }
          </div>
        ))}
      </div>
    </div>
  )
}
