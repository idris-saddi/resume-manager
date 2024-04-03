// skill/skill.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async createSkill(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillService.createSkill(createSkillDto);
  }

  @Get()
  async getSkills(): Promise<Skill[]> {
    return this.skillService.getSkills();
  }

  @Get(':id')
  async getSkillById(@Param('id') id: string): Promise<Skill> {
    return this.skillService.getSkillById(id);
  }

  @Put(':id')
  async updateSkill(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return this.skillService.updateSkill(id, updateSkillDto);
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: string): Promise<void> {
    return this.skillService.deleteSkill(id);
  }
}