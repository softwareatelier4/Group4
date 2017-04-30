'use strict'
const NodeGeocoder = require('node-geocoder')
const Lucid = use('Lucid')

class Event extends Lucid {
  calendar () {
    return this.belongsTo('App/Model/Calendar')
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
        this.lat = res.latitude
        this.lng = res.longitude
      }
      yield next
    })
  }
}

module.exports = Event
