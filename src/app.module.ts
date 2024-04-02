import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resume/resume.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [ResumeModule, UserModule, SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
