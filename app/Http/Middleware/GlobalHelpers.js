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
    // here goes your middleware logic
    // yield next to pass the request to next middleware or controller
    const view = use('View')
    const allCategories = yield this.Category.all()
    view.global('globals',  {
      params : {}
    })
    yield next
  }

}

module.exports = GlobalHelpers
