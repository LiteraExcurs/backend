import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar', { length: 100 })
  @IsString()
  name: string;

  @Column('varchar', { length: 12 })
  @IsPhoneNumber()
  phoneNumber: string;

  @Column('varchar', { length: 50 })
  @IsEmail()
  email: string;

  @Column('int', { default: 1 })
  @IsOptional()
  @IsNumber()
  visitors: number;

  @Column('date')
  @IsDate()
  date: Date;

  @ManyToOne(() => Event, (event) => event.booked)
  event: Event;

  @Column()
  price: number;
}
