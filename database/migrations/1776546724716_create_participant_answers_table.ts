import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'participant_answers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único desta resposta')

      table
        .uuid('participant_id')
        .notNullable()
        .references('id')
        .inTable('participants')
        .onDelete('CASCADE')
        .comment('Identificador do participante que respondeu')

      table
        .uuid('question_id')
        .notNullable()
        .references('id')
        .inTable('questions')
        .onDelete('CASCADE')
        .comment('Identificador da pergunta')

      table
        .uuid('alternative_id')
        .notNullable()
        .references('id')
        .inTable('alternatives')
        .onDelete('CASCADE')
        .comment('Identificador da alternativa escolhida')

      table.integer('time_taken_ms').notNullable().comment('Tempo levado para responder (em milissegundos)')
      table.integer('points_earned').notNullable().comment('Pontos conquistados com base na corretude e tempo')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}