import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsOptional()
  part: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  activityId: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  guideId: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({ default: '2023-11-08' })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsOptional()
  durationTime: number;

  @ApiProperty({ default: 10 })
  @IsNumber()
  @IsOptional()
  capacity: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty({ default: 500 })
  @IsNumber()
  price: number;
}
