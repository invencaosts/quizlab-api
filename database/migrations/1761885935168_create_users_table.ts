import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    await this.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
        .comment('Identificador único do usuário')

      table.string('email', 254).notNullable().unique().comment('E-mail institucional')
      table.string('password').notNullable().comment('Hash da senha')
      table.string('cpf').notNullable().unique().comment('Documento CPF')
      table.string('registration').notNullable().unique().comment('Matrícula acadêmica (ex: SUAP)')
      table.string('campus').notNullable().comment('Campus do IFS (ex: Aracaju, Lagarto)')
      table.string('course').nullable().comment('Curso ao qual o aluno/professor está vinculado')
      
      table.enum('role', ['PROFESSOR', 'STUDENT', 'ADMIN'], {
        useNative: true,
        enumName: 'user_role',
        existingType: false,
      }).notNullable().comment('Papel do usuário no sistema (PROFESSOR, STUDENT, ADMIN)')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    await this.raw('DROP TYPE IF EXISTS "user_role" CASCADE')
  }
}
