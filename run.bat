@echo off

echo ====================================
echo Instalando dependencias del Frontend
echo ====================================
call pnpm -C frontend install

if errorlevel 1 (
    echo Error al instalar las dependencias del frontend.
    pause
    exit /b 1
)

echo.
echo ====================================
echo Iniciando Backend
echo ====================================
start "Backend" cmd /k "backend\gradlew.bat -p backend bootRun"

echo.
echo ====================================
echo Iniciando Frontend
echo ====================================
start "Frontend" cmd /k "pnpm -C frontend dev"

echo.
echo Ambos servicios fueron iniciados.
