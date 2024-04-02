// skill.entity.ts

import { Resume } from 'src/resume/entities/resume.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @ManyToMany(() => Resume, (resume) => resume.skills)
  @JoinTable()
  resumes: Resume[];
}
