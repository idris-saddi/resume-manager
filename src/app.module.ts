import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ResumeModule } from './resume/resume.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { ResumeSeederService } from './resume/resume.seeder.service';
import { SkillSeederService } from './skill/skill.seeder.service';
import { UserSeederService } from './user/user.seeder.service';
import { User } from './user/entities/user.entity';
import { Skill } from './skill/entities/skill.entity';
import { Resume } from './resume/entities/resume.entity';
import { SkillController } from './skill/skill.controller';
import { UserController } from './user/user.controller';
import { ResumeController } from './resume/resume.controller';
import { UserService } from './user/user.service';
import { SkillService } from './skill/skill.service';
import { ResumeService } from './resume/resume.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './utils/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads', // Dossier de destination des fichiers uploadés
      limits: {
        fileSize: 1024 * 1024, // Limite de taille à 1 Mo
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
    ResumeModule,
    UserModule,
    SkillModule,
    TypeOrmModule.forFeature([Resume, Skill, User]),
  ],
  providers: [
    AppService,
    ResumeSeederService,
    SkillSeederService,
    UserSeederService,
    UserService,
    SkillService,
    ResumeService,
    AuthService,
    AuthMiddleware,
    JwtService,
  ],
  controllers: [
    AppController,
    SkillController,
    UserController,
    ResumeController,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'login', method: RequestMethod.POST },
        { path: 'register', method: RequestMethod.POST },
        {
          path: '/',
          method: RequestMethod.ALL,
        },
      ) // Exclude the login route
      .forRoutes('*');
  }
}
