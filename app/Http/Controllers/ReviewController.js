'use strict'

class ReviewController {

  static get inject () {
    return ['App/Model/Review']
  }

  constructor (Review) {
    this.Review = Review
  }

  * index (request, response) {

  }

  * show (request, response) {

  }

  * create (request, response) {
    
    yield this.Review.create({
      comment: request.input('comment'),
      vote_price: 5,
      vote_quality: 5,
      vote_overall: 5,
      profile_id: request.params().profiles_id
    })
    response.redirect('back')
  }

  * edit (request, response) {

  }

  * update (request, response) {

  }

  * store (request, response) {

  }

  * destroy (request, response) {

  }

}

module.exports = ReviewController
