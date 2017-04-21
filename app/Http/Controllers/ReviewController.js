'use strict'

class ReviewController {

  static get inject () {
    return ['App/Model/Review', 'App/Model/Profile']
  }

  constructor (Review, Profile) {
    this.Review = Review
    this.Profile = Profile
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

    const sum_overall_reviews = yield this.Review.query()
          .where('profile_id', request.params().profiles_id)
          .sum('vote_overall as sum')

    const count_overall_reviews = yield this.Review.query()
          .where('profile_id', request.params().profiles_id)
          .count('id as count')

    const overall_rating = sum_overall_reviews[0].sum / count_overall_reviews[0].count

    let profile = yield this.Profile.findBy('id', request.params().profiles_id)

    profile.overall_rating = Math.round(overall_rating)

    yield profile.save()

    response.redirect('back')
  }

  * destroy (request, response) {

  }

}

module.exports = ReviewController
