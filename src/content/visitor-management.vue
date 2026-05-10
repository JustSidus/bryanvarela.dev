<template>
  <!--
    @project   Visitor Management System
    @type      Aplicación interna · gestión de accesos
    @role      Full-stack engineer
    @stack     Vue 3 · TypeScript · .NET · SQL Server · Azure
    @tiempo-registro  ~28s
    @roles     3 — recepción / anfitrión / guardia
    @trazabilidad     100% QR
  -->

  <!--
    CONTEXTO
    ════════
    Edificio corporativo con ~600 personas y volumen alto de visitas.
    El proceso vivía en una libreta y un walkie-talkie. Tres dolores:
    registro lento, sin trazabilidad y sin forma confiable de avisar al anfitrión.

    DISEÑO
    ══════
    Tres apps que comparten el mismo backend, pensadas como flujos cortos —
    no como dashboards. Cada rol ve solo lo que necesita.

    · Recepción  — formulario rápido, foto opcional, genera QR y dispara
                   notificación al anfitrión.
    · Anfitrión  — ve sus visitas del día, puede pre-registrar (la visita
                   llega y solo enseña QR).
    · Guardia    — escanea QR, valida estado, registra entrada/salida.
                   Funciona offline-first.

    FLUJO · CHECK-IN
    ════════════════

    visitante          recepción            backend          anfitrión
        │                   │                   │                 │
        │  se presenta       │                   │                 │
        │ ──────────────►    │                   │                 │
        │                    │  POST /visits      │                 │
        │                    │ ─────────────────► │                 │
        │                    │                   │  push + email   │
        │                    │                   │ ──────────────► │
        │                    │ ◄──── QR ──────── │                 │
        │ ◄── QR + badge ─── │                   │                 │
        │                                                          │
        │                                        guardia escanea   │
        │ ──────────────────────────────────────────►  GET /visit/:qr
        │                                         ◄── 200 · activa ─
  -->
</template>

<script setup lang="ts">
// ── DETALLES QUE IMPORTARON ───────────────────────────────────────────────────

// Offline-first en la app del guardia
// IndexedDB cache de las visitas activas; sincroniza cada 30s.
// Si cae la red, el portón sigue abriendo a quien tenía QR válido.

const useVisitCache = () => {
  const db = openIndexedDB('visits-cache', 1)

  const sync = async () => {
    const active = await fetch('/api/visits/active').then(r => r.json())
    await db.put('visits', active)
  }

  // sincronizar cada 30s en background
  setInterval(sync, 30_000)

  const validate = async (qr: string): Promise<VisitStatus> => {
    const cached = await db.get('visits', qr)
    return cached ?? { status: 'unknown', offline: true }
  }

  return { validate }
}

// Auditoría inmutable
// Cada cambio de estado va a una tabla append-only con hash encadenado.
// Útil para incidentes y para cumplir auditoría interna.

interface AuditEntry {
  id:         string
  visitId:    string
  action:     'CHECK_IN' | 'CHECK_OUT' | 'DENIED' | 'PRE_REGISTER'
  actor:      string
  timestamp:  string
  prevHash:   string   // hash del entry anterior — cadena inmutable
  hash:       string
}

// Notificaciones que llegan
// Email + Teams + push web. Si una vía falla, las otras toman el relevo.
// Se mide cuál llegó primero por canal.

const NOTIFICATION_CHANNELS = ['email', 'teams', 'push'] as const

async function notifyHost(visitId: string, hostId: string) {
  const results = await Promise.allSettled(
    NOTIFICATION_CHANNELS.map(channel =>
      sendNotification({ channel, visitId, hostId })
    )
  )
  // al menos un canal debe llegar — si todos fallan, alertar
  const anySuccess = results.some(r => r.status === 'fulfilled')
  if (!anySuccess) await escalate(visitId)
}
</script>

<!-- stack: Vue 3 · TypeScript · .NET · SQL Server · Azure App Service · SignalR -->
