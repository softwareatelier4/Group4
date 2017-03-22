'use strict'

class HomeController {
  * index (request, response) {
    yield response.sendView('index')
  }
}

module.exports = HomeController
