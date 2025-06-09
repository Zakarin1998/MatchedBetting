#!/bin/bash

# Start the backend
echo "Starting the backend server..."
cd matched-betting-backend
python app.py &
BACKEND_PID=$!

# Wait for the backend to start
sleep 2

# Start the frontend
echo "Starting the frontend development server..."
cd ../matched-betting-dashboard
npm run dev &
FRONTEND_PID=$!

# Function to kill processes on exit
function cleanup {
  echo "Shutting down servers..."
  kill $FRONTEND_PID
  kill $BACKEND_PID
  exit
}

# Set up signal trapping
trap cleanup SIGINT SIGTERM

# Wait for Ctrl+C
echo "Both servers are running. Press Ctrl+C to stop."
wait