import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remover campos antigos
      table.dropColumn('course')
      table.dropColumn('role')

      // Adicionar novos campos relacionais
      table.uuid('course_id').references('id').inTable('courses').onDelete('SET NULL').after('campus_id').comment('ID do curso vinculado')

      // Adicionar comentários em colunas existentes e ajustar constraints se necessário
      table.string('email', 254).alter().comment('E-mail institucional único do usuário')
      table.string('full_name', 100).alter().comment('Nome completo do usuário')
      table.string('password', 255).alter().comment('Hash da senha para autenticação')
      table.string('cpf', 14).alter().comment('Documento CPF (000.000.000-00)')
      table.string('registration', 10).alter().comment('Matrícula acadêmica ou SIAPE (somente números, max 10)')
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