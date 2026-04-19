import Course from '#models/course'
import type { HttpContext } from '@adonisjs/core/http'

export default class GetCoursesController {
  async index({ response }: HttpContext) {
    const courses = await Course.query().orderBy('name', 'asc')
    
    return response.ok(courses.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description
    })))
  }
}