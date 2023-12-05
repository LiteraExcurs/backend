import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  @ApiProperty({ default: '+79876543210' })
  phoneNumber: string;

  @IsEmail()
  @ApiProperty({ default: 'example@ya.ru' })
  email: string;

  @IsNumber()
  @ApiProperty({ default: 5 })
  visitors: number;

  @IsDateString()
  @ApiProperty({ default: new Date() })
  date: Date;
}
