@echo off
echo ========================================
echo   AI Homework Checker - Backend Setup
echo ========================================
echo.

echo ✅ API Key configured successfully!
echo.

echo 🔧 Installing dependencies...
echo This may take a few minutes...
echo.

:: Try to install dependencies using different methods
call npm install >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Dependencies installed successfully!
) else (
    echo ❌ npm install failed. Trying alternative method...
    :: Try with full path
    "C:\Program Files\nodejs\npm.cmd" install >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Dependencies installed successfully!
    ) else (
        echo ❌ Automatic installation failed.
        echo.
        echo Please manually run: npm install
        echo in the backend directory.
        pause
        exit /b 1
    )
)

echo.
echo 🚀 Starting backend server...
echo Server will run on: http://localhost:3001
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
