#!/usr/bin/env bash

echo "🛑 Deteniendo Backend..."
pkill -f "gradle"

echo "🛑 Deteniendo Frontend..."
pkill -f "vite"

echo "✅ Servicios detenidos."
