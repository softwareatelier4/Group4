'use strict'

const CalendarController = use('App/Http/Controllers/CalendarController')

class syncCalendars {
  // This is required. This is the schedule for which the task will run.
  // More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
  static get schedule () {
    // once every hour
    return '* */1 * * *'
  }

  // This is the function that is called at the defined schedule
  * handle () {
    // Call Calendar controller method and sync the Google API
    const controller = new CalendarController()
    yield controller.getCalendars()
  }
}

module.exports = syncCalendars
