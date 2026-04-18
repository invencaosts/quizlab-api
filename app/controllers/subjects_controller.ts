import Subject from '#models/subject'

export default class SubjectsController {
  async index() {
    return await Subject.query().orderBy('name', 'asc')
  }
}