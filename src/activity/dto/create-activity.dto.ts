import { IsString, Length, IsArray, IsOptional, IsUrl, MaxLength, IsAlpha } from 'class-validator';
export class CreateActivityDto {
    @Length(1, 250)
    @IsString()
    name: string;

    @IsUrl()
    image: string;

    @MaxLength(1500)
    @IsOptional()
    description: string;

    @IsString()
    @IsAlpha()
    routName: string;

}
