@echo off
echo Installing backend dependencies...
call npm install
echo.
echo Backend setup complete!
echo.
echo Next steps:
echo 1. Configure your AI API key in backend\.env
echo 2. Start the backend server: npm run dev
echo 3. Start the frontend server: cd ../homework-ai-assistant-main && npm run dev
echo.
pause
