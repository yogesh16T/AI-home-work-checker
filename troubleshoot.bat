@echo off
echo ========================================
echo   Connection Troubleshooting Guide
echo ========================================
echo.

echo 🔍 Testing backend connection...
echo.

:: Test if backend is responding
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3001/api/health' -UseBasicParsing; Write-Host '✅ Backend is responding!'; Write-Host 'Status:' $response.StatusCode; Write-Host 'Response:' $response.Content } catch { Write-Host '❌ Backend not reachable:' $_.Exception.Message }"

echo.
echo 🔍 Testing frontend configuration...
echo.

:: Check if frontend .env exists
if exist "..\homework-ai-assistant-main\.env" (
    echo ✅ Frontend .env file exists
    type "..\homework-ai-assistant-main\.env"
) else (
    echo ❌ Frontend .env file missing
)

echo.
echo 🚀 Starting instructions:
echo.
echo 1. Backend is running on http://localhost:3001 ✅
echo 2. Start frontend in NEW terminal:
echo    cd ..\homework-ai-assistant-main
echo    npm run dev
echo.
echo 3. Open browser to: http://localhost:5173
echo.
echo 4. If still "site cannot be reached":
echo    - Check if port 5173 is available
echo    - Verify npm is installed
echo    - Try: npm run dev -- --port 3000
echo.

pause
