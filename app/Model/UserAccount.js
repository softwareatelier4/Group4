'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class UserAccount extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      console.log('email', this.email)
      console.log('password', this.password)
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = UserAccount
