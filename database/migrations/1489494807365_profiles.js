'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments('id').primary()
      table.string('user_id').nullable()
      table.string('city').nullable()
      table.string('website').nullable()
      table.string('telephone').nullable()
      table.text('desription').nullable()
      table.string('price').nullable()
      table.string('logo').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema
