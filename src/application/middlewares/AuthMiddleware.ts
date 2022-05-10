import { HttpException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: Response, next: NextFunction) {
        if (!req.headers.authorization) throw new HttpException('Could not find any token', 401)
        const token = req.headers.authorization.split(" ")[1]
        if (!token) throw new HttpException('Could not find any token', 401)
        const decodeToken = jwt.decode(token)
        if (!decodeToken) throw new HttpException('Authentication failed', 401)
        req.user = decodeToken
        next()
    }
}
