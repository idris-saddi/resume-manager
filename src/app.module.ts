import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resume/resume.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { ResumeSeederService } from './resume/resume.seeder.service';
import { SkillSeederService } from './skill/skill.seeder.service';
import { UserSeederService } from './user/user.seeder.service';

@Module({
  imports: [ResumeModule, UserModule, SkillModule],
  providers: [
    AppService,
    ResumeSeederService,
    SkillSeederService,
    UserSeederService,
  ],
  controllers: [AppController],
})
export class AppModule {}
