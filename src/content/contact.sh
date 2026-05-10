#!/bin/bash
# contact.sh — Bryan Varela · Software Engineer
# ──────────────────────────────────────────────

set -euo pipefail

# ── DATOS DE CONTACTO ─────────────────────────────────────────────────────────

EMAIL="bryanvarela2411@gmail.com"
GITHUB="https://github.com/JustSidus"
LINKEDIN="https://linkedin.com/in/bryanvarela"
TIMEZONE="America/Lima · UTC−5"

OPEN_TO=(
  "backend"
  "cloud"
  "arquitectura"
  "tech-lead"
)

# ── PREFERENCIAS ──────────────────────────────────────────────────────────────

PREFER="Email para contexto largo · LinkedIn para intros · GitHub para código"

FORMAT="Si me escribes por un rol, mándame el JD o el problema concreto.
Respondo mejor a casos que a 'tengo una vacante'."

NO_THANKS="Recruiters genéricos, 'oportunidades únicas' sin detalles, take-homes de 8h."

# ── COMANDO PRINCIPAL ─────────────────────────────────────────────────────────

contact() {
  echo "{"
  echo "  \"email\":    \"$EMAIL\","
  echo "  \"github\":   \"$GITHUB\","
  echo "  \"linkedin\": \"$LINKEDIN\","
  echo "  \"timezone\": \"$TIMEZONE\","
  echo "  \"open_to\":  [$(printf '"%s",' "${OPEN_TO[@]}" | sed 's/,$//')]"
  echo "}"
}

# ── ENTRY POINT ───────────────────────────────────────────────────────────────

case "${1:-contact}" in
  contact)  contact ;;
  email)    echo "$EMAIL" ;;
  github)   echo "$GITHUB" ;;
  linkedin) echo "$LINKEDIN" ;;
  *)        echo "Usage: contact.sh [contact|email|github|linkedin]" >&2; exit 1 ;;
esac
