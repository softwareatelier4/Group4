/* eslint-env mocha */

const Browser = require('zombie')
// const assert = require('assert')
const ProfileController = use('App/Http/Controllers/ProfileController')

describe('ProfileController', function () {
  const browser = new Browser()

  before(function (done) {
    browser.visit('/profiles', done)
  })

  describe('index:view should return the view successful', function () {
    it('should be successful', function () {
      browser.assert.success()
    })
  })
})
