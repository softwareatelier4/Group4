'use strict'
/* eslint-env mocha */

const Browser = require('zombie')
const assert = require('assert')
const _ = require('lodash')
const ProfileController = use('App/Http/Controllers/ProfileController')
const DB = use('Database')
const Category = use('App/Model/Category')

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

    describe('index:view state at init', function () {
      it('should contain a link to profiles index page with text BROWSE', function () {
        browser.assert.text('a[href="/profiles"]', 'BROWSE')
      })
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

  describe('index:view interface for sorting', function () {
    before(function (done) {
      browser.visit('/profiles', done)
    })

    it('should contain anchors to sort by Distance ASC', function () {
      const a = browser.querySelectorAll('option')
      let exist = false
      _.forEach(a, function (el) {
        const expected = /orderBy=0/

        exist = exist || expected.test(el.getAttribute('value'))
      })
      assert(exist)
    })


    it('should contain anchors to sort by Price ASC', function () {
      const a = browser.querySelectorAll('option')
      let exist = false
      _.forEach(a, function (el) {
        const expected = /orderBy=2/

        exist = exist || expected.test(el.getAttribute('value'))
      })
      assert(exist)
    })

    it('should contain anchors to sort by Price DESC', function () {
      const a = browser.querySelectorAll('option')
      let exist = false
      _.forEach(a, function (el) {
        const expected = /orderBy=3/

        exist = exist || expected.test(el.getAttribute('value'))
      })
      assert(exist)
    })

    it('should contain anchors to sort by Overall Rating ASC', function () {
      const a = browser.querySelectorAll('option')
      let exist = false
      _.forEach(a, function (el) {
        const expected = /orderBy=4/

        exist = exist || expected.test(el.getAttribute('value'))
      })
      assert(exist)
    })

    it('should contain anchors to sort by Overall Rating DESC', function () {
      const a = browser.querySelectorAll('option')
      let exist = false
      _.forEach(a, function (el) {
        const expected = /orderBy=5/

        exist = exist || expected.test(el.getAttribute('value'))
      })
      assert(exist)
    })
  })


  describe('index:view should be sorted by Distance ASC', function () {
    it('should sort the result by Distance ASC by default', function () {
      let distance = -1
      let results = browser.querySelectorAll('.result-item-title+div')

      _.forEach(results, function (el) {
        let d = el.innerHTML
        d = parseInt(_.replace(d, 'km'))
        assert(distance <= d)
        distance = d
      })
    })
  })


  describe('profile:index sorting by Distance DESC', function () {
    it('should sort the result by Distance DESC', function () {
      browser.select('#orderBy', 'Distance High',  function () {
        let distance = Number.MAX_VALUE
        let results = browser.querySelectorAll('.result-item-title+div')

        _.forEach(results, function (el) {
          let d = _.parseInt(_.replace(el.textContent, 'km'))
          assert(distance >= d)
          distance = d
        })
      })
    })
  })

  describe('profile:index sorting by Price ASC', function () {

    before(function (done) {
      browser.visit('/profiles', done)
    })


    it('should sort the result by Price ASC', function () {
      browser.select('#orderBy', 'Price Low',  function () {
        let price = -1
        let results = browser.querySelectorAll('.item-price > span')

        _.forEach(results, function (el) {
          let p = parseFloat(el.innerHTML)
          assert(price <= p)
          price = p
        })
      })
    })
  })

  describe('profile:index sorting by Price DESC', function () {

    before(function (done) {
      browser.visit('/profiles', done)
    })

    it('should sort the result by Price DESC', function () {

      browser.select('#orderBy', 'Price High',  function () {
        let price = Number.MAX_VALUE
        let results = browser.querySelectorAll('.item-price > span')

        _.forEach(results, function (el) {
          let p = parseFloat(el.innerHTML)
          assert(price >= p)
          price = p
        })
      })
    })
  })

  describe('profile:index sorting by Rating ASC', function () {

    before(function (done) {
      browser.visit('/profiles', done)
    })


    it('should sort the result by overall rating asc', function () {

      browser.select('#orderBy', 'Rating Low',  function () {
        let rating = Number.MIN_VALUE
        let results = browser.querySelectorAll('.ratings > option:checked')

        _.forEach(results, function (el) {
          let r = parseFloat(el.innerHTML)
          assert(rating <= r)
          rating = r
        })
      })
    })

  })

  describe('profile:index sorting by Rating DESC', function () {

    before(function (done) {
      browser.visit('/profiles', done)
    })

    it('should sort the result by overall rating desc', function () {

      browser.select('#orderBy', 'Rating High',  function () {
        let rating = Number.MAX_VALUE
        let results = browser.querySelectorAll('.ratings > option:checked')

        _.forEach(results, function (el) {
          let r = parseFloat(el.innerHTML)
          assert(rating >= r)
          rating = r
        })
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
      browser.assert.link('a', 'Sign up', '/register')
    })
  })

  describe('index:view default filtering options collapse', function () {
    before(function (done) {
      browser.visit('/profiles', done)
    })

    it('should have the filtering block non collapsed by default', function () {
      browser.assert.hasClass('#filters', 'hidden-xs-up')
    })

    it('should become visible when clicking Show filter', function () {
      browser.pressButton('#showFilters')
      browser.assert.hasNoClass('#filters', 'hidden-xs-up')
    })
  })


  before(function (done) {
    browser.visit('/profiles', done)
  })

  describe('index:view default filtering by distance', function () {

    let min = 0
    let max = 10

    before(function (done) {
      browser
        .fill('minDist', min)
        .fill('maxDist', max)
        .pressButton('#filter',done)

    })
    it(`should return only items between ${min} <= distance <= ${max}`, function () {
      let results = browser.querySelectorAll('.item-distance')
      assert( results.length > 0, 'Empty node list' )
      _.forEach(results, function (el) {
        let d = el.textContent
        d = _.replace(_.replace(d, 'Distance', ''), 'km', '')
        assert(d >= min)
        assert(d <= max)

      })
    })
  })

  before(function (done) {
    browser.visit('/profiles', done)
  })

  describe('index:view filtering by price', function () {

    let min = 0
    let max = 50

    before(function (done) {
      browser
        .fill('minPrice', min)
        .fill('maxPrice', max)
        .fill('minDist', 0)
        .fill('maxDist', 1000)

        .pressButton('#filter',done)
    })

    it(`should return only items between ${min} <= price <= ${max}`, function () {

      let results = browser.querySelectorAll('.item-price > span')
      assert( results.length > 0, 'Empty node list' )

      _.forEach(results, function (el) {
        let d = el.innerHTML
        d = parseFloat(d)
        assert(d >= min, `Price ${d} is not > ${min}`)
        assert(d <= max, `Price ${d} is not < ${max}`)
      })
    })
  })

  before(function (done) {
    browser.visit('/profiles', done)
  })

  describe('index:view filtering by rating ', function () {

    let min = 3
    let max = 4

    before(function (done) {
      browser
        .fill('minPrice', 0)
        .fill('maxPrice', 500)
        .fill('minDist', 0)
        .fill('maxDist', 1000)
        .fill('minRate', min)
        .fill('maxRate', max)
        .pressButton('#filter',done)
    })

    it(`should return only items between ${min} <= rating <= ${max}`, function () {

      let results = browser.querySelectorAll('.ratings > option:checked')
      assert( results.length > 0, 'Empty node list' )

      _.forEach(results, function (el) {
        let d = el.getAttribute('value')
        d = parseFloat(d)
        assert(d >= min, `Rate ${d} is not > ${min}`)
        assert(d <= max, `Rate ${d} is not < ${max}`)
      })
    })


    describe('profile:show view', function () {

      before(function(done) {
        browser.visit('/profiles/9', done)
      })

      it('should succesffully load profile page with id=9', function(){
        browser.assert.success();
      })

      it('should contain the profile image', function() {
        browser.assert.element('img[src="/profile_images/9.jpg"]')
      })

      it('should contain the profile telephone', function() {
        const dd = browser.querySelectorAll('dd')
        let result = false
        const expected = '091 950 91 63'
        assert(dd.length > 0, 'Empty nodelist')
        _.forEach(dd, function(el) {
          result = result || _.isEqual(el.textContent, expected)
        })
        assert(result, 'Phone number not found')
      })

      it('should contain the profile title', function() {
        browser.assert.text('h1', 'PR Pulizia e Risanamenti SA', 'Title not found')
      })

      it('should contain the profile website', function() {
        const dd = browser.querySelectorAll('dd')
        let result = false
        const expected = 'www.pr-ricamarte.ch'
        assert(dd.length > 0, 'Empty nodelist')
        _.forEach(dd, function(el) {
          result = result || _.isEqual(el.textContent, expected)
        })
        assert(result, 'Website not found')
      })

      it('should contain the profile price', function() {
        const dd = browser.querySelectorAll('dd')
        let result = false
        const expected = '$78'
        assert(dd.length > 0, 'Empty nodelist')
        _.forEach(dd, function(el) {
          result = result || _.isEqual(el.textContent, expected)
        })
        assert(result, 'Price not found')
      })

      it('should contain the link to its category', function () {
        const a = browser.document.querySelectorAll('#profile-details a.badge-anchor')
        const text = browser.document.querySelectorAll('#profile-details a.badge-anchor span')

        assert(a.length > 0, 'No categories')
        const id = parseInt((_.split(a[0].getAttribute('href'), '='))[1])

        assert(_.isEqual(id, 6), `Category id ${id} not match`)
        const name = a[0].childNodes[1].textContent
        assert(_.isEqual(name, 'Informatico'), `Category name ${name} not match`)

      })

      it('should contain the profile city', function() {
        const dd = browser.querySelectorAll('dd')
        let result = false
        const expected = 'Viganello'
        assert(dd.length > 0, 'Empty nodelist')
        _.forEach(dd, function(el) {
          result = result || _.isEqual(el.textContent, expected)
        })
        assert(result, 'City not found')
      })

      it('should contain the profile description', function() {
        const dd = browser.querySelector('#profile-description').textContent

        const text = `La ditta PR Pulizia Risanamenti è stata fondata del 2001 ed è specializzata in diversi settori. La pulizia di canalizzazioni, l'ispezione anche con l'ausilio di rilievi televisivi ed il risanamento di canalizzazioni + sistema a spruzzo, lavori di epurazione di fosse biologiche e pozzetti raccoglitori.`
        assert(_.isEqual(dd, text), `The description doesn not match\n${dd}`)
      })

      it('should contain the profile overall rating', function() {
        const els = browser.querySelectorAll('#display_overall + div a')

        assert(els.length > 0, 'Empty node list')
        const rating = 2
        _.forEach(els, function(el, i) {
          if( i < rating ) {
            browser.assert.hasClass(el, 'br-selected')
            if( i == rating -1 ) { browser.assert.hasClass(el, 'br-current') }

          } else {
            browser.assert.hasNoClass(el, 'br-current')
            browser.assert.hasNoClass(el, 'br-selected')
          }

        })
      })

      it('should contain the profile price rating', function() {
        const els = browser.querySelectorAll('#display_price + div a')

        assert(els.length > 0, 'Empty node list')
        const rating = 2
        _.forEach(els, function(el, i) {
          if( i < rating ) {
            browser.assert.hasClass(el, 'br-selected')
            if( i == rating -1 ) { browser.assert.hasClass(el, 'br-current') }

          } else {
            browser.assert.hasNoClass(el, 'br-current')
            browser.assert.hasNoClass(el, 'br-selected')
          }

        })
      })

      it('should contain the profile quality rating', function() {
        const els = browser.querySelectorAll('#display_quality + div a')

        assert(els.length > 0, 'Empty node list')
        const rating = 3
        _.forEach(els, function(el, i) {
          if( i < rating ) {
            browser.assert.hasClass(el, 'br-selected')
            if( i == rating - 1 ) { browser.assert.hasClass(el, 'br-current') }

          } else {
            browser.assert.hasNoClass(el, 'br-current')
            browser.assert.hasNoClass(el, 'br-selected')
          }

        })
      })

    })

  })

})
