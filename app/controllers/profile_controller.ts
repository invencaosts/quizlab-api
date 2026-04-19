import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show(ctx: HttpContext) {
    return ctx.serialize(UserTransformer.transform(ctx.auth.getUserOrFail()))
  }
}
