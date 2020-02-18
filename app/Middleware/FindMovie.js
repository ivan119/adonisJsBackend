'use strict'
const Movie = use('App/Models/Movie') 

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindMovie {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request

    const movie = await Movie.find(id)

    if(!movie) {
      return response.status(404).json({
        message: "There is no movie here",
        id
      })
    }

    request.movie = movie

    await next()
  }
}

module.exports = FindMovie
