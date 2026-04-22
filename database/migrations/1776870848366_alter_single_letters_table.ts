import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    // Drop column if it exists to start fresh
    await this.raw('ALTER TABLE "users" DROP COLUMN IF EXISTS "role" CASCADE')
    
    // Drop existing type to recreate with shorter values
    await this.raw('DROP TYPE IF EXISTS "user_role" CASCADE')
    
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', ['P', 'S', 'A'], {
        useNative: true,
        enumName: 'user_role',
        existingType: false,
      }).notNullable().defaultTo('S').comment('Papel: P (Professor), S (Estudante), A (Admin)')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
    })
    await this.raw('DROP TYPE IF EXISTS "user_role" CASCADE')
  }
}