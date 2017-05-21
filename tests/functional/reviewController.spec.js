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

  this.timeout(5000)
  const profile = 9
  let reviews = []
  let _reviews = []
  let answer_ids = []
  let target = null
  const test_answer = 'This is a test answer'

  before(function (done) {
    browser.visit(`/profiles/${profile}`, done)
  })

  it('should be successfull', function () {
    browser.assert.success()
    browser.assert.text('title', 'JobAdvisor')
  })

  it('shoud contain the reviews', function * () {
    reviews = yield Review.query().where('profile_id', profile)
    _reviews = browser.querySelectorAll('.review-item')

    assert(reviews.length > 0, 'No review found in DB')
    assert(_reviews.length > 0, 'No review found in Browser')
    assert(reviews.length == _reviews.length, 'Different review count')
  })

  it('should match the overall rating for each review in DB', function () {
    _.forEach(reviews, function (r, i) {
      const ratings = _reviews[i].querySelectorAll('.overall_rating + div > a')
      const rating = r.vote_overall
      _.forEach(ratings, function (el, j) {
        if (j < rating) {
          browser.assert.hasClass(el, 'br-selected')
          if (j == rating - 1) { browser.assert.hasClass(el, 'br-current') }
        } else {
          browser.assert.hasNoClass(el, 'br-current')
          browser.assert.hasNoClass(el, 'br-selected')
        }
      })
    })
  })

  it('should match the price rating for each review in DB', function () {
    _.forEach(reviews, function (r, i) {
      const ratings = _reviews[i].querySelectorAll('.price_rating + div > a')
      const rating = r.vote_price
      _.forEach(ratings, function (el, j) {
        if (j < rating) {
          browser.assert.hasClass(el, 'br-selected')
          if (j == rating - 1) { browser.assert.hasClass(el, 'br-current') }
        } else {
          browser.assert.hasNoClass(el, 'br-current')
          browser.assert.hasNoClass(el, 'br-selected')
        }
      })
    })
  })

  it('should match the quality rating for each review in DB', function () {
    _.forEach(reviews, function (r, i) {
      const ratings = _reviews[i].querySelectorAll('.qualtiy_rating + div > a')
      const rating = r.vote_quality
      _.forEach(ratings, function (el, j) {
        if (j < rating) {
          browser.assert.hasClass(el, 'br-selected')
          if (j == rating - 1) { browser.assert.hasClass(el, 'br-current') }
        } else {
          browser.assert.hasNoClass(el, 'br-current')
          browser.assert.hasNoClass(el, 'br-selected')
        }
      })
    })
  })

  it('should match the comment for each review in DB', function () {
    _.forEach(reviews, function (r, i) {
      const comment = r.comment || 'No comment'
      const _comment = _.trim(_reviews[i].querySelector('.review-comment').textContent)

      assert(_.isEqual(comment, _comment), `The comment ${comment} is not matching`)
    })
  })

  it('should have the Freelance answer if there are any, but no answer form', function *() {

    _.forEach(reviews, function(r) {
      answer_ids.push(r.id)
    })

    assert(answer_ids.length > 0, 'No review found')

    const answers = yield Answer.query().whereIn('review_id', answer_ids)
    _.forEach(answers, function(a, i) {
      let index = _.findIndex(reviews, function(o) { return o.id == a.review_id })
      if ( index >= 0 ) {
        let answer = _.trim(_reviews[index].querySelector('.review-answer-comment > i').textContent)
        assert(_.isEqual(a.comment, answer), `Answer ${a.comment} didn't match with ${answer}`)
        answer_ids[index] = -1
      }
    })

    // Authentication has been implemented in the master, so rewrote this test
    _.forEach(answer_ids, function(v, i) {
      if ( v >= 0 ) {
        let form = _reviews[i].querySelector('.answer-form')
        browser.assert.elements(`.answer-form > #answer${v}`, 0, `Answer form found for id=${v}`)
        // assert(form.querySelector('button'), 'There is no submit button')
      }
    })
  })

  describe('When logged in as worker, there should be answer form', function() {

    before(function(done){
      browser
        .fill('input[name="email"]', 'worker@jobadvisor.com')
        .fill('input[name="password"]', 'worker')
        .pressButton('Login', done)
    })

    it('should log in sucessfully', function () {
      browser.assert.success();
      browser.assert.element('.username')
    })

    it('should contain the answer form', function() {
      _.forEach(answer_ids, function(v, i) {
        if ( v >= 0 ) {
          browser.assert.elements(`.answer-form > #answer${v}`, 1,`Answer form not found for id=${v}`)
        }
      })
    })

    it('should contain the answer form hidden', function() {
      _.forEach(answer_ids, function(v, i) {
        if ( v >= 0 ) {
          browser.assert.hasClass(`.answer-form > #answer${v}`, 'hidden-xs-up')
        }
      })
    })


    it('should contain the answer form not hidden', function() {
      _.forEach(answer_ids, function(v, i) {
        if ( v >= 0 ) {
          browser.pressButton(`button[data-id='${v}']`)
          browser.assert.hasNoClass(`.answer-form > #answer${v}`, 'hidden-xs-up')
        }
      })
    })

    it('should contain the answer textarea', function() {
      _.forEach(answer_ids, function(v, i) {
        if ( v >= 0 ) {
          browser.assert.elements(`.answer-form > #answer${v} textarea`, 1,`Answer textarea not found for id=${v}`)
        }
      })
    })

    it('should contain the answer submit button', function() {
      _.forEach(answer_ids, function(v, i) {
        if ( v >= 0 ) {
          browser.assert.elements(`.answer-form > #answer${v} button`, 1,`Answer submit button not found for id=${v}`)
          // Find the last review without answer, to make it a target to test answer
          target = v
        }
      })
    })
  })

  describe("Writing new comment to a review", function() {

    before(function(done) {
      browser
        .fill(`#answer${target} textarea`, test_answer)
        .pressButton(`#answer${target} button`, done)
    })

    it('should be successfull', function(){
      browser.assert.success()
    })

    it('should contain the test answer', function() {
      browser.assert.text(`#review${target} .review-answer-comment i`, test_answer)
    })

    after(function *(){
      let testAnswer = yield Answer.findBy('review_id', target)
      yield testAnswer.delete()
    })

  })
})
