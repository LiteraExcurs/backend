import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Length(1, 500)
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @Length(1, 50)
  @IsNotEmpty()
  @ApiProperty()
  slug: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  url: string;
}
