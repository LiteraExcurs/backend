import { IsString, Length, IsOptional, IsUrl, MaxLength, IsAlpha } from 'class-validator';
export class CreateActivityDto {
    @Length(1, 250)
    @IsString()
    name: string;

    @MaxLength(4000)
    @IsOptional()
    description: string;

    @IsString()
    @IsAlpha()
    routName: string;

    @IsUrl()
    image: string;
}
