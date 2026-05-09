import { Frontmatter } from '../ui/Frontmatter'
import { CodeBlock, tok } from '../ui/CodeBlock'
import { Diagram } from '../ui/Diagram'
import { Callout } from '../ui/Callout'
import { Chips } from '../ui/Chips'
import { projects } from '../../data/projects'

/**
 * LayeredEcommerce — case study for the N-Tier e-commerce platform.
 * Structured data (frontmatter, chips) comes from src/data/projects.js.
 */
export function LayeredEcommerce() {
  const data = projects.layeredEcommerce

  return (
    <div className="md">
      <Frontmatter entries={data.frontmatter} />

      <h1>
        <span className="h1-prefix">// case-study</span>
        E-commerce N-Tier — separar para sostener
      </h1>
      <p className="lede">
        Caso de estudio sobre cómo una arquitectura en capas bien cortada
        permitió que un equipo pequeño sostuviera un catálogo creciente, sin
        caer en microservicios prematuros.
      </p>

      <h2><span className="num">01</span>Por qué N-Tier</h2>
      <p>
        Microservicios estaban de moda. El equipo eran 4 personas y el negocio
        cambiaba a la semana. La pregunta correcta no era "¿cómo escalo a 100
        servicios?", era "¿cómo evito que un cambio toque cinco archivos no
        relacionados?".
      </p>
      <p>
        Respuesta: cuatro capas verticales con dependencias unidireccionales,
        bordes explícitos por interfaz. Un único proceso, despliegue simple,
        pero con la disciplina interna que un sistema más grande exigiría.
      </p>

      <Diagram label="capas · n-tier">
{`
   ┌──────────────────────────────────────────────────┐
   │  Presentation                                    │  ← API · controllers
   │  · request/response DTOs   · model binding       │
   ├──────────────────────────────────────────────────┤
   │  Application / Services                          │  ← orquestación
   │  · use-cases  · validations  · cross-cutting     │
   ├──────────────────────────────────────────────────┤
   │  Domain                                          │  ← reglas del negocio
   │  · entities  · value objects  · domain services  │
   ├──────────────────────────────────────────────────┤
   │  Infrastructure / Data                           │  ← persistencia
   │  · repositories  · EF Core  · email · storage    │
   └──────────────────────────────────────────────────┘
            ▲ las dependencias apuntan hacia ARRIBA
`}
      </Diagram>

      <h2><span className="num">02</span>Reglas de oro</h2>
      <ul>
        <li><strong>Domain no referencia infraestructura.</strong> Si necesita persistir algo, define la interfaz; otro la implementa.</li>
        <li><strong>Cada capa expone DTOs propios.</strong> Las entidades no se filtran al API ni a la UI.</li>
        <li><strong>Application orquesta, no decide reglas.</strong> Las reglas viven en Domain. Application las invoca.</li>
        <li><strong>Una transacción por caso de uso.</strong> Si necesitas dos, probablemente son dos casos de uso.</li>
      </ul>

      <CodeBlock path="domain/entities/Order.cs" lang="C#">
        {tok('public sealed class', 'key')} {tok('Order', 'typ')}{'\n'}
        {'{'}{'\n'}
        {'    '}{tok('private readonly', 'key')} {tok('List', 'typ')}{tok('<', 'pun')}{tok('OrderLine', 'typ')}{tok('>', 'pun')} _lines {tok('=', 'pun')} {tok('new', 'key')}();{'\n\n'}
        {'    '}{tok('public', 'key')} {tok('Guid', 'typ')} Id {'{'} {tok('get', 'key')}; {tok('private set', 'key')}; {'}'}{'\n'}
        {'    '}{tok('public', 'key')} {tok('OrderStatus', 'typ')} Status {'{'} {tok('get', 'key')}; {tok('private set', 'key')}; {'}'}{'\n'}
        {'    '}{tok('public', 'key')} {tok('IReadOnlyList', 'typ')}{tok('<', 'pun')}{tok('OrderLine', 'typ')}{tok('>', 'pun')} Lines {'=> _lines;'}{'\n\n'}
        {'    '}{tok('// el dominio se protege a sí mismo — sin setters públicos', 'com')}{'\n'}
        {'    '}{tok('public void', 'key')} {tok('AddLine', 'fn')}({tok('ProductRef', 'typ')} product, {tok('int', 'typ')} qty){'\n'}
        {'    {'}{'\n'}
        {'        '}{tok('if', 'key')} (Status {tok('!=', 'pun')} {tok('OrderStatus', 'typ')}.Draft){'\n'}
        {'            '}{tok('throw new', 'key')} {tok('DomainException', 'typ')}({tok('"order is not draft"', 'str')});{'\n'}
        {'        '}_lines.{tok('Add', 'fn')}({tok('new', 'key')} {tok('OrderLine', 'typ')}(product, qty));{'\n'}
        {'    }'}{'\n'}
        {'}'}
      </CodeBlock>

      <h2><span className="num">03</span>Resultado</h2>
      <ul>
        <li>Cuatro features nuevas en un trimestre, sin romper el catálogo existente.</li>
        <li>Tests unitarios reales en la capa Domain — sin mocks de base de datos.</li>
        <li>Tres meses después, separar el módulo de pagos a un servicio aparte costó dos días: las dependencias ya estaban del lado correcto.</li>
      </ul>

      <Callout header="// reflexión">
        N-Tier no está pasado de moda. Es la arquitectura que más se justifica
        cuando el negocio aún está aprendiendo qué quiere ser. Cuando el dolor
        de escalar es real, ya tienes los bordes para cortar.
      </Callout>

      <Chips items={data.chips} />
    </div>
  )
}