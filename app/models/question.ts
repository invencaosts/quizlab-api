import { QuestionSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Quiz from '#models/quiz'
import Alternative from '#models/alternative'
import ParticipantAnswer from '#models/participant_answer'

export default class Question extends QuestionSchema {
  @belongsTo(() => Quiz)
  declare quiz: BelongsTo<typeof Quiz>

  @hasMany(() => Alternative)
  declare alternatives: HasMany<typeof Alternative>

  @hasMany(() => ParticipantAnswer)
  declare participantAnswers: HasMany<typeof ParticipantAnswer>
}