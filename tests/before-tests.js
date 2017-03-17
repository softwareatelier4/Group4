'use strict'

/*
|--------------------------------------------------------------------------
| Before Tests
|--------------------------------------------------------------------------
|
| This file will be executed before running all the tests
|
*/

// const Ioc = use('adonis-fold').Ioc
const Browser = require('zombie')

// Setup browser to reroute locally
Browser.localhost(process.env.HOST, process.env.PORT)
