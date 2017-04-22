'use strict'

class GlobalHelpers {

  static get inject () {
    return ['App/Model/Profile', 'App/Model/Category']
  }
  constructor (Profile, Category) {
    this.Profile = Profile
    this.Category = Category
  }

  * handle (request, response, next) {
    const view = use('View')

    const allCategories = yield this.Category.all()
    view.global('allCategories', allCategories.toJSON())

    response.viewInstance = use('View')
    response.viewInstance.global('request', request.all())
    yield next
  }

}

module.exports = GlobalHelpers
