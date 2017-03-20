'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {

  profiles () {
    return this.belongsToMany('App/Model/Profile', 'profile_category')
  }

  /** Disabling auto-timestamp */
  static get createTimestamp () {
    return null
  }
  static get updateTimestamp () {
    return null
  }
}

module.exports = Category
