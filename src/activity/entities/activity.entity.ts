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
  IsNotEmpty,
  IsUrl,
  IsBoolean,
  IsOptional,
  Matches,
  IsLowercase,
} from 'class-validator';

@Entity()
export class Activity {
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

  @Column('varchar', { length: 250 })
  @IsString()
  type: string;

  @Column()
  @IsString()
  location: string;

  @Column('varchar', { length: 4000, default: 'Тут должно быть описание' })
  @Length(1, 4000)
  description: string;

  @Column('varchar', { length: 50, default: 'example' })
  @Length(1, 50)
  @IsLowercase()
  @Matches('[a-zA-ZåäöÅÄÖs-]')
  @IsNotEmpty()
  slug: string;

  @Column('varchar', {
    default:
      'https://static15.tgcnt.ru/posts/_0/13/139270e278f102784afe165cf2b8566a.jpg',
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column('boolean', { default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @Column('boolean', { default: false })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;
}
