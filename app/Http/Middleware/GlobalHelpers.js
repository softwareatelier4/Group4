'use strict'

class GlobalHelpers {

  static get inject () {
    return ['App/Model/Profile', 'App/Model/Category', 'App/Model/City']
  }
  constructor (Profile, Category, City) {
    this.Profile = Profile
    this.Category = Category
    this.City = City
  }

  * handle (request, response, next) {
    const view = use('View')

    const allCategories = yield this.Category.all()
    const allCities = yield this.City.all()
    view.global('allCategories', allCategories.toJSON())
    view.global('allCities', allCities.toJSON())

    response.viewInstance = use('View')
    response.viewInstance.global('request', request.all())
    console.log(response)
    yield next
  }

}

module.exports = GlobalHelpers
