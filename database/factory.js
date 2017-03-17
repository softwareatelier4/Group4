'use strict'

/*
|--------------------------------------------------------------------------
| Model and Database Factory
|--------------------------------------------------------------------------
|
| Factories let you define blueprints for your database models or tables.
| These blueprints can be used with seeds to create fake entries. Also
| factories are helpful when writing tests.
|
*/

const Factory = use('Factory')
const faker = require('faker') // better than fake provided by Factory

/*
|--------------------------------------------------------------------------
| Profile Model Blueprint
|--------------------------------------------------------------------------
| Below is an example of blueprint for Profile Model. You can make use of
| this blueprint inside your seeds to generate dummy data.
|
*/

Factory.blueprint('App/Model/Profile', (fake) => {
  return {

    description: faker.lorem.paragraph(),
    city: faker.address.city(),

    website: faker.internet.url(),
    telephone: faker.phone.phoneNumber(),
    price: faker.commerce.price()
  }
})
