/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NewAccountController = () => import('#controllers/new_account_controller')
const AccessTokenController = () => import('#controllers/access_token_controller')
const ProfileController = () => import('#controllers/profile_controller')
const SubjectsController = () => import('#controllers/subjects_controller')
const DisciplinesController = () => import('#controllers/disciplines_controller')
const QuizzesController = () => import('#controllers/quizzes_controller')
const CampusesController = () => import('#controllers/campuses_controller')
const GetCoursesController = () => import('#controllers/get_courses_controller')
const SessionsController = () => import('#controllers/sessions_controller')

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // Autenticação
    router
      .group(() => {
        router.post('signup', [NewAccountController, 'store'])
        router.post('login', [AccessTokenController, 'store'])
        router.post('logout', [AccessTokenController, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    // Perfil
    router.get('profile', [ProfileController, 'show']).use(middleware.auth())
    router.put('profile', [ProfileController, 'update']).use(middleware.auth())

    // CRUD Acadêmico
    router.get('subjects', [SubjectsController, 'index'])
    router.get('disciplines', [DisciplinesController, 'index'])
    router.get('campuses', [CampusesController, 'index'])
    router.get('courses', [GetCoursesController, 'index'])
    router.resource('quizzes', QuizzesController).use('*', middleware.auth())

    // Motor de Jogo / Sessões
    router.post('sessions', [SessionsController, 'store']).use(middleware.auth())
    router.post('sessions/join', [SessionsController, 'join'])
    router.get('sessions/lobby', [SessionsController, 'lobby'])
  })
  .prefix('/api/v1')
