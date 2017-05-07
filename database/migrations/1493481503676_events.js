'use strict'

const Schema = use('Schema')

class EventsTableSchema extends Schema {

  up () {
    this.create('events', (table) => {
      table.string('id', 100).primary()
      table.text('status')
      table.text('summary').nullable()
      table.text('description').nullable()
      table.text('location').nullable()
      table.string('lat').nullable()
      table.string('lng').nullable()
      table.text('transparency').nullable()
      table.dateTime('start').nullable()
      table.dateTime('end').nullable()
      table.string('calendar_id', 100)
      table.foreign('calendar_id').references('calendars.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('events')
  }

}

module.exports = EventsTableSchema
