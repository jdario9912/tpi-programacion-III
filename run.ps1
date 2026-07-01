Start-Process powershell -ArgumentList "-NoExit", "-Command", ".\backend\gradlew.bat -p backend bootRun"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm -C frontend dev"
