#!/usr/bin/env bash

# Install modules
npm install

# Run migrations for test environment
./ace migration:run

# Run tests and coverage
npm run coverage
