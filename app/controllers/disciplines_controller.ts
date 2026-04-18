import type { HttpContext } from '@adonisjs/core/http'
import Discipline from '#models/discipline'

export default class DisciplinesController {
  async index({ request }: HttpContext) {
    const subjectId = request.input('subject_id')
    
    const query = Discipline.query().orderBy('name', 'asc')
    
    if (subjectId) {
      query.where('subjectId', subjectId)
    }

    return await query
  }
}