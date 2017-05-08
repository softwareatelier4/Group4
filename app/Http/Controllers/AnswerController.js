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
    const answer = yield this.Answer.findBy('id', request.params().id)
    answer.comment = request.input('comment')
    yield answer.save()
    response.redirect('back')
  }

  * store (request, response) {
    const user = yield request.auth.getUser()
    yield this.Answer.create({
      comment: request.input('comment'),
      review_id: request.params().reviews_id,
      user_id: user.id
    })
    response.redirect('back')
  }

  * destroy (request, response) {

  }

}

module.exports = AnswerController
