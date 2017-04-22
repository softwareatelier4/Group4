'use strict'

class UsersController {

  static get inject () {
    return ['App/Model/UserAccount']
  }

  constructor (User) {
    this.User = User
  }

  * index (request, response) {
    // Login and logout

    if (request.currentUser) {
      yield request.auth.logout()
      yield response.sendView('index')
      return
    }

    const email = request.input('email')
    const password = request.input('password')

    try { yield request.auth.attempt(email, password) } catch (e) {
      response.unauthorized('Invalid credentails')
      return
    }

    yield response.sendView('index')
  }

  * create (request, response) {
    // Display a form to create a new user
    yield response.sendView('users.new')
  }

  * store (request, response) {
    // Save the new user
    yield this.User.create({
      email: request.input('email'),
      password: request.input('password'),
      type: request.input('type'),
      name: request.input('name')
    })
    response.redirect('/')
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
