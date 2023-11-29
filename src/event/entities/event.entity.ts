import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsDateString,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Seasons } from '../types/seasons.types';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('int')
  @IsNumber()
  part: number;

  @Column('varchar', { length: 100 })
  @IsString()
  name: string;

  @Column('varchar', { length: 200 })
  @IsString()
  subtitle: string;

  @Column('varchar', { length: 50, unique: true })
  @Length(1, 50)
  @IsLowercase()
  @Matches('[a-zA-ZåäöÅÄÖs-]')
  @IsNotEmpty()
  slug: string;

  @Column('int')
  activityId: number;

  @Column('boolean', { default: true })
  @IsBoolean()
  isActive: boolean;

  @Column('varchar')
  @IsDateString()
  date: Date;

  @Column()
  @IsString()
  season: Seasons;

  @Column('int')
  @IsNumber()
  durationTime: number;

  @Column('int')
  @IsNumber()
  capacity: number;

  @Column('int')
  @IsNumber()
  booked: number;

  @Column('int')
  @IsNumber()
  guide: number;

  @Column('int')
  @IsNumber()
  rating: number;

  @Column('varchar', { length: 4000 })
  @Length(1, 4000)
  description: string;

  @Column('int')
  @IsNumber()
  price: number;

  @Column('varchar', { length: 4000 })
  @Length(1, 4000)
  avalibleDates: string;
}
