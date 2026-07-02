Write-Host "===================================="
Write-Host "Instalando dependencias del Frontend"
Write-Host "===================================="

pnpm -C frontend install

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al instalar las dependencias del frontend."
    exit $LASTEXITCODE
}

Write-Host ""
Write-Host "===================================="
Write-Host "Iniciando Backend"
Write-Host "===================================="

Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    ".\backend\gradlew.bat -p backend bootRun"
)

Start-Sleep -Seconds 5

Write-Host ""
Write-Host "===================================="
Write-Host "Iniciando Frontend"
Write-Host "===================================="

Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "pnpm -C frontend dev"
)

Write-Host ""
Write-Host "Ambos servicios fueron iniciados."
