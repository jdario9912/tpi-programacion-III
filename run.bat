@echo off

echo Iniciando Backend...
start "Backend" cmd /k "backend\gradlew.bat -p backend bootRun"

echo Iniciando Frontend...
start "Frontend" cmd /k "pnpm -C frontend dev"

echo Ambos servicios fueron iniciados.
