import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Discipline from '#models/discipline'
import Quiz from '#models/quiz'

export default class extends BaseSeeder {
  async run() {
    const professor = await User.findByOrFail('email', 'professor@ifs.edu.br')
    const discipline = await Discipline.findByOrFail('name', 'Algoritmos')

    // 1. Quiz de Lógica de Programação
    const logicaQuiz = await Quiz.updateOrCreate(
      { title: 'Desafio de Lógica' },
      {
        userId: professor.id,
        disciplineId: discipline.id,
        description: 'Um quiz básico para testar conhecimentos iniciais de lógica.',
        isPublic: true,
      }
    )

    // Questões do Quiz de Lógica
    const questao1 = await logicaQuiz.related('questions').updateOrCreate(
      { text: 'Qual é o resultado de 2 + 2 em JavaScript se ambos forem strings?' },
      {
        timeLimitSeconds: 20,
        type: 'SINGLE_CHOICE',
      }
    )
    await questao1.related('alternatives').updateOrCreateMany([
      { text: '4', isCorrect: false },
      { text: '"22"', isCorrect: true },
      { text: 'NaN', isCorrect: false },
      { text: 'Error', isCorrect: false },
    ])

    const questao2 = await logicaQuiz.related('questions').updateOrCreate(
      { text: 'Qual palavra-chave é usada para declarar uma variável constante?' },
      {
        timeLimitSeconds: 15,
        type: 'SINGLE_CHOICE',
      }
    )
    await questao2.related('alternatives').updateOrCreateMany([
      { text: 'var', isCorrect: false },
      { text: 'let', isCorrect: false },
      { text: 'const', isCorrect: true },
      { text: 'define', isCorrect: false },
    ])

    // 2. Quiz de Matemática Básica (Outro exemplo)
    const mathDiscipline = await Discipline.findByOrFail('name', 'Cálculo I')
    await Quiz.updateOrCreate(
      { title: 'Matemática Express' },
      {
        userId: professor.id,
        disciplineId: mathDiscipline.id,
        description: 'Questões rápidas de matemática.',
        isPublic: true,
      }
    )
  }
}