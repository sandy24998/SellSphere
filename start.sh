#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to check if a command succeeded
check_status() {
    if [ $? -ne 0 ]; then
        echo "Error: $1 failed. Exiting."
        exit 1
    fi
}

# Start backend
echo -e "${GREEN}Starting Backend...${NC}"
cd ./back-end || { echo "Backend directory not found"; exit 1; }
npm run dev &
BACKEND_PID=$!
cd .. || exit 1
check_status "Backend startup"

# Start frontend
echo -e "${GREEN}Starting Frontend...${NC}"
cd ./front-end || { echo "Frontend directory not found"; exit 1; }
npm start &
FRONTEND_PID=$!
cd .. || exit 1
check_status "Frontend startup"

# Wait for both processes to finish
echo -e "${GREEN}Both services are running!${NC}"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop both services."
wait $BACKEND_PID $FRONTEND_PID