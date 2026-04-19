import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'disciplines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único da disciplina')

      table
        .uuid('subject_id')
        .notNullable()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
        .comment('ID da matéria (área de conhecimento) à qual a disciplina pertence')

      table.string('name', 150).notNullable().comment('Nome da disciplina (ex: Programação Web I)')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}