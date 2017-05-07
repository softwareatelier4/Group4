'use strict'
const NodeGeocoder = require('node-geocoder')
const Lucid = use('Lucid')
const Database = use('Database')

class Event extends Lucid {
  calendar () {
    return this.belongsTo('App/Model/Calendar')
  }

  static scopeInRange (builder, maxDistance, res) {
    const lat = res[0].latitude
    const long = res[0].longitude

    let str = '*, (6371 * acos (  cos ( radians(?) )    * cos( radians( lat ) )  * cos( radians( lng ) - radians(?) )   + sin ( radians(?) ) * sin( radians( lat ) ))) AS distance'
    builder.select(Database.raw(str, [lat, long, lat]))
    .groupBy('distance')
    .having('distance', '<', maxDistance)
  }

  static boot () {
    super.boot()
    this.addHook('beforeCreate', function * (next) {
      const options = {
        provider: 'google',
        httpAdapter: 'https',
        formatter: null
      }
      const geocoder = NodeGeocoder(options)
      if (this.location && this.location != '') {
        const res = yield geocoder.geocode(this.location)
        this.lat = res[0].latitude
        this.lng = res[0].longitude
      }
      yield next
    })
  }
}

module.exports = Event
