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
    const existingSkills = await this.skillRepository.find();
  
    const existingLabels = new Set(existingSkills.map((skill) => skill.label));
  
    const fakeSkills = Array.from({ length: 20 }, () => {
      let label = randSkill();
      while (existingLabels.has(label)) {
        label = randSkill();
      }
      existingLabels.add(label);
      return { label };
    });
  
    await this.skillRepository.save(fakeSkills);
  }
}
