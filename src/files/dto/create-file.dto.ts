import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Length(1, 500)
  @IsNotEmpty()
  @ApiProperty({ default: 'example_name' })
  type: string;

  @Length(1, 50)
  @IsNotEmpty()
  @ApiProperty({ default: 'someRandomId' })
  slug: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ default: `{BASE_URL}/static/{directoryName}/someRandomId` })
  url: string;
}
