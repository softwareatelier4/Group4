'use strict'

const Lucid = use('Lucid')
const Database = use('Database')

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
    if (categoryQuery && categoryQuery != 0) {
      builder
      .innerJoin('profile_categories', 'profile_categories.profile_id', 'profiles.id')
      .innerJoin('categories', 'categories.id', 'profile_categories.category_id')
      .where('profile_categories.category_id', categoryQuery)
      .select('profiles.*')
    }
  }

  static scopeCity (builder, cityQuery) {
    if (cityQuery) {
      builder
      .innerJoin('profile_cities', 'profile_cities.profile_id', 'profiles.id')
      .innerJoin('cities', 'cities.id', 'profile_cities.city_id')
      .where('profile_cities.city_id', cityQuery)
      .select('profiles.*')
    }
  }

  static scopeSearch (builder, searchQuery) {
    if (searchQuery) {
      let keywords = searchQuery.split(' ')

      for (let i = 0; i < keywords.length; i++) {
        const key = keywords[i]
        builder.where(function () {
          this.orWhere('title', 'like', `%${key}%`)
          .orWhere('description', 'like', `%${key}%`)
          .orWhere('website', 'like', `%${key}%`)
        })
      }
    }
  }
  static scopeInRange (builder, maxDistance, res) {
    const lat = res[0].latitude
    const long = res[0].longitude

    let str = '*, (6371 * acos (  cos ( radians(?) )    * cos( radians( lat ) )  * cos( radians( lng ) - radians(?) )   + sin ( radians(?) ) * sin( radians( lat ) ))) AS distance'
    builder.select(Database.raw(str, [lat, long, lat]))
    .groupBy('distance')
    .having('distance', '<', 50)
  }
}

module.exports = Profile
