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

  describe('index:view state at init', function () {
    it('should contain a link to profiles index page with text BROWSE', function () {
      browser.assert.text('a[href="/profiles"]', 'BROWSE')
    })

    /*it('should contain an anchor to login', function () {
      browser.assert.text('ul.navbar-nav li:nth-child(0) a', 'LOGIN')
    })

    it('should contain an anchor to register', function () {
      browser.assert.text('ul.navbar-nav li:nth-child(2) a', 'REGISTER')
    })*/

    it('should contain an empty searchbox with placeholder Plumber', function () {
      browser.assert.attribute('#searchbox', 'value', '')
      browser.assert.attribute('#searchbox', 'placeholder', 'Plumber')
    })

    it('should contain a select input for city', function () {
      browser.assert.element('#search-position input')
    })

    it('should contain a select input for category', function () {
      browser.assert.element('#search-category select')
    })
  })

  describe('index:view searching for a freelance', function () {
    before(function (done) {
      browser
        .fill('#searchbox', 'LLC')
        .pressButton('#search', done)
    })

    it('should be successeful', function () {
      browser.assert.success()
    })
    it('shuould contain the searchbox with the kewyord', function () {
      browser.assert.attribute('#searchbox', 'value', 'LLC')
    })
  })
})

