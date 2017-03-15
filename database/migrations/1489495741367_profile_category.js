'use strict'

const Schema = use('Schema')

class ProfileCategoryTableSchema extends Schema {

  up () {
    this.create('profile_category', (table) => {

      table.increments('id').primary()

      table.integer('profile_id').unsigned()
      table.foreign('profile_id').references('profiles.id').onDelete('cascade')

      table.integer('category_id').unsigned()
      table.foreign('category_id').references('categories.id').onDelete('cascade')

      table.timestamps()
    })
  }

  down () {
    this.drop('profile_category')
  }

}

module.exports = ProfileCategoryTableSchema
