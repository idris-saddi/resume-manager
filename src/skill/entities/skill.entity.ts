// skill.entity.ts

import { Timestamp } from '../../utils/timestamp.entity';
import { Resume } from '../../resume/entities/resume.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Skill extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique : true,
  })
  label: string;

  @ManyToMany(() => Resume, (resume) => resume.skills)
  resumes: Resume[];
}
