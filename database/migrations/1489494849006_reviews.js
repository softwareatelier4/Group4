'use strict'

const Schema = use('Schema')

class ReviewsTableSchema extends Schema {

  up () {
    this.create('reviews', (table) => {

      table.increments('id').primary()
      table.text('comment')
      table.enu('vote_price', [1, 2, 3, 4, 5])
      table.enu('vote_quality', [1, 2, 3, 4, 5])
      table.enu('vote_overall', [1, 2, 3, 4, 5])

      table.integer('profile_id').unsigned()
      table.foreign('profile_id').references('profiles.id').onDelete('cascade')

      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('set null')

      table.timestamps()
    })
  }

  down () {
    this.drop('reviews')
  }

}

module.exports = ReviewsTableSchema
