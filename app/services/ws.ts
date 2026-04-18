import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'node:http'

class Ws {
  public io: Server | undefined
  private booted = false

  public boot(httpServer: HTTPServer) {
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    })
  }
}

/**
 * Expose a singleton instance of the Ws class
 */
const ws = new Ws()
export default ws
