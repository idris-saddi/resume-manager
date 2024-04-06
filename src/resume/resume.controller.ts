// resume/resume.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Patch,
  Req,
  Query,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './entities/resume.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthGuard } from '@nestjs/passport';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AgeCriteriaDto } from './dto/age-criteria.dto';

@ApiTags('resumes')
@Controller('resumes')
@ApiBearerAuth()
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  async getResumes(@Query() ageCriteriaDto: AgeCriteriaDto): Promise<Resume[]> {
    return this.resumeService.getResumes(ageCriteriaDto);
  }

  @Get(':id')
  async getResumeById(@Param('id') id: string): Promise<Resume> {
    return this.resumeService.getResumeById(id);
  }

  @Get('user/:userId')
  async getResumeByUser(@Param('userId') userId: string): Promise<Resume[]> {
    return this.resumeService.getResumesByUser(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createResume(
    @Body() resumeData: CreateResumeDto,
    @Req() req: Request,
  ): Promise<Resume> {
    const userId = req['userId'];
    return this.resumeService.createResume(userId, resumeData);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateResume(
    @Param('id') id: string,
    @Body() resumeData: UpdateResumeDto,
    @Req() req: Request,
  ): Promise<Resume> {
    const userId = req['userId']; // Get the user id from the request
    return this.resumeService.updateResume(userId, id, resumeData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteResume(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req['userId'];
    await this.resumeService.deleteResume(userId, id);
  }

  @Patch('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  async restoreResume(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Resume> {
    const userId = req['userId'];
    return this.resumeService.restoreResume(userId, id);
  }
}
