import { defineConfig, drivers } from '@adonisjs/core/hash'

const hashConfig = defineConfig({
  /**
   * Default hasher used by the application.
   */
  default: 'argon2',

  list: {
    /**
     * Argon2 is the recommended choice for new applications.
     */
    argon2: drivers.argon2({
      version: 0x13,
      variant: 'id',
      iterations: 3,
      memory: 65536,
      parallelism: 4,
      saltSize: 16,
      hashLength: 32,
    }),

    /**
     * Scrypt is memory-hard, which makes brute-force attacks more expensive.
     */
    scrypt: drivers.scrypt({
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    }),
  },
})

export default hashConfig

declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}
