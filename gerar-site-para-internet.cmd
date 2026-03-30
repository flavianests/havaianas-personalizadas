@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo A gerar a pasta do site (dist)...
echo.
call npm run build
if errorlevel 1 (
  echo.
  echo *** DEU ERRO NO BUILD. Copia o texto acima para pedir ajuda. ***
  pause
  exit /b 1
)
echo.
echo ========================================
echo   PRONTO.
echo ========================================
echo.
echo A pasta chama-se:  dist
echo Caminho completo:
echo   %cd%\dist
echo.
echo Seguinte passo: abre no browser
echo   https://app.netlify.com/drop
echo e arrasta a pasta "dist" para la.
echo.
explorer "%cd%\dist"
pause
