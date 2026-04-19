import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Campus from '#models/campus'
import Course from '#models/course'

export default class extends BaseSeeder {
  async run() {
    // Buscar ou criar campi, cursos e roles
    const aracaju = await Campus.firstOrCreate({ name: 'Aracaju' }, { city: 'Aracaju', state: 'SE' })
    const lagarto = await Campus.firstOrCreate({ name: 'Lagarto' }, { city: 'Lagarto', state: 'SE' })
    
    const internetCourse = await Course.firstOrCreate({ name: 'Sistemas para Internet' })
    const networksCourse = await Course.firstOrCreate({ name: 'Redes de Computadores' })

    // Super Admin do sistema
    await User.updateOrCreate(
      { email: 'admin@quizlab.com' },
      {
        fullName: 'Administrador do Sistema',
        password: 'admin',
        cpf: '000.000.000-00',
        registration: '0000000000',
        campusId: aracaju.id,
        courseId: internetCourse.id,
      }
    )

    // Professor de Teste
    await User.updateOrCreate(
      { email: 'professor@ifs.edu.br' },
      {
        fullName: 'Professor de Teste',
        password: 'admin',
        cpf: '111.111.111-11',
        registration: '1111111111',
        campusId: aracaju.id,
        courseId: internetCourse.id,
      }
    )

    // Aluno de Teste
    await User.updateOrCreate(
      { email: 'aluno@ifs.edu.br' },
      {
        fullName: 'Estudante de Teste',
        password: 'admin',
        cpf: '222.222.222-22',
        registration: '2222222222',
        campusId: lagarto.id,
        courseId: networksCourse.id,
      }
    )
  }
}