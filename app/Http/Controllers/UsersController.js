'use strict'

const google = require('googleapis')
const googleCal = google.calendar('v3')
const OAuth2 = google.auth.OAuth2
const q = require('q')
const fs = require('fs')
const oauth2Client = new OAuth2(
  '862466608226-00t2dpfcsf3kn63s9imf93a58hmbvm7l.apps.googleusercontent.com',
  '9mUHdNS9yure_CAcSS44s0iN',
  'http://localhost:3333/saveToken'
  )

// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/calendar'
]

const Helpers = use('Helpers')

class UsersController {

  static get inject () {
    return ['App/Model/UserAccount', 'App/Model/Calendar']
  }

  constructor (User, Calendar) {
    this.User = User
    this.Calendar = Calendar
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
    response.redirect('profiles')
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
        access_type: 'offline',
        scope: scopes
      })

      let calendars = null
      const user = yield request.auth.getUser()
      if (user.access_token) {
        oauth2Client.setCredentials({
          access_token: user.access_token,
          refresh_token: user.refresh_token
        })
        calendars = yield q.ninvoke(googleCal.calendarList, 'list', {auth: oauth2Client}).spread(function (response) {
          return response
        })
      }

      yield response.sendView('users.show',
        {
          'auth_url': url,
          'calendars': calendars
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

    const user = yield request.auth.getUser()

    user.email = request.input('email')
    user.name = request.input('name')
    user.emergency = request.input('emergency') || 0
    const avatar = request.file('avatar')

    if (avatar.clientSize()) {
      const fileName = `${user.id}.${avatar.extension()}`
      if (fs.existsSync(Helpers.publicPath() + '/avatar/' + fileName)) {
        fs.unlinkSync(Helpers.publicPath() + '/avatar/' + fileName)
      }
      yield avatar.move(Helpers.publicPath() + '/avatar', fileName)
      if (!avatar.moved()) {
        response.badRequest(avatar.errors())
        return
      }
      user.avatar = avatar.uploadPath()
    }

    if (request.input('calendar')) {
      yield this.Calendar.query().where('user_account_id', user.id).delete()
      const calendarData = yield q.ninvoke(googleCal.calendars, 'get', {calendarId: request.input('calendar'), auth: oauth2Client}).spread(function (response) {
        return response
      })
      const calendar = new this.Calendar()
      calendar.id = calendarData.id
      calendar.summary = calendarData.summary
      calendar.description = calendarData.description

      yield user.calendar().save(calendar)
    }
    yield user.save()

    response.redirect('back')
  }

  * destroy (request, response) {
    // Delete the user
  }

  * saveToken (request, response) {
    const code = request.input('code')

    const tokens = yield q.ninvoke(oauth2Client, 'getToken', code).spread(function (tokens) {
      return tokens
    })

    const user = yield request.auth.getUser()
    user.access_token = tokens.access_token
    user.refresh_token = tokens.refresh_token
    user.expiry_date = tokens.expiry_date
    yield user.save()

    response.redirect('/users/' + user.id)
  }

}

module.exports = UsersController
