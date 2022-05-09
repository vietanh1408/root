import { NextFunction, Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import { environments } from '../constants'
import AuthorizationException from '../exceptions/Authorization.exception'
import { Context, UserAuthPayload } from '../interfaces/context.interface'
import { RoleEnum } from './../constants/enum'

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const context: Context = {
      req,
      res,
      user: null
    }

    const authHeader = context.req.header('Authorization')
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (!accessToken) {
      next(new AuthorizationException())
    }

    const decodedToken = verify(
      accessToken,
      environments.ACCESS_TOKEN_SECRET as Secret
    ) as UserAuthPayload

    context.user = decodedToken

    return next()
  } catch (error) {
    next(new AuthorizationException())
  }
}

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const context: Context = {
      req,
      res,
      user: null
    }

    const authHeader = context.req.header('Authorization')
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (!accessToken) {
      next(new AuthorizationException())
    }

    const decodedToken = verify(
      accessToken,
      environments.ACCESS_TOKEN_SECRET as Secret
    ) as UserAuthPayload

    context.user = decodedToken

    if (context.user.role !== RoleEnum.Admin) {
      next(new AuthorizationException())
    }

    return next()
  } catch (error) {
    next(new AuthorizationException())
  }
}
