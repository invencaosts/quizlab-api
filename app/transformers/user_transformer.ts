import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      id: this.resource.id,
      fullName: this.resource.fullName,
      email: this.resource.email,
      role: this.resource.role,
      cpf: this.resource.cpf,
      registration: this.resource.registration,
      initials: this.resource.initials,
      campus: this.resource.campus ? {
        id: this.resource.campus.id,
        name: this.resource.campus.name
      } : null,
      course: this.resource.course ? {
        id: this.resource.course.id,
        name: this.resource.course.name
      } : null,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
