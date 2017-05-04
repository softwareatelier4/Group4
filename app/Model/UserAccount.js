'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class UserAccount extends Lucid {

  calendar () {
    return this.hasOne('App/Model/Calendar')
  }

  profiles () {
    return this.hasMany('App/Model/Profile')
  }

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = UserAccount
