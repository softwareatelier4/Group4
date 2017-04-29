'use strict'

const Lucid = use('Lucid')

class Calendar extends Lucid {

  user () {
    return this.belongsTo('App/Model/UserAccount')
  }

}

module.exports = Calendar
