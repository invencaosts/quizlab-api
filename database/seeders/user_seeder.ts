import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Super Admin do sistema
    await User.updateOrCreate(
      { email: 'admin@quizlab.com' },
      {
        fullName: 'Administrador do Sistema',
        password: 'admin',
        cpf: '00000000000',
        registration: 'SUPERADMIN',
        campus: 'Aracaju',
        course: 'TI',
        role: 'ADMIN',
      }
    )

    // Professor de Teste
    await User.updateOrCreate(
      { email: 'professor@ifs.edu.br' },
      {
        fullName: 'Professor de Teste',
        password: 'admin',
        cpf: '11111111111',
        registration: 'PROF001',
        campus: 'Aracaju',
        course: 'Sistemas para Internet',
        role: 'PROFESSOR',
      }
    )

    // Aluno de Teste
    await User.updateOrCreate(
      { email: 'aluno@ifs.edu.br' },
      {
        fullName: 'Estudante de Teste',
        password: 'admin',
        cpf: '22222222222',
        registration: 'ALU001',
        campus: 'Lagarto',
        course: 'Redes de Computadores',
        role: 'STUDENT',
      }
    )
  }
}