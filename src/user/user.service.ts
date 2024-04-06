import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepository.findOne({ where: { username: updateUserDto.username } });
      if (existingUser) {
        throw new ConflictException(`Username ${updateUserDto.username} is already taken`);
      }
    }

    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);
  }
}
