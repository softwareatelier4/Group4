'use strict'

const Schema = use('Schema')

class CalendarsTableSchema extends Schema {

  up () {
    this.create('calendars', (table) => {
      table.string('id', 100).primary()
      table.text('summary').nullable()
      table.text('description').nullable()
      table.integer('user_account_id').unsigned()
      table.foreign('user_account_id').references('user_accounts.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('calendars')
  }

}

module.exports = CalendarsTableSchema
