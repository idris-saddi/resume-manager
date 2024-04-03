import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillSeederService } from './skill.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [Skill, SkillSeederService],
  exports: [Skill, SkillSeederService ],
})
export class SkillModule {}
