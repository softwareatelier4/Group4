'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments('id').primary()
      table.text('title')
      table.text('description')
      table.string('email').nullable()
      table.string('website').nullable()
      table.string('telephone').nullable()
      table.string('price').nullable()
      table.string('logo').nullable()
      table.string('lat').nullable()
      table.string('long').nullable()

      table.integer('user_id').unsigned().nullable()
      table.foreign('user_id').references('users.id').onDelete('SET NULL')

      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema
