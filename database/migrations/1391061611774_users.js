'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments('id').primary()
      table.string('name').defaultTo('Anonymous')
      table.string('email').notNullable().unique()
      table.enu('type', ['worker', 'user'])
      table.string('password').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
