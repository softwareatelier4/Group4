'use strict'
/* eslint-env mocha */

const Browser = require('zombie')
const assert = require('assert')
const _ = require('lodash')
const UserController = use('App/Http/Controllers/UsersController')

describe('UsersController', function () {
  const browser = new Browser()

  before(function (done) {
    browser.visit('/register', done)
  })

  describe('register:view should return the view successful', function () {

    it('should be successful', function () {
      browser.assert.success()
    })

    it('should contain label for username', function () {
      browser.assert.element('label[for="name"]')
    })

    it('should contain label for email', function () {
      browser.assert.element('label[for="email"]')
    })

    it('should contain label for password', function () {
      browser.assert.element('label[for="password"]')
    })

    it('should contain input for username', function () {
      browser.assert.element('input[name="name"]')
    })

    it('should contain input for email', function () {
      browser.assert.element('input[name="email"]')
    })

    it('should contain input for password', function () {
      browser.assert.element('input[name="password"]')
    })
    it('should contain button to submit', function () {
      browser.assert.element('input[name="register"][type="submit"]')
    })

    it('should contain button to reset', function () {
      browser.assert.element('input[value="Reset"][type="reset"]')
    })
  })

  // describe('register:view register a new user into the database', function () {
  //   before(function (done) {
  //     browser
  //       .fill('#name',    'test')
  //       .fill('#email',    'test@test.test')
  //       .fill('#password', 'test')
  //       .pressButton('#register', done);
  //   })
  //
  //   it('should be successeful', function () {
  //     browser.assert.success()
  //   })
  //
  //   const user = this.UserAccount.find(request.param('name'))
  //
  // })

  describe('master:view register interface', function () {

    before(function(done) {
      browser.visit('/profiles', done)
    })

    it('should be successful', function () {
      browser.assert.success()
    })

    it('should contain a link to register page with text Register', function () {
      browser.assert.text('a[href="/register"]', 'Register')
    })

    it('should contain button to register', function () {
      browser.assert.link('a', 'Register', '/register')
    })
  })
})
