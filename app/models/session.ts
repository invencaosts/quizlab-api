import { SessionSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Quiz from '#models/quiz'
import User from '#models/user'
import Participant from '#models/participant'

export default class Session extends SessionSchema {
  @belongsTo(() => Quiz)
  declare quiz: BelongsTo<typeof Quiz>

  @belongsTo(() => User, { foreignKey: 'hostId' })
  declare host: BelongsTo<typeof User>

  @hasMany(() => Participant)
  declare participants: HasMany<typeof Participant>
}