import { Router } from 'express'

export interface Controller {
  path: string
  router: Router
}

export interface CustomRouter extends Router {
  path: string
}
