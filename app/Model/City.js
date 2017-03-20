'use strict'

const Lucid = use('Lucid')

class City extends Lucid {

  profiles () {
    return this.belongsToMany('App/Model/Profile', 'profile_cities')
  }

  /** Disabling auto-timestamp */
  static get createTimestamp () {
    return null
  }
  static get updateTimestamp () {
    return null
  }
}

module.exports = City
