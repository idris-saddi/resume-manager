import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { ResumeSeederService } from './resume.seeder.service';
import { SkillModule } from '../skill/skill.module';
import { Skill } from '../skill/entities/skill.entity';
import { User } from '../user/entities/user.entity';
import { ResumeService } from './resume.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resume, User, Skill]), SkillModule],
  providers: [ResumeSeederService, ResumeService],
  exports: [ResumeSeederService, ResumeService],
})
export class ResumeModule {}
