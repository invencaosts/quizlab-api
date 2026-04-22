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

    // 5. Linguagens e Códigos
    const languages = await Subject.updateOrCreate(
      { name: 'Linguagens e Códigos' },
      { isApproved: true }
    )
    await languages.related('disciplines').updateOrCreate({ name: 'Língua Portuguesa' }, { isApproved: true })
    await languages.related('disciplines').updateOrCreate({ name: 'Língua Inglesa' }, { isApproved: true })
    await languages.related('disciplines').updateOrCreate({ name: 'Língua Espanhola' }, { isApproved: true })
    await languages.related('disciplines').updateOrCreate({ name: 'Educação Física' }, { isApproved: true })
    await languages.related('disciplines').updateOrCreate({ name: 'Artes' }, { isApproved: true })

    // 6. Ciências da Natureza
    const natureSciences = await Subject.updateOrCreate(
      { name: 'Ciências da Natureza' },
      { isApproved: true }
    )
    await natureSciences.related('disciplines').updateOrCreate({ name: 'Biologia I' }, { isApproved: true })
    await natureSciences.related('disciplines').updateOrCreate({ name: 'Física I' }, { isApproved: true })
    await natureSciences.related('disciplines').updateOrCreate({ name: 'Química I' }, { isApproved: true })

    // 7. Ciências Humanas
    const socialSciences = await Subject.updateOrCreate(
      { name: 'Ciências Humanas' },
      { isApproved: true }
    )
    await socialSciences.related('disciplines').updateOrCreate({ name: 'História do Brasil' }, { isApproved: true })
    await socialSciences.related('disciplines').updateOrCreate({ name: 'Geografia Geral' }, { isApproved: true })

    // 8. Eletrotécnica e Energia
    const electrical = await Subject.updateOrCreate(
      { name: 'Eletrotécnica e Energia' },
      { isApproved: true }
    )
    await electrical.related('disciplines').updateOrCreate({ name: 'Eletricidade Básica' }, { isApproved: true })
    await electrical.related('disciplines').updateOrCreate({ name: 'Circuitos Elétricos' }, { isApproved: true })
    await electrical.related('disciplines').updateOrCreate({ name: 'Instalações Elétricas' }, { isApproved: true })

    // 9. Construção Civil
    const civil = await Subject.updateOrCreate(
      { name: 'Construção Civil' },
      { isApproved: true }
    )
    await civil.related('disciplines').updateOrCreate({ name: 'Desenho Técnico' }, { isApproved: true })
    await civil.related('disciplines').updateOrCreate({ name: 'Topografia' }, { isApproved: true })
    await civil.related('disciplines').updateOrCreate({ name: 'Mecânica dos Solos' }, { isApproved: true })
  }
}