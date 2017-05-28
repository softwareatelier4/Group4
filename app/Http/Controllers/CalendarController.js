'use strict'
const google = require('googleapis')
const googleCal = google.calendar('v3')
const OAuth2 = google.auth.OAuth2
const q = require('q')
const Calendar = use('App/Model/Calendar')
const Event = use('App/Model/Event')
const User = use('App/Model/UserAccount')

const oauth2Client = new OAuth2(
  '862466608226-00t2dpfcsf3kn63s9imf93a58hmbvm7l.apps.googleusercontent.com',
  '9mUHdNS9yure_CAcSS44s0iN',
  'http://localhost:3333/saveToken'
  )

class CalendarController {
  * getCalendars (request, response) {
    const calendars = yield Calendar.all()
    const calendarsJSON = calendars.toJSON()

    const events = yield Event.all()

    // Delete all data in the events table
    for (let i = 0; i < events.value().length; i++) {
      yield events.value()[i].delete()
    }

    for (let i = 0; i < calendarsJSON.length; i++) {
      const user = yield User.find(calendarsJSON[i].user_account_id)
      oauth2Client.setCredentials({
        access_token: user.access_token,
        refresh_token: user.refresh_token
      })
      const events = yield q.ninvoke(googleCal.events, 'list', {calendarId: calendarsJSON[i].id, auth: oauth2Client}).spread(function (response) {
        return response
      })

      for (var j = 0; j < events.items.length; j++) {
        const event = new Event()
        event.id = events.items[j].id
        event.status = events.items[j].status
        event.summary = events.items[j].summary
        event.description = events.items[j].description
        event.location = events.items[j].location
        event.transparency = events.items[j].transparency
        event.start = events.items[j].start.dateTime
        event.end = events.items[j].end.dateTime
        event.calendar_id = calendarsJSON[i].id
        yield event.save()
      }
    }
  }
}

module.exports = CalendarController
