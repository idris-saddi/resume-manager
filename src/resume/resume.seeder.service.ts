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
import { Skill } from 'src/skill/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ResumeSeederService {
  userRepository: any;
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async createResume(user: User): Promise<Resume> {
    const skills = await this.skillRepository.find();

    const fakeResume = {
      firstname: randFirstName(),
      lastname: randLastName(),
      age: randNumber({ min: 18, max: 65 }),
      cin: randNumber({ min: 10000000, max: 99999999 }),
      job: randJobTitle(),
      path: randUrl(),
      user: user,
      skills: skills.slice(0, 3), // Assuming each resume has 3 skills
    };

    return await this.resumeRepository.save(fakeResume);
  }

  async seed() {
    const fakeResumes = Array.from({ length: 10 }, async () => {
      const user = await this.userRepository.create({
        username: randUserName(),
        email: randEmail(),
        password: randPassword(),
      });

      const resumes = Array.from({ length: 2 }, () => this.createResume(user));
      user.resumes = await Promise.all(resumes);

      return user;
    });

    await this.userRepository.save(fakeResumes);
  }
}
