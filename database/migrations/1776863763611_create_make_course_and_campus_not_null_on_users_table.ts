import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('full_name', 100).notNullable().alter().comment('Nome completo do usuário (obrigatório)')
      table.uuid('campus_id').notNullable().alter().comment('Vínculo com o campus (obrigatório)')
      table.uuid('course_id').notNullable().alter().comment('Vínculo com o curso (obrigatório)')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('full_name', 100).nullable().alter()
      table.uuid('campus_id').nullable().alter()
      table.uuid('course_id').nullable().alter()
    })
  }
}