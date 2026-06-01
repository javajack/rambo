#!/usr/bin/env bash
#
# Rambo docs — build & run the Astro + Starlight documentation site.
# First run installs dependencies; subsequent runs are instant.
#
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "▸ Installing dependencies (first run only)…"
  npm install
fi

MODE="${1:-dev}"
case "$MODE" in
  dev)
    echo "▸ Starting Rambo docs (dev) at: http://localhost:4321/rambo/"
    npm run dev
    ;;
  build)
    echo "▸ Building static docs into ./dist …"
    npm run build
    echo "✓ Build complete. Serve with: ./start.sh preview"
    ;;
  preview)
    echo "▸ Building, then previewing the production site at http://localhost:4321/rambo/"
    npm run build
    npm run preview
    ;;
  *)
    echo "Usage: ./start.sh [dev|build|preview]"
    exit 1
    ;;
esac
