'use strict'

const Lucid = use('Lucid')
const Database = use('Database')
const geoip = use('geoip-lite')
const NodeGeocoder = require('node-geocoder')

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
    if (categoryQuery) {
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
  static scopeInRange (builder, maxDistance, address) {
    var options = {
      provider: 'google',
      httpAdapter: 'https',
      formatter: null
    }

    var geocoder = NodeGeocoder(options)

    geocoder.geocode(address).then(function (res) {
      const lat = res[0].latitude
      const long = res[0].longitude
      console.log(long)
      if (maxDistance) {
        builder.select(Database.raw('*, (6371 * acos (  cos ( radians(?) )    * cos( radians( lat ) )  * cos( radians( lng ) - radians(?) )   + sin ( radians(?) ) * sin( radians( lat ) ))) AS distance', [lat, long, lat]))
        .groupBy('distance')
        .having('distance', '<', maxDistance)
      }
    })
  }
}

module.exports = Profile
