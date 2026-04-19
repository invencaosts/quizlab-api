import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import hash from '@adonisjs/core/services/hash'

export default class AccessTokenController {
  async store(ctx: HttpContext) {
    const { email, password } = await ctx.request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    // Upgrade hash if needed
    if (user.password && hash.needsReHash(user.password)) {
      user.password = await hash.make(password)
      await user.save()
    }

    const token = await User.accessTokens.create(user)

    return ctx.serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
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
