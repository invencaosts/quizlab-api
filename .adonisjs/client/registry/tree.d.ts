/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    show: typeof routes['profile.show']
    update: typeof routes['profile.update']
  }
  subjects: {
    index: typeof routes['subjects.index']
  }
  disciplines: {
    index: typeof routes['disciplines.index']
  }
  campuses: {
    index: typeof routes['campuses.index']
  }
  getCourses: {
    index: typeof routes['get_courses.index']
  }
  quizzes: {
    index: typeof routes['quizzes.index']
    create: typeof routes['quizzes.create']
    store: typeof routes['quizzes.store']
    show: typeof routes['quizzes.show']
    edit: typeof routes['quizzes.edit']
    update: typeof routes['quizzes.update']
    destroy: typeof routes['quizzes.destroy']
  }
  sessions: {
    store: typeof routes['sessions.store']
    join: typeof routes['sessions.join']
    lobby: typeof routes['sessions.lobby']
  }
}
