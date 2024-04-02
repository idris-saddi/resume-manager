import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { ResumeSeederService } from './resume.seeder.service';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  controllers: [ResumeController],
  providers: [ResumeService, ResumeSeederService],
})
export class ResumeModule {}
