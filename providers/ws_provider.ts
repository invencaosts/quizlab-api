import type { ApplicationService } from '@adonisjs/core/types'
import Ws from '#services/ws'
import GameHandler from '#socket_handlers/game_handler'

export default class WsProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The application has been booted
   */
  public async boot() {}

  /**
   * The application has been started
   */
  public async start() {
    const server = await this.app.container.make('server')
    Ws.boot(server.getNodeServer()!)

    const gameHandler = new GameHandler()

    // Registra os ouvintes do Socket.io
    Ws.io?.on('connection', (socket) => {
      console.log(`[Socket] New connection: ${socket.id}`)

      socket.on('game:join', (data) => gameHandler.handleJoin(socket, data))
      socket.on('game:host_action', (data) => gameHandler.handleHostAction(socket, data))
      socket.on('game:answer', (data) => gameHandler.handleAnswer(socket, data))

      socket.on('disconnect', () => {
        console.log(`[Socket] Disconnected: ${socket.id}`)
      })
    })
  }

  /**
   * The application is about to shutdown
   */
  public async shutdown() {
    if (Ws.io) {
      try {
        await Ws.io.close()
      } catch {}
    }
  }
}
