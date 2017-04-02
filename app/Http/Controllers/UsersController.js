'use strict'

class UsersController {

  static get inject () {
    return ['App/Model/User']
  }

  constructor (User) {
    this.User = User
  }

  * index(request, response) {
    //Return the current user

    const email = request.input('email')
    const password = request.input('password')
    const login = yield request.auth.loginViaId(1)

    if (login) {
      yield response.sendView('index')
      return
    }

    response.unauthorized('Invalid credentails')
  }

  * create(request, response) {
    //Display a form to create a new user
    yield response.sendView('users.new')
  }

  * store(request, response) {
    console.log(request)
    //Save the new user
    yield this.User.create({
      email: request.input('email'),
      password: request.input('password'),
      type: request.input('type'),
      name: request.input('name'),
    })
    response.redirect('/')
  }

  * show(request, response) {
    //Show user details using the id
  }

  * edit(request, response) {
    //Display the form to edit the user
  }

  * update(request, response) {
    //Update the user given an id
  }

  * destroy(request, response) {
    //Delete the user
  }

}

module.exports = UsersController
