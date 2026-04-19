import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('subjects', (table) => {
      table.boolean('is_approved').defaultTo(false).after('name').comment('Define se a matéria foi aprovada pelo administrador')
    })
    
    this.schema.alterTable('disciplines', (table) => {
      table.boolean('is_approved').defaultTo(false).after('name').comment('Define se a disciplina foi aprovada pelo administrador')
    })
  }

  async down() {
    this.schema.alterTable('subjects', (table) => {
      table.dropColumn('is_approved')
    })
    
    this.schema.alterTable('disciplines', (table) => {
      table.dropColumn('is_approved')
    })
  }
}