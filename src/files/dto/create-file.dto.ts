import { IsAlpha, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto  {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  @Length(1, 20)
  @ApiProperty()
  name: string;

  @Length(1, 500)
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  url: string;
}
