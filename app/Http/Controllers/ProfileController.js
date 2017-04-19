'use strict'

const Validator = use('Validator')
const Profile = use('App/Model/Profile')
const Helpers = use('Helpers')

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
      .paginate(page, 25)

    // TODO: MAKE THIS AJAX
    const allCategories = yield this.Category.query().has('profiles').fetch()
    const allCities = yield this.City.query().has('profiles').fetch()

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
    previousPage = `${previousPage}&page=${parseInt(page) == 1 ? (parseInt(page) + 2) : (parseInt(page) - 1)}`

    profiles.meta.nextPage = nextPage
    profiles.meta.previousPage = previousPage

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

    profile.vote_quality = yield profile.reviews().avg('vote_quality as vote_quality')
    profile.vote_price = yield profile.reviews().avg('vote_price as vote_price')
    profile.vote_overall = yield profile.reviews().avg('vote_overall as vote_overall')

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
