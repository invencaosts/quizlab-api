import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Adiciona role_id como uuid, referenciando a tabela roles
      table.uuid('role_id').references('id').inTable('roles').onDelete('SET NULL').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role_id')
    })
  }
}