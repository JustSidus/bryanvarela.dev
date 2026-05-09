import React from 'react'
import { Frontmatter } from '../ui/Frontmatter'
import { KeyValue } from '../ui/KeyValue'

/**
 * AboutMe — portfolio "about me" section.
 * To update contact info, edit src/data/contact.js.
 */
export function AboutMe() {
  return (
    <div className="md">
      <Frontmatter entries={[
        { key: 'name', value: 'Bryan Varela' },
        { key: 'role', value: 'Software Engineer', accent: true },
        { key: 'focus', value: 'Backend · Infraestructura Cloud · Diseño de sistemas' },
        { key: 'stack', value: 'C# · .NET 10 · React · Azure · Cloud Run · Cloudflare' },
        { key: 'status', value: 'Disponible para roles backend / cloud', statusDot: 'var(--ok)' },
      ]} />

      <h1>
        <span className="h1-prefix"># about-me</span>
        Construyo entornos seguros y resuelvo problemas.
      </h1>
      <p className="lede">
        Tengo una base lógica fuerte y mi trabajo está orientado totalmente a la nube.
        Mi fuerte no es memorizar sintaxis, sino analizar arquitecturas, investigar
        dependencias y diseñar soluciones. Uso la inteligencia artificial como herramienta
        de trabajo diaria para acelerar el desarrollo y escribir código de calidad en
        el lenguaje que demande la infraestructura.
      </p>

      <h2><span className="num">01</span>Cómo trabajo</h2>
      <p>
        Antes de tirar líneas de código, defino el problema a nivel de sistema.
      </p>
      <ul>
        <li><strong>Investigación técnica:</strong> Analizo el requerimiento, evalúo los servicios disponibles y defino la arquitectura que mejor se adapte al caso de uso.</li>
        <li><strong>Adaptabilidad:</strong> Soy agnóstico al lenguaje. Si el backend requiere C#, Node.js o el frontend pide React, uso mi base lógica y herramientas de IA para adaptarme al stack sin perder velocidad.</li>
        <li><strong>Enfoque Cloud:</strong> Toda mi experiencia es nativa de la nube. Conecto y despliego servicios usando Azure, Google Cloud Run y Cloudflare, gestionando DNS, workers y contenedores.</li>
      </ul>

      <h2><span className="num">02</span>Prioridades técnicas</h2>
      <ul>
        <li><strong>Seguridad:</strong> Diseño bajo el principio de menor privilegio. Manejo el aislamiento de red, la gestión segura de secretos y la auditoría de accesos.</li>
        <li><strong>Rendimiento:</strong> Optimizo el uso de recursos y el tiempo de respuesta en la nube para mantener los costos controlados y evitar cuellos de botella en el servidor.</li>
        <li><strong>Decisiones objetivas:</strong> La arquitectura dicta la herramienta. Justifico la adopción de cada tecnología basándome en su eficiencia para el proyecto, no en preferencias personales.</li>
      </ul>

      <h2><span className="num">03</span>Proyectos</h2>
      <p>
        Aquí puedes ver la documentación de cómo aplico estos conceptos en entornos reales.
      </p>
      <p style={{ color: 'var(--fg-3)', fontSize: 13.5, marginTop: 28 }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>// </span>
        Para ver los casos de estudio, abre <code>projects/</code> en el explorador o presiona{' '}
        <code>Ctrl+K</code>.<span className="read-caret"></span>
      </p>
    </div>
  )
}