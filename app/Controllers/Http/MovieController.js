'use strict'

const Movie = use('App/Models/Movie')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with movies
 */
class MovieController {
  /**
   * Show a list of all movies.
   * GET movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const movies = await Movie.all()

    response.json({
      message: 'Here are your movies from our databse.',
      data: movies
    })
  }

  /**
   * Render a form to be used for creating a new movie.
   * GET movies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * 
   * async create ({ request, response, view }) {
  }
   * 
   */
  
  /**
   * Create/save a new movie.
   * POST movies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { title, vote_average, overview, release_date, cover_image, background_image } = request.post()

  /*   const movie = new Movie()
    movie.title = title
    movie.overview = overview

    await movie.save() */
 
    const movie = await Movie.create({ title, vote_average, overview, release_date, cover_image, background_image })

    response.json({
      message:'Succesfully create a new movie',
      data: movie
    })

  }


  /**
   * Display a single movie.
   * GET movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ request, response, view , params: { id } }) {
    const movie = await Movie.find(id)

    if(movie) {
      response.status(200).json({
        message: "Here is your movie",
        data: movie
      })
    }else {
      response.status(404).json({
        message: "No such movie here",
        id
      })
    }
  }

  /**
   * Render a form to update an existing movie.
   * GET movies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * 
   *async edit ({ params, request, response, view }) {
  } 
   */


  /**
   * Update movie details.
   * PUT or PATCH movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request, response, params: { id } }) {

    const movie = await Movie.find(id)

    if(movie) {
      const { title, vote_average, overview, release_date, cover_image, background_image } = request.post() 
      
      movie.title = title
      movie.vote_average = vote_average
      movie.overview = overview
      movie.release_date = release_date
      movie.cover_image = cover_image
      movie.background_image = background_image

      await movie.save()
      
      response.status(200).json({
        message: "Successfully updated this movie.",
        data: movie
      })
    } else {
      response.status(404).json({
        message: "No such movie here",
        id
      })
    }
  }

  /**
   * Delete a movie with id.
   * DELETE movies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ request, response, params: { id } }) {
    const movie = await Movie.find(id)

    if(movie) {

      await movie.delete()
      
      response.status(200).json({
        message: "Successfully deleted this movie.",
        id
      })
    } else {
      response.status(404).json({
        message: "No such movie here",
        id
      })
    }
  }
}

module.exports = MovieController
