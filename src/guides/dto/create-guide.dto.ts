import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateGuideDto {
  @Length(1, 250)
  @IsString()
  @ApiProperty({ default: 'example_name' })
  name: string;

  @Length(1, 4000)
  @IsString()
  @ApiProperty({ default: 'example_description' })
  description: string;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isActive: boolean;

  @IsOptional()
  @ApiPropertyOptional()
  location: string;

  @IsOptional()
  @ApiPropertyOptional()
  completed: number;

  @IsOptional()
  @ApiPropertyOptional()
  rating: number;
}
