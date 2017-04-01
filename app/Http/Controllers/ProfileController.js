'use strict'
const Database = use('Database')

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
    const page = request.input('page') || 1

    const profiles = yield this.Profile
      .query()
      .city(request.input('city'))
      .category(request.input('category'))
      .search(request.input('search'))
      .inRange(30, request.ip())
      .paginate(page, 25)

    const components = request.except('page')

    let nextPage = request.url() + '?'
    let previousPage = request.url() + '?'

    for (var key in components) {
      if (components[key] !== null && components[key] !== 'page') {
        nextPage = `${nextPage}\&${key}=${decodeURIComponent(components[key])}`
      }
      previousPage = `${previousPage}\&${key}=${decodeURIComponent(components[key])}`
    }

    nextPage = `${nextPage}&page=${parseInt(page) + 1}`
    previousPage = `${previousPage}&page=${parseInt(page) === 1 ? (parseInt(page) + 2) : (parseInt(page) - 1)}`

    profiles.meta.nextPage = nextPage
    profiles.meta.previousPage = previousPage

    yield response.sendView('profiles.index', {
      profiles: profiles.toJSON()

    })
  }

  * show (request, response) {
    const profile = yield this.Profile.find(request.param('id'))
    const reviews = yield profile.reviews().fetch()
    const categories = yield profile.categories().fetch()
    const cities = yield profile.cities().fetch()

    profile.vote_quality = yield profile.reviews().avg('vote_quality as vote_quality')
    profile.vote_price = yield profile.reviews().avg('vote_price as vote_price')
    profile.vote_overall = yield profile.reviews().avg('vote_overall as vote_overall')

    yield response.sendView('profiles.show', {
      profile: profile.toJSON(),
      reviews: reviews.toJSON(),
      categories: categories.toJSON(),
      cities: cities.toJSON()
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
