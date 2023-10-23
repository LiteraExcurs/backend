import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, Length, IsNotEmpty, IsUrl, IsAlpha, IsOptional } from 'class-validator';

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

  @Column({default: ''})
  @Length(1, 500)
  @IsOptional()
  @IsAlpha()
  type: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
