'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
    this.create('categories', (table) => {
      table.increments('id').primary()
		table.string('name').nullable()

    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
