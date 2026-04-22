import type { HttpContext } from '@adonisjs/core/http'
import Quiz from '#models/quiz'
import { createQuizValidator, updateQuizValidator } from '#validators/quiz'
import db from '@adonisjs/lucid/services/db'

export default class QuizzesController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const user = auth.user!
    
    // Simplificando para depuração
    const quizzes = await user.related('quizzes').query()
      .preload('discipline')
      .orderBy('createdAt', 'desc')
    return quizzes
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createQuizValidator)

    const quiz = await db.transaction(async (trx) => {
      // 1. Cria o Quiz
      const newQuiz = new Quiz()
      newQuiz.useTransaction(trx)
      newQuiz.fill({
        userId: user.id,
        disciplineId: payload.disciplineId,
        title: payload.title,
        description: payload.description,
        isPublic: payload.isPublic ?? false,
      })
      await newQuiz.save()

      // 2. Cria as Questões e Alternativas
      for (const questionData of payload.questions) {
        const question = await newQuiz.related('questions').create({
          text: questionData.text,
          timeLimitSeconds: questionData.timeLimitSeconds,
          type: questionData.type,
        })

        await question.related('alternatives').createMany(questionData.alternatives)
      }

      return newQuiz
    })

    return response.created(quiz)
  }

  /**
   * Show individual record
   */
  async show({ params, auth }: HttpContext) {
    const user = auth.user!
    const quiz = await Quiz.query()
      .where('id', params.id)
      .where('userId', user.id) // Garante que só o dono veja os detalhes
      .preload('questions', (q) => q.preload('alternatives'))
      .preload('discipline')
      .firstOrFail()

    return quiz
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth }: HttpContext) {
    const user = auth.user!
    const quiz = await Quiz.query().where('id', params.id).where('userId', user.id).firstOrFail()
    
    const payload = await request.validateUsing(updateQuizValidator)
    quiz.merge(payload)
    await quiz.save()

    return quiz
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const quiz = await Quiz.query().where('id', params.id).where('userId', user.id).firstOrFail()
    
    await quiz.delete()
    return response.noContent()
  }
}