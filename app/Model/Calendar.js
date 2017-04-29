'use strict'

const Lucid = use('Lucid')

class Calendar extends Lucid {

  user () {
    return this.belongsTo('App/Model/UserAccount')
  }

  reviews () {
  	return this.hasMany('App/Model/Event')
  }

}

module.exports = Calendar
