import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResumeSeederService } from './resume/resume.seeder.service';
import { SkillSeederService } from './skill/skill.seeder.service';
import { UserSeederService } from './user/user.seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const skillSeederService = app.get(SkillSeederService);
  await skillSeederService.seed();

  const userSeederService = app.get(UserSeederService);
  await userSeederService.seed();

  const resumeSeederService = app.get(ResumeSeederService);
  await resumeSeederService.seed();

  await app.close();
}

bootstrap();
