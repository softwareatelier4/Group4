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

  static scopeCategory (builder, categoryQuery) {
    if (categoryQuery) builder.where('category', categoryQuery)
  }

  static scopeCity (builder, cityQuery) {
    if (cityQuery) builder.where('city', cityQuery)
  }

  static scopeSearch (builder, searchQuery) {
    if (searchQuery) {
      var keywords = searchQuery.split(' ')

      for (var i = 0; i < keywords.length; i++) {
        const key = keywords[i]
        builder.where(function () {
          this.orWhere('title', 'like', `%${key}%`)
        .orWhere('description', 'like', `%${key}%`)
        .orWhere('city', 'like', `%${key}%`)
        .orWhere('website', 'like', `%${key}%`)
        })
      }
    }
  }
}

module.exports = Profile
