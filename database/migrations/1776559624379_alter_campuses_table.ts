import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'campuses'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('state', 2).nullable().after('city').comment('Estado (UF) do campus')
      table.string('city').alter().comment('Cidade onde o campus está localizado')
      table.string('name').alter().comment('Nome identificador do campus')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('state')
    })
  }
}