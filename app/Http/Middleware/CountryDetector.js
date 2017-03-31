'use strict'

const geoip = use('geoip-lite') // npm module
const geolib = use('geolib') // npm module

class CountryDetector {

  * handle (request, response, next) {
    const ip = (request.ip() == '127.0.0.1') ? '84.72.13.20' : request.ip()
    const userLocation = geoip.lookup(ip)
    const View = use('View')
    View.global('userLocation', userLocation)

    yield next
  }

}
module.exports = CountryDetector
