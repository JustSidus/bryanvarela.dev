/**
 * @project  Layered E-commerce — N-Tier Architecture
 * @type     Plataforma e-commerce · Arquitectura N-Tier
 * @role     Backend engineer · Diseño de capas
 * @stack    C# · ASP.NET Core · SQL Server · Redis · Docker
 */

// ── CONTEXTO ─────────────────────────────────────────────────────────────────
//
// Microservicios estaban de moda. El equipo eran 4 personas y el negocio
// cambiaba a la semana. La pregunta correcta no era "¿cómo escalo a 100
// servicios?", era "¿cómo evito que un cambio toque cinco archivos no
// relacionados?".
//
// Respuesta: cuatro capas verticales con dependencias unidireccionales,
// bordes explícitos por interfaz. Un único proceso, despliegue simple,
// pero con la disciplina interna que un sistema más grande exigiría.

// ── CAPAS · N-TIER ────────────────────────────────────────────────────────────
//
//  ┌──────────────────────────────────────────────────┐
//  │  Presentation                                    │  ← API · controllers
//  │  · request/response DTOs   · model binding       │
//  ├──────────────────────────────────────────────────┤
//  │  Application / Services                          │  ← orquestación
//  │  · use-cases  · validations  · cross-cutting     │
//  ├──────────────────────────────────────────────────┤
//  │  Domain                                          │  ← reglas del negocio
//  │  · entities  · value objects  · domain services  │
//  ├──────────────────────────────────────────────────┤
//  │  Infrastructure / Data                           │  ← persistencia
//  │  · repositories  · EF Core  · email · storage    │
//  └──────────────────────────────────────────────────┘
//           ▲ las dependencias apuntan hacia ARRIBA

// ── REGLAS DE ORO ─────────────────────────────────────────────────────────────
//
// · Domain no referencia infraestructura.
//   Si necesita persistir algo, define la interfaz; otro la implementa.
// · Cada capa expone DTOs propios.
//   Las entidades no se filtran al API ni a la UI.
// · Application orquesta, no decide reglas.
//   Las reglas viven en Domain. Application las invoca.
// · Una transacción por caso de uso.
//   Si necesitas dos, probablemente son dos casos de uso.

// ── DOMAIN ENTITY (ejemplo) ───────────────────────────────────────────────────

namespace Ecommerce.Domain.Entities;

public sealed class Order
{
    private readonly List<OrderLine> _lines = new();

    public Guid        Id     { get; private set; }
    public OrderStatus Status { get; private set; }
    public IReadOnlyList<OrderLine> Lines => _lines;

    // el dominio se protege a sí mismo — sin setters públicos
    public void AddLine(ProductRef product, int qty)
    {
        if (Status != OrderStatus.Draft)
            throw new DomainException("order is not draft");

        _lines.Add(new OrderLine(product, qty));
    }

    public void Submit()
    {
        if (!_lines.Any())
            throw new DomainException("cannot submit empty order");

        Status = OrderStatus.Submitted;
    }
}

// ── RESULTADO ─────────────────────────────────────────────────────────────────
//
// · Cuatro features nuevas en un trimestre, sin romper el catálogo existente.
// · Tests unitarios reales en la capa Domain — sin mocks de base de datos.
// · Tres meses después, separar el módulo de pagos a un servicio aparte costó
//   dos días: las dependencias ya estaban del lado correcto.

// REFLEXIÓN: N-Tier no está pasado de moda. Es la arquitectura que más se
// justifica cuando el negocio aún está aprendiendo qué quiere ser. Cuando el
// dolor de escalar es real, ya tienes los bordes para cortar.

// stack: C# · ASP.NET Core · SQL Server · Redis · Docker · N-Tier · Clean Arch
