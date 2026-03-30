@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Deploy na Vercel (producao) ===
echo Pasta: %cd%
echo.
echo Primeira vez? Abre o terminal e corre:
echo   npx vercel login
echo   npx vercel
echo (Le o ficheiro VERCEL-SIMPLES.txt)
echo.
pause
call npx vercel --prod
if errorlevel 1 (
  echo.
  echo Se falhou: corre "npx vercel login" e depois "npx vercel" uma vez.
)
echo.
pause
