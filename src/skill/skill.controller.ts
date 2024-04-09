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
  Query,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { PaginationDto } from '../utils/pagination.dto';
import { AdminGuard } from '../utils/admin.gard';

@ApiTags('skills')
@Controller('skills')
@ApiBearerAuth()
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getSkills(): Promise<Skill[]> {
    return this.skillService.getSkills();
  }

  @Get('page')
  async getSkillsPerPage(@Query() paginationDto: PaginationDto): Promise<Skill[]> {
    return this.skillService.getSkillsPerPage(paginationDto);
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
  @UseGuards(AdminGuard)
  async updateSkill(
    @Param('id') id: string,
    @Body() skillData: UpdateSkillDto,
  ): Promise<Skill> {
    return this.skillService.updateSkill(id, skillData);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteSkill(@Param('id') id: string): Promise<void> {
    await this.skillService.deleteSkill(id);
  }

  @Patch('restore/:id')
  @UseGuards(AdminGuard)
  async restoreSkill(@Param('id') id: string): Promise<Skill> {
    return this.skillService.restoreSkill(id);
  }
}
