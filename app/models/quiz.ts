import { QuizSchema } from '#database/schema'
import { belongsTo, hasMany, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Discipline from '#models/discipline'
import Question from '#models/question'

export default class Quiz extends QuizSchema {
  @belongsTo(() => User)
  declare creator: BelongsTo<typeof User>

  @belongsTo(() => Discipline)
  declare discipline: BelongsTo<typeof Discipline>

  @hasMany(() => Question)
  declare questions: HasMany<typeof Question>

  @computed()
  get questionsCount() {
    return this.$extras.questions_count
  }
}