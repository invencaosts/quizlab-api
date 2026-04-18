import type { HttpContext } from '@adonisjs/core/http'
import Session from '#models/session'
import GameService from '#services/game_service'
import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'

@inject()
export default class SessionsController {
  constructor(protected gameService: GameService) {}

  /**
   * Create a new session (Host)
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const schema = vine.compile(
      vine.object({
        quizId: vine.string().uuid(),
        type: vine.enum(['PROFESSOR', 'SOLO', 'LOBBY'] as const),
      })
    )
    const payload = await request.validateUsing(schema)

    const session = await this.gameService.createSession(payload.quizId, user.id, payload.type)
    return response.created(session)
  }

  /**
   * Join an existing session (Participant)
   */
  async join({ request, auth, response }: HttpContext) {
    const schema = vine.compile(
      vine.object({
        pin: vine.string().minLength(6).maxLength(6).optional(),
        sessionId: vine.string().uuid().optional(),
        nickname: vine.string().minLength(2).maxLength(20),
      })
    )
    const payload = await request.validateUsing(schema)

    let session: Session | null = null

    if (payload.pin) {
      session = await Session.query().where('pin', payload.pin).where('status', 'WAITING').first()
    } else if (payload.sessionId) {
      session = await Session.query().where('id', payload.sessionId).first()
    }

    if (!session) {
      return response.notFound({ message: 'Sessão não encontrada ou indisponível' })
    }

    const participant = await this.gameService.joinSession(
      session.id,
      payload.nickname,
      auth.user ?? undefined
    )

    return {
      session,
      participant,
      token: participant.id, // O ID do participante serve como token de reconexão
    }
  }

  /**
   * List public lobby sessions
   */
  async lobby() {
    return await Session.query()
      .where('isVisibleInLobby', true)
      .where('status', 'WAITING')
      .preload('quiz')
      .preload('host')
  }
}