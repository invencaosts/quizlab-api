import Campus from '#models/campus'
import type { HttpContext } from '@adonisjs/core/http'

export default class CampusesController {
  /**
   * List all campuses
   */
  async index({ response }: HttpContext) {
    const campuses = await Campus.query().orderBy('name', 'asc')
    return response.ok(campuses)
  }
}