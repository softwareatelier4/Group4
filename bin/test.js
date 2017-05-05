'use strict'

/*
|--------------------------------------------------------------------------
| Test runner
|--------------------------------------------------------------------------
*/

const path = require('path')
const globby = require('globby')
const yargs = require('yargs').argv
const bootstrap = require('./bootstrap')
process.env.ENV_PATH = '.env'
// process.env.ENV_PATH = '.env.test'

function runTests (mocha, fireServer, Server) {
  if (fireServer) {
    Server.listen(process.env.HOST, process.env.PORT)
  }
  mocha.run(function (failures) {
    use('Database').close()
    if (fireServer) {
      Server.getInstance().close()
    }
    process.on('exit', function () {
      process.exit(failures)
    })
  })
}

// Default tests folders
let testFiles = [
  'tests/functional/*.js',
  'tests/unit/*.js',
  'tests/integration/*.js'
]
// Check if passed specific tests
if (yargs._.length > 0) testFiles = yargs._
// We always want to fire the server
let fireServer = true
// Get the base path
const basePath = path.resolve(__dirname, '../')
// Bootstrap server
bootstrap(function (Server) {
  // Expand them to base directory
  globby(testFiles, {cwd: basePath})
  .then((files) => {
    require('./setup')(files, runTests, fireServer, Server)
    if (files.length === 0) process.exit(0)
  })
  .catch(console.error)
})
