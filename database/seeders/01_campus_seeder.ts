import Campus from '#models/campus'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Campus.updateOrCreateMany('name', [
      { name: 'Aracaju', city: 'Aracaju', state: 'SE' },
      { name: 'São Cristóvão', city: 'São Cristóvão', state: 'SE' },
      { name: 'Lagarto', city: 'Lagarto', state: 'SE' },
      { name: 'Itabaiana', city: 'Itabaiana', state: 'SE' },
      { name: 'Estância', city: 'Estância', state: 'SE' },
      { name: 'Propriá', city: 'Propriá', state: 'SE' },
      { name: 'Nossa Senhora da Glória', city: 'Nossa Senhora da Glória', state: 'SE' },
      { name: 'Tobias Barreto', city: 'Tobias Barreto', state: 'SE' },
      { name: 'Socorro', city: 'Nossa Senhora do Socorro', state: 'SE' },
      { name: 'Norte', city: 'Fortaleza', state: 'CE' },
      { name: 'Sul', city: 'Porto Alegre', state: 'RS' },
    ])
  }
}