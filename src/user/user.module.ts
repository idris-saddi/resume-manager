import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSeederService } from './user.seeder.service';
import { ResumeModule } from '../resume/resume.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ResumeModule],
  providers: [User, UserSeederService],
  exports: [User, UserSeederService],
})
export class UserModule {}
