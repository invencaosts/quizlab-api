import User from '#models/user'
import Role from '#models/role'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class NewAccountController {
  async store(ctx: HttpContext) {
    const { passwordConfirmation, ...userData } = await ctx.request.validateUsing(signupValidator)

    const studentRole = await Role.findByOrFail('slug', 'STUDENT')
    const user = await User.create({ ...userData, roleId: studentRole.id })

    const token = await User.accessTokens.create(user)

    return ctx.serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}

