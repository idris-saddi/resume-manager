// user/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { AuthService } from '../utils/auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<User> {
    const userId = req['userId']; // Get the user id from the request
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (userId !== user.id) {
      console.log(userId +"    " +user.id)
      throw new ForbiddenException('You are not allowed to update this user');
    }

    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req['userId']; // Get the user id from the request
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (userId !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }

    await this.userService.deleteUser(id);
  }
  
  @Patch('restore/:id')
  restore(@Param('id') id: string) : Promise<User> {
    return this.userService.restoreUser(id);
  }
}
