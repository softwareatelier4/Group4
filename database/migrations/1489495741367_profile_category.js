'use strict'

const Schema = use('Schema')

class ProfileCategoryTableSchema extends Schema {

  up () {
    this.create('profile_category', (table) => {
      table.increments()
      table.integer('profile_id').unsigned()
      table.foreign('profile_id').references('profiles.id')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('categories.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('profile_category')
  }

}

module.exports = ProfileCategoryTableSchema
