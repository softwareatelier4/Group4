'use strict'

const Schema = use('Schema')

class CitiesTableSchema extends Schema {

  up () {
    this.create('cities', (table) => {
      table.increments('id').primary()
      table.string('name').unique()
    })
  }

  down () {
    this.drop('cities')
  }

}

module.exports = CitiesTableSchema
