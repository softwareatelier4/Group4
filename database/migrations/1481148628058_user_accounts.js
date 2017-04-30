'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('user_accounts', table => {
      table.increments('id').primary()

      table.string('email').notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('name').defaultTo('Anonymous')
      table.text('avatar').nullable()
      table.enu('type', ['worker', 'user'])
      table.text('access_token').nullable()
      table.text('refresh_token').nullable()
      table.bigInteger('expiry_date').nullable()
      table.boolean('emergency').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_accounts')
  }

}

module.exports = UsersTableSchema
