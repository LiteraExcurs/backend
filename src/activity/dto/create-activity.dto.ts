import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsUrl, MaxLength, IsAlpha, IsNotEmpty, IsBoolean } from 'class-validator';
export class CreateActivityDto {
    @Length(1, 250)
    @IsString()
    @ApiProperty({default: 'example_name'})
    name: string;

    @MaxLength(4000)
    @IsOptional()
    @ApiPropertyOptional()
    description: string;

    @IsString()
    @ApiProperty({default: 'excurs'})
    type: string;

    @IsString()
    @ApiProperty({default: 'moscow'})
    location: string;

    @Length(1, 10)
    @IsAlpha()
    @IsNotEmpty()
    @ApiProperty({default: 'example'})
    routName: string;

    @IsUrl()
    @ApiPropertyOptional()
    image: string;

    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;
}
