import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsString,
  Length,
  IsBoolean,
  IsOptional,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar', { length: 250 })
  @Length(1, 250)
  @IsString()
  name: string;

  @Column('varchar', { length: 4000, default: 'Тут должно быть описание' })
  @Length(1, 4000)
  @IsString()
  @IsOptional()
  description: string;

  @Column('varchar', {
    length: 1000,
    default:
      'https://proprikol.ru/wp-content/uploads/2022/10/kartinki-na-avatarku-dlya-parnej-i-muzhchin-88.jpg',
  })
  @IsUrl()
  @IsOptional()
  image: string;

  @Column('boolean', { default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @Column('varchar', { length: 200, default: 'capital' })
  @Length(1, 500)
  location: string;

  @Column('int', { default: 0 })
  completed: number;

  @Column('int', { default: 0 })
  @MinLength(1)
  rating: number;

  @OneToMany(() => Event, (event) => event.guide)
  events: Array<Event>;
}
