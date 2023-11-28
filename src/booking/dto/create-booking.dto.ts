import { IsDate, IsEmail, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateBookingDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsNumber()
  visitors: number;

  @IsNumber()
  price: number;

  @IsDate()
  date: Date;

  @IsNumber()
  activity: number;
}
