'use strict'

class AnswerController {

  static get inject () {
    return ['App/Model/Answer']
  }

  constructor (Answer) {
    this.Answer = Answer
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
    console.log(request.params())
    yield this.Answer.create({
      comment: request.input('comment'),
      review_id: request.params().reviews_id
    })
    response.redirect('back')
  }

  * destroy (request, response) {

  }

}

module.exports = AnswerController
