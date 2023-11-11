import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsString,
  Length,
  IsBoolean,
  IsOptional,
  IsUrl,
} from 'class-validator';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar')
  @Length(1, 250)
  @IsString()
  name: string;

  @Column('varchar', { default: 'Тут должно быть описание' })
  @Length(1, 4000)
  @IsString()
  @IsOptional()
  description: string;

  @Column('varchar', {
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

  @Column('varchar', { default: 'moscow' })
  @IsOptional()
  location: string;

  @Column('int', { default: 0 })
  @IsOptional()
  completed: number;

  @Column('int', { default: 0 })
  @IsOptional()
  rating: number;
}
