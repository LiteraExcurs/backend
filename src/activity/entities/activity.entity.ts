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

    @Column({ default: 'https://static15.tgcnt.ru/posts/_0/13/139270e278f102784afe165cf2b8566a.jpg' })
    @IsNotEmpty()
    @IsUrl()
    image: string;
    
    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;
}
