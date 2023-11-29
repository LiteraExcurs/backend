import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsOptional,
  IsUrl,
  MaxLength,
  IsNotEmpty,
  IsBoolean,
  Matches,
  IsLowercase,
} from 'class-validator';

export class CreateActivityDto {
  @Length(1, 250)
  @IsString()
  @ApiProperty({ default: 'example_name' })
  name: string;

  @MaxLength(4000)
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsString()
  @ApiProperty({ default: 'excursion' })
  type: string;

  @IsString()
  @ApiProperty({ default: 'moscow' })
  location: string;

  @Length(1, 50)
  @IsLowercase()
  @Matches('[a-zs-]')
  @IsNotEmpty()
  slug: string;

  @IsUrl()
  @ApiPropertyOptional()
  image: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;
}
