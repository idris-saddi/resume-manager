// resume.entity.ts

import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { Timestamp } from '../../utils/timestamp.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Resume extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.resumes, {eager:true})
  user: User;

  @ManyToMany(() => Skill, (skill) => skill.resumes , {eager:true})
  @JoinTable()
  skills: Skill[];
}
