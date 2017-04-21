'use strict'
const NodeGeocoder = require('node-geocoder')
const geoip = use('geoip-lite')
const q = require('q')
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyATbIT8xR4HJIV9-H_mFu4DaY3lqI0K6hE',
  Promise: q.Promise
})

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

    let options = {
      provider: 'google',
      httpAdapter: 'https',
      formatter: null
    }

    let geocoder = NodeGeocoder(options)
    let userLocation
    if (!request.input('location')) {
      const ip = (request.ip() === '127.0.0.1') ? '84.72.13.20' : request.ip()
      userLocation = geoip.lookup(ip).city
    } else {
      userLocation = request.input('location')
    }

    const res = yield geocoder.geocode(userLocation)

    const profiles = yield this.Profile
    .query()
    .inRange(3000, res)
    .category(request.input('category'))
    .search(request.input('search'))
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
    const reviews = yield profile.reviews().with('answer').fetch()
    const categories = yield profile.categories().fetch()
    const cities = yield profile.cities().fetch()

    const ip = (request.ip() === '127.0.0.1') ? '84.72.13.20' : request.ip()

    const distanceMatrix = yield googleMapsClient.distanceMatrix({
      origins: geoip.lookup(ip).city,
      destinations: profile.toJSON().lat + ',' + profile.toJSON().lng
    }).asPromise()

    profile.vote_quality = yield profile.reviews().avg('vote_quality as vote_quality')
    profile.vote_price = yield profile.reviews().avg('vote_price as vote_price')
    profile.vote_overall = yield profile.reviews().avg('vote_overall as vote_overall')

    if (distanceMatrix.json.rows[0].elements[0].status === 'ZERO_RESULTS') {
      profile.distanceTime = 'Not available'
    } else {
      profile.distanceTime = distanceMatrix.json.rows[0].elements[0].duration.text
    }

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
