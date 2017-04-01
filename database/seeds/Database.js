'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')

class DatabaseSeeder {

  * run () {
    yield Factory.model('App/Model/User').create(Factory.usersNumber)
    yield Factory.model('App/Model/Profile').create(Factory.profilesNumber)
    yield Factory.model('App/Model/Category').create(Factory.categoriesNumber)
    yield Factory.model('App/Model/City').create(Factory.citiesNumber)
    yield Factory.model('App/Model/ProfileCategory').create(Factory.profilesNumber)
    yield Factory.model('App/Model/ProfileCity').create(Factory.profilesNumber)
  }

}

module.exports = DatabaseSeeder
