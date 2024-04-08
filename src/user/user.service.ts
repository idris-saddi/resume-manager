import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from '../utils/pagination.dto';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const { username, email, password } = userDto;

    // Check if a user with the given email or username already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    // Create a new user with the hashed password
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      salt,
    });

    // Save the new user
    return await this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUsersPerPage(paginationDto: PaginationDto): Promise<User[]> {
    const perPage = paginationDto.perPage;
    const offset = (paginationDto.page - 1) * perPage;
    return await this.userRepository.find({
      skip: offset,
      take: perPage,
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
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
      const existingUser = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (existingUser) {
        throw new ConflictException(
          `Username ${updateUserDto.username} is already taken`,
        );
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

    user.deletedAt = user.deletedAt ? null : new Date(); // Set the soft delete timestamp
    await this.userRepository.save(user);
  }

  async restoreUser(id:string) : Promise<User> {
    const result = await this.userRepository.restore(id);

    if(!result.affected) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.getUserById(id);
  }
}
