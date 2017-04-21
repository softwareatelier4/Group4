'use strict'

const Lucid = use('Lucid')

class Answer extends Lucid {
  review () {
    return this.belongsTo('App/Model/Review')
  }

}

module.exports = Answer
