'use strict'

const Schema = use('Schema')

class ReviewsTableSchema extends Schema {

  up () {
    this.create('reviews', (table) => {
		table.increments('id').primary()
		table.integer('profile_id').unsigned()
		table.foreign('profile_id').references('profiles.id')
		table.integer('user_id').unsigned()
		table.string('comment').nullable()
		table.integer('vote_price').unsigned()
		table.integer('vote_quality').unsigned()
		table.integer('vote_overall').unsigned()
		table.timestamps()
    })
  }

  down () {
    this.drop('reviews')
  }

}

module.exports = ReviewsTableSchema
