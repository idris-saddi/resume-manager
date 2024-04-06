// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from '../utils/jwt-payload.interface';

const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("header prob");
      
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = verify(token, jwtSecret) as JwtPayload;
      req['userId'] = decodedToken.id;
      
      next();
    } catch (error) {
      console.log("error while verifing payload in the middelware");
      
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}



