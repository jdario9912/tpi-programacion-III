#!/bin/bash

echo "Iniciando Backend..."
gnome-terminal -- bash -c "./backend/gradlew -p backend bootRun; exec bash"

echo "Iniciando Frontend..."
gnome-terminal -- bash -c "pnpm -C frontend dev; exec bash"
