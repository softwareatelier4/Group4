#!/usr/bin/env bash

# Install modules
npm install

# Run migrations for test environment
node --harmony_proxies ./ace migration:refresh
node --harmony_proxies ./ace db:seed

# Run tests and coverage
npm run coverage
