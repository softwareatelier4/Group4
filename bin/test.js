'use strict'

/*
|--------------------------------------------------------------------------
| Test runner
|--------------------------------------------------------------------------
*/

const path = require('path')
const globby = require('globby')
const bootstrap = require('./bootstrap')
// process.env.ENV_PATH = '.env.test'

const testFiles = {
  functional: 'tests/functional/*.js',
  unit: 'tests/unit/*.js',
  integration: 'tests/integration/*.js'
}

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

let fireServer = true

const basePath = path.resolve(__dirname, '../')
bootstrap(function (Server) {
  const patterns = Object.keys(testFiles).map((pattern) => testFiles[pattern])
  globby(patterns, {cwd: basePath})
  .then((files) => {
    require('./setup')(files, runTests, fireServer, Server)
  })
  .catch(console.error)
})
