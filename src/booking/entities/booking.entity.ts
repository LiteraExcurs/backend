import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

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

  @Column('int')
  @IsNumber()
  visitors: number;

  @Column('int')
  @IsNumber()
  price: number;

  @Column('date')
  @IsDate()
  date: Date;

  @Column('int')
  @IsNumber()
  activity: number;
}