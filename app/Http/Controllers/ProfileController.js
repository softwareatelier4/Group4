'use strict'
const NodeGeocoder = require('node-geocoder')
const geoip = use('geoip-lite')
const q = require('q')

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyATbIT8xR4HJIV9-H_mFu4DaY3lqI0K6hE',
  Promise: q.Promise
})

const Validator = use('Validator')
const Profile = use('App/Model/Profile')
const Helpers = use('Helpers')

class ProfileController {

  static get inject () {
    return ['App/Model/Profile', 'App/Model/Category']
  }

  constructor (Profile, Category) {
    this.Profile = Profile
    this.Category = Category
  }

  * index (request, response) {
    const page = request.input('page') || 1

    // 0 by distance
    // 1 by price
    // 2 overall rating
    let orderBy = request.input('orderBy') || 0

    orderBy = parseInt(orderBy)

    let order = 'distance'

    switch(orderBy) {
    case 1:
      order = 'price'
      break;
    case 2:
      order = 'overall_rating'
      break;
    default:
      order = 'distance'
    }

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
    .orderBy(order, orderBy == 2 ? 'desc' : 'asc')
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
      categories: categories.toJSON()
    })
  }

  * create (request, response) {
    yield response.sendView('profiles.create')
  }

  * edit (request, response) {
    const profile = yield this.Profile.find(request.param('id'))
    yield response.sendView('profiles.edit', { profile: profile })
  }

  * update (request, response) {

  }

  * upload (request, response) {
    // const logo = request.file('logo', {
    //   maxSize: '2mb',
    //   allowedExtensions: ['jpg', 'png', 'jpeg']
    // })
    // const profileId = request.param('id')
    // const profile = yield Profile.findOrFail('profileId')
    //
    //
    // const fileName = `${new Date().getTime()}.${logo.extension()}`
    // console.log(fileName)
    // yield logo.move(Helpers.storagePath(), fileName)
    //
    // if (!logo.moved()) {
    //   response.badRequest(logo.errors())
    //   return
    // }
    // Profile.logo = logo.uploadPath()
    // yield Profile.save()
    // response.ok('Logo uploaded succesfully!')
  }

  * store (request, response){
     const profileData = request.only('id', 'title', 'description', 'email','telephone', 'website', 'price', 'logo');
     const logo = request.param('logo');

     const rules = {
       id: 'required',
       title: 'required',
       description: 'required',
       email: 'required',
       telephone: 'required',
       website: 'required',
       price: 'required',

     }
     const validation = yield Validator.validate(profileData, rules)

     if (validation.fails()) {
        console.log("there was an error")

        yield request
          .withOnly('id', 'title', 'description', 'email','telephone', 'website', 'price', 'logo')
          .andWith({ errors: validation.messages()})
          .flash()

        response.redirect('/profiles/create')

      }
      yield Profile.create(profileData)
      
      response.redirect('/')
  }

  * destroy (request, response) {

  }

}

module.exports = ProfileController
