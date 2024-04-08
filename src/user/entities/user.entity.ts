// user.entity.ts

import { Timestamp } from '../../utils/timestamp.entity';
import { Resume } from '../../resume/entities/resume.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique : true,})
  username: string;

  @Column({unique : true,})
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];
}
