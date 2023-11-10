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

  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column({ default: 'Тут должно быть описание' })
  @Length(1, 4000)
  @IsString()
  @IsOptional()
  description: string;

  @Column({
    default:
      'https://proprikol.ru/wp-content/uploads/2022/10/kartinki-na-avatarku-dlya-parnej-i-muzhchin-88.jpg',
  })
  @IsUrl()
  @IsOptional()
  image: string;

  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @Column({ default: 'moscow' })
  @IsOptional()
  lokation: string;

  @Column({ default: 0 })
  @IsOptional()
  completed: number;

  @Column({ default: 0 })
  @IsOptional()
  raiting: number;
}
