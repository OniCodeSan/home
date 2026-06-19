#!/usr/bin/env bash
# Deploy di contentmug · hotel su un server (Hetzner) via SSH.
# Uso:
#   ./deploy.sh                      # usa i default qui sotto
#   SERVER=root@1.2.3.4 ./deploy.sh  # override del server
set -euo pipefail

SERVER="${SERVER:-root@204.168.182.198}"
REMOTE_DIR="${REMOTE_DIR:-/opt/contentmug}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"   # usa docker-compose.caddy.yml quando hai il dominio

echo "▶ Deploy su $SERVER:$REMOTE_DIR (compose: $COMPOSE_FILE)"

# 1) crea la cartella remota
ssh "$SERVER" "mkdir -p $REMOTE_DIR"

# 2) sincronizza i sorgenti (esclude pesi e segreti; l'immagine viene buildata sul server)
rsync -az --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude '*.tsbuildinfo' \
  ./ "$SERVER:$REMOTE_DIR/"

# 3) invia i segreti separatamente come .env (NON finiscono nell'immagine)
if [ -f .env.local ]; then
  echo "▶ Copio .env.local -> $REMOTE_DIR/.env"
  scp -q .env.local "$SERVER:$REMOTE_DIR/.env"
else
  echo "⚠ .env.local non trovato: assicurati che $REMOTE_DIR/.env esista sul server"
fi

# 4) build + up sul server (solo il progetto contentmug; NON tocca altri container/immagini)
ssh "$SERVER" "cd $REMOTE_DIR && docker compose -f $COMPOSE_FILE up -d --build"

echo "✅ Fatto. App su http://${SERVER#*@}/  (admin: /admin)"
