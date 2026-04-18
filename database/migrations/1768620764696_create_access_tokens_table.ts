import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').comment('ID Sequencial do Token')
      table
        .uuid('tokenable_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .comment('ID do usuário dono deste token')

      table.string('type').notNullable().comment('Tipo de token')
      table.string('name').nullable().comment('Nome da sessão')
      table.string('hash').notNullable().comment('Hash do token')
      table.text('abilities').notNullable().comment('Permissões do token')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('last_used_at').nullable()
      table.timestamp('expires_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
