import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'quizzes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único do quiz')

      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .comment('Professor criador do quiz')

      table
        .uuid('discipline_id')
        .notNullable()
        .references('id')
        .inTable('disciplines')
        .onDelete('CASCADE')
        .comment('Disciplina a qual o quiz pertence')

      table.string('title', 200).notNullable().comment('Título ou nome do quiz')
      table.text('description').nullable().comment('Descrição opcional detalhada do quiz')
      table.boolean('is_public').defaultTo(false).notNullable().comment('Se o quiz está visível a todos')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}