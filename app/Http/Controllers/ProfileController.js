'use strict'
const NodeGeocoder = require('node-geocoder')
const geoip = use('geoip-lite')
const q = require('q')
const Database = use('Database')
const Helpers = use('Helpers')

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyATbIT8xR4HJIV9-H_mFu4DaY3lqI0K6hE',
  Promise: q.Promise
})

class ProfileController {

  static get inject () {
    return ['App/Model/Profile', 'App/Model/Category', 'App/Model/Event', 'App/Model/UserAccount']
  }

  constructor (Profile, Category, Event, User) {
    this.Profile = Profile
    this.Category = Category
    this.Event = Event
    this.User = User
  }

  * index (request, response) {
    const page = request.input('page') || 1

    // 0 by distance low
    // 1 by distance high
    // 2 price low
    // 3 price high
    // 4 rating low
    // 5 rating high
    let orderBy = request.input('orderBy') || 0

    orderBy = parseInt(orderBy)

    let order = 'distance'
    let asc = 'asc'

    switch (orderBy) {
      case 1:
        asc = 'desc'
        break
      case 2:
        order = 'price'
        break
      case 3:
        order = 'price'
        asc = 'desc'
        break
      case 4:
        order = 'overall_rating'
        break
      case 5:
        order = 'overall_rating'
        asc = 'desc'
        break
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
    yield request.session.put('location', userLocation)

    const res = yield geocoder.geocode(userLocation)

    let profiles

    if (request.input('emergency')) {
      var d = new Date()
      const lat = res[0].latitude
      const long = res[0].longitude
      let str = 'profiles.*, (6371 * acos (  cos ( radians(?) )    * cos( radians( lat ) )  * cos( radians( lng ) - radians(?) )   + sin ( radians(?) ) * sin( radians( lat ) ))) AS distance'
      const sub = Database.select(Database.raw(str, [lat, long, lat]))
      .from('profiles')
      .innerJoin('user_accounts', 'profiles.user_id', 'user_accounts.id')
      .innerJoin('calendars', 'calendars.user_account_id', 'user_accounts.id')
      .where('emergency', 1)
      .whereNotIn('calendars.id', function () {
        this.select('calendar_id')
        .from('events')
        .where('start', '<', d)
        .andWhere('end', '>', d)
      })
      profiles = yield this.Profile
      .query()
      .select('profiles.*')
      .eventInRange(500, res)
      .category(request.input('category'))
      .innerJoin('user_accounts', 'profiles.user_id', 'user_accounts.id')
      .innerJoin('calendars', 'calendars.user_account_id', 'user_accounts.id')
      .innerJoin('events', 'calendars.id', 'events.calendar_id')
      .where('start', '<', d)
      .andWhere('end', '>', d)
      .andWhere('transparency', 'transparent')
      .union(sub)
      .orderBy(order, asc)
      .fetch()
    } else {
      profiles = yield this.Profile
      .query()
      .select('*')
      .category(request.input('category'))
      .price(request.input('minPrice'), request.input('maxPrice'))
      .rating(request.input('minRate'), request.input('maxRate'))
      .search(request.input('search'))
      .distance(request.input('minDist'), request.input('maxDist'), res)
      .select('profiles.*')
      .orderBy(order, asc)
      .fetch()
    }

    // const components = request.except('page')

    // let nextPage = request.url() + '?'
    // let previousPage = request.url() + '?'

    // for (var key in components) {
    //   if (components[key] !== null && components[key] !== 'page') {
    //     nextPage = `${nextPage}\&${key}=${decodeURIComponent(components[key])}`
    //   }
    //   previousPage = `${previousPage}\&${key}=${decodeURIComponent(components[key])}`
    // }

    // nextPage = `${nextPage}&page=${parseInt(page) + 1}`
    // previousPage = `${previousPage}&page=${parseInt(page) === 1 ? (parseInt(page) + 2) : (parseInt(page) - 1)}`

    // profiles.meta.nextPage = nextPage
    // profiles.meta.previousPage = previousPage

    yield response.sendView('profiles.index', {
      profiles: profiles.toJSON()
    })
  }

  * show (request, response) {
    const profile = yield this.Profile.find(request.param('id'))
    const reviews = yield profile.reviews().with('answer').fetch()
    const categories = yield profile.categories().fetch()

    let userLocation = yield request.session.get('location')

    // const ip = (request.ip() === '127.0.0.1') ? '84.72.13.20' : request.ip()

    const distanceMatrix = yield googleMapsClient.distanceMatrix({
      origins: userLocation,
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
    /* Attach the User who wrote the review to the Review object */
    let tempReviews = reviews.toJSON()
    for (var i = 0; i < tempReviews.length; i++) {
      tempReviews[i].user = yield this.User.find(tempReviews[i].user_id)
      if (tempReviews[i].user) {
        tempReviews[i].user = tempReviews[i].user.toJSON()
      }
    }

    yield response.sendView('profiles.show', {
      profile: profile.toJSON(),
      reviews: tempReviews,
      categories: categories.toJSON()
      // userLocation: { city: userLocation }
    })
  }

  * create (request, response) {
    const categories = yield this.Category.all()

    yield response.sendView('profiles.create', {
      categories: categories.toJSON()
    })
  }

  * edit (request, response) {
    const user = yield request.auth.getUser();
    const profile = yield this.Profile.find(request.param('id'))

    if (user.id != profile.user_id){
      yield response.redirect('/profiles')
    }

    yield response.sendView('profiles.edit', {profile: profile.toJSON()})
    //console.log(request)
    // const profile = yield this.Profile.find(request.param('id'))
    // yield response.sendView('profiles.edit', { profile: profile })
  }

  * update (request, response) {
    const profile = yield this.Profile.find(request.param('id'))
    const user = yield request.auth.getUser();
    if (user.id != profile.user_id){
      yield response.redirect('/profiles')
    }
    profile.title = request.input('title')
    profile.description = request.input('description')
    profile.city = request.input('city')
    profile.website = request.input('website')
    profile.telephone = request.input('telephone')
    profile.price = request.input('price')
    profile.email = request.input('email')
    let options = {
      provider: 'google',
      httpAdapter: 'https',
      formatter: null
    }
    let geocoder = NodeGeocoder(options)
    const res = yield geocoder.geocode(request.input('city'))
    profile.lat = res[0].latitude
    profile.lng = res[0].longitude
    yield profile.save()


    const file = request.file('logo')
    console.log(file)
    if (file.clientSize()) {
      yield file.move(Helpers.publicPath() + '/profile_images/', profile.id + '_' + file.clientName())
      if (!file.moved()) {
        response.badRequest(file.errors())
        return
      }
      profile.logo = profile.id + '_' + file.clientName()
    }

    yield profile.save()

    response.redirect('/profiles/' + profile.id)
  }

  * store (request, response) {
    const user = yield request.auth.getUser()
    const profile = new this.Profile()
    profile.title = request.input('title')
    profile.description = request.input('description')
    profile.city = request.input('city')
    profile.website = request.input('website')
    profile.telephone = request.input('telephone')
    profile.price = request.input('price')
    profile.email = request.input('email')
    // profile.user_id = user.id
    let options = {
      provider: 'google',
      httpAdapter: 'https',
      formatter: null
    }
    let geocoder = NodeGeocoder(options)
    const res = yield geocoder.geocode(request.input('city'))
    profile.lat = res[0].latitude
    profile.lng = res[0].longitude
    yield profile.save()

    const file = request.file('logo')
    if (file.clientSize()) {
      yield file.move(Helpers.publicPath() + '/profile_images/', profile.id + '_' + file.clientName())
      if (!file.moved()) {
        response.badRequest(file.errors())
        return
      }
      profile.logo = profile.id + '_' + file.clientName()
    }

    yield profile.save()

    yield profile.categories().attach([request.input('category')])

    response.redirect('/profiles/' + profile.id)
  }

  * destroy (request, response) {
    yield response.sendView('index')
  }
}

module.exports = ProfileController
