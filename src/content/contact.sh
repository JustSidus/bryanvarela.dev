#!/bin/bash
# contact.sh

EMAIL="bryanvarela2411@gmail.com"
GITHUB="https://github.com/JustSidus"
LINKEDIN="https://linkedin.com/in/bryanvarela"
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