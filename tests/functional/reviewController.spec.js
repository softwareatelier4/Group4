'use strict'
/* eslint-env mocha */

const Browser = require('zombie')
const assert = require('assert')
const _ = require('lodash')
const ProfileController = use('App/Http/Controllers/ProfileController')
const Review = use('App/Model/Review')
const Answer = use('App/Model/Answer')

require('co-mocha')


describe('ReviewController', function () {
  const browser = new Browser()

  this.timeout(5000);
  const profile = 9
  let reviews = []
  let _reviews = []

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

    it('should match the comment for each review in DB', function() {

      _.forEach(reviews, function(r, i) {
        const comment = r.comment || 'No comment'
        const _comment = _.trim(_reviews[i].querySelector('.review-comment').textContent)

        assert(_.isEqual(comment, _comment), `The comment ${comment} is not matching`)
      })
    })

  it('should have the Freelance answer if there are any, otherwise Answer button', function *() {

    let ids = []
    _.forEach(reviews, function(r) {
      ids.push(r.id)
    })

    assert(ids.length > 0, 'No review found')

    const answers = yield Answer.query().whereIn('review_id', ids)
    _.forEach(answers, function(a, i) {
      let index = _.findIndex(reviews, function(o) { return o.id == a.review_id })
      if ( index >= 0 ) {
        let answer = _.trim(_reviews[index].querySelector('.review-answer p > i').textContent)
        assert(_.isEqual(a.comment, answer), `Answer ${a.comment} didn't match`)
        ids[index] = -1
      }
    })
    _.forEach(ids, function(v, i) {
      if ( v >= 0 ) {
        let form = _reviews[i].querySelector('.answer-form')
        browser.assert.element(form, 'The answer form doesn\'t exists')
        assert(form.querySelector('button'), 'There is no submit button')
      }
    })
  })
})
