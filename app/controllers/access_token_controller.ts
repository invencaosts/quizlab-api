import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import hash from '@adonisjs/core/services/hash'

export default class AccessTokenController {
  async store(ctx: HttpContext) {
    const { email, password } = await ctx.request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    // Upgrade hash if needed - set plain text so beforeSave hook re-hashes correctly
    if (user.password && hash.needsReHash(user.password)) {
      user.password = password
      await user.save()
    }

    await user.load((loader) => {
      loader.load('campus')
      loader.load('course')
      loader.load('role', (roleQuery) => {
        roleQuery.preload('menus', (menuQuery) => {
          menuQuery.preload('roles')
        })
      })
    })

    const token = await User.accessTokens.create(user)

    return {
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    }
  }

  async destroy({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = (user as any).currentAccessToken
    if (token) {
      await User.accessTokens.delete(user, token.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }
}
