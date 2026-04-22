import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      id: this.resource.id,
      fullName: this.resource.fullName,
      email: this.resource.email,
      // Se tiver o relacionamento carregado usa o slug, senão STUDENT por padrão
      role: this.resource.role?.slug || 'STUDENT',
      // Lista de menus permitidos, ordenados, com as roles permitidas informadas
      menus: this.resource.role?.menus ? 
        this.resource.role.menus
          .filter(m => m.isActive)
          .sort((a, b) => a.order - b.order)
          .map(m => ({
            label: m.label,
            href: m.href,
            icon: m.icon,
            roles: m.roles?.map(r => r.slug) || []
          })) : [],
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
