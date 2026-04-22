import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare label: string

  @column()
  declare href: string

  @column()
  declare icon: string

  @column()
  declare order: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Role, {
    pivotTable: 'menu_roles',
  })
  declare roles: ManyToMany<typeof Role>
}