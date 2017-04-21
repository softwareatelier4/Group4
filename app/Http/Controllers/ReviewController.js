'use strict'

class ReviewController {

  static get inject () {
    return ['App/Model/Review', 'App/Model/Profile']
  }

  constructor (Review) {
    this.Review = Review
  }

  * index (request, response) {

  }

  * show (request, response) {

  }

  * create (request, response) {

  }

  * edit (request, response) {

  }

  * update (request, response) {

  }

  * store (request, response) {
    yield this.Review.create({
      comment: request.input('comment'),
      vote_price: request.input('vote_price'),
      vote_quality: request.input('vote_quality'),
      vote_overall: request.input('vote_overall'),
      profile_id: request.params().profiles_id
    })

    const sum_overall_reviews = yield Database.from('review')
          .where('profile_id', request.params().profile_id)
          .sum('vote_overall')

    const count_overall_reviews = yield Database.from('review')
          .where('profile_id', request.params().profile_id)
          .count('vote_overall')

    const overall_rating = sum_overall_reviews / count_overall_reviews

    const profile = yield Profile.findBy('id', request.params().profile_id)
    profile.overall_rating = overall_rating

    profile.save()

    response.redirect('back')
  }

  * destroy (request, response) {

  }

}

module.exports = ReviewController
