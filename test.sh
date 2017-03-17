npm install
touch .env
npm run test-mocha
npm start &
node seed.js
./nightwatch
pkill "myapp"
