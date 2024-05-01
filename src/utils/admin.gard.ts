import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user as JwtPayload;
    
    if (!user || user.role !== 'admin') {
      return false;
    }
    return true;
  }
}
