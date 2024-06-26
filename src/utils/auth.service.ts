import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (user && this.validatePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  private validatePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      username: user.username,
      id: user.id,
      role : user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
