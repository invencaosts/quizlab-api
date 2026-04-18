import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Super Admin do sistema
    const admin = await User.findBy('email', 'admin@quizlab.com')
    if (!admin) {
      await User.create({
        email: 'admin@quizlab.com',
        password: 'admin',
        cpf: '00000000000',
        registration: 'SUPERADMIN',
        campus: 'Aracaju',
        course: 'TI',
        role: 'ADMIN',
      })
    }

    // Professor de Teste
    const professor = await User.findBy('email', 'professor@ifs.edu.br')
    if (!professor) {
      await User.create({
        email: 'professor@ifs.edu.br',
        password: 'admin',
        cpf: '11111111111',
        registration: 'PROF001',
        campus: 'Aracaju',
        course: 'Sistemas para Internet',
        role: 'PROFESSOR',
      })
    }

    // Aluno de Teste
    const aluno = await User.findBy('email', 'aluno@ifs.edu.br')
    if (!aluno) {
      await User.create({
        email: 'aluno@ifs.edu.br',
        password: 'admin',
        cpf: '22222222222',
        registration: 'ALU001',
        campus: 'Lagarto',
        course: 'Redes de Computadores',
        role: 'STUDENT',
      })
    }
  }
}