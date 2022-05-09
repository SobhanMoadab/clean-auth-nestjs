import { IsNotEmpty } from "class-validator";
import { Column, Entity, Index, IsNull, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column()
    name: string

    @IsNotEmpty()
    @Column()
    password: string
    
    @IsNotEmpty()
    @Column()
    @Index({ unique: true })
    email: string

    
}