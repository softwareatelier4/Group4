'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {
  profile () {
    return this.belongsTo('App/Model/Profile')
  }
}

module.exports = Review
