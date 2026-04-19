import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('Identificador único do vínculo usuário-role')
      
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable().comment('ID do usuário')
      table.uuid('role_id').references('id').inTable('roles').onDelete('CASCADE').notNullable().comment('ID da role')

      table.unique(['user_id', 'role_id'])

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}