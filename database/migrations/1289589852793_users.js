'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments('id').primary()
      table.string('email')
      table.string('password')

      table.string('name').defaultTo('Anonymous')
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
