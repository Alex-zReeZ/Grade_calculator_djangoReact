#!/bin/bash

# Script to start the GradiX application

echo "================================"
echo "Starting GradiX Application"
echo "================================"
echo ""

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
echo "Activating virtual environment..."
source venv/bin/activate

# Start Django backend
echo "Starting Django backend on http://localhost:8000"
cd server
python manage.py runserver &
DJANGO_PID=$!

# Start React frontend
echo "Starting React frontend on http://localhost:3000"
cd ../frontend
npm start &
REACT_PID=$!

echo ""
echo "================================"
echo "GradiX is running!"
echo "- Backend: http://localhost:8000"
echo "- Frontend: http://localhost:3000"
echo "- Admin: http://localhost:8000/admin"
echo "================================"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $DJANGO_PID $REACT_PID
