import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsString, Length, IsNotEmpty, IsUrl, IsAlpha, IsBoolean } from 'class-validator';


@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @Length(1, 250)
    @IsString()
    name: string;

    @Column()
    @IsString()
    type: string;

    @Column()
    @IsString()
    location: string;

    @Column({ default: 'Тут должно быть описание' })
    @Length(1, 4000)
    description: string;

    @Column()
    @Length(1, 10)
    @IsAlpha()
    @IsNotEmpty()
    routName: string;

    @Column({ default: 'Тут должно быть описание' })
    @IsNotEmpty()
    @IsUrl()
    image: string;
    
    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;
  
}
