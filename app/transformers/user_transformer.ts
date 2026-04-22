import type User from '#models/user'

export default class UserTransformer {
  static transform(user: User) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role?.slug || 'STUDENT',
      menus: user.role?.menus ? 
        user.role.menus
          .filter(m => m.isActive)
          .sort((a, b) => a.order - b.order)
          .map(m => ({
            label: m.label,
            href: m.href,
            icon: m.icon,
            roles: m.roles?.map(r => r.slug) || []
          })) : [],
      cpf: user.cpf,
      registration: user.registration,
      initials: user.initials,
      campus: user.campus ? {
        id: user.campus.id,
        name: user.campus.name
      } : null,
      course: user.course ? {
        id: user.course.id,
        name: user.course.name
      } : null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
