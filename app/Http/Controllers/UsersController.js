'use strict'

var google = require('googleapis')
var OAuth2 = google.auth.OAuth2

var oauth2Client = new OAuth2(
  '862466608226-00t2dpfcsf3kn63s9imf93a58hmbvm7l.apps.googleusercontent.com',
  '9mUHdNS9yure_CAcSS44s0iN',
  'http://localhost:3333/saveToken'
  )

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/calendar'
]

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
    if (request.currentUser.id == request.param('id')) {
      var url = oauth2Client.generateAuthUrl({
        access_type: 'online',
        scope: scopes
      })

      yield response.sendView('users.show',
        {
          'auth_url': url
        })
    } else {
      response.redirect('/register')
    }
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

  * saveToken (request, response) {
    const code = request.input('code')
    const user = yield request.auth.getUser()
    yield oauth2Client.getToken(code, function (err, tokens) {
      if (!err) {
        user.token = tokens.access_token
        user.expiry_date = tokens.expiry_date
        user.save()
      }
    })
  }

}

module.exports = UsersController
