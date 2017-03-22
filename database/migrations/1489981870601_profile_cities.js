'use strict'

const Schema = use('Schema')

class ProfileCitiesTableSchema extends Schema {

  up () {
    this.create('profile_cities', (table) => {
      table.increments('id').primary()

      table.integer('profile_id').unsigned()
      table.foreign('profile_id').references('profiles.id').onDelete('cascade')

      table.integer('city_id').unsigned()
      table.foreign('city_id').references('cities.id').onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('profile_cities')
  }

}

module.exports = ProfileCitiesTableSchema
