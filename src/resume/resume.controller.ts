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
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './entities/resume.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AgeCriteriaDto } from './dto/age-criteria.dto';
import { PaginationDto } from '../utils/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { AdminGuard } from '../utils/admin.gard';
import { GetUser } from '../utils/user.decorator';
import { createReadStream } from 'fs';

@ApiTags('resumes')
@Controller('resumes')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  @UseGuards(AdminGuard)
  async getResumes(@Query() ageCriteriaDto: AgeCriteriaDto): Promise<Resume[]> {
    return this.resumeService.getResumes(ageCriteriaDto);
  }

  @Get('page')
  @UseGuards(AdminGuard)
  async getResumesPerPage(
    @Query() paginationDto: PaginationDto,
  ): Promise<Resume[]> {
    return this.resumeService.getResumesPerPage(paginationDto);
  }

  @Get('me')
  async getMyResumes(@GetUser() user): Promise<Resume[]> {
    return this.resumeService.getResumesByUser(user.id);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async getResumeById(@Param('id') id: string): Promise<Resume> {
    return this.resumeService.getResumeById(id);
  }

  @Get('user/:userId')
  @UseGuards(AdminGuard)
  async getResumeByUser(@Param('userId') userId: string): Promise<Resume[]> {
    return this.resumeService.getResumesByUser(userId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createResume(
    @Body() resumeData: CreateResumeDto,
    @GetUser() user,
  ): Promise<Resume> {
    return this.resumeService.createResume(user.id, resumeData);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateResume(
    @Param('id') id: string,
    @Body() resumeData: UpdateResumeDto,
    @GetUser() user,
  ): Promise<Resume> {
    return this.resumeService.updateResume(user.id, id, resumeData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteResume(@Param('id') id: string, @GetUser() user): Promise<void> {
    await this.resumeService.deleteResume(user.id, id);
  }

  @Post('upload/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = uuidv4() + '-' + file.originalname;
          callback(null, randomName);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file,
    @GetUser() user,
    @Param('id') resumeId: string,
  ) {
    const filename = file.filename;
    return this.resumeService.addImage(user.id, resumeId, filename);
  }

  @Get('image/:id')
  async getImage(@Param('id') id: string, @GetUser() user) {
    const imagePath = await this.resumeService.getImage(id, user.id); 
    console.log(imagePath);
    
    const file = createReadStream(imagePath);
    return new StreamableFile(file);
  }

  @Patch('restore/:id')
  @UseGuards(AuthGuard('jwt'))
  async restoreResume(
    @Param('id') id: string,
    @GetUser() user,
  ): Promise<Resume> {
    return this.resumeService.restoreResume(user.id, id);
  }
}
