// skill.seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { randSkill } from '@ngneat/falso';

@Injectable()
export class SkillSeederService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async seed() {
    const fakeSkills = Array.from({ length: 10 }, () => ({
      label: randSkill(),
    }));

    await this.skillRepository.save(fakeSkills);
  }
}
