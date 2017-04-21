'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {
  profile () {
    return this.belongsTo('App/Model/Profile')
  }

  answer () {
    return this.hasOne('App/Model/Answer')
  }

  user () {
    return this.hasOne('App/Model/UserAccount')
  }
}

module.exports = Review
