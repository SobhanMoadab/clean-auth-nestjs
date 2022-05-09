import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "src/domain/shared/models/User";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string 

    @IsString()
    @IsNotEmpty()
    password: string 


    @IsEmail()
    @IsNotEmpty()
    email: string 

    static toEntity(dto: CreateUserDTO): User {
        return new User(dto.name, dto.email, dto.password)
    }
}