import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  async up() {
    await this.raw('DROP TYPE IF EXISTS "question_type" CASCADE')

    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único da pergunta')

      table
        .uuid('quiz_id')
        .notNullable()
        .references('id')
        .inTable('quizzes')
        .onDelete('CASCADE')
        .comment('Quiz ao qual a pergunta pertence')

      table.string('text', 500).notNullable().comment('O texto/enunciado da questão')
      table.integer('time_limit_seconds').notNullable().comment('Tempo limite em segundos para resposta')

      table.enum('type', ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'], {
        useNative: true,
        enumName: 'question_type',
        existingType: false,
      }).notNullable().comment('Tipo de questão: Escolha única ou múltipla escolha')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    await this.raw('DROP TYPE IF EXISTS "question_type" CASCADE')
  }
}