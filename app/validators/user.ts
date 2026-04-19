import vine from '@vinejs/vine'
import { isValidCPF } from '../helpers/cpf_helper.js'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () =>
  vine
    .string()
    .minLength(8)
    .maxLength(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)


/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(255),
    email: email().unique({ table: 'users', column: 'email' }),
    cpf: vine
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .unique({ table: 'users', column: 'cpf' })
      .transform((value, field) => {
        if (!isValidCPF(value)) {
          field.report('O CPF informado é inválido.', 'cpf', field)
        }
        return value
      }),
    registration: vine
      .string()
      .regex(/^[0-9]+$/)
      .maxLength(10)
      .unique({ table: 'users', column: 'registration' }),
    campusId: vine.string().exists({ table: 'campuses', column: 'id' }),
    courseId: vine.string().exists({ table: 'courses', column: 'id' }),
    password: password(),
    passwordConfirmation: password().sameAs('password'),
  })
)



/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
