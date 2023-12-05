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

  @Column('int')
  @IsNumber()
  visitors: number;

  @Column('date')
  @IsDate()
  date: Date;

  @ManyToOne(() => Event, (event) => event.id)
  activity: Event;

  //Вот тут в базу записывается ID, не не понимаю почему...
  @ManyToOne(() => Event, (event) => event.price)
  @JoinColumn()
  price: Event;
}
