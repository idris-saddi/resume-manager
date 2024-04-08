// user.seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randEmail, randPassword, randUserName } from '@ngneat/falso';
import { ResumeSeederService } from '../resume/resume.seeder.service';
import * as crypto from 'crypto';

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
        const salt = crypto.randomBytes(16).toString('hex');
        const password = crypto.pbkdf2Sync(randPassword(), salt, 10000, 64, 'sha512').toString('hex');

        const user = await this.userRepository.create({
          username: randUserName(),
          email: randEmail(),
          password,
          salt,
        });
        return user;
      }),
    );

    await this.userRepository.save(fakeUsers);
  }
}
