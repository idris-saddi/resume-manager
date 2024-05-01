// Create a new file called custom.d.ts in your src directory
// src/custom.d.ts

import { JwtPayload } from './jwt-payload.interface';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}
