// user.seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randEmail, randPassword, randUserName } from '@ngneat/falso';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const fakeUsers = await Promise.all(
      Array.from({ length: 10 }, async () => {
        const password = randPassword();
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        const user = await this.userRepository.create({
          username: randUserName(),
          email: randEmail(),
          password: hashedPassword,
          salt,
        });
        return user;
      }),
    );

    await this.userRepository.save(fakeUsers);
  }
}
