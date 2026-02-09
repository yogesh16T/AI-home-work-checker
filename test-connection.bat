@echo off
echo ========================================
echo   API Connection Test & Debug
echo ========================================
echo.

echo 🔍 Testing all API endpoints...
echo.

:: Test health endpoint
echo Testing health endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3001/api/health' -UseBasicParsing; Write-Host '✅ Health: OK' } catch { Write-Host '❌ Health Failed:' $_.Exception.Message }"

:: Test metadata endpoint  
echo Testing metadata endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3001/api/homework/metadata' -UseBasicParsing; Write-Host '✅ Metadata: OK' } catch { Write-Host '❌ Metadata Failed:' $_.Exception.Message }"

:: Test analysis endpoint
echo Testing analysis endpoint...
powershell -Command "try { $body = '{\"subject\":\"mathematics\",\"level\":\"high-school\",\"context\":\"Test equation\"}'; $response = Invoke-WebRequest -Uri 'http://localhost:3001/api/homework/analyze' -Method POST -ContentType 'application/json' -Body $body -UseBasicParsing; Write-Host '✅ Analysis: OK' } catch { Write-Host '❌ Analysis Failed:' $_.Exception.Message }"

:: Test upload endpoint
echo Testing upload endpoint...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3001/api/upload' -Method POST -ContentType 'application/json' -Body '{}' -UseBasicParsing; Write-Host '✅ Upload: OK' } catch { Write-Host '❌ Upload Failed:' $_.Exception.Message }"

echo.
echo 🌐 Frontend URLs:
echo    Local: http://localhost:5173
echo    Network: http://10.207.84.185:5173
echo.
echo 🔧 Backend URLs:
echo    API: http://localhost:3001/api
echo    Health: http://localhost:3001/api/health
echo.
echo 💡 If tests pass but frontend still fails:
echo    1. Clear browser cache (Ctrl+Shift+Del)
echo    2. Try hard refresh (Ctrl+F5)
echo    3. Check browser console (F12) for errors
echo    4. Try different browser
echo.

pause
