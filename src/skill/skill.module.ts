import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { SkillSeederService } from './skill.seeder.service';
import { SkillService } from './skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillService, SkillSeederService],
  exports: [SkillService, SkillSeederService ],
})
export class SkillModule {}
