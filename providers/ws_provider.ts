import type { ApplicationService } from '@adonisjs/core/types'
import Ws from '#services/ws'

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
    const server = this.app.container.resolve('server')
    Ws.boot(server.getNodeServer()!)
  }

  /**
   * The application is about to shutdown
   */
  public async shutdown() {
    if (Ws.io) {
      await Ws.io.close()
    }
  }
}
