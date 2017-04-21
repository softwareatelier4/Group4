'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {

  up () {
    this.create('profiles', (table) => {
      table.increments('id').primary()
      table.text('title')
      table.text('description')

      table.string('website').nullable()
      table.string('telephone').nullable()
      table.decimal('price', 5, 2).nullable()
      table.string('logo').nullable()
      table.string('lat').nullable()
      table.string('lng').nullable()

      table.integer('overall_rating').nullable()

      table.integer('user_id').unsigned()
      table.foreign('user_id').references('user_accounts.id').onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }

}

module.exports = ProfilesTableSchema
