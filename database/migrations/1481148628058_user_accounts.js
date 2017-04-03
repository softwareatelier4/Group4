'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('user_accounts', table => {
      table.increments('id').primary()

      table.string('email').notNullable().unique()
      table.string('password', 60).notNullable()

      table.string('name').defaultTo('Anonymous')
      table.enu('type', ['worker', 'user'])

      table.timestamps()
    })
  }

  down () {
    this.drop('user_accounts')
  }

}

module.exports = UsersTableSchema
