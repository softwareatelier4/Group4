'use strict'

const URL = require('url').URL;

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

    let queryWithoutOrder = '/profiles?'

    const components = request.except('orderBy')

    for (var key in request.except('orderBy')) {
      queryWithoutOrder += `${key}=${decodeURIComponent(components[key])}&`
    }

    const currentUser = yield request.auth.getUser()
    response.viewInstance = use('View')
    response.viewInstance.global('currentUser', currentUser)
    response.viewInstance.global('request', request.all())
    response.viewInstance.global('queryWithoutOrder', queryWithoutOrder)

    yield next
  }

}

module.exports = GlobalHelpers
