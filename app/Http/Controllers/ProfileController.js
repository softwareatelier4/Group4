'use strict'

class ProfileController {

  static get inject () {
    return ['App/Model/Profile', 'App/Model/Category']
  }

  constructor (Profile, Category) {
    this.Profile = Profile
    this.Category = Category
  }

  * index (request, response) {
    const profiles = yield this.Profile
      .query()
      .city(request.input('city'))
      .category(request.input('category'))
      .search(request.input('search'))
      .fetch()

    const categories = yield this.Category.all()

    yield response.sendView('profiles.index', { profiles: profiles.toJSON(), categories: categories.toJSON()})
  }

  * show (request, response) {
    const profile = yield this.Profile.find(request.param('id'))
    const reviews = yield profile.reviews().fetch()

    yield response.sendView('profiles.show', { profile: profile, reviews: reviews.toJSON() })
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
