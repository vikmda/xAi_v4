@echo off
echo AI Sexter Bot... 🚀

:: Запуск backend
cd /d %~dp0\backend
start "Backend" cmd /k python server.py

:: Запуск frontend
cd /d %~dp0\frontend
start "Frontend" cmd /k yarn start

echo Frontend и Backend started! 🎉
pause