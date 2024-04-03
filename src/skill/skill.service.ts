import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    const skill = await this.skillRepository.findOneBy({id})
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async updateSkill(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.skillRepository.findOneBy({id});
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    this.skillRepository.merge(skill, updateSkillDto);
    return await this.skillRepository.save(skill);
  }

  async deleteSkill(id: string): Promise<void> {
    const skill = await this.skillRepository.findOneBy({id});
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    await this.skillRepository.remove(skill);
  }
}
