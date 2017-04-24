'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.resource('profiles', 'ProfileController')
Route.resource('profiles.reviews', 'ReviewController')
Route.resource('profiles.create', 'ProfileController.create')

Route.resource('reviews.answer', 'AnswerController')

Route.post('/login', 'UsersController.login')
Route.get('/logout', 'UsersController.logout')
Route.get('register', 'UsersController.create')
Route.get('store', 'UsersController.store')
