'use strict'

class UsersController {

  static get inject () {
    return ['App/Model/UserAccount']
  }

  constructor (User) {
    this.User = User
  }

  * index (request, response) {
    yield response.redirect('/')
  }

  * login (request, response) {
    const email = request.input('email')
    const password = request.input('password')
    const login = yield request.auth.attempt(email, password)

    if (login) {
      response.redirect('back')
      return
    }

    response.unauthorized('Invalid credentails')
  }

  * logout (request, response) {
    if (request.currentUser) {
      yield request.auth.logout()
    }
    response.redirect('back')
  }
  * create (request, response) {
    // Display a form to create a new user
    if (!request.currentUser) {
      yield response.sendView('users.new')
    } else {
      response.redirect('profiles')
    }
  }

  * store (request, response) {
    // Save the new user
    yield this.User.create({
      email: request.input('email'),
      password: request.input('password'),
      type: request.input('type'),
      name: request.input('name')
    })
    response.redirect('back')
  }

  * show (request, response) {
    // Show user details using the id
  }

  * edit (request, response) {
    // Display the form to edit the user
  }

  * update (request, response) {
    // Update the user given an id
  }

  * destroy (request, response) {
    // Delete the user
  }

}

module.exports = UsersController
