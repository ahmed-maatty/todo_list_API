import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";

@Injectable()
export class VerifytokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHead = req.headers.authorization;
      if (!authHead) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Please, Login.' });
      }
      const token = authHead?.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      req['user'] = decoded;
      next();
    } catch (err:unknown) {
      res.status(500).json({
        message : "Internal Server Error",
        err
      })
    }
  }
}
