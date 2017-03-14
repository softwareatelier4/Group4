'use strict'

class HomeController {
  *index (request, response){
    response.send("home");
  }
}

module.exports = HomeController
