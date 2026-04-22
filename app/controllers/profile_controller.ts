import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class ProfileController {
  async show(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail()
    await user.load((loader) => {
      loader.load('campus')
      loader.load('course')
      loader.load('role', (r) => r.load('menus', (m) => m.load('roles')))
    })
    return ctx.serialize(UserTransformer.transform(user))
  }

  async update(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail()
    
    const schema = vine.compile(
      vine.object({
        fullName: vine.string().minLength(3).optional(),
        email: vine.string().email().unique(async (db, value) => {
          const match = await db
            .from('users')
            .select('id')
            .where('email', value)
            .whereNot('id', user.id)
            .first()
          return !match
        }).optional(),
        registration: vine.string().optional(),
        campusId: vine.string().uuid().optional(),
        courseId: vine.string().uuid().optional(),
        password: vine.string().minLength(8).optional(),
      })
    )

    const payload = await ctx.request.validateUsing(schema)

    user.merge(payload)
    await user.save()
    
    await user.load((loader) => {
      loader.load('campus')
      loader.load('course')
      loader.load('role', (r) => r.load('menus', (m) => m.load('roles')))
    })

    return ctx.serialize({
      message: 'Perfil atualizado com sucesso',
      user: UserTransformer.transform(user)
    })
  }
}
