import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ default: 'example@example.com' })
  login: string;

  @IsString()
  @ApiProperty({ default: 'example_pass' })
  password: string;
}
