import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Quiz from '#models/quiz'
import Session from '#models/session'
import Participant from '#models/participant'

export default class User extends compose(UserSchema, withAuthFinder(() => hash.use('argon2'))) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  
  @column()
  declare fullName: string | null



  @hasMany(() => Quiz)
  declare quizzes: HasMany<typeof Quiz>

  @hasMany(() => Session, { foreignKey: 'hostId' })
  declare hostedSessions: HasMany<typeof Session>

  @hasMany(() => Participant)
  declare participations: HasMany<typeof Participant>

  get initials() {
    const [namePart] = this.email.split('@')
    const first = namePart.charAt(0).toUpperCase()
    const last = namePart.length > 1 ? namePart.charAt(1).toUpperCase() : ''
    return `${first}${last}`
  }
}
