import vine from '@vinejs/vine'

/**
 * Validator to validate quiz creation
 */
export const createQuizValidator = vine.compile(
  vine.object({
    disciplineId: vine.string().uuid(),
    title: vine.string().minLength(3).maxLength(100),
    description: vine.string().optional(),
    isPublic: vine.boolean().optional(),
    questions: vine.array(
      vine.object({
        text: vine.string().minLength(3),
        timeLimitSeconds: vine.number().min(5).max(300),
        type: vine.enum(['SINGLE_CHOICE', 'MULTIPLE_CHOICE'] as const),
        alternatives: vine.array(
          vine.object({
            text: vine.string(),
            isCorrect: vine.boolean(),
          })
        ).minLength(2)
      })
    ).minLength(1)
  })
)

/**
 * Validator to validate quiz updates
 */
export const updateQuizValidator = vine.compile(
  vine.object({
    disciplineId: vine.string().uuid().optional(),
    title: vine.string().minLength(3).maxLength(100).optional(),
    description: vine.string().optional(),
    isPublic: vine.boolean().optional(),
  })
)
