import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Menu from '#models/menu'

export default class RbacMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user
    
    // Se não estiver logado, o AuthMiddleware já deveria ter barrado, 
    // mas por segurança retornamos erro.
    if (!user) {
      return ctx.response.unauthorized({ message: 'Acesso negado. Usuário não autenticado.' })
    }

    // Carrega a role para saber o slug
    await user.load((loader) => loader.load('role'))
    
    // ADMIN tem passe livre total
    if (user.role?.slug === 'ADMIN') {
      return next()
    }

    // Pega a rota atual e remove o prefixo /api/v1 para bater com o href do menu
    let url = ctx.request.url().replace(/^\/api\/v1/, '')
    if (!url.startsWith('/')) url = '/' + url
    
    // Procura no banco de dados se essa rota está mapeada em um menu
    // Usamos o início da URL para capturar sub-rotas (ex: /quizzes/123)
    const menu = await Menu.query()
      .where('href', '!=', '/') // Evita bloquear a home se não for intencional
      .whereRaw('? LIKE href || \'%\'', [url])
      .first()

    // Se a rota está mapeada em um menu, verificamos se o usuário tem permissão
    if (menu) {
      const hasPermission = await menu.related('roles')
        .query()
        .where('roles.id', user.roleId)
        .first()

      if (!hasPermission) {
        return ctx.response.forbidden({ 
          message: 'Você não tem permissão para acessar este recurso.',
          code: 'E_RBAC_FORBIDDEN'
        })
      }
    }

    return next()
  }
}
