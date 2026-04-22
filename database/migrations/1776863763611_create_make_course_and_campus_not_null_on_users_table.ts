import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('full_name', 100).notNullable().alter()
      table.uuid('campus_id').notNullable().alter()
      table.uuid('course_id').notNullable().alter()
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