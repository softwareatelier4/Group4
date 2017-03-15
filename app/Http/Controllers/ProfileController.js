'use strict'

const Profile = use('App/Model/Profile')

class ProfileController {
  * index (request, response) {
    const profiles = yield Profile.all()
    yield response.sendView('profiles.index', { profiles: profiles.toJSON() })
  }

  * show (request, response) {
    const profile = yield Profile.find(request.param('id'))
    yield response.sendView('profiles.show', { profile: profile })
  }

  * create (request, response) {

  }

  * edit (request, response) {
    const profile = yield Profile.find(request.param('id'))
    yield response.sendView('profiles.edit', { profile: profile })
  }

  * update (request, response) {

  }

  * store (request, response) {

  }

  * destroy (request, response) {

  }
}

module.exports = ProfileController
