Get-Process | Where-Object { $_.MainWindowTitle -eq "Backend" } | Stop-Process -Force
Get-Process | Where-Object { $_.MainWindowTitle -eq "Frontend" } | Stop-Process -Force

Write-Host "Servicios detenidos."
