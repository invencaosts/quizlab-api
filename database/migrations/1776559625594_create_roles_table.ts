import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery).comment('ID único da role')
      table.string('name', 50).notNullable().unique().comment('Nome legível da role (ex: Aluno)')
      table.string('slug', 1).notNullable().unique().comment('Identificador da role: uma única letra maiúscula (A=Admin, P=Professor, S=Aluno)')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}