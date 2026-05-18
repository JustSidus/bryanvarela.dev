#!/bin/bash
# contact.sh

EMAIL="hola@bryanvarela.dev"
GITHUB="https://github.com/JustSidus"
LINKEDIN="https://www.linkedin.com/in/bryan-varela-mazzei/"
LOCATION="Santo Domingo (UTC-4)"
ROLES="Backend, Cloud, Tech Lead"

cat <<EOF
{
  "email": "$EMAIL",
  "github": "$GITHUB",
  "linkedin": "$LINKEDIN",
  "location": "$LOCATION",
  "open_to": "$ROLES"
}
EOF