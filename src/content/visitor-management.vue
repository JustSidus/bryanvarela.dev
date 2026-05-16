<template>
  <!--
    visitor-management.vue
    Sistema de gestión de visitas · agencia gubernamental (cliente real, sanitizado)
    Pasantía CONANI · septiembre - diciembre 2025

    Repo público sanitizado:
    https://github.com/JustSidus/gestion-visitas-demo
  -->
</template>

<script setup lang="ts">
// CONTEXTO ───────────────────────────────────────────────────────────────────
//
// Edificio gubernamental con cientos de visitas diarias registradas en una
// libreta de papel. El proceso era lento, sin trazabilidad y sin forma de
// validar quién estaba dentro en tiempo real. Lo reemplacé por una SPA con
// API REST y autenticación corporativa.

interface Proyecto {
  rol:    'Full-stack engineer'
  stack:  ['Laravel', 'Vue 3', 'MSAL', 'Microsoft Entra ID', 'Azure', 'MySQL']
  estado: 'Entregado en producción a la agencia'
}

// DECISIÓN TÉCNICA QUE IMPORTÓ ───────────────────────────────────────────────
//
// SSO empresarial sin acoplar la app al proveedor de identidad.
//
// El cliente exigía login con la cuenta corporativa de Microsoft 365. La
// trampa: si toda la autorización se hacía con el token de Microsoft, cada
// llamada al backend dependía de un round-trip a Entra ID y migrar de
// proveedor en el futuro hubiera sido reescribir la mitad del backend.
//
// Diseño que terminé usando: dos tokens, dos responsabilidades.

const authFlow = {
  paso_1: 'Frontend autentica con MSAL contra Microsoft Entra ID',
  paso_2: 'Recibe un access_token de Microsoft (prueba de identidad)',
  paso_3: 'Backend Laravel valida el token contra los JWKS de Microsoft',
  paso_4: 'Provisiona o sincroniza el usuario interno',
  paso_5: 'Emite un JWT propio, con scope y claims controlados por nosotros',
  paso_6: 'El frontend usa el JWT propio para todas las llamadas siguientes',
}

// Resultado: Microsoft Entra ID maneja la identidad, Laravel maneja la
// autorización. Cambiar de proveedor solo toca el paso 1-3.

// RBAC ───────────────────────────────────────────────────────────────────────
//
// Cuatro roles, cada uno con permisos definidos en el JWT. Las guardas
// del router en Vue y el middleware de Laravel comparten la misma fuente
// de verdad — el claim `role` del JWT.

type Role = 'recepcionista' | 'anfitrion' | 'guardia' | 'admin'

interface AuthClaims {
  sub:   string
  role:  Role
  scope: string[]
  exp:   number
}

// STACK ──────────────────────────────────────────────────────────────────────
//
// Backend     ·  Laravel (PHP 8) sobre Azure App Service
// Frontend    ·  Vue 3 + Vite sobre Azure Static Web Apps
// Datos       ·  Azure Database for MySQL
// Identidad   ·  MSAL en el navegador, Entra ID, JWT propio
// Despliegue  ·  Pipelines CI/CD originales (detached en el repo público)

// IMPACTO ────────────────────────────────────────────────────────────────────
//
// Reemplazó el registro en papel. Auditoría real, validación en segundos,
// y el guardia deja de depender del walkie-talkie para avisar al anfitrión.

export const REPO = 'https://github.com/JustSidus/gestion-visitas-demo'
</script>

<style scoped>
/* stack: Laravel · Vue 3 · MSAL · Entra ID · Azure · MySQL */
</style>
