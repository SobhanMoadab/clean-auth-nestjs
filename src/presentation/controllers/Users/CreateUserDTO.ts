import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "../../../domain/shared/models/User";

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

    token?: string
    static toEntity(dto: CreateUserDTO): User {
        return new User(dto.name, dto.email, dto.password)
    }
}

export class UpdateUserDTO extends PartialType(CreateUserDTO){}