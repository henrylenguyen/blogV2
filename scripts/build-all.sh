#!/bin/bash
echo "Building cms-admin..."
cd ../cms-admin && npm run build

echo "Building frontend..."
cd ../frontend && npm run build

echo "Building backend..."
cd ../server && npm run build

echo "All projects built!"
