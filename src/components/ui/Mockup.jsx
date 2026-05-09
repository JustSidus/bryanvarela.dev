/**
 * Mockup — displays a placeholder for a screenshot or diagram.
 *
 * @param {string} label - Type label (e.g. "mockup · placeholder")
 * @param {string} desc - Description of what the mockup shows
 * @param {string} meta - Size info (e.g. "1440 × 900")
 */
export function Mockup({ label, desc, meta }) {
  return (
    <div className="mockup">
      <div>
        <div className="label">{label}</div>
        <div className="desc">{desc}</div>
      </div>
      <div className="meta">{meta}</div>
    </div>
  )
}