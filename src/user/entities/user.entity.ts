// user.entity.ts

import { Resume } from '../../resume/entities/resume.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique : true,})
  username: string;

  @Column({unique : true,})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];
}
