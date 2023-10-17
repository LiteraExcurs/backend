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
  IsBoolean,
} from 'class-validator';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 10)
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @Column()
  @Length(1, 500)
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
