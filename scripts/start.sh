#!/usr/bin/env bash

cat <<EOT > "/var/www/html/website/scripts/lib/vars.js"
var Vars = {
  "pairiatorUrl": "$PAIRIATOR_URL",
  "token": "$GITLAB_API_TOKEN"
}
EOT

if [ "$1" != 'nginx' ]; then
  nginx &
fi

exec "$@"
