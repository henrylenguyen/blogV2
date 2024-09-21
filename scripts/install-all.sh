#!/bin/bash
echo "Installing dependencies for cms-admin..."
cd ../cms-admin && npm install

echo "Installing dependencies for frontend..."
cd ../frontend && npm install

echo "Installing dependencies for backend..."
cd ../server && npm install

echo "All dependencies installed!"
