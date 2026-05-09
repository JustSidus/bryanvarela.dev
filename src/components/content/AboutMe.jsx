import { CodeBlock, tok } from '../ui/CodeBlock'

function Bold({ children }) {
  return <><span className="md-mark">**</span><span className="md-bold">{children}</span><span className="md-mark">**</span></>
}

function InlineCode({ children }) {
  return <span className="md-code">{'`'}{children}{'`'}</span>
}

export function AboutMe() {
  return (
    <div className="md raw-md">
      <CodeBlock path="about-me.json" lang="JSON">
{tok('{', 'pun')}{'\n'}
{'  '}{tok('"developer"', 'str')}{tok(':', 'pun')} {tok('"Bryan Varela"', 'str')}{tok(',', 'pun')}{'\n'}
{'  '}{tok('"role"', 'str')}{tok(':', 'pun')}      {tok('"Software Engineer"', 'str')}{tok(',', 'pun')}{'\n'}
{'  '}{tok('"focus"', 'str')}{tok(':', 'pun')}     {tok('[', 'pun')}{tok('"Backend"', 'str')}{tok(',', 'pun')} {tok('"Cloud Architecture"', 'str')}{tok(',', 'pun')} {tok('"System Design"', 'str')}{tok(']', 'pun')}{tok(',', 'pun')}{'\n'}
{'  '}{tok('"status"', 'str')}{tok(':', 'pun')}    {tok('"200 OK — Available"', 'str')}{'\n'}
{tok('}', 'pun')}
      </CodeBlock>

      <p className="md-line"><span className="md-h1-prefix">#</span> <span className="md-heading">about-me</span></p>
      <p className="md-line md-blank"></p>
      <p className="md-line">Construyo entornos seguros y resuelvo problemas.</p>
      <p className="md-line md-blank"></p>
      <p className="md-line">Tengo una base lógica fuerte y mi trabajo está orientado totalmente a la nube. Mi fuerte no es memorizar sintaxis, sino analizar arquitecturas, investigar dependencias y diseñar soluciones. Uso la inteligencia artificial como herramienta de trabajo diaria para acelerar el desarrollo y escribir código de calidad en el lenguaje que demande la infraestructura.</p>
      <p className="md-line md-blank"></p>
      <p className="md-line"><span className="md-h2-prefix">##</span> <span className="md-heading">01 Cómo trabajo</span></p>
      <p className="md-line md-blank"></p>
      <p className="md-line">Antes de tirar líneas de código, defino el problema a nivel de sistema.</p>
      <p className="md-line md-blank"></p>
      <p className="md-line"><span className="md-bullet">-</span> <Bold>Investigación técnica:</Bold> Analizo el requerimiento, evalúo los servicios disponibles y defino la arquitectura que mejor se adapte al caso de uso.</p>
      <p className="md-line"><span className="md-bullet">-</span> <Bold>Adaptabilidad:</Bold> Soy agnóstico al lenguaje. Si el backend requiere C#, Node.js o el frontend pide React, uso mi base lógica y herramientas de IA para adaptarme al stack sin perder velocidad.</p>
      <p className="md-line"><span className="md-bullet">-</span> <Bold>Enfoque Cloud:</Bold> Toda mi experiencia es nativa de la nube. Conecto y despliego servicios usando Azure, Google Cloud Run y Cloudflare, gestionando DNS, workers y contenedores.</p>
      <p className="md-line md-blank"></p>
      <p className="md-line"><span className="md-h2-prefix">##</span> <span className="md-heading">02 Prioridades técnicas</span></p>
      <p className="md-line md-blank"></p>
      <p className="md-line"><span className="md-bullet">-</span> <Bold>Seguridad:</Bold> Diseño bajo el principio de menor privilegio. Manejo el aislamiento de red, la gestión segura de secretos y la auditoría de accesos.</p>
      <p className="md-line"><span className="md-bullet">-</span> <Bold>Rendimiento:</Bold> Optimizo el uso de recursos y el tiempo de respuesta en la nube para mantener los costos controlados y evitar cuellos de botella en el servidor.</p>
      <p className="md-line"><span className="md-bullet">-</span> <Bold>Decisiones objetivas:</Bold> La arquitectura dicta la herramienta. Justifico la adopción de cada tecnología basándome en su eficiencia para el proyecto, no en preferencias personales.</p>
      <p className="md-line md-blank"></p>
      <p className="md-line"><span className="md-h2-prefix">##</span> <span className="md-heading">03 Proyectos</span></p>
      <p className="md-line md-blank"></p>
      <p className="md-line">Aquí puedes ver la documentación de cómo aplico estos conceptos en entornos reales.</p>
      <p className="md-line md-blank"></p>
      <p className="md-line md-comment">// Para ver los casos de estudio, abre <InlineCode>projects/</InlineCode> en el explorador o presiona <InlineCode>Ctrl+K</InlineCode>.<span className="read-caret"></span></p>
    </div>
  )
}