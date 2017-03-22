'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  profiles () {
    return this.hasMany('App/Model/Profile')
  }
}

module.exports = User
