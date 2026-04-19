import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Subject from '#models/subject'

export default class extends BaseSeeder {
  async run() {
    // Matérias e Disciplinas aprovadas (Padrão IFS)
    
    // 1. Programação
    const programming = await Subject.updateOrCreate(
      { name: 'Programação' },
      { isApproved: true }
    )
    
    await programming.related('disciplines').updateOrCreate({ name: 'Algoritmos' }, { isApproved: true })
    await programming.related('disciplines').updateOrCreate({ name: 'Estrutura de Dados' }, { isApproved: true })
    await programming.related('disciplines').updateOrCreate({ name: 'Sistemas para Internet' }, { isApproved: true })
    await programming.related('disciplines').updateOrCreate({ name: 'Programação Mobile' }, { isApproved: true })
    await programming.related('disciplines').updateOrCreate({ name: 'Programação Orientada a Objetos' }, { isApproved: true })
    await programming.related('disciplines').updateOrCreate({ name: 'Banco de Dados' }, { isApproved: true })

    // 2. Matemática
    const math = await Subject.updateOrCreate(
      { name: 'Matemática' },
      { isApproved: true }
    )
    
    await math.related('disciplines').updateOrCreate({ name: 'Cálculo I' }, { isApproved: true })
    await math.related('disciplines').updateOrCreate({ name: 'Geometria Analítica' }, { isApproved: true })
    await math.related('disciplines').updateOrCreate({ name: 'Estatística' }, { isApproved: true })
    await math.related('disciplines').updateOrCreate({ name: 'Matemática Discreta' }, { isApproved: true })

    // 3. Humanas e Sociais
    const humanities = await Subject.updateOrCreate(
      { name: 'Humanas e Sociais' },
      { isApproved: true }
    )
    
    await humanities.related('disciplines').updateOrCreate({ name: 'Literatura Brasileira' }, { isApproved: true })
    await humanities.related('disciplines').updateOrCreate({ name: 'Ética Profissional' }, { isApproved: true })
    await humanities.related('disciplines').updateOrCreate({ name: 'Filosofia' }, { isApproved: true })
    await humanities.related('disciplines').updateOrCreate({ name: 'Sociologia' }, { isApproved: true })

    // 4. Redes e Infraestrutura
    const infrastructure = await Subject.updateOrCreate(
      { name: 'Redes e Infraestrutura' },
      { isApproved: true }
    )
    await infrastructure.related('disciplines').updateOrCreate({ name: 'Redes de Computadores I' }, { isApproved: true })
    await infrastructure.related('disciplines').updateOrCreate({ name: 'Segurança da Informação' }, { isApproved: true })
    await infrastructure.related('disciplines').updateOrCreate({ name: 'Sistemas Operacionais' }, { isApproved: true })

  }
}