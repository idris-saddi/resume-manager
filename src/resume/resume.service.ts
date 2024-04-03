import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async createResume(resumeDto: CreateResumeDto): Promise<Resume> {
    const resume = this.resumeRepository.create(resumeDto);
    return await this.resumeRepository.save(resume);
  }

  async getResumes(): Promise<Resume[]> {
    return await this.resumeRepository.find();
  }

  async getResumeById(id: string): Promise<Resume> {
    const resume = await this.resumeRepository.findOneBy({id});
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
    return resume;
  }

  async updateResume(id: string, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    const resume = await this.resumeRepository.findOneBy({id});
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    this.resumeRepository.merge(resume, updateResumeDto);
    return await this.resumeRepository.save(resume);
  }

  async deleteResume(id: string): Promise<void> {
    const resume = await this.resumeRepository.findOneBy({id});
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    await this.resumeRepository.remove(resume);
  }
}