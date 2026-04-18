import { randomInt } from 'node:crypto'
import Session from '#models/session'
import Participant from '#models/participant'
import User from '#models/user'

export default class GameService {
  /**
   * Generates a unique 6-digit PIN for a session
   */
  public async generatePin(): Promise<string> {
    let pin = ''
    let isUnique = false

    while (!isUnique) {
      pin = randomInt(100000, 999999).toString()
      const existing = await Session.query().where('pin', pin).where('status', 'WAITING').first()
      if (!existing) {
        isUnique = true
      }
    }

    return pin
  }

  /**
   * Calculates score based on correctness and speed
   * Formula: 1000 * (1 - time_taken / time_limit)
   */
  public calculateScore(isCorrect: boolean, timeTakenMs: number, timeLimitSeconds: number): number {
    if (!isCorrect) return 0

    const timeLimitMs = timeLimitSeconds * 1000
    const score = 1000 * (1 - timeTakenMs / timeLimitMs)
    
    // Minimal 100 points for correct answer even if slow
    return Math.max(Math.round(score), 100)
  }

  /**
   * Creates a new game session
   */
  public async createSession(quizId: string, hostId: string, type: 'PROFESSOR' | 'SOLO' | 'LOBBY') {
    const session = new Session()
    session.quizId = quizId
    session.hostId = hostId
    
    if (type === 'SOLO') {
      session.status = 'ACTIVE'
      session.isVisibleInLobby = false
      session.pin = null
    } else {
      session.pin = await this.generatePin()
      session.status = 'WAITING'
      session.isVisibleInLobby = type === 'LOBBY'
    }

    await session.save()
    return session
  }

  /**
   * Joins a participant to a session
   */
  public async joinSession(sessionId: string, nickname: string, user?: User) {
    const participant = new Participant()
    participant.sessionId = sessionId
    participant.nickname = nickname
    if (user) {
      participant.userId = user.id
    }
    
    await participant.save()
    
    // O token de participante pode ser o próprio ID (UUID) por enquanto, 
    // já que é imprevisível.
    return participant
  }
}