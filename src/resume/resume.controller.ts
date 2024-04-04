// resume/resume.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AgeCriteriaDto } from './dto/age-criteria.dto';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('resumes')
@Controller('resumes')
@UseGuards(AuthMiddleware)
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

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async createResume(
    @Body() createResumeDto: CreateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.createResume(createResumeDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async updateResume(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
    @Req() req: Request,
  ): Promise<Resume> {
    const userId = req['id']; // Get the user id from the request
    const resume = await this.resumeService.getResumeById(id);

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    if (userId !== resume.user.id) {
      throw new ForbiddenException('You are not allowed to update this resume');
    }
    return this.resumeService.updateResume(id, updateResumeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async deleteResume(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req['id']; // Get the user id from the request
    const resume = await this.resumeService.getResumeById(id);

    if (!resume) {
      throw new NotFoundException('Resume not found');
    }

    if (userId !== resume.user.id) {
      throw new ForbiddenException('You are not allowed to delete this resume');
    }
    return this.resumeService.deleteResume(id);
  }
}
