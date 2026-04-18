import { ParticipantSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Session from '#models/session'
import User from '#models/user'
import ParticipantAnswer from '#models/participant_answer'

export default class Participant extends ParticipantSchema {
  @belongsTo(() => Session)
  declare session: BelongsTo<typeof Session>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => ParticipantAnswer)
  declare answers: HasMany<typeof ParticipantAnswer>
}