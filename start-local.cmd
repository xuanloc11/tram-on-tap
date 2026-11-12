@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Chưa tìm thấy Node.js. Hãy cài Node.js 20 trở lên rồi mở lại tệp này.
  pause
  exit /b 1
)
echo Đang khởi động Trạm ôn tập...
echo Mở địa chỉ được hiển thị bên dưới trong Chrome hoặc Edge.
node server.cjs
if errorlevel 1 pause
