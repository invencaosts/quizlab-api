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

    // 2. Matemática
    const math = await Subject.updateOrCreate(
      { name: 'Matemática' },
      { isApproved: true }
    )
    
    await math.related('disciplines').updateOrCreate({ name: 'Cálculo I' }, { isApproved: true })
    await math.related('disciplines').updateOrCreate({ name: 'Geometria Analítica' }, { isApproved: true })
    await math.related('disciplines').updateOrCreate({ name: 'Estatística' }, { isApproved: true })

    // 3. Humanas
    const humanities = await Subject.updateOrCreate(
      { name: 'Humanas' },
      { isApproved: true }
    )
    
    await humanities.related('disciplines').updateOrCreate({ name: 'Literatura Brasileira' }, { isApproved: true })
    await humanities.related('disciplines').updateOrCreate({ name: 'Ética Profissional' }, { isApproved: true })
  }
}