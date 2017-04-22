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

Factory.profilesNumber = 0

Factory.blueprint('App/Model/Profile', (fake) => {
  return {
    title: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    website: faker.internet.url(),
    telephone: faker.phone.phoneNumber(),
    price: faker.commerce.price(),
    logo: faker.image.business(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
    user_id: Math.floor(
      Math.random() * Factory.usersNumber
    ) + 1
  }
})

Factory.categoriesNumber = 0

Factory.blueprint('App/Model/Category', () => {
  return {
    name: faker.name.jobType()
  }
})

Factory.blueprint('App/Model/ProfileCategory', () => {
  return {
    profile_id: Math.floor(
      Math.random() * Factory.profilesNumber
    ) + 1,
    category_id: Math.floor(
      Math.random() * Factory.categoriesNumber
    ) + 1
  }
})

Factory.usersNumber = 0

Factory.blueprint('App/Model/UserAccount', () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    type: 'user',
    name: faker.internet.userName()
  }
})
