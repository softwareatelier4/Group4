'use strict'

class ProfileController {

  static get inject () {
    return ['App/Model/Profile']
  }

  constructor (Profile) {
    this.Profile = Profile
  }

  * index (request, response) {
    const profiles = yield this.Profile
      .query()
      .city(request.input('city'))
      .category(request.input('category'))
      .fetch()

    yield response.sendView('profiles.index', { profiles: profiles.toJSON() })
  }

  * show (request, response) {
    const profile = yield this.Profile.find(request.param('id'))

    yield response.sendView('profiles.show', { profile: profile })
  }

  * create (request, response) {

  }

  * edit (request, response) {
    const profile = yield this.Profile.find(request.param('id'))
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
