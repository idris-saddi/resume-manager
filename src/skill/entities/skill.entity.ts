// skill.entity.ts

import { Resume } from '../../resume/entities/resume.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique : true,
  })
  label: string;

  @ManyToMany(() => Resume, (resume) => resume.skills)
  resumes: Resume[];
}
