import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('campus')
      table.uuid('campus_id').references('id').inTable('campuses').onDelete('CASCADE').after('registration').comment('Campus ao qual o usuário está vinculado')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('campus_id')
      table.string('campus').nullable().comment('Campus do IFS (ex: Aracaju, Lagarto)').after('registration')
    })
  }
}