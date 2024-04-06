// skill/skill.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async createSkill(skillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(skillDto);
    return await this.skillRepository.save(skill);
  }

  async getSkills(): Promise<Skill[]> {
    return await this.skillRepository.find();
  }

  async getSkillById(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOneBy({id});
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async updateSkill(id: string, skillData: any): Promise<Skill> {
    const skill = await this.skillRepository.findOneBy({id});
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    this.skillRepository.merge(skill, skillData);
    return await this.skillRepository.save(skill);
  }

  async deleteSkill(id: string): Promise<void> {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    skill.deletedAt = skill.deletedAt ? null : new Date(); // Set the soft delete timestamp
    await this.skillRepository.save(skill);
  }

  async restoreSkill(id: string): Promise<Skill> {
    const result = await this.skillRepository.restore(id);

    if (!result.affected) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    return this.getSkillById(id);
  }
}
