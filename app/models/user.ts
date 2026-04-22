import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { beforeSave, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Campus from '#models/campus'
import Course from '#models/course'
import Quiz from '#models/quiz'
import Session from '#models/session'
import Participant from '#models/participant'

export default class User extends compose(
  UserSchema,
  withAuthFinder(() => hash.use('argon2'), {
    uids: ['email'],
    passwordColumnName: 'password',
  })
) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  
  @beforeSave()
  static async hashPassword(user: any) {
    if (user.$dirty.password) {
      user.password = await hash.use('argon2').make(user.password)
    }
  }

  @belongsTo(() => Campus)
  declare campus: BelongsTo<typeof Campus>

  @belongsTo(() => Course)
  declare course: BelongsTo<typeof Course>

  @hasMany(() => Quiz)
  declare quizzes: HasMany<typeof Quiz>


  @hasMany(() => Session, { foreignKey: 'hostId' })
  declare hostedSessions: HasMany<typeof Session>

  @hasMany(() => Participant)
  declare participations: HasMany<typeof Participant>

  get initials() {
    if (!this.fullName) return '?'
    const names = this.fullName.split(' ')
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase()
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }
}
