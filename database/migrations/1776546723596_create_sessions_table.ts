import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único da sessão gameficada ativa')

      table
        .uuid('quiz_id')
        .notNullable()
        .references('id')
        .inTable('quizzes')
        .onDelete('CASCADE')
        .comment('Id do quiz sendo utilizado nesta sessão do jogo')

      table
        .uuid('host_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .comment('Professor host (quem abriu a sala)')

      table.string('pin').unique().nullable().comment('Código PIN para os alunos entrarem na sala')

      table.enum('status', ['WAITING', 'ACTIVE', 'FINISHED'], {
        useNative: true,
        enumName: 'session_status',
        existingType: false,
      }).defaultTo('WAITING').notNullable().comment('Status atual da sessão gamificada')

      table.boolean('is_visible_in_lobby').notNullable().comment('Se visível no lobby público')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    await this.raw('DROP TYPE IF EXISTS "session_status" CASCADE')
  }
}