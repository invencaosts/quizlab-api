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

    // Pega apenas o caminho da rota (sem query string) e remove o prefixo /api/v1
    let url = ctx.request.url().split('?')[0].replace(/^\/api\/v1/, '')
    if (!url.startsWith('/')) url = '/' + url
    
    // Força o carregamento da role se ela não estiver presente
    if (!user.role) {
      await user.load((loader) => loader.load('role'))
    }
    
    console.log(`[RBAC Debug] URL: ${url} | User Role: ${user.role?.slug}`);
    
    // Procura no banco de dados se essa rota está mapeada em um menu
    // Usamos o início da URL para capturar sub-rotas (ex: /quizzes/123)
    const menu = await Menu.query()
      .where('href', '!=', '/')
      .whereRaw('? LIKE href || \'%\'', [url])
      .first()

    // Rota protegida pelo RBAC mas não registrada nos menus: permite por padrão
    // (Pois pode ser uma rota utilitária como /profile ou /logout)
    if (!menu) {
      console.log(`[RBAC Debug] No menu found for ${url}. Allowing.`);
      return next()
    }

    const hasPermission = await menu.related('roles').query().where('roles.id', user.roleId).first()

    if (!hasPermission) {
      console.log(`[RBAC Debug] Permission denied for ${url}. Role ID: ${user.roleId}`);
      return ctx.response.forbidden({
        message: 'Você não tem permissão para acessar este recurso.',
        code: 'E_RBAC_FORBIDDEN',
      })
    }

    return next()
  }
}
