import { SubjectSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Discipline from '#models/discipline'

export default class Subject extends SubjectSchema {
  @hasMany(() => Discipline)
  declare disciplines: HasMany<typeof Discipline>
}