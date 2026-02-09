@echo off
echo ========================================
echo   Fresh Start - Fixed Configuration
echo ========================================
echo.

echo 🛑 Stopping any existing servers...
taskkill /f /im node.exe 2>nul

echo.
echo 🚀 Starting fixed backend server (port 3002)...
cd /d "c:\Users\yoges\Downloads\frontend\backend"
start "Backend Server" cmd /k "node fixed-server.js"

echo.
echo ⏳ Waiting for backend to start...
timeout /t 3 >nul

echo.
echo 🌐 Starting frontend server...
cd /d "c:\Users\yoges\Downloads\frontend\homework-ai-assistant-main"
start "Frontend Server" cmd /k "node node_modules\vite\bin\vite.js --host 0.0.0.0 --port 5173"

echo.
echo ✅ Both servers starting...
echo.
echo 📍 URLs:
echo    Frontend: http://localhost:5173
echo    Backend API: http://localhost:3002/api
echo    Health Check: http://localhost:3002/api/health
echo.
echo 💡 Wait 10 seconds for servers to fully start
echo    Then open http://localhost:5173 in your browser
echo.

timeout /t 10 >nul
start http://localhost:5173

echo.
echo 🎉 Application should now be working!
echo    If you still see errors, check browser console (F12)
echo.

pause
