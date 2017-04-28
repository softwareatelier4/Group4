'use strict'
/* eslint-env mocha */

const Browser = require('zombie')
const assert = require('assert')
const _ = require('lodash')
const ProfileController = use('App/Http/Controllers/ProfileController')

describe('ProfileController', function () {
  const browser = new Browser()
  this.timeout(15000)

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

    /* it('should contain an anchor to login', function () {
       browser.assert.text('ul.navbar-nav li:nth-child(0) a', 'LOGIN')
       })

       it('should contain an anchor to register', function () {
       browser.assert.text('ul.navbar-nav li:nth-child(2) a', 'REGISTER')
       }) */

    it('should contain an empty searchbox with placeholder Search', function () {
      browser.assert.attribute('#searchbox', 'value', '')
      browser.assert.attribute('#searchbox', 'placeholder', 'Search')
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

  describe('index:view sorting result', function () {
    before(function (done) {
      browser.visit('/profiles', done)
    })

    it('should contain anchors to sort by Distance', function () {
      browser.assert.link('a', 'Distance', /orderBy=0/)
    })

    it('should contain anchors to sort by Price', function () {
      browser.assert.link('a', 'Price', /orderBy=1/)
    })

    it('should contain anchors to sort by Overall rating', function () {
      browser.assert.link('a', 'Rating', /orderBy=2/)
    })

    it('should sort the result by distance asc by default', function () {
      let distance = -1
      let results = browser.querySelectorAll('.result-item-title+div')

      _.forEach(results, function (el) {
        let d = el.innerHTML
        d = parseInt(_.replace(d, 'km'))
        assert(distance <= d)
        distance = d
      })
    })

    it('should sort the result by price asc', function () {
      before(function (done) {
        browser.visit('/profiles?orderBy=1', done)
      })

      let price = -
        let results = browser.querySelectorAll('.item-price > span')

      _.forEach(results, function (el) {
        let p = parseFloat(el.innerHTML)
        assert(price <= p)
        distance = p
      })
    })

    it('should sort the result by overall rating desc', function () {
      before(function (done) {
        browser.visit('/profiles?orderBy=2', done)
      })

      let rating = 50
      let results = browser.querySelectorAll('.ratings > option:checked')

      // Need to rewrite this test because, results is empty
      // This error happens only in test environment
      _.forEach(results, function (el) {
        let r = parseFloat(el.innerHTML)
        console.log(r)
        assert(rating >= r)
        rating = r
      })
    })
  })
  describe('master:view login interface', function () {
    before(function (done) {
      browser.visit('/profiles', done)
    })

    it('should contain input for username', function () {
      browser.assert.element('input[name="email"]')
    })

    it('should contain input for password', function () {
      browser.assert.element('input[name="password"]')
    })
    it('should contain button to submit', function () {
      browser.assert.element('input[name="login"][type="submit"]')
    })

    it('should contain button to register', function () {
      browser.assert.link('a', 'Register', '/register')
    })
  })

  describe('index:view default filtering options collapse', function () {
    before(function(done) {
      browser.visit('/profiles', done)
    })

    it('should have the filtering block non collapsed by default', function(){
      browser.assert.hasClass('#filters', 'hidden-xs-up')
    })

    it('should become visible when clicking Show filter', function() {
      browser.clickLink('#showFilters')
      browser.assert.hasNoClass('#filters', 'hidden-xs-up')
    })
  })


  before(function(done) {
    browser.visit('/profiles', done)
  })

  describe('index:view default filtering by distance', function () {

    let min = 25
    let max = 50

    before(function(done) {
      browser
        .fill('minDist', min)
        .fill('maxDist', max)
        .pressButton('Filter', done)
    })

    it(`should return only items between ${min} <= distance <= ${max}`, function () {

      let results = browser.querySelectorAll('.result-item-title+div')

      _.forEach(results, function (el) {
        let d = el.innerHTML
        d = parseInt(_.replace(d, 'km'))
        assert(d >= min)
        assert(d <= max)
      })
    })

  })


  describe('index:view default filtering by price', function () {

    let min = 25
    let max = 50

    before(function(done) {
      browser
        .fill('minDist', min)
        .fill('maxDist', max)
        .pressButton('Filter', done)
    })

    it(`should return only items between ${min} <= price <= ${max}`, function () {

      let results = browser.querySelectorAll('.item-price > span')

      _.forEach(results, function (el) {
        let d = el.innerHTML
        d = parseFloat(d)
        assert(d >= min)
        assert(d <= max)
      })
    })

  })

})
