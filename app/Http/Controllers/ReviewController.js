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
    const user = yield request.auth.getUser()

    yield this.Review.create({
      comment: request.input('comment'),
      vote_price: request.input('vote_price'),
      vote_quality: request.input('vote_quality'),
      vote_overall: request.input('vote_overall'),
      profile_id: request.params().profiles_id,
      user_id: user.id
    })

    response.redirect('back')
  }

  * destroy (request, response) {

  }

}

module.exports = ReviewController
