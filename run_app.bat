@echo off
echo Starting the matched betting application...

REM Start the backend server
start cmd /k "cd matched-betting-backend && python app.py"

REM Wait for the backend to start
timeout /t 3

REM Start the frontend
start cmd /k "cd matched-betting-dashboard && npm run dev"

echo Both servers are running. Close the command windows to stop.