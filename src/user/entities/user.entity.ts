// user.entity.ts

import { Resume } from 'src/resume/entities/resume.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];
}
