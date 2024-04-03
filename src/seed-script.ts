import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResumeSeederService } from './resume/resume.seeder.service';
import { SkillSeederService } from './skill/skill.seeder.service';
import { UserSeederService } from './user/user.seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const skillSeederService = app.get(SkillSeederService);
  await skillSeederService.seed();
  console.log('Skill seeding completed');

  const userSeederService = app.get(UserSeederService);
  await userSeederService.seed();
  console.log('User seeding completed');

  const resumeSeederService = app.get(ResumeSeederService);
  await resumeSeederService.seed();
  console.log('Resume seeding completed');

  await app.close();
  console.log('Seeding process completed');
}

bootstrap();

// to run this use : npm run seed:db
