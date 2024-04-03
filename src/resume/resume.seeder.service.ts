// resume.seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import {
  randEmail,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randUrl,
  randUserName,
} from '@ngneat/falso';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class ResumeSeederService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async createResume(user: User, existingSkills: Skill[]): Promise<Resume> {
    const skills = existingSkills.slice(0, Math.floor(Math.random() * existingSkills.length));
    const fakeResume = {
      firstname: randFirstName(),
      lastname: randLastName(),
      age: randNumber({ min: 18, max: 65 }),
      cin: randNumber({ min: 10000000, max: 99999999 }),
      job: randJobTitle(),
      path: randUrl(),
      user: user,
      skills: skills,
    };

    return await this.resumeRepository.save(fakeResume);
  }

  async seed() {
    const existingUsers = await this.userRepository.find();

    const existingSkills = await this.skillRepository.find();

    const fakeResumes = await Promise.all(
      existingUsers.map(async (user) => {
        const resumes = Array.from({ length: 2 }, () => this.createResume(user, existingSkills));
        user.resumes = await Promise.all(resumes);

        return user;
      })
    );

    await this.userRepository.save(fakeResumes);
  }
}
