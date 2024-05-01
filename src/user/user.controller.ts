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
  NotFoundException,
  ForbiddenException,
  Patch,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from '../utils/pagination.dto';
import { AdminGuard } from '../utils/admin.gard';
import { GetUser } from '../utils/user.decorator';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('page')
  @UseGuards(AdminGuard)
  async getUsersPerPage(@Query() paginationDto: PaginationDto): Promise<User[]> {
    return this.userService.getUsersPerPage(paginationDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@GetUser() user) {
    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user,
  ): Promise<User> {
    const userId = user.id; // Get the user id from the request
    const currentUser = await this.userService.getUserById(id);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    if (userId !== currentUser.id) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(
    @Param('id') id: string,
    @GetUser() user,
  ): Promise<void> {
    const userId = user.id; // Get the user id from the request
    const currentUser = await this.userService.getUserById(id);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    if (userId !== currentUser.id) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    await this.userService.deleteUser(id);
  }
  
  @Patch('restore/:id')
  @UseGuards(AdminGuard)
  restore(@Param('id') id: string) : Promise<User> {
    return this.userService.restoreUser(id);
  }
}
