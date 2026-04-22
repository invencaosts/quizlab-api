import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remover campos antigos
      table.dropColumn('course')
      table.dropColumn('role')

      // Adicionar novos campos relacionais
      table.uuid('course_id').nullable().comment('ID do curso vinculado')

      // Preservar nullability original em cada coluna ao alterar
      table.string('email', 254).notNullable().alter().comment('E-mail institucional único do usuário')
      table.string('full_name', 100).nullable().alter().comment('Nome completo do usuário')
      table.string('password', 255).notNullable().alter().comment('Hash da senha para autenticação')
      table.string('cpf', 14).notNullable().alter().comment('Documento CPF (000.000.000-00)')
      table.string('registration', 10).notNullable().alter().comment('Matrícula acadêmica ou SIAPE (somente números, max 10)')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('course_id').references('id').inTable('courses').onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('course_id')
      table.string('course').nullable().after('campus_id')
      table.enum('role', ['STUDENT', 'PROFESSOR', 'ADMIN'], {
        useNative: true,
        enumName: 'user_role',
        existingType: true,
      }).notNullable().after('course')
    })
  }
}