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
}

module.exports = Profile
