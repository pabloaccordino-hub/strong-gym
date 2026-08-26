#!/usr/bin/env bash
set -euo pipefail

CSS="css/styles.css"

FAIL=0

echo "Comprobando arquitectura App Shell..."

grep -q 'html.*height:[[:space:]]*100%' "$CSS" || FAIL=1
grep -q 'body.*overflow:[[:space:]]*hidden' "$CSS" || FAIL=1
grep -q 'overflow-y:[[:space:]]*auto' "$CSS" || FAIL=1
grep -q 'min-height:[[:space:]]*0' "$CSS" || FAIL=1
grep -q 'flex:[[:space:]]*1[[:space:]]*1[[:space:]]*auto' "$CSS" || FAIL=1
grep -q 'position:[[:space:]]*fixed' "$CSS" || FAIL=1
grep -q 'bottom:[[:space:]]*0' "$CSS" || FAIL=1
grep -q '\.app-section[[:space:]]*{' "$CSS" || FAIL=1
grep -q 'display:[[:space:]]*none' "$CSS" || FAIL=1

if grep -qi 'images\.unsplash\.com' "$CSS"; then
    echo "FALLO — todavía existe un fondo fotográfico"
    FAIL=1
fi

if [ "$FAIL" -ne 0 ]; then
    echo "RED — el App Shell todavía NO está instalado"
    exit 1
fi

echo "GREEN — App Shell válido"
