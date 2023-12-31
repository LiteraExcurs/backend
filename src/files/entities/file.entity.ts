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
  IsAlpha,
  IsOptional,
} from 'class-validator';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar', { length: 1000 })
  @Length(1, 1000)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('varchar', { length: 500 })
  @Length(1, 500)
  @IsNotEmpty()
  @IsAlpha()
  type: string;

  @Column('varchar', { length: 500 })
  @Length(1, 500)
  @IsOptional()
  @IsAlpha()
  slug: string;

  @Column('varchar', { length: 2000 })
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
