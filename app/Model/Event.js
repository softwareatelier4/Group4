'use strict'

const Lucid = use('Lucid')

class Event extends Lucid {
  calendar () {
    return this.belongsTo('App/Model/Calendar')
  }

}

module.exports = Event
