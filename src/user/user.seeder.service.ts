// user.seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randEmail, randPassword, randUserName } from '@ngneat/falso';
import { ResumeSeederService } from '../resume/resume.seeder.service';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly resumeSeederService: ResumeSeederService,
  ) {}

  async seed() {
    const fakeUsers = await Promise.all(
      Array.from({ length: 10 }, async () => {
        const user = await this.userRepository.create({
          username: randUserName(),
          email: randEmail(),
          password: randPassword(),
        });
        const resumes = await Promise.all(
          Array.from({ length: 2 }, () =>
            this.resumeSeederService.createResume(user),
          ),
        );
        user.resumes = resumes;

        return user;
      }),
    );

    await this.userRepository.save(fakeUsers);
  }
}
