// resume/resume.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';
import { ApiTags } from '@nestjs/swagger';
import { AgeCriteriaDto } from './dto/age-criteria.dto';

@ApiTags('resumes')
@Controller('resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  async createResume(@Body() createResumeDto: CreateResumeDto): Promise<Resume> {
    return this.resumeService.createResume(createResumeDto);
  }

  @Get()
  async getResumes(@Query() ageCriteriaDto: AgeCriteriaDto) : Promise<Resume[]> {
    return this.resumeService.getResumes(ageCriteriaDto);
  }

  @Get(':id')
  async getResumeById(@Param('id') id: string): Promise<Resume> {
    return this.resumeService.getResumeById(id);
  }

  @Put(':id')
  async updateResume(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto): Promise<Resume> {
    return this.resumeService.updateResume(id, updateResumeDto);
  }

  @Delete(':id')
  async deleteResume(@Param('id') id: string): Promise<void> {
    return this.resumeService.deleteResume(id);
  }
}