import { DisciplineSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Subject from '#models/subject'
import Quiz from '#models/quiz'

export default class Discipline extends DisciplineSchema {
  @belongsTo(() => Subject)
  declare subject: BelongsTo<typeof Subject>

  @hasMany(() => Quiz)
  declare quizzes: HasMany<typeof Quiz>
}