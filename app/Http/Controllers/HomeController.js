'use strict'

class HomeController {
  *index (request, response){
    response.sendView("index");
  }
}

module.exports = HomeController
