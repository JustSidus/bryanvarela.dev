<template>
  <article class="proyecto">
    <header>
      <h2>{{ proyecto.titulo }}</h2>
      <p class="meta">{{ proyecto.rol }} · {{ proyecto.estado }}</p>
      <p class="stack">{{ proyecto.stack }}</p>
    </header>

    <section v-for="bloque in bloques" :key="bloque.titulo">
      <h3>{{ bloque.titulo }}</h3>
      <p>{{ bloque.contenido }}</p>
    </section>

    <section>
      <h3>Flujo de autenticación</h3>
      <ol>
        <li v-for="paso in authFlow" :key="paso.numero">
          <strong>{{ paso.actor }}</strong> — {{ paso.accion }}
        </li>
      </ol>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PasoAuth {
  numero: number
  actor:  'Frontend' | 'Microsoft' | 'Laravel'
  accion: string
}

const proyecto = {
  titulo: 'Visitor Management System',
  rol:    'Full-stack engineer · Pasantía CONANI (sep–dic 2025)',
  estado: 'Entregado en producción a la agencia',
  stack:  'Laravel (PHP 8) · Vue 3 · MSAL · Microsoft Entra ID · Azure · MySQL',

  contexto: `Edificio gubernamental con cientos de visitas diarias registradas en una libreta de papel. El proceso era lento, sin trazabilidad y sin forma de validar quién estaba dentro en tiempo real. Lo reemplacé por una SPA con API REST y autenticación corporativa.`,

  decisionTecnicaClave: `SSO empresarial sin acoplar la app al proveedor de identidad. El cliente exigía login con Microsoft 365, pero si toda la autorización dependía del token de Microsoft, cada llamada al backend hacía round-trip a Entra ID y migrar de proveedor en el futuro hubiera sido reescribir la mitad del backend. La salida: dos tokens, dos responsabilidades.`,

  controlDeAcceso: `Cuatro roles (recepcionista, anfitrión, guardia, admin) con permisos definidos en el JWT. Las guardas del router en Vue y el middleware de Laravel comparten la misma fuente de verdad: el claim 'role' del JWT.`,

  impacto: `Reemplazó el registro en papel. Auditoría real, validación en segundos, y el guardia deja de depender del walkie-talkie para avisar al anfitrión.`,
} as const

const bloques = computed(() => [
  { titulo: 'Contexto',                       contenido: proyecto.contexto },
  { titulo: 'Decisión técnica que importó',   contenido: proyecto.decisionTecnicaClave },
  { titulo: 'Control de acceso',              contenido: proyecto.controlDeAcceso },
  { titulo: 'Impacto',                        contenido: proyecto.impacto },
])

const authFlow: readonly PasoAuth[] = [
  { numero: 1, actor: 'Frontend',  accion: 'Autentica con MSAL contra Microsoft Entra ID' },
  { numero: 2, actor: 'Microsoft', accion: 'Devuelve un access_token (prueba de identidad)' },
  { numero: 3, actor: 'Laravel',   accion: 'Valida el token contra los JWKS de Microsoft' },
  { numero: 4, actor: 'Laravel',   accion: 'Provisiona o sincroniza el usuario interno' },
  { numero: 5, actor: 'Laravel',   accion: 'Emite un JWT propio con scope y claims controlados' },
  { numero: 6, actor: 'Frontend',  accion: 'Usa el JWT propio para todas las llamadas siguientes' },
]

export const REPO = 'https://github.com/JustSidus/gestion-visitas-demo'
</script>
