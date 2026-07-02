@echo off

echo Deteniendo Backend...
taskkill /F /FI "WINDOWTITLE eq Backend"

echo Deteniendo Frontend...
taskkill /F /FI "WINDOWTITLE eq Frontend"

echo.
echo Servicios detenidos.
pause
