// user.entity.ts

import { Timestamp } from '../../utils/timestamp.entity';
import { Resume } from '../../resume/entities/resume.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique : true,})
  username: string;

  @Column({unique : true,})
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @Column({ default: 'member' }) // Default role is 'member'
  role: string;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
