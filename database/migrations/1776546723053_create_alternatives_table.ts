import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alternatives'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único da alternativa')

      table
        .uuid('question_id')
        .notNullable()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')
        .comment('Id da questão que esta alternativa compõe')

      table.string('text').notNullable().comment('Texto contendo a resposta')
      table.boolean('is_correct').notNullable().comment('Se a resposta desta alternativa é correta')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}