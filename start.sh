#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command succeeded
check_status() {
    if [ $? -ne 0 ]; then
        echo "Error: $1 failed. Exiting."
        exit 1
    fi
}

# Install backend dependencies if needed
echo -e "${BLUE}Checking Backend Dependencies...${NC}"
cd ./back-end || { echo "Backend directory not found"; exit 1; }
if [ ! -d "node_modules" ]; then
    echo -e "${GREEN}Installing Backend Dependencies...${NC}"
    npm install
    check_status "Backend npm install"
fi

# Start backend
echo -e "${GREEN}Starting Backend...${NC}"
npm run dev &
BACKEND_PID=$!
cd .. || exit 1
check_status "Backend startup"

# Start frontend
echo -e "${BLUE}Checking Frontend Dependencies...${NC}"
cd ./front-end || { echo "Frontend directory not found"; exit 1; }
if [ ! -d "node_modules" ]; then
    echo -e "${GREEN}Installing Frontend Dependencies...${NC}"
    npm install --legacy-peer-deps
    check_status "Frontend npm install"
fi

echo -e "${GREEN}Starting Frontend...${NC}"
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