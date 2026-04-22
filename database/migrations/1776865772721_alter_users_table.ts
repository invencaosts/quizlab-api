import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    // Recreate type and column with simplified values
    await this.raw('DROP TYPE IF EXISTS "user_role" CASCADE')
    
    const hasRole = await this.schema.hasColumn(this.tableName, 'role')
    if (hasRole) {
      this.schema.alterTable(this.tableName, (table) => {
        table.dropColumn('role')
      })
    }

    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', ['P', 'S', 'A'], {
        useNative: true,
        enumName: 'user_role',
        existingType: false,
      }).notNullable().defaultTo('S').comment('Papel: P (Professor), S (Student), A (Admin)')
    })
  }

  async down() {
    const hasRole = await this.schema.hasColumn(this.tableName, 'role')
    if (hasRole) {
      this.schema.alterTable(this.tableName, (table) => {
        table.dropColumn('role')
      })
    }
    await this.raw('DROP TYPE IF EXISTS "user_role" CASCADE')
  }
}