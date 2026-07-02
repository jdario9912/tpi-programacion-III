#!/usr/bin/env bash

set -e

echo "📦 Instalando dependencias del frontend..."
pnpm -C frontend install

echo "🚀 Iniciando backend..."
./backend/gradlew -p backend bootRun &

echo "🚀 Iniciando frontend..."
pnpm -C frontend dev

wait
