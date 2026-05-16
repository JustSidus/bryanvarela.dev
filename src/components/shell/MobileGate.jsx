import { contact } from '../../data/contact'

export function MobileGate() {
  return (
    <div className="mobile-gate">
      <div className="mobile-gate__terminal">
        <div className="mobile-gate__line mobile-gate__comment">// bryanvarela.dev</div>
        <div className="mobile-gate__line mobile-gate__comment">// Este portfolio es una IDE interactiva.</div>
        <div className="mobile-gate__line mobile-gate__comment">//</div>
        <div className="mobile-gate__line mobile-gate__comment">// No está diseñado para pantallas pequeñas.</div>
        <div className="mobile-gate__line mobile-gate__comment">// Ábrelo desde tu computadora para la</div>
        <div className="mobile-gate__line mobile-gate__comment">// experiencia completa.</div>
        <div className="mobile-gate__line">&nbsp;</div>
        <div className="mobile-gate__links">
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${contact.email}`}>Email</a>
        </div>
      </div>
    </div>
  )
}