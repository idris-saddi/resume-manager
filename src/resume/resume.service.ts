// resume/resume.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UserService } from '../user/user.service';
import { AgeCriteriaDto } from './dto/age-criteria.dto';
import { PaginationDto } from '../utils/pagination.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    private readonly userService: UserService,
  ) {}

  async createResume(
    userId: string,
    resumeDto: CreateResumeDto,
  ): Promise<Resume> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resume = this.resumeRepository.create({ ...resumeDto, user });
    return await this.resumeRepository.save(resume);
  }

  async getResumes(ageCriteriaDto: AgeCriteriaDto): Promise<Resume[]> {
    const { age, criteria } = ageCriteriaDto;
    let query = this.resumeRepository.createQueryBuilder('resume');

    if (age) {
      query = query.where('resume.age = :age', { age });
    }

    if (criteria) {
      query = query.andWhere(
        '(resume.firstname LIKE :criteria OR resume.lastname LIKE :criteria OR resume.job LIKE :criteria)',
        { criteria: `%${criteria}%` },
      );
    }

    return query.getMany();
  }

  async getResumesPerPage(paginationDto : PaginationDto): Promise<Resume[]> {
    const perPage = paginationDto.perPage
    const offset = (paginationDto.page - 1) * perPage;
    return await this.resumeRepository.find({
      skip: offset,
      take: perPage,
    });
  }

  async getResumesByUser(userId: string): Promise<Resume[]> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.resumeRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getResumeById(id: string): Promise<Resume> {
    const resume = await this.resumeRepository.findOneBy({ id });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
    return resume;
  }

  async updateResume(
    userId: string,
    id: string,
    UpdateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    if (resume.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this resume',
      );
    }

    this.resumeRepository.merge(resume, UpdateResumeDto);
    return await this.resumeRepository.save(resume);
  }

  async addImage(
    userId: string,
    id: string,
    fileName: string,
  ): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    if (resume.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update the image of resume',
      );
    }

    this.resumeRepository.merge(resume, {image : fileName});
    return await this.resumeRepository.save(resume);
  }

  async deleteResume(userId: string, id: string): Promise<void> {
    const resume = await this.resumeRepository.findOneBy({ id });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    if (resume.user.id !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this resume',
      );
    }

    resume.deletedAt = resume.deletedAt ? null : new Date(); // Set the soft delete timestamp
    await this.resumeRepository.save(resume);
  }

  async restoreResume(userId: string, id: string): Promise<Resume> {
    const result = await this.resumeRepository.restore(id);

    if (!result.affected) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    const resume = await this.getResumeById(id);

    if (resume.user.id !== userId) {
      this.deleteResume(resume.user.id, id);
      throw new UnauthorizedException(
        'You are not allowed to update this resume',
      );
    }

    return resume;
  }
}
