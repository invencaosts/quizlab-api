import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Course from '#models/course'

export default class extends BaseSeeder {
  async run() {
    await Course.updateOrCreateMany('name', [
      { name: 'Sistemas para Internet', description: 'Curso superior de tecnologia' },
      { name: 'Gestão de TI', description: 'Curso superior de tecnologia' },
      { name: 'Técnico em Informática', description: 'Curso técnico subsequente/integrado' },
      { name: 'Redes de Computadores', description: 'Curso superior de tecnologia' },
      { name: 'Engenharia de Software', description: 'Curso de bacharelado' },
      { name: 'Licenciatura em Química', description: 'Curso de licenciatura' },
      { name: 'Técnico em Edificações', description: 'Curso técnico subsequente/integrado' },
      { name: 'Técnico em Eletrônica', description: 'Curso técnico subsequente/integrado' },
    ])
  }
}