import {
  IsBoolean,
  IsDate,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateEventDto {
  @IsNumber()
  part: number;

  @IsString()
  nameOfPart: string;

  @Length(1, 50)
  @IsLowercase()
  @Matches('[a-zA-ZåäöÅÄÖs-]')
  @IsNotEmpty()
  slug: string;

  @IsNumber()
  activityId: number;

  @IsBoolean()
  isActive: boolean;

  @IsDate()
  date: Date;

  @IsNumber()
  durationTime: number;

  @IsNumber()
  capacity: number;

  @IsNumber()
  booked: number;

  @IsNumber()
  guide: number;

  @IsNumber()
  rating: number;

  @Length(1, 4000)
  description: string;

  @IsNumber()
  price: number;
}
