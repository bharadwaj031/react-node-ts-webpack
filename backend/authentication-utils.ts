import {Request, Response, NextFunction} from 'express'

export function isLoggedIn(_req: Request, _res: Response, next: NextFunction) {
    if (true) {
        return next()
    }
}