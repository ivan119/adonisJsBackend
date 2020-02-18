'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.get('movies', 'MovieController.index')
Route.get('movies/:id', 'MovieController.show').middleware(['FindMovie'])
Route.post('movies', 'MovieController.store')
Route.patch('movies/:id', 'MovieController.update').middleware(['FindMovie'])
Route.delete('movies/:id', 'MovieController.delete').middleware(['FindMovie'])