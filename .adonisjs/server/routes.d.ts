import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'disciplines.index': { paramsTuple?: []; params?: {} }
    'campuses.index': { paramsTuple?: []; params?: {} }
    'get_courses.index': { paramsTuple?: []; params?: {} }
    'quizzes.index': { paramsTuple?: []; params?: {} }
    'quizzes.create': { paramsTuple?: []; params?: {} }
    'quizzes.store': { paramsTuple?: []; params?: {} }
    'quizzes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quizzes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quizzes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quizzes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sessions.store': { paramsTuple?: []; params?: {} }
    'sessions.join': { paramsTuple?: []; params?: {} }
    'sessions.lobby': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'disciplines.index': { paramsTuple?: []; params?: {} }
    'campuses.index': { paramsTuple?: []; params?: {} }
    'get_courses.index': { paramsTuple?: []; params?: {} }
    'quizzes.index': { paramsTuple?: []; params?: {} }
    'quizzes.create': { paramsTuple?: []; params?: {} }
    'quizzes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quizzes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sessions.lobby': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'subjects.index': { paramsTuple?: []; params?: {} }
    'disciplines.index': { paramsTuple?: []; params?: {} }
    'campuses.index': { paramsTuple?: []; params?: {} }
    'get_courses.index': { paramsTuple?: []; params?: {} }
    'quizzes.index': { paramsTuple?: []; params?: {} }
    'quizzes.create': { paramsTuple?: []; params?: {} }
    'quizzes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'quizzes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sessions.lobby': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'quizzes.store': { paramsTuple?: []; params?: {} }
    'sessions.store': { paramsTuple?: []; params?: {} }
    'sessions.join': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'quizzes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'quizzes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'quizzes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}