import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ default: '+79876543210' })
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'example@ya.ru' })
  email: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiProperty({ default: 5 })
  visitors: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  eventId: number;
}
