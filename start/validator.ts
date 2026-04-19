/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import { DateTime } from 'luxon'
import vine, { VineDate, SimpleMessagesProvider } from '@vinejs/vine'

declare module '@vinejs/vine/types' {
  interface VineGlobalTransforms {
    date: DateTime
  }
}

VineDate.transform((value) => DateTime.fromJSDate(value))

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'O campo {{ field }} é obrigatório',
  'email': 'O e-mail informado é inválido',
  'regex': 'O formato do campo {{ field }} é inválido',
  'minLength': 'O campo {{ field }} deve ter no mínimo {{ min }} caracteres',
  'maxLength': 'O campo {{ field }} deve ter no máximo {{ max }} caracteres',
  'database.unique': 'Este {{ field }} já está cadastrado no sistema',
  'database.exists': 'O {{ field }} selecionado é inválido',
  'password.sameAs': 'A confirmação de senha não confere',
  
  // Nomes amigáveis para os campos
  'fullName': 'nome completo',
  'cpf': 'CPF',

  'registration': 'matrícula',
  'campusId': 'campus',
  'courseId': 'curso',
  'password': 'senha',
  'passwordConfirmation': 'confirmação de senha'
})
