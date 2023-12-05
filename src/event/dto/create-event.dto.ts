import {
  IsBoolean,
  IsDateString,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  part: number;

  @ApiProperty({ default: 'Some_Name' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'example' })
  @IsString()
  subtitle: string;

  @ApiProperty({ default: 'example' })
  @Length(1, 50)
  @IsLowercase()
  @Matches('[a-zA-ZåäöÅÄÖs-]')
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  activityId: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ default: '2023-11-08' })
  @IsDateString()
  date: Date;

  @ApiProperty({ default: 1 })
  @IsNumber()
  durationTime: number;

  @ApiProperty({ default: 10 })
  @IsNumber()
  capacity: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  guide: number;

  @ApiProperty({ default: 0 })
  @IsNumber()
  rating: number;

  @ApiProperty({ default: 'Some description' })
  @Length(1, 4000)
  description: string;

  @ApiProperty({ default: 500 })
  @IsNumber()
  price: number;

  @Length(1, 4000)
  availableDates: Array<string>;
}
