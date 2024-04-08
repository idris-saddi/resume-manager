import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSeederService } from './user.seeder.service';
import { ResumeModule } from '../resume/resume.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AuthService } from '../utils/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../utils/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ResumeModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserService, UserSeederService, AuthService, JwtStrategy],
  exports: [
    UserService,
    UserSeederService,
    AuthService,
    JwtModule,
    PassportModule,
  ],
})
export class UserModule {}
