'use strict'
const google = require('googleapis')
const googleCal = google.calendar('v3')
const OAuth2 = google.auth.OAuth2
const q = require('q')

const oauth2Client = new OAuth2(
  '862466608226-00t2dpfcsf3kn63s9imf93a58hmbvm7l.apps.googleusercontent.com',
  '9mUHdNS9yure_CAcSS44s0iN',
  'http://localhost:3333/saveToken'
  )

class CalendarController {

  static get inject () {
    return ['App/Model/Calendar', 'App/Model/Event', 'App/Model/UserAccount' ]
  }

  constructor (Calendar, Event, User) {
    this.Calendar = Calendar
    this.Event = Event
    this.User = User
  }

  * getCalendars (request, response) {
    const calendars = yield this.Calendar.all()
    const calendarsJSON = calendars.toJSON()
    for (var i = 0; i < calendarsJSON.length; i++) {
      const user = yield this.User.find(calendarsJSON[i].user_account_id)
      oauth2Client.setCredentials({
        access_token: user.access_token,
        refresh_token: user.refresh_token
      })
      const events = yield q.ninvoke(googleCal.events, 'list', {calendarId: calendarsJSON[i].id, auth: oauth2Client}).spread(function (response) {
        return response
      })

      for (var j = 0; j < events.items.length; j++) {
        const event = new this.Event()
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
    response.redirect('/profiles')
  }

}

module.exports = CalendarController
