#!/bin/bash
echo "Starting cms-admin..."
cd ../cms-admin && npm run dev &

echo "Starting frontend..."
cd ../frontend && npm run dev &

echo "starting database..."
docker-compose up -d

echo "Starting backend..."
cd ../server && npm run start:dev &

wait


