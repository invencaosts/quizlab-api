import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.dropTable('user_roles')
    this.schema.dropTable('roles')
  }

  async down() {
    this.schema.createTable('roles', (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.createTable('user_roles', (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('role_id').references('id').inTable('roles').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
}