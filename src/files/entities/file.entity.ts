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

  @Column('varchar')
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('varchar')
  @Length(1, 500)
  @IsNotEmpty()
  @IsAlpha()
  type: string;

  @Column('varchar')
  @Length(1, 500)
  @IsOptional()
  @IsAlpha()
  slug: string;

  @Column('varchar')
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
