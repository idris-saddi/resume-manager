// skill/skill.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('skills')
@Controller('skills')
@ApiBearerAuth()
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getSkills(): Promise<Skill[]> {
    return this.skillService.getSkills();
  }

  @Get(':id')
  async getSkillById(@Param('id') id: string): Promise<Skill> {
    return this.skillService.getSkillById(id);
  }

  @Post()
  async createSkill(@Body() skillData: CreateSkillDto): Promise<Skill> {
    return this.skillService.createSkill(skillData);
  }

  @Put(':id')
  async updateSkill(
    @Param('id') id: string,
    @Body() skillData: UpdateSkillDto,
  ): Promise<Skill> {
    return this.skillService.updateSkill(id, skillData);
  }

  @Delete(':id')
  async deleteSkill(@Param('id') id: string): Promise<void> {
    await this.skillService.deleteSkill(id);
  }

  @Patch('restore/:id')
  async restoreSkill(@Param('id') id: string): Promise<Skill> {
    return this.skillService.restoreSkill(id);
  }
}
