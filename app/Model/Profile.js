'use strict'

const Lucid = use('Lucid')

class Profile extends Lucid {

  categories () {
    return this.belongsToMany('App/Model/Category', 'profile_category')
  }

  reviews () {
    return this.hasMany('App/Model/Review')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }


  /*
  * QUERY SCOPES
  */

  static scopeCategory(builder, categoryQuery) {
    if (categoryQuery) builder.where('category', categoryQuery)
  }

  static scopeCity (builder, cityQuery) {
    if (cityQuery) builder.where('city', cityQuery)
  }
}

module.exports = Profile
