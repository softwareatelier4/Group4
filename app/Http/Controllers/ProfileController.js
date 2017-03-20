'use strict'

class ProfileController {

  static get inject () {
    return ['App/Model/Profile', 'App/Model/Category', 'App/Model/City']
  }

  constructor (Profile, Category, City) {
    this.Profile = Profile
    this.Category = Category
    this.City = City
  }

  * index (request, response) {
    const profiles = yield this.Profile
      .query()
      .city(request.input('city'))
      .category(request.input('category'))
      .search(request.input('search'))
      .fetch()

    // TODO: MAKE THIS AJAX
    const allCategories = yield this.Category.query().has('profiles').fetch()
    const allCities = yield this.City.query().has('profiles').fetch()

    yield response.sendView('profiles.index', {
      profiles: profiles.toJSON(),
      allCategories: allCategories.toJSON(),
      allCities: allCities.toJSON()
    })
  }

  * show (request, response) {
    const profile = yield this.Profile.find(request.param('id'))
    const reviews = yield profile.reviews().fetch()
    const categories = yield profile.categories().fetch()
    const cities = yield profile.cities().fetch()

    // TODO: MAKE THIS AJAX
    const allCategories = yield this.Category.query().has('profiles').fetch()
    const allCities = yield this.City.query().has('profiles').fetch()

    yield response.sendView('profiles.show', {
      profile: profile.toJSON(),
      reviews: reviews.toJSON(),
      categories: categories.toJSON(),
      cities: cities.toJSON(),
      allCategories: allCategories.toJSON(),
      allCities: allCities.toJSON()
    })
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
