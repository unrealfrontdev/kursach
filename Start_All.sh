#!/bin/bash
# Запуск backend
cd backend
node server.js &
BACK_PID=$!
cd ..

# Запуск frontend
npm start

# Остановить backend после завершения frontend
kill $BACK_PID