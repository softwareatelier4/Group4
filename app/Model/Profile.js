'use strict'

const Lucid = use('Lucid')

class Profile extends Lucid {

  categories () {
    return this.belongsToMany('App/Model/Category', 'profile_categories')
  }

  cities () {
    return this.belongsToMany('App/Model/City', 'profile_cities')
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
    if (categoryQuery) builder
      .innerJoin('profile_categories', 'profile_categories.profile_id', 'profiles.id')
      .innerJoin('categories', 'categories.id', 'profile_categories.category_id')
      .where('categories.name', categoryQuery)
      .select('profiles.*', 'categories.*')
  }

  static scopeCity (builder, cityQuery) {
    if (cityQuery) builder
      .innerJoin('profile_cities', 'profile_cities.profile_id', 'profiles.id')
      .innerJoin('cities', 'cities.id', 'profile_cities.city_id')
      .where('cities.name', cityQuery)
      .select('profiles.*', 'cities.*')
  }

  static scopeSearch (builder, searchQuery) {
    if (searchQuery) {
      var keywords = searchQuery.split(' ')

      for (var i = 0; i < keywords.length; i++) {
        const key = keywords[i]
        builder.where(function () {
          this.orWhere('title', 'like', `%${key}%`)
        .orWhere('description', 'like', `%${key}%`)
        .orWhere('website', 'like', `%${key}%`)
        })
      }
    }
  }
}

module.exports = Profile
