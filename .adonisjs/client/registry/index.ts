/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/profile',
    tokens: [{"old":"/api/v1/profile","type":0,"val":"api","end":""},{"old":"/api/v1/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'profile.update': {
    methods: ["PUT"],
    pattern: '/api/v1/profile',
    tokens: [{"old":"/api/v1/profile","type":0,"val":"api","end":""},{"old":"/api/v1/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'subjects.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/subjects',
    tokens: [{"old":"/api/v1/subjects","type":0,"val":"api","end":""},{"old":"/api/v1/subjects","type":0,"val":"v1","end":""},{"old":"/api/v1/subjects","type":0,"val":"subjects","end":""}],
    types: placeholder as Registry['subjects.index']['types'],
  },
  'disciplines.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/disciplines',
    tokens: [{"old":"/api/v1/disciplines","type":0,"val":"api","end":""},{"old":"/api/v1/disciplines","type":0,"val":"v1","end":""},{"old":"/api/v1/disciplines","type":0,"val":"disciplines","end":""}],
    types: placeholder as Registry['disciplines.index']['types'],
  },
  'campuses.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/campuses',
    tokens: [{"old":"/api/v1/campuses","type":0,"val":"api","end":""},{"old":"/api/v1/campuses","type":0,"val":"v1","end":""},{"old":"/api/v1/campuses","type":0,"val":"campuses","end":""}],
    types: placeholder as Registry['campuses.index']['types'],
  },
  'get_courses.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/courses',
    tokens: [{"old":"/api/v1/courses","type":0,"val":"api","end":""},{"old":"/api/v1/courses","type":0,"val":"v1","end":""},{"old":"/api/v1/courses","type":0,"val":"courses","end":""}],
    types: placeholder as Registry['get_courses.index']['types'],
  },
  'quizzes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/quizzes',
    tokens: [{"old":"/api/v1/quizzes","type":0,"val":"api","end":""},{"old":"/api/v1/quizzes","type":0,"val":"v1","end":""},{"old":"/api/v1/quizzes","type":0,"val":"quizzes","end":""}],
    types: placeholder as Registry['quizzes.index']['types'],
  },
  'quizzes.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/quizzes/create',
    tokens: [{"old":"/api/v1/quizzes/create","type":0,"val":"api","end":""},{"old":"/api/v1/quizzes/create","type":0,"val":"v1","end":""},{"old":"/api/v1/quizzes/create","type":0,"val":"quizzes","end":""},{"old":"/api/v1/quizzes/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['quizzes.create']['types'],
  },
  'quizzes.store': {
    methods: ["POST"],
    pattern: '/api/v1/quizzes',
    tokens: [{"old":"/api/v1/quizzes","type":0,"val":"api","end":""},{"old":"/api/v1/quizzes","type":0,"val":"v1","end":""},{"old":"/api/v1/quizzes","type":0,"val":"quizzes","end":""}],
    types: placeholder as Registry['quizzes.store']['types'],
  },
  'quizzes.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/quizzes/:id',
    tokens: [{"old":"/api/v1/quizzes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/quizzes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/quizzes/:id","type":0,"val":"quizzes","end":""},{"old":"/api/v1/quizzes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['quizzes.show']['types'],
  },
  'quizzes.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/quizzes/:id/edit',
    tokens: [{"old":"/api/v1/quizzes/:id/edit","type":0,"val":"api","end":""},{"old":"/api/v1/quizzes/:id/edit","type":0,"val":"v1","end":""},{"old":"/api/v1/quizzes/:id/edit","type":0,"val":"quizzes","end":""},{"old":"/api/v1/quizzes/:id/edit","type":1,"val":"id","end":""},{"old":"/api/v1/quizzes/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['quizzes.edit']['types'],
  },
  'quizzes.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/quizzes/:id',
    tokens: [{"old":"/api/v1/quizzes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/quizzes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/quizzes/:id","type":0,"val":"quizzes","end":""},{"old":"/api/v1/quizzes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['quizzes.update']['types'],
  },
  'quizzes.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/quizzes/:id',
    tokens: [{"old":"/api/v1/quizzes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/quizzes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/quizzes/:id","type":0,"val":"quizzes","end":""},{"old":"/api/v1/quizzes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['quizzes.destroy']['types'],
  },
  'sessions.store': {
    methods: ["POST"],
    pattern: '/api/v1/sessions',
    tokens: [{"old":"/api/v1/sessions","type":0,"val":"api","end":""},{"old":"/api/v1/sessions","type":0,"val":"v1","end":""},{"old":"/api/v1/sessions","type":0,"val":"sessions","end":""}],
    types: placeholder as Registry['sessions.store']['types'],
  },
  'sessions.join': {
    methods: ["POST"],
    pattern: '/api/v1/sessions/join',
    tokens: [{"old":"/api/v1/sessions/join","type":0,"val":"api","end":""},{"old":"/api/v1/sessions/join","type":0,"val":"v1","end":""},{"old":"/api/v1/sessions/join","type":0,"val":"sessions","end":""},{"old":"/api/v1/sessions/join","type":0,"val":"join","end":""}],
    types: placeholder as Registry['sessions.join']['types'],
  },
  'sessions.lobby': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/sessions/lobby',
    tokens: [{"old":"/api/v1/sessions/lobby","type":0,"val":"api","end":""},{"old":"/api/v1/sessions/lobby","type":0,"val":"v1","end":""},{"old":"/api/v1/sessions/lobby","type":0,"val":"sessions","end":""},{"old":"/api/v1/sessions/lobby","type":0,"val":"lobby","end":""}],
    types: placeholder as Registry['sessions.lobby']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
