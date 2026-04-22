import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import Menu from '#models/menu'

export default class extends BaseSeeder {
  async run() {
    // 1. Criar Roles
    const roles = await Role.updateOrCreateMany('slug', [
      { name: 'Administrador', slug: 'ADMIN', description: 'Acesso total ao sistema' },
      { name: 'Professor', slug: 'PROFESSOR', description: 'Criação e gestão de quizzes' },
      { name: 'Estudante', slug: 'STUDENT', description: 'Participação em quizzes' },
    ])

    const adminRole = roles.find(r => r.slug === 'ADMIN')!
    const profRole = roles.find(r => r.slug === 'PROFESSOR')!
    const studentRole = roles.find(r => r.slug === 'STUDENT')!

    // 2. Criar Menus
    const menus = await Menu.updateOrCreateMany('href', [
      {
        label: 'Painel Principal',
        href: '/',
        icon: 'LayoutDashboard',
        order: 1,
        isActive: true,
      },
      {
        label: 'Meus Quizzes',
        href: '/quizzes',
        icon: 'BookOpen',
        order: 2,
        isActive: true,
      },
      {
        label: 'Comunidade',
        href: '/community',
        icon: 'Globe2',
        order: 3,
        isActive: true,
      },
      {
        label: 'Sessões',
        href: '/sessions',
        icon: 'PlayCircle',
        order: 4,
        isActive: true,
      },
    ])

    const dashboardMenu = menus.find((m) => m.href === '/')!
    const quizzesMenu = menus.find((m) => m.href === '/quizzes')!
    const communityMenu = menus.find((m) => m.href === '/community')!
    const sessionsMenu = menus.find((m) => m.href === '/sessions')!

    // 3. Vincular Menus às Roles
    await dashboardMenu.related('roles').sync([adminRole.id, profRole.id, studentRole.id])
    await communityMenu.related('roles').sync([adminRole.id, profRole.id, studentRole.id])
    await quizzesMenu.related('roles').sync([adminRole.id, profRole.id])
    await sessionsMenu.related('roles').sync([adminRole.id, profRole.id])
  }
}