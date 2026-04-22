import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'menu_roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('gen_random_uuid()'))
      
      table.uuid('menu_id').references('id').inTable('menus').onDelete('CASCADE')
      table.uuid('role_id').references('id').inTable('roles').onDelete('CASCADE')
      
      table.unique(['menu_id', 'role_id'])
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}