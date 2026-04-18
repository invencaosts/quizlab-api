import { Socket } from 'socket.io'
import Ws from '#services/ws'
import Session from '#models/session'
import Participant from '#models/participant'
import Alternative from '#models/alternative'
import GameService from '#services/game_service'
import ParticipantAnswer from '#models/participant_answer'

const gameService = new GameService()

export default class GameHandler {
  /**
   * Handle room joining
   */
  public async handleJoin(socket: Socket, data: { sessionId: string; participantId: string }) {
    const session = await Session.findOrFail(data.sessionId)
    const participant = await Participant.findOrFail(data.participantId)

    // Join the room
    const roomName = `session:${session.id}`
    socket.join(roomName)

    // Notify room that someone joined
    Ws.io?.to(roomName).emit('user:joined', {
      nickname: participant.nickname,
      id: participant.id,
    })

    console.log(`[Socket] Participant ${participant.nickname} joined room ${roomName}`)
  }

  /**
   * Handle Host actions (Start/Next)
   */
  public async handleHostAction(_socket: Socket, data: { sessionId: string; action: 'START' | 'NEXT_QUESTION' }) {
    const session = await Session.query().where('id', data.sessionId).preload('quiz', (q) => q.preload('questions')).firstOrFail()
    
    // Simplificado: Emitir para a sala que o jogo mudou de estado
    const roomName = `session:${session.id}`
    
    if (data.action === 'START') {
      session.status = 'ACTIVE'
      await session.save()
      Ws.io?.to(roomName).emit('game:started')
    }
    
    if (data.action === 'NEXT_QUESTION') {
      // O frontend controla qual questão exibir, ou podemos enviar aqui
      Ws.io?.to(roomName).emit('question:next')
    }
  }

  /**
   * Handle Answer submission
   */
  public async handleAnswer(socket: Socket, data: { 
    participantId: string; 
    questionId: string; 
    alternativeId: string;
    timeTakenMs: number;
    timeLimitSeconds: number;
  }) {
    const alternative = await Alternative.findOrFail(data.alternativeId)
    const score = gameService.calculateScore(alternative.isCorrect, data.timeTakenMs, data.timeLimitSeconds)

    // Log answer
    await ParticipantAnswer.create({
      participantId: data.participantId,
      questionId: data.questionId,
      alternativeId: data.alternativeId,
      timeTakenMs: data.timeTakenMs,
      pointsEarned: score
    })

    // Update participant total score
    const participant = await Participant.findOrFail(data.participantId)
    participant.totalScore += score
    await participant.save()

    // Notify individual of their result
    socket.emit('answer:result', {
      isCorrect: alternative.isCorrect,
      pointsEarned: score,
      newTotal: participant.totalScore
    })
  }
}
