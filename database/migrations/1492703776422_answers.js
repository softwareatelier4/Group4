'use strict'

const Schema = use('Schema')

class AnswersTableSchema extends Schema {

  up () {
    this.create('answers', (table) => {
      table.increments('id').primary()
      table.text('comment')
      table.integer('review_id').unsigned()
      table.foreign('review_id').references('reviews.id').onDelete('cascade')

      table.integer('user_id').unsigned()
      table.foreign('user_id').references('user_accounts.id').onDelete('set null')

      table.timestamps()
    })
  }

  down () {
    this.drop('answers')
  }

}

module.exports = AnswersTableSchema
