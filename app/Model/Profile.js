'use strict'

const Lucid = use('Lucid')
const Database = use('Database')

class Profile extends Lucid {

  categories () {
    return this.belongsToMany('App/Model/Category', 'profile_categories')
  }

  reviews () {
    return this.hasMany('App/Model/Review')
  }

  user () {
    return this.belongsTo('App/Model/UserAccount')
  }

  /*
  * QUERY SCOPES
  */

  static scopeCategory (builder, categoryQuery) {
    if (categoryQuery && categoryQuery != 0) {
      builder
      .innerJoin('profile_categories', 'profiles.id', 'profile_categories.profile_id')
      .where('category_id', categoryQuery)
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

  static scopePrice (builder, min, max) {
    min = min || 0
    max = max || 1000
    builder.whereBetween('price', [min, max]).orWhere('price', null)
  }

  static scopeRating (builder, min, max) {
    min = min || 1
    max = max || 5
    builder.whereBetween('overall_rating', [min, max]).orWhere('overall_rating', null)
  }

  static scopeDistance (builder, min, max, res) {
    min = min || 0
    max = max || 500
    const lat = res[0].latitude
    const long = res[0].longitude

    let str = '*, (6371 * acos (  cos ( radians(?) )    * cos( radians( lat ) )  * cos( radians( lng ) - radians(?) )   + sin ( radians(?) ) * sin( radians( lat ) ))) AS distance'
    builder.select(Database.raw(str, [lat, long, lat]))
    .groupBy('distance')
    .having('distance', '>=', min)
    .having('distance', '<=', max)
  }
}

module.exports = Profile
