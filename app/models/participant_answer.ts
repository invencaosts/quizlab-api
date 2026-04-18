import { ParticipantAnswerSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Participant from '#models/participant'
import Question from '#models/question'
import Alternative from '#models/alternative'

export default class ParticipantAnswer extends ParticipantAnswerSchema {
  @belongsTo(() => Participant)
  declare participant: BelongsTo<typeof Participant>

  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @belongsTo(() => Alternative)
  declare alternative: BelongsTo<typeof Alternative>
}