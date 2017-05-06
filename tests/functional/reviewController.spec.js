'use strict'
/* eslint-env mocha */

const Browser = require('zombie')
const assert = require('assert')
const _ = require('lodash')
const ProfileController = use('App/Http/Controllers/ProfileController')
const Review = use('App/Model/Review')

require('co-mocha')


describe('ReviewController', function () {
  const browser = new Browser()

  this.timeout(5000);
  const profile = 9
  let reviews = 0
  let _reviews = 0

  before(function (done) {
    browser.visit(`/profiles/${profile}`,done)

  })

  it('should be successfull', function() {
    browser.assert.success()
    browser.assert.text('title', 'JobAdvisor')
  })



  it('shoud contain the reviews' , function * () {
    reviews =  yield Review.query().where('profile_id', profile)
    _reviews = browser.querySelectorAll('.review-item')

    assert(reviews.length > 0, 'No review found in DB')
    assert(_reviews.length > 0, 'No review found in Browser')
    assert(reviews.length == _reviews.length, 'Different review count')
  })


  it('should match the overall rating for each review in DB', function() {

    _.forEach(reviews, function(r, i) {
      const ratings = _reviews[i].querySelectorAll('.overall_rating + div > a')
      const rating = r.vote_overall
      _.forEach(ratings, function(el, j) {
        if( j < rating ) {
          browser.assert.hasClass(el, 'br-selected')
          if( j == rating - 1 ) { browser.assert.hasClass(el, 'br-current') }

        } else {
          browser.assert.hasNoClass(el, 'br-current')
          browser.assert.hasNoClass(el, 'br-selected')
        }

      })
    })
  })

    it('should match the price rating for each review in DB', function() {

    _.forEach(reviews, function(r, i) {
      const ratings = _reviews[i].querySelectorAll('.price_rating + div > a')
      const rating = r.vote_price
      _.forEach(ratings, function(el, j) {
        if( j < rating ) {
          browser.assert.hasClass(el, 'br-selected')
          if( j == rating - 1 ) { browser.assert.hasClass(el, 'br-current') }

        } else {
          browser.assert.hasNoClass(el, 'br-current')
          browser.assert.hasNoClass(el, 'br-selected')
        }

      })
    })
    })

  it('should match the quality rating for each review in DB', function() {

    _.forEach(reviews, function(r, i) {
      const ratings = _reviews[i].querySelectorAll('.qualtiy_rating + div > a')
      const rating = r.vote_quality
      _.forEach(ratings, function(el, j) {
        if( j < rating ) {
          browser.assert.hasClass(el, 'br-selected')
          if( j == rating - 1 ) { browser.assert.hasClass(el, 'br-current') }

        } else {
          browser.assert.hasNoClass(el, 'br-current')
          browser.assert.hasNoClass(el, 'br-selected')
        }

      })
    })
  })
})
