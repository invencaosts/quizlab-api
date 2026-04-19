import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'participants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único do participante na sessão')

      table
        .uuid('session_id')
        .notNullable()
        .references('id')
        .inTable('sessions')
        .onDelete('CASCADE')
        .comment('A sessão do jogo')

      table
        .uuid('user_id')
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .comment('Caso o aluno esteja logado, vincula a conta dele aqui')

      table.string('nickname', 50).notNullable().comment('Apelido utilizado para jogar (logado ou anônimo)')
      table.integer('total_score').notNullable().defaultTo(0).comment('Pontuação acumulada na sessão')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}